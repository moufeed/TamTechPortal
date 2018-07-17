using TamTechSDK.Common.Services.Email;
using TamTechSDK.Common.Services.Identity;
using TamTechSDK.Web.Controllers.Admin;

namespace TamTech.Web.TamTechWebsite.Areas.Admin.Controllers
{
    public class EmailController : EmailBaseController
    {
        public EmailController(
                                IIdentityService IdentityService,
                                IEmailSenderService emailService
            )
            : base(IdentityService, emailService)
        {

        }

    }
}