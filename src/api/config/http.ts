// /**
//  * Initialize Axios.
//  */
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export default async function http(multipart?: boolean): Promise<AxiosInstance> {

    // const response = await fetch(`/env.json?${Date.now()}`);
    // const responseData = await response.json()
    // const BASE_URL: string = responseData.BASE_URL + '';


    const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL + "";
    // alert(BASE_URL);
    // const token: string = "";


    var HEADER = multipart == true ?
        {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "Authorization": "Bearer " + Cookies.get("token"),
            'Access-Control-Allow-Credentials': true
        } : {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + Cookies.get("token"),
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': "*"
        };

    return axios.create({
        baseURL: BASE_URL,
        headers: HEADER
    });

}

export { http }
