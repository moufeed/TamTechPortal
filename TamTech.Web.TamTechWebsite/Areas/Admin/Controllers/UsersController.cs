using TamTechSDK.Common.Services.Identity;
using TamTechSDK.Common.Services.Identity.Settings;
using TamTechSDK.Web.Services.Telemetry;
using TamTechSDK.Web.Controllers.Admin;

namespace TamTech.Web.TamTechWebsite.Areas.Admin.Controllers
{
    public class UsersController : UsersBaseController
    {
        #region Ctors
        public UsersController(ITelemetryClientService telemetryClientService,
                               IIdentityService identityService,
                               IIdentityBackendSettings identityBackendSettings
                              )
               : base(telemetryClientService, identityService, identityBackendSettings)
        {
        }
        #endregion  

    }
}