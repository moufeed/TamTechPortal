using TamTechSDK.Common.Services.ContentService.Categories;
using TamTechSDK.Common.Services.Upload;
using TamTechSDK.Web.Controllers.Admin;
using TamTechSDK.Web.Services.Telemetry;

namespace TamTech.Web.TamTechWebsite.Areas.Admin.Controllers
{
    public class CategoriesController : CategoriesBaseController
    {

        #region Ctors
        public CategoriesController(
                                    ITelemetryClientService telemetryClientService,
                                    ICategoriesServices categoryService,
                                    IUploadService uploadService
            )
            : base(telemetryClientService, categoryService, uploadService)
        {

        }
        #endregion

    }
}