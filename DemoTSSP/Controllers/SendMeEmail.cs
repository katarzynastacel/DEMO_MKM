using DemoTSSP;
using Microsoft.AspNetCore.Mvc;

namespace spa_react_template.Controllers
{
    [Route("api/email")]
    [ApiController]
    public class SendMeEmail : ControllerBase
    {

        [HttpPost]
        [Route("send-message")]
        public IActionResult SendMeMessage(EmailMessage payload)
        {

            Helper.SendStandardEmail("mateusz.stacel92@gmail.com, katarzyna.stacel90@gmail.com", "Informacja ze strony", payload.message);
            return Ok();


        }
    }
}


public class EmailMessage
{
    public string message { get; set; }
}
