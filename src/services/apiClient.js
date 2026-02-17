function buildError(status, path){
    if(status === 401 && path === "/login"){
        return { message: "Your email or password is incorrect. Please try again.", status };
    }

    if(status === 401){
        return { message: "Your session has expired. Please log in again.", status };
    }

    if(status === 403){
        return { message: "You do not have permission to perform this action.", status };
    }

    if(status === 404){
        return { message: "We could not find what you were looking for.", status };
    }

    if(status === 400){
        return { message: "We could not complete that request. Please check your details and try again.", status };
    }

    if(status >= 500){
        return { message: "Something went wrong on our side. Please try again shortly.", status };
    }

    return { message: "We could not complete your request.", status };
}

export async function apiRequest(path, options = {}){
    const host = process.env.REACT_APP_HOST;

    if(!host){
        throw { message: "Our service is temporarily unavailable. Please try again later.", status: 0 }; //eslint-disable-line
    }

    let response;

    try{
        response = await fetch(`${host}${path}`, options);
    } catch (_error) {
        throw { message: "We are unable to connect right now. Please check your connection and try again.", status: 0 }; //eslint-disable-line
    }

    let data = null;
    const hasJson = response.headers.get("content-type")?.includes("application/json");
    if(hasJson){
        data = await response.json();
    }

    if(!response.ok){
        throw buildError(response.status, path); //eslint-disable-line
    }

    return data;
}
