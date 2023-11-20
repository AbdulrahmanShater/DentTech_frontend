const URL = async () => {

    const COMPANY_URL_PREFIX = "" + "/company"

    const CUSTOMER_URL_PREFIX = "" + "/user"

    const AUTH_URL_PREFIX = "" + "/auth"

    const ITEM_URL_PREFIX = "" + "/item"

    const PAYMENT_URL_PREFIX = "" + "/payment"


    const BUY_INVOICE_URL_PREFIX = "" + "/buy-invoice"
    const SELL_INVOICE_URL_PREFIX = "" + "/sell-invoice"


    const PAYMENT_URL = {
        GET_ALL: PAYMENT_URL_PREFIX,
        CREATE: PAYMENT_URL_PREFIX,
    };


    const SELL_INVOICE_URL = {
        GET_ALL: SELL_INVOICE_URL_PREFIX,
        GET_UNPAID: SELL_INVOICE_URL_PREFIX + "/company",
        GET_BY_ID: SELL_INVOICE_URL_PREFIX,
        CREATE: SELL_INVOICE_URL_PREFIX,
        UPDATE: SELL_INVOICE_URL_PREFIX,
        DELETE: SELL_INVOICE_URL_PREFIX,
    };


    const BUY_INVOICE_URL = {
        GET_ALL: BUY_INVOICE_URL_PREFIX,
        GET_BY_ID: BUY_INVOICE_URL_PREFIX,
        CREATE: BUY_INVOICE_URL_PREFIX,
        UPDATE: BUY_INVOICE_URL_PREFIX,
        DELETE: BUY_INVOICE_URL_PREFIX,
    };

    const ITEM_URL = {
        GET_ALL: ITEM_URL_PREFIX,
        GET_BY_ID: ITEM_URL_PREFIX,
        CREATE: ITEM_URL_PREFIX,
        UPDATE: ITEM_URL_PREFIX,
        DELETE: ITEM_URL_PREFIX,
    };


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
        GET_BUYERS: CUSTOMER_URL_PREFIX + "/" + "buyers",
        GET_VENDORS: CUSTOMER_URL_PREFIX + "/" + "vendors",
    };

    const AUTH_URL = {
        REGISTER: AUTH_URL_PREFIX + "/register",
    };


    return {
        COMPANY_URL,
        CUSTOMER_URL,
        AUTH_URL,
        ITEM_URL,
        BUY_INVOICE_URL,
        SELL_INVOICE_URL,
        PAYMENT_URL,
    }
}

export default URL;

