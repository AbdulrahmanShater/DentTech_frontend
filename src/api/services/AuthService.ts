import URL from "../config/url";
import http from "../config/http";
import { RegisterInterface } from "../interface/auth/register";
import { LoginInterface } from "../interface/auth/login";

const register = async (data: RegisterInterface) => {
    return (await http()).post((await URL()).AUTH_URL.REGISTER, data);
};
const login = async (data: LoginInterface) => {
    return (await http()).post((await URL()).AUTH_URL.LOGIN, data);
};
const AuthService = {
    register, login
};

export default AuthService;