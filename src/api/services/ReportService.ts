import URL from "../config/url";
import http from "../config/http";
import { GetReportInterface } from "../interface/report";


const getAll = async (data: GetReportInterface) => {
    // const task?
    var path: string = "?";
    if (data.companyId !== null) {
        path += `companyId${data.companyId}`
    }

    if (path !== "") {
        path += "&"
    }

    if (data.userId !== null) {
        path += `userId${data.userId}`
    }


    if (path !== "") {
        path += "&"
    }


    if (data.beginDate !== null) {
        path += `beginDate${data.beginDate}`
    }

    if (path !== "") {
        path += "&"
    }

    if (data.endDate !== null) {
        path += `endDate${data.endDate}`
    }

    return (await http()).put(`${(await URL()).SELL_INVOICE_URL.GET_ALL}${path}`);
    // return (await http()).put(`${(await URL()).SELL_INVOICE_URL.GET_ALL}?companyId=${data.companyId}&userId=${data.userId}&beginDate=${data.beginDate}&endDate=${data.endDate}`);
};

const ReportService = {
    getAll
};


export default ReportService;