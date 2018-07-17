using TamTechSDK.Common.Services.Identity;
using TamTechSDK.Common.Services.ServiceBus;
using TamTechSDK.Common.Services.SMS;
using TamTechSDK.Web.Controllers.Admin;

namespace TamTech.Web.TamTechWebsite.Areas.Admin.Controllers
{
    public class SmsController : SmsBaseController
    {
        public SmsController(ServiceBusSettings serviceBusSettings,
                             IIdentityService identityService,
                             ISMSService smsService)
            : base(serviceBusSettings, identityService, smsService)
        {
        }

    }
}