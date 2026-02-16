function buildError(status, fallbackMessage){
    if(status === 401){
        return { message: "Your session has expired. Please log in again.", status };
    }

    if(status === 403){
        return { message: "You do not have permission to perform this action.", status };
    }

    if(status >= 500){
        return { message: "Something went wrong on our side. Please try again shortly.", status };
    }

    return { message: fallbackMessage || "We could not complete your request.", status };
}

export async function apiRequest(path, options = {}){
    const host = process.env.REACT_APP_HOST;

    if(!host){
        throw { message: "The app is not configured correctly right now. Please try again later.", status: 0 }; //eslint-disable-line
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
        const serverMessage = data?.message || response.statusText;
        throw buildError(response.status, serverMessage); //eslint-disable-line
    }

    return data;
}
