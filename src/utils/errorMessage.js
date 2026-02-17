const DEFAULT_CUSTOMER_MESSAGE = "Something went wrong. Please try again.";

function isSensitiveMessage(message){
    return /react_app_host|process\.env|frontend\.env|\.env|jwt|mongodb|mongoose|cast to objectid|cors|stack|trace|referenceerror|syntaxerror|typeerror/i.test(message);
}

export function toCustomerErrorMessage(error, fallbackMessage = DEFAULT_CUSTOMER_MESSAGE){
    if(!error){
        return fallbackMessage;
    }

    if(typeof error === "string"){
        return isSensitiveMessage(error) ? fallbackMessage : error;
    }

    const status = Number(error.status);
    if(status === 400){
        return "We could not complete that request. Please check your details and try again.";
    }

    if(status === 401){
        return "Your session has expired or your sign-in details are incorrect. Please log in and try again.";
    }

    if(status === 403){
        return "You do not have permission to perform this action.";
    }

    if(status === 404){
        return "We could not find what you were looking for.";
    }

    if(status === 409){
        return "That information is already in use. Please try a different value.";
    }

    if(status >= 500){
        return "Something went wrong on our side. Please try again shortly.";
    }

    const rawMessage = typeof error.message === "string" ? error.message.trim() : "";
    if(!rawMessage){
        return fallbackMessage;
    }

    if(isSensitiveMessage(rawMessage)){
        return fallbackMessage;
    }

    return rawMessage;
}