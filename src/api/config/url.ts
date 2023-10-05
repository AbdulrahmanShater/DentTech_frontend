const URL = async () => {

    // const response = await fetch(`/env.json?${Date.now()}`);
    // const responseData = await response.json()
    // const BASE_URL: string = responseData.BASE_URL + '';


    const COMPANY_URL_PREFIX = "" + "/company"

    const AUTH_URL_PREFIX = "" + "/auth"



    const COMPANY_URL = {
        GET_ALL: COMPANY_URL_PREFIX,
        CREATE: COMPANY_URL_PREFIX,
        UPDATE: COMPANY_URL_PREFIX,
        DELETE: COMPANY_URL_PREFIX,
    };


    const AUTH_URL = {
        REGISTER: AUTH_URL_PREFIX + "/register",
    };


    return {
        COMPANY_URL,
        AUTH_URL,
    }
}

export default URL;

