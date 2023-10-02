import axios, { AxiosError } from "axios"
import MyToast from "./toast"


type THttpError = Error | AxiosError | null

interface HttpErrorHandlerProps {
    onERR_NETWORK?: () => void,
    onNo_INTERNET?: () => void,

    onERR_CANCELED?: () => void,
    onStatusCode: (status: number) => void,
    onSettingError?: () => void,
    onNO_RESPONSE?: () => void,
    onUNRECONVERABLE_ERROR?: () => void,
}
export function httpErrorHandler(error: THttpError, props: HttpErrorHandlerProps) {

    if (error === null) {

        if (props.onUNRECONVERABLE_ERROR) {
            props.onUNRECONVERABLE_ERROR()
        } else {
            new MyToast("Unrecoverable error!!").error()
        }
    } else {

        if (axios.isAxiosError(error)) {

            //here we have a type guard check, error inside this if will be treated as AxiosError
            const response = error?.response
            const request = error?.request
            const config = error?.config //here we have access the config used to make the api call (we can make a retry using this conf)
            if (error.message === 'Network Error') {
                if (props.onNo_INTERNET) {
                    props.onNo_INTERNET()
                } else {
                    new MyToast("NETWORK_ERROR").error();
                }
            } else if (error.code === 'ERR_NETWORK') {
                if (props.onERR_NETWORK) {
                    props.onERR_NETWORK()
                } else {
                    new MyToast("ERR_NETWORK").error();
                }
            } else if (error.code === 'ECONNABORTED') {
                if (props.onERR_NETWORK) {
                    props.onERR_NETWORK()
                } else {
                    new MyToast("ERR_NETWORK").error();
                }
            } else if (error.code === 'ERR_CANCELED') {
                if (props.onERR_CANCELED) {
                    props.onERR_CANCELED()
                } else {
                    new MyToast("ERR_CANCELED").error();
                }
            } else if (response) {
                //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
                const statusCode = response?.status
                props.onStatusCode(statusCode)
            } else if (request) {
                //The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
                if (props.onNO_RESPONSE) {
                    props.onNO_RESPONSE()
                } else {
                    new MyToast("NO_RESPONSE").error();
                }
            } else {
                if (props.onSettingError) {
                    props.onSettingError()
                } else {
                    new MyToast("SettingError").error();
                }
            }
        } else {
            //Something happened in setting up the request and triggered an Error
            if (props.onSettingError) {
                props.onSettingError()
            } else {
                new MyToast("SettingError").error();
            }
        }
    }

}