using Microsoft.Extensions.DependencyInjection;
using TamTechBackendSDK.ContentService.Services.Sections;
using TamTechSDK.Common.Services.ContentService;
using TamTechSDK.Common.Services.ContentService.Brands;
using TamTechSDK.Common.Services.ContentService.Categories;
using TamTechSDK.Common.Services.ContentService.Galleries;
using TamTechSDK.Common.Services.ContentService.Menus;
using TamTechSDK.Common.Services.ContentService.Pages;
using TamTechSDK.Common.Services.ContentService.Posts;
using TamTechSDK.Common.Services.ContentService.Products;

using TamTechSDK.Common.Services.ContentService.Reviews;
using TamTechSDK.Common.Services.ContentService.Sections;
using TamTechSDK.Common.Services.ContentService.Services;
using TamTechSDK.Common.Services.ContentService.Sliders;
using TamTechSDK.Common.Services.Email;
using TamTechSDK.Common.Services.Identity;
using TamTechSDK.Common.Services.Upload;

namespace TamtechWebsite.AppStartup.WebApplication.ApplicationServices
{
    public static class BLLDirectBackendServicesConfigurations
    {
        public static void _AddBusinessLogicDirectBackendServicesConfigurations(this IServiceCollection services)
        {
            #region Contents Service 

            services.AddScoped<IMenusServices, TamtechWebsite.DirectBackendServices.ContentServices.Menus.DirectMenusServices>();
            services.AddTransient<ICategoriesServices, TamtechWebsite.DirectBackendServices.ContentServices.Categories.DirectCategoriesServices>();
            services.AddTransient<IProductsManagerService, TamtechWebsite.DirectBackendServices.ContentServices.Products.DirectProductsManagerService>();
            // services.AddTransient<IProductsService, Web.DirectBackendServices.ContentServices.Products.DirectProductsService> ();
            services.AddTransient<IBrandsServices, TamtechWebsite.DirectBackendServices.ContentServices.Brands.DirectBrandsServices>();
            services.AddTransient<IPageService, TamtechWebsite.DirectBackendServices.ContentServices.Pages.DirectPagesService>();
            services.AddTransient<IReviewsServices, TamtechWebsite.DirectBackendServices.ContentServices.Reviews.DirectReviewsServices>();
            services.AddTransient<IServicesService, TamtechWebsite.DirectBackendServices.ContentServices.Services.DirectServicesService>();
            services.AddTransient<IContentServices, TamtechWebsite.DirectBackendServices.ContentServices.Content.DirectContentService>();
            services.AddTransient<ISlidersServices, TamtechWebsite.DirectBackendServices.ContentServices.Sliders.DirectSlidersService>();
            services.AddTransient<IGalleriesService, TamtechWebsite.DirectBackendServices.ContentServices.Galleries.DirectGalleriesService>();
            services.AddTransient<IPostsService, TamtechWebsite.DirectBackendServices.ContentServices.Posts.DirectPostsService>();
            services.AddTransient<ISectionsService, TamtechWebsite.DirectBackendServices.ContentServices.Sections.DirectSectionsService>();
            services.AddTransient<TamTechSDK.Common.Services.ContentService.Request.IRequestService, TamtechWebsite.DirectBackendServices.ContentServices.Request.DirectRequestService>();
            services.AddTransient<TamTechSDK.Common.Services.ContentService.Status.IStatusService, TamtechWebsite.DirectBackendServices.ContentServices.Status.DirectSatusService>();
            services.AddTransient<TamTechSDK.Common.Services.ContentService.City.ICityService, TamtechWebsite.DirectBackendServices.ContentServices.City.DirectCityService>();
            #endregion

            #region Upload Service 

            services.AddTransient<IUploadService, TamtechWebsite.DirectBackendServices.UploadService.DirectFileStorageService>();

            #endregion

            #region Email Service 

            services.AddTransient<IEmailSenderService, TamtechWebsite.DirectBackendServices.EmailServices.DirectEmailServices>();

            #endregion

            #region Identity Service 

            services.AddTransient<IAuthService, TamtechWebsite.DirectBackendServices.IdentityService.DirectAuthService>();
            services.AddTransient<IUsersManagerService, TamtechWebsite.DirectBackendServices.IdentityService.UsersMenager.DirectUserMenagerServices>();
            services.AddTransient<IRolesService, TamtechWebsite.DirectBackendServices.IdentityService.RolesService.DirectRolesService>();


            #endregion


        }
    }
}
