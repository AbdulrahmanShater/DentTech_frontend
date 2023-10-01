const URL = async () => {

    // const response = await fetch(`/env.json?${Date.now()}`);
    // const responseData = await response.json()
    // const BASE_URL: string = responseData.BASE_URL + '';


    const COMPANY_URL_PREFIX = "" + "/company"


    const COMPANY_URL = {
        GET_ALL: COMPANY_URL_PREFIX,
        CREATE: COMPANY_URL_PREFIX ,
        UPDATE: COMPANY_URL_PREFIX + "/update",
        DELETE: COMPANY_URL_PREFIX + "/delete",
    };


    return {
        COMPANY_URL,
    }
}

export default URL;

