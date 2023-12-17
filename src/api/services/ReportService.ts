import URL from "../config/url";
import http from "../config/http";
import { GetReportInterface } from "../interface/report";


const getAll = async (data: GetReportInterface) => {
    return (await http()).put(`${(await URL()).SELL_INVOICE_URL.GET_ALL}?companyId=${data.companyId}&userId=${data.userId}&beginDate=${data.beginDate}&endDate=${data.endDate}`);
};

const ReportService = {
    getAll
};


export default ReportService;