using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TamTechSDK.Common.Models.ContactUs;
using TamTechSDK.Web.Controllers.Portal;
using TamTechSDK.Web.Services.Telemetry;

namespace TamTech.Web.TamTechWebsite.Areas.Portal.Controllers
{
    [Area("Portal")]
    public class HomeController : HomeBaseController
    {

        private readonly TamTechBackendSDK.EmailService.Services.IEmailSender emailSender;
        public HomeController(ITelemetryClientService telemetryClientService,
                              IConfiguration configuration,
                              TamTechBackendSDK.EmailService.Services.IEmailSender emailSender)
            : base(telemetryClientService, configuration)
        {
            this.emailSender = emailSender;
        }

        [HttpPost]
        public async Task<JsonResult> ContactUs(ContactUs model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var emailSettings = Configuration.GetSection("Portal_EmailSettings").Get<TamTechBackendSDK.EmailService.Settings.EmailSettings>();
                    //await emailSender.SendEmail(new TamTechBackendSDK.EmailService.Models.EmailModel
                    //{
                    //    From = emailSettings.From,
                    //    Subject = "Contact Us",
                    //    Text = $"Message from Email : {model.Email} - Mobile :{model.Mobile} - Message content is : {model.Message}",
                    //    Recipients = new List<string>() { emailSettings.From },
                    //    ReasonOfSend = "ContactUs"

                    //});


                    return Json(new { success = true });
                }
                return Json(new { success = false });
            }
            catch (Exception exc)
            {
                TelemetryClientService.TrackException(exc);
                // there should be a friendly error page
                return Json(new
                {
                    Success = false,
                    errors = new Dictionary<string, string> { { "Error", "Something wrong" } }
                });

            }
        }

    }
}