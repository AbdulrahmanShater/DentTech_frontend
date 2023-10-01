import Cookies from 'js-cookie';
import MY_COOKIES_FILEDS from './fileds';
// import UserModel from '../../model/UserModel';

const MyCookies = () => {


    // const setUser = (user: object) => {
    //     // Cookies.set(MY_COOKIES_FILEDS.USER, JSON.stringify(user))
    //     Cookies.set(MY_COOKIES_FILEDS.USER, JSON.stringify(user))

    // }
    // const getUser = (): UserModel | undefined => {
    //     const userString: string | undefined = Cookies.get(MY_COOKIES_FILEDS.USER);
    //     // return Cookies.get(MY_COOKIES_FILEDS.USER);
    //     return (userString != undefined && userString != null) ? JSON.parse(userString) : null;
    // }

    const setToken = (token: string) => {
        Cookies.set(MY_COOKIES_FILEDS.TOKEN, token)
    }

    const getToken = (): string | undefined => {
        return Cookies.get(MY_COOKIES_FILEDS.TOKEN);
    }

    const remove = (item: MY_COOKIES_FILEDS) => {
        Cookies.remove(item);
    }

    const removeAll = (items: MY_COOKIES_FILEDS[]) => {
        for (let index = 0; index < items.length; index++) {
            Cookies.remove(items[index]);
        }
    }

    return {
        // setUser, getUser,
        setToken, getToken,
        remove, removeAll,
    }
}


export default MyCookies;