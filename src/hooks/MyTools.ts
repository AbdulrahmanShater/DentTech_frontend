import { useState, useEffect } from 'react';

export default function MyTools() {


    const propToString = <T>(obj?: T): T => {
        return new Proxy({}, {
            get({ }, prop) {
                return prop;
            }
        }) as T;
    }

    const getObjectValueByKey = <T>(obj: T, key: keyof T) => {
        return obj[key];
    };

    const encryptEmail = (email: string) => {

        const atIndex = email.indexOf('@');
        const username = email.substring(0, atIndex);

        var maskedUsername: string = "";

        const usernameList: string[] = username.split(".");

        for (let unlIndex = 0; unlIndex <= usernameList.length - 1; unlIndex++) {
            var str = usernameList[unlIndex];

            var encriptedStr: string = encriptString({ str: str, char: "*", displayedNumber: str.length > 2 ? 2 : str.length - 1, displayFirst: true });
            maskedUsername = maskedUsername.concat(encriptedStr.concat(unlIndex == usernameList.length - 1 ? "" : "."));
        }
        const domain = email.substring(atIndex);
        return maskedUsername.concat(domain)
    }

    const encriptString = (prop: { str: string, displayedNumber: number, char: string, displayFirst: boolean }): string => {
        const { str, displayedNumber, char, displayFirst } = prop;
        var origenStr: string = str;
        var encriptedStr: string = "";
        var encriptedStr: string = "";

        const length: number = origenStr.length;

        const displayed: number[] = [];

        if (displayFirst) {
            displayed.push(0);
        }

        for (let index = 0; index < displayedNumber; index++) {
            displayed.push(randomNumber({ min: 0, max: length - 1, notIn: displayed })!)
        }
        for (let index = 0; index <= length - 1; index++) {
            const toEcript: boolean = displayed.filter((f) => f == index).length == 0;
            if (toEcript) {
                origenStr = setCharAt(origenStr, index, char);
            }
            encriptedStr = origenStr;
        }
        return encriptedStr;

    }

    const randomNumber = (prop: { max: number, min: number, notIn: number[] }): number => {
        const { max, min, notIn } = prop;
        const rang = max - min;

        const num: number = Math.floor(Math.random() * rang + min);
        if (notIn.filter((f) => f == num).length == 0) {
            return num;
        } else {
            return randomNumber(prop);
        }
    }

    const setCharAt = (str: string, index: number, chr: string) => {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }

    const isValidEmailRGX = (email: string) => {
        // var Regex = require("regex");
        // const emailRegex = new Regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
        // return emailRegex.test(email);
        return true;
    }
    const objectIsUndefined = <T>(object: T):boolean => {
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                const element = object[key];
                if (element !== undefined) return false;
            }
        }
        return true;
    }


    /**
     * 
     * @param prop dateime 
     * @returns 
     */
    function CountDownTimer(prop: { targetDate: Date }) {
        const { targetDate } = prop;

        useEffect(() => {
            const intervalId = setInterval(() => {
                setRemainingTime(calculateRemainingTime());
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }, []);
        const calculateRemainingTime = () => {
            const currentDate = new Date();
            const difference = targetDate.getTime() - currentDate.getTime();

            if (difference > 0) {
                const seconds = Math.floor((difference / 1000) % 60);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));

                return { days, hours, minutes, seconds };
            }

            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };
        const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

        return {
            remainingTime
        }
    }

    return {
        propToString,
        getObjectValueByKey,
        encryptEmail,
        CountDownTimer,
        isValidEmailRGX,
        objectIsUndefined,
    }
}