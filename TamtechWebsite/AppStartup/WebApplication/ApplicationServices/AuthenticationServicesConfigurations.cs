using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TamtechWebsite.AppStartup.DirectBackendServices.IdentityService.ApplicationServices;
using TamtechWebsite.AppStartup.MicroServices.ApplicationServices;
using TamtechWebsite.Services.Configurations.AppSetting.Constants;

namespace TamtechWebsite.AppStartup.WebApplication.ApplicationServices
{
    public static class AuthenticationServicesConfigurations
    {
        public static void AddAuthenticationServicesConfigurations(this IServiceCollection services, IConfiguration configuration)
        {
            bool useMicroServices = configuration.GetSection(AppSettings.WebApplicationSettings)
                                                 .GetSection(AppSettings.WebApplication_UseMicroServices).Get<bool>();
            if (useMicroServices)
            {
                services.MicroServices_AddIdentityServerAuthentication(configuration);
            }
            else
            {
                services.IdentityService_DirectedBackendServicesConfigurations_ConfigureServices(configuration);
            }
        }
    }
}
