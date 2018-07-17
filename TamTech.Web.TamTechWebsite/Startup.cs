using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdminPanelWeb.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TamTechSDK.Common.Helpers.Converters;
using TamTechSDK.Common.Providers.Requests;
using TamTechSDK.Common.Services.ContentService;
using TamTechSDK.Common.Services.ContentService.Brands;
using TamTechSDK.Common.Services.ContentService.Brands.Models;
using TamTechSDK.Common.Services.ContentService.Brands.Settings;
using TamTechSDK.Common.Services.ContentService.Categories;
using TamTechSDK.Common.Services.ContentService.Categories.Models;
using TamTechSDK.Common.Services.ContentService.Categories.Settings;
using TamTechSDK.Common.Services.ContentService.Pages;
using TamTechSDK.Common.Services.ContentService.Pages.Settings;
using TamTechSDK.Common.Services.ContentService.Products;
using TamTechSDK.Common.Services.ContentService.Products.Settings;
using TamTechSDK.Common.Services.ContentService.Reviews;
using TamTechSDK.Common.Services.Email;
using TamTechSDK.Common.Services.Helpers;
using TamTechSDK.Common.Services.Identity;
using TamTechSDK.Common.Services.Identity.Models;
using TamTechSDK.Common.Services.Identity.Models.Params;
using TamTechSDK.Common.Services.Identity.Settings;
using TamTechSDK.Common.Services.ServiceBus;
using TamTechSDK.Common.Services.SMS;
using TamTechSDK.Common.Services.Upload;
using TamTechSDK.Common.Services.Upload.Settings;
using TamTechSDK.Web.Models.Admin.User;
using TamTechSDK.Web.Routing;
using TamTechSDK.Web.Services.Telemetry;
using TamTechSDK.Web.Services.Telemetry.Settings;

namespace TamTech.AdminPanel
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region initial project
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            //services.AddTransient<IUsersServices, UsersServices>();


            #endregion


            #region Settings
            var identityServiceSettings = Configuration.GetSection("IdentityService").Get<IdentityServiceSettings>();
            var smsServiceSettings = Configuration.GetSection("SMSServiceSettings").Get<ServiceBusSettings>();
            var emailServiceSettings = Configuration.GetSection("EmailServiceSettings").Get<ServiceBusSettings>();
            var appInsightsSettings = Configuration.GetSection("ApplicationInsights").Get<TelemetryClientSettings>();
            #endregion

            #region  Basic Services
            services.AddMvcCore().AddAuthorization().AddJsonFormatters();
            #endregion

            #region Identity Server Configuration
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = identityServiceSettings.DefaultScheme;
                options.DefaultChallengeScheme = identityServiceSettings.DefaultChallengeScheme;
            })
            .AddCookie(identityServiceSettings.CookieAuthenticationScheme)
            .AddOpenIdConnect(identityServiceSettings.OpenIdConnectAuthenticationScheme, options =>
            {
                options.SignInScheme = identityServiceSettings.SignInScheme;
                options.Authority = identityServiceSettings.Url;
                options.RequireHttpsMetadata = identityServiceSettings.RequireHttpsMetadata;
                options.ClientId = identityServiceSettings.ClientId;
                options.ClientSecret = identityServiceSettings.ClientSecrets;
                options.ResponseType = identityServiceSettings.ResponseType;
                options.SaveTokens = identityServiceSettings.SaveTokens;
                options.GetClaimsFromUserInfoEndpoint = identityServiceSettings.GetClaimsFromUserInfoEndpoint;
                foreach (var scop in identityServiceSettings.Scops)
                {
                    options.Scope.Add(scop);
                }
                //options.Events = new Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectEvents ()
                //{
                //    OnTokenValidated = tokenValidatedContext =>
                //    {
                //        return Task.FromResult(0);
                //    }
                //}
            });
            #endregion

            #region Services Dependency Injection  

            #region Settings Services

            services.AddScoped<TelemetryClientSettings>(settings => appInsightsSettings); // first step (Telemetry) 
            services.AddScoped<ServiceBusSettings>(settings => emailServiceSettings);  // first step (EmailService)
            services.AddScoped<ServiceBusSettings>(settings => smsServiceSettings);  // first step (SMSService)
            services.AddScoped<IIdentityBackendSettings, IdentityBackendSettings>();
            services.AddScoped<IContentsServiceSettings, ContentsServiceSettings>();
            services.AddScoped<IPageServiceSettings, PageServiceSettings>();
            services.AddScoped<IProductManagerServiceSettings, ProductManagerServiceSettings>();
            services.AddScoped<IProductServiceSettings, ProductServiceSettings>();
            services.AddScoped<IBrandServiceSettings, BrandServiceSettings>();
            services.AddScoped<ICategoryServiceSettings, CategoryServiceSettings>();
            services.AddScoped<IUploadBackendSettings, UploadBackendSettings>();
            services.AddScoped<IFileTypesSettings, FileTypesSettings>();
            #endregion



            #region Providers Services 

            services.AddScoped<IRequestProvider, RequestProvider>((serviceExtension) =>
            {
                var httpContextAccessor = serviceExtension.GetRequiredService<IHttpContextAccessor>();
                // var _token = Task.Run(async () => await httpContextAccessor.HttpContext.GetTokenAsync("access_token")).Result;
                // var token = GetToken(httpContextAccessor.HttpContext).GetAwaiter().GetResult();
                var token = GetToken(httpContextAccessor.HttpContext).Result;
                return new RequestProvider(token);
            });

            async Task<string> GetToken(HttpContext httpContext)
            {
                return await httpContext.GetTokenAsync("access_token");
            }


            #endregion

            #region Services

            // static class
            services.AddSingleton<IHelperService, HelperService>();


            services.AddTransient<ITelemetryClientService, TelemetryClientService>();// second step (Telemetry) 
            services.AddTransient<IServiceBus, ServiceBusProvider>();
            services.AddTransient<IEmailSenderService, EmailSenderToServiceBus>();// second step (EmailService)
            services.AddTransient<ISMSService, SMSServiceBus>();// second step (SMSService)
            services.AddTransient<IIdentityService, IdentityService>();
            #endregion 

            #region Contents Services   

            services.AddTransient<IPageService, PageService>();
            services.AddTransient<ICategoriesServices, CategoriesServices>();
            services.AddTransient<IProductsManagerService, ProductsManagerService>();
            services.AddTransient<IProductsService, ProductsService>();
            services.AddTransient<IBrandsServices, BrandsServices>();
            services.AddTransient<IContentServices, ContentServices>();
            services.AddTransient<IReviewsServices, ReviewsServices>();
            services.AddTransient<IUploadService, UploadService>();


            #endregion

            #region Converters Services 

            services.AddTransient<IStringConverters, StringConverters>();
            #endregion

            #endregion



            #region Shared Configurations

            #endregion
            #region Portal Configurations

            // Email Grid Sender Configurations
            services.AddTransient<TamTechBackendSDK.Common.Services.ApplicationInsightsTelemetry.ITelemetryClientService, TamTechBackendSDK.Common.Services.ApplicationInsightsTelemetry.TelemetryClientService>((serviceExtension) =>
            {
                var insightsSettings = Configuration.GetSection("Portal_ApplicationInsights").Get<TamTechBackendSDK.Common.Services.ApplicationInsightsTelemetry.Settings.TelemetryClientSettings>();
                var httpContextAccessor = serviceExtension.GetRequiredService<IHttpContextAccessor>();
                return new TamTechBackendSDK.Common.Services.ApplicationInsightsTelemetry.TelemetryClientService(httpContextAccessor, insightsSettings);
            });

            services.AddTransient<TamTechBackendSDK.EmailService.Services.IEmailSender, TamTechBackendSDK.EmailService.Services.SendGridEmailSender>(
                (serviceExtension) =>
                {
                    var telemetry = serviceExtension.GetService<TamTechBackendSDK.Common.Services.ApplicationInsightsTelemetry.ITelemetryClientService>();
                    var settings = Configuration.GetSection("Portal_SendGrid").Get<TamTechBackendSDK.EmailService.Settings.SendGridSettings>();
                    var sender = new TamTechBackendSDK.EmailService.Services.SendGridEmailSender(telemetry, settings.ApiKey);

                    return sender;
                }

                );
            #endregion

            #region Admin Configurations

            #endregion

            #region Shop Configurations

            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                // app.UseBrowserLink(); from web admin panel
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }





            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();


            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<RegisterUserModel, CreateUserVM>();
                cfg.CreateMap<CreateUserDto, RegisterUserModel>()
                .ForMember(model => model.RolesNames,
                  opt => opt.MapFrom(dto => dto.Roles));


                cfg.CreateMap<Brand, SelectListItem>()
                .ForMember(dest => dest.Text,
                 opts => opts.MapFrom(src => src.Name))
                 .ForMember(dest => dest.Value,
                 opts => opts.MapFrom(src => src.Id));


                cfg.CreateMap<Category, SelectListItem>()
                   .ForMember(dest => dest.Text,
                   opts => opts.MapFrom(src => src.Name))

                   .ForMember(dest => dest.Value,
                   opts => opts.MapFrom(src => src.Id));

                cfg.CreateMap<KeyValuePair<Guid, string>, SelectListItem>()
                   .ForMember(dest => dest.Text,
                   opts => opts.MapFrom(src => src.Value))

                   .ForMember(dest => dest.Value,
                   opts => opts.MapFrom(src => src.Key));

                cfg.CreateMap<UserModel, SelectListItem>()
                   .ForMember(dest => dest.Text,
                   opts => opts.MapFrom(src => src.UserName))

                   .ForMember(dest => dest.Value,
                   opts => opts.MapFrom(src => src.Email));

            });
            app.UseAuthentication();


            var routingSettings = Configuration.GetSection("RoutingAppSettings").Get<RoutingAppSettings>();
            app.UseMvc(routes =>
            {
                routes.MapRoute("areaRoute", "{area:exists}/{controller=Home}/{action=Index}/{id?}");
                // defaults: new { area = "Admin", controller = "Home", action = "Index" });

                routes.MapRoute(
                    name: "default",
                    template: "{area=" + routingSettings.DefaultArea + "}/{controller=Home}/{action=Index}/{id?}");

            });
        }
    }
}
//public class RouteConfig
//{
//    public static void RegisterRoutes(RouteCollection routes)
//    {
//        routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

//        routes.MapRoute(
//            name: "Default",
//            url: "{controller}/{action}/{id}",
//            defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
//            namespaces: new string[] { "Portal.Areas.PortalAdmin.Controllers" }
//        ).DataTokens.Add("Area", "PortalAdmin");
//    }
//}
/*
 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Steps of Reference token  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Actors: 
1 – Identity server. 
2 – API.		 (identity.api)
3 – Client.	(AdminPanel)

API:
In AddIdentityServerAuthentication method Add ApiSecret = "apisecret" option 

Client:
Set AccessTokenType = AccessTokenType.Reference via database.
Go to Clients table in identity server DB and set AccessTokenType  field (1) value.


Identity server: 
Go to ApiSecret table in identity server database and add new record 
{ApiResourceId = API Id (identity.api id), Type = "SharedSecret", Value = "apisecret".Sha256())}
 */
