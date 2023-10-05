import URL from "../config/url";
import http from "../config/http";
import { RegisterInterface } from "../interface/auth/register";

const register = async (data: RegisterInterface) => {
    return (await http()).post((await URL()).AUTH_URL.REGISTER, data);
};

const AuthService = {
    register
};

export default AuthService;