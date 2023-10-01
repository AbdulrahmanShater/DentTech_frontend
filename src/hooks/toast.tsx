import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default class MyToast {
    text: string;
    constructor(text: string) {
        this.text = text
    }
    success = () => {
        toast.success(this.text, {
            position: toast.POSITION.TOP_RIGHT,

        });
    };
    error = () => {
        toast.error(this.text, {
            position: toast.POSITION.TOP_RIGHT,
        });
    };
    warning = () => {
        toast.warning(this.text, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    info = () => {
        toast.info(this.text, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    toast = () => {
        toast(this.text, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

}
