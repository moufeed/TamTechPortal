using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TamTechSDK.Web.Controllers.Portal;
using TamTechSDK.Web.Services.Telemetry;

namespace TamTech.Web.TamTechWebsite.Areas.Portal.Controllers
{
    [Area("Portal")]
    public class PagesController : PagesBaseController
    {
        public PagesController(ITelemetryClientService telemetryClientService, IConfiguration configuration)
            : base(telemetryClientService, configuration)
        {
        }
    }
}