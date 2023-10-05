import { LoginInterface, LoginInterfaceER } from "@/api/interface/auth/login";
import { RegisterJsonR } from "@/api/interface/auth/register";
import AuthService from "@/api/services/AuthService";
import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import MyToast from "@/hooks/toast";
import { setToken } from "@/redux/reducers/auth/authSlice";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'

export default function LoginContainer() {

    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<LoginInterface>({});

    const [errors, setErrors] = useState<LoginInterfaceER>();

    const dispatch = useDispatch();
    const router = useRouter()

    const inputHandeler = (event: any) => {
        var value = event.target.value;
        const name = event.target.name;
        if (value == "" || value == null) {
            value = undefined;
        }
        setErrors(undefined)
        setData((prev) => ({ ...prev, [name]: value }));
    }


    const submitHandler = () => {

        if (data.email == undefined || data.password == undefined) {

            setErrors(
                {
                    email: data.email != undefined ? undefined : "Please Enter Your Email",
                    password: data.password != undefined ? undefined : "Please Enter  Password"
                }
            )

            return;
        }
        AuthService.register({
            ...data,
            firstname: "ahamd",
            lastname: "sh",
            role: 1,
            company: 1
        })
            .then(response => {
                // const res: RegisterJsonR = response.data;
                // setData({})
                dispatch(setToken(response.data.access_token))
                router.replace('/')
            })
            .catch((error) => {
                httpErrorHandler(error, {
                    onStatusCode: function (status: number): void {
                        const res: RegisterJsonR = error.response.data;
                        switch (status) {
                            case 404:
                                new MyToast("Sorry, the requested resource could not be found. Please check your API endpoint or try again late").error()
                                break;
                            case 422:
                            case 400:
                                setErrors(res.errors)
                                break;
                            case 500:
                                break;
                            default:
                                new MyToast(res.message).error()
                                break;
                        }
                    },

                })
            }).finally(() => {
                setLoading(false)
            });
    }

    return {

        submitHandler,
        loading,
        errors,
        data,
        inputHandeler,
    }
}