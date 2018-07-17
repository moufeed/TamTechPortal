using TamTechSDK.Common.Helpers.Converters;
using TamTechSDK.Common.Services.ContentService.Pages;
using TamTechSDK.Web.Controllers.Admin;
using TamTechSDK.Web.Services.Telemetry;

namespace TamTech.Web.TamTechWebsite.Areas.Admin.Controllers
{
    public class PagesController : PagesBaseController
    {
        #region Ctors
        public PagesController(ITelemetryClientService telemetryClientService,
                               IPageService pageService,
                               IStringConverters stringConverters)
         : base(telemetryClientService, pageService, stringConverters)
        {
        }
        #endregion

    }
}