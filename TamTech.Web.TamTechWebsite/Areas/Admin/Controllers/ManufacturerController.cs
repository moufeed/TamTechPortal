using TamTechSDK.Common.Services.ContentService.Brands;
using TamTechSDK.Common.Services.Upload;
using TamTechSDK.Web.Controllers.Admin;
using TamTechSDK.Web.Services.Telemetry;

namespace TamTech.Web.TamTechWebsite.Areas.Admin.Controllers
{
    public class ManufacturerController : ManufacturerBaseController
    {
        #region Ctors
        public ManufacturerController(ITelemetryClientService telemetryClientService,
                                        IBrandsServices brandService,
                                        IUploadService uploadService
                                        )
            : base(telemetryClientService, brandService, uploadService)
        {
        }
        #endregion 
    }
}