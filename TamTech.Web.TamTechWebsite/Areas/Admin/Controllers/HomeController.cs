using Microsoft.Extensions.Configuration;
using TamTechSDK.Common.Services.Identity;
using TamTechSDK.Common.Services.SMS;
using TamTechSDK.Web.Controllers.Admin;
using TamTechSDK.Web.Services.Telemetry;

namespace TamTech.Web.TamTechWebsite.Areas.Admin.Controllers
{
    public class HomeController : HomeBaseController
    {
        public HomeController(IConfiguration configuration, IIdentityService identityService,
                              ISMSService iSMSService, ITelemetryClientService telemetryClientService)
            : base(configuration, identityService, iSMSService, telemetryClientService)
        {
        }

    }
}
