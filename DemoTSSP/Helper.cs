using System;
using System.Net;
using System.Net.Mail;

namespace DemoTSSP
{
    public class Helper
    {
        public static void SendStandardEmail(string email, string subject, string body)
        {

            try
            {


                //MailMessage mail = new MailMessage("mkmprofessionals@gmail.com", email);
                //SmtpClient client = new SmtpClient();
                //client.Port = 587;
                //client.DeliveryMethod = SmtpDeliveryMethod.Network;
                //client.UseDefaultCredentials = true;
                //client.Credentials = new NetworkCredential("mkmprofessionals@gmail.com", "ezc6ku2x");
                //client.EnableSsl = true;
                //client.Host = "smtp.gmail.com";
                ////mail.To.Add("add more peoples...");
                //mail.IsBodyHtml = true;
                //mail.Subject = subject;
                //mail.Body = body;
                //client.Send(mail);


                MailMessage mail = new MailMessage("info@mkmprofessionals.com", email);

                //set the addresses
                mail.IsBodyHtml = true;
                //mail.To.Add("mateusz.stacel92@gmail.com");

                //set the content
                mail.Subject = subject;
                mail.Body = body;
                //send the message
                SmtpClient smtp = new SmtpClient("webmail.mkmprofessionals.com");

                NetworkCredential Credentials = new NetworkCredential("info@mkmprofessionals.com", "W7suy38i!");
                smtp.Credentials = Credentials;
                smtp.Send(mail);

            }
            catch (Exception e)
            {
                // LogError(e, "SENDING STANDARD EMAIL");
            }
        }
    }
}
