

import { toast } from "react-toastify";

export const msalConfig = {
    auth: {
        clientId: "fe328724-2324-4a99-8aa8-6546abafa014",
        authority: "https://login.microsoftonline.com/6c286bcf-dadc-47a7-9678-65be94519cec",
        redirectUri: "http://localhost:3000/"
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
};


export const loginRequest = {
    scopes: ["api://571726be-9889-4039-8a23-f1f52d1b9d77/api.scope"]
};


export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

export const handleLogin = (loginType,instance,setProfile) => {
    if (loginType === "popup") {
        instance.loginPopup(loginRequest).then(res=>
            {
                setProfile({token:res.accessToken,account:res.account})
                toast(`Hello, ${res.account.name}`,{type:"success"})

            }
            ).catch(e => {
                toast("Loging Failed.Try Again later",{type:"error"})
                console.log(e);
            });
    } else if (loginType === "redirect") {
        instance.loginRedirect(loginRequest).catch(e => {
            console.log(e);
        });
    }
}

export const handleLogout = (logoutType,instance,setProfile) => {
    if (logoutType === "popup") {
        instance.logoutPopup().then(res=>{
            console.log("logout");
            setProfile({token:null,account:null})
        }).catch(e => {
            toast("Request Failed.Try Again later",{type:"error"})
            console.log(e);
        });
    } else if (logoutType === "redirect") {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    }
}