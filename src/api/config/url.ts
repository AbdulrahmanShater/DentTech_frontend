const URL = async () => {

    const COMPANY_URL_PREFIX = "" + "/company"

    const CUSTOMER_URL_PREFIX = "" + "/user"

    const AUTH_URL_PREFIX = "" + "/auth"


    const COMPANY_URL = {
        GET_ALL: COMPANY_URL_PREFIX,
        CREATE: COMPANY_URL_PREFIX,
        UPDATE: COMPANY_URL_PREFIX,
        DELETE: COMPANY_URL_PREFIX,
    };

    const CUSTOMER_URL = {
        GET_ALL: CUSTOMER_URL_PREFIX,
        CREATE: CUSTOMER_URL_PREFIX,
        UPDATE: CUSTOMER_URL_PREFIX,
        DELETE: CUSTOMER_URL_PREFIX,
    };

    const AUTH_URL = {
        REGISTER: AUTH_URL_PREFIX + "/register",
    };


    return {
        COMPANY_URL,
        CUSTOMER_URL,
        AUTH_URL,
    }
}

export default URL;

