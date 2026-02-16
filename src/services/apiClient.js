function buildError(status, fallbackMessage){
    if(status === 401){
        return { message: "Unauthorized. Please log in again.", status };
    }

    if(status === 403){
        return { message: "Forbidden. You do not have access to this resource.", status };
    }

    if(status >= 500){
        return { message: "Server error. Please try again shortly.", status };
    }

    return { message: fallbackMessage || "Request failed.", status };
}

export async function apiRequest(path, options = {}){
    const host = process.env.REACT_APP_HOST;

    if(!host){
        throw { message: "Missing REACT_APP_HOST in frontend .env", status: 0 }; //eslint-disable-line
    }

    let response;

    try{
        response = await fetch(`${host}${path}`, options);
    } catch (_error) {
        throw { message: "Unable to reach API. Confirm backend is running on REACT_APP_HOST.", status: 0 }; //eslint-disable-line
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
