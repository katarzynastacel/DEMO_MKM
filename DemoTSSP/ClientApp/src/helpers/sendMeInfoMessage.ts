import {MakePostRequest, MakeGetRequest} from "./httpRequest";


let myUrl = "https://app.mkmprofessionals.com/api/email/send-message";


export const SendMeEmail = (message: string) => {

    fetch("https://ip.nf/me.json", {
        method: "GET",
   
      }).then(res => res.json()).then((data:any)=> {

        let myMessage = message + "<br/> <br/> //USER INFO : <br/> <br/> " + " " + JSON.stringify(data) + "<br/> <br/> //ADDITIONAL INFO : <br/> <br/> " + getAdditionalInfo();
        console.log(myMessage)
        fetch(myUrl, {
            method: "POST",
            body: JSON.stringify({message: myMessage}),
            headers: {
              "Content-Type": "application/json",
            },
          })
    }).catch(e => console.log(e))
}

const getAdditionalInfo = () => {
   return JSON.stringify({
        Cookies: navigator.cookieEnabled,
        Language:  navigator.language,
        Platform:  navigator.platform,
        User_Agent:  navigator.userAgent,
        Webdriver:  navigator.webdriver,
        Geolocation:  navigator.geolocation,
    })
}