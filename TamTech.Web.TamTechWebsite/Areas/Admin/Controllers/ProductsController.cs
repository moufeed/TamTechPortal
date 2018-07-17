using TamTechSDK.Common.Services.ContentService;
using TamTechSDK.Common.Services.ContentService.Brands;
using TamTechSDK.Common.Services.ContentService.Categories;
using TamTechSDK.Common.Services.ContentService.Products;
using TamTechSDK.Common.Services.Upload;
using TamTechSDK.Common.Services.Upload.Settings;
using TamTechSDK.Web.Controllers.Admin;
using TamTechSDK.Web.Services.Telemetry;

namespace TamTech.Web.TamTechWebsite.Areas.Admin.Controllers
{
    public class ProductsController : ProductsBaseController
    {
        #region Ctors
        public ProductsController(
                                    ITelemetryClientService telemetryClientService,
                                    IProductsManagerService productsManagerService,
                                    IBrandsServices brandsService,
                                    ICategoriesServices categoriesService,
                                    IContentServices contentService,
                                    IUploadService uploadService,
                                    IFileTypesSettings fileTypesSettings
                                    )
            : base(telemetryClientService, productsManagerService, brandsService, categoriesService, contentService, uploadService, fileTypesSettings)
        {
        }
        #endregion  
    }
}


