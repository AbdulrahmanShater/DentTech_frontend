"use client"
import { LoginInterface } from "@/api/interface/auth/login";
import Authlayout from "@/components/layout/Authlayout";
import LoginContainer from "@/container/auth/LoginContainer";
import MyTools from "@/hooks/MyTools";
import { SlChemistry } from "react-icons/sl";

export default function LoginPahe() {


    const container = LoginContainer()
    const myTools = MyTools()
    return (<>
        <Authlayout>
            <div className=" xs:p-1 h-screen xs:w-screen md:w-3/4 md:m-auto flex justify-center">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                {/* <!-- Left column container--> */}
                                <div className="xs:px-1 md:px-0 lg:w-6/12 ">
                                    <div className="md:mx-6 md:p-12">
                                        {/* <!--Logo--> */}
                                        <div className="text-center text-danger">
                                            <div className={`text-7xl  m-auto w-fit self-center`}>
                                                <SlChemistry />
                                            </div>
                                            {/* <img
                                                className="mx-auto w-48"
                                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                alt="logo" /> */}
                                            <h4 className="mb-12 mt-1 pb-1 text-3xl font-semibold">
                                                {"Denttech"}
                                            </h4>
                                        </div>

                                        <form>
                                            <p className="mb-4">Please login to your account</p>
                                            {/* <!--Username input--> */}
                                            <div className={`relative mb-4 ${(container.errors!=undefined&&container.errors.email!==undefined)?'border border-danger text-danger':''}`} data-te-input-wrapper-init>
                                                <input
                                                    type="text"
                                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Email"
                                                    name={myTools.propToString<LoginInterface>().email}
                                                    value={container.data.email}
                                                    onChange={container.inputHandeler}
                                                />
                                                <label
                                                    htmlFor="exampleFormControlInput1"
                                                    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out  peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 ${(container.data.email!==undefined&&container.data.email.length>0)?'dark:text-primary -translate-y-[0.9rem] scale-[0.8] text-primary':'dark:peer-focus:text-primary peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary'}`}
                                                >Email
                                                </label>
                                            </div>

                                            {/* <!--Password input--> */}
                                            <div className={`relative mb-4 ${(container.errors!=undefined&&container.errors.password!==undefined)?'border border-danger text-danger':''}`} data-te-input-wrapper-init>
                                                <input
                                                    type="password"
                                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="exampleFormControlInput11"
                                                    placeholder="Password"
                                                    name={myTools.propToString<LoginInterface>().password}
                                                    value={container.data.password}
                                                    onChange={container.inputHandeler}
                                                />
                                                <label
                                                    htmlFor="exampleFormControlInput11"
                                                    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out  peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 ${(container.data.password!==undefined&&container.data.password.length>0)?'dark:text-primary -translate-y-[0.9rem] scale-[0.8] text-primary':'dark:peer-focus:text-primary peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary'}`}
                                                >Password
                                                </label>
                                            </div>

                                            {/* <!--Submit button--> */}
                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <button
                                                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                    type="button"
                                                    onClick={container.submitHandler}
                                                    data-te-ripple-init
                                                    data-te-ripple-color="light"
                                                    style={{
                                                        background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
                                                    }} >
                                                    Log in
                                                </button>

                                                {/* <!--Forgot password link--> */}
                                                <a href="#!">Forgot password?</a>
                                            </div>

                                            {/* <!--Register button--> */}
                                            {/* <div className="flex items-center justify-between pb-6">
                                                <p className="mb-0 mr-2">Don't have an account?</p>
                                                <button
                                                    type="button"
                                                    className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                    data-te-ripple-init
                                                    data-te-ripple-color="light">
                                                    Register
                                                </button>
                                            </div> */}
                                        </form>
                                    </div>
                                </div>

                                {/* <!-- Right column container with background and description--> */}
                                <div
                                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                    // style="background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
                                    style={{
                                        background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
                                    }}
                                >
                                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                        <h4 className="mb-6 text-xl font-semibold">
                                            We are more than just a company
                                        </h4>
                                        <p className="text-sm">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex
                                            ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authlayout>
    </>)
}