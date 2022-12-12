import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import axiosInstance from "../common/axios-instance";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
    const router = useRouter();

    useEffect( () => {
        if ( sessionStorage.getItem( "User" ) ) {
            router.push( "/home" );
        }
    }, [] );

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = async ( data ) => {
        try {
            const response = await axiosInstance.post( "/login", data );

            sessionStorage.setItem( "User", JSON.stringify( response.data ) );
            location.href = "/home";
        } catch ( error ) {
            //Error-Handling
        }
    };
    return (
            <div className={ styles.container }>
                <Head>
                    <title>Log in</title>
                    <meta name="description" content="Generated by create next app"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <main className={ styles.register }>
                    <div>
                        <div>
                            <form onSubmit={ handleSubmit( onSubmit ) }>
                                <div className={ styles.inputContainer }>
                                    <div className={ styles.logInRegisterHeader }>Log in</div>
                                    <label>Username / Email</label>
                                    <input
                                            className={ styles.input }
                                            type={ "text" }
                                            { ...register( "username", {
                                                required: {
                                                    value: true
                                                },
                                                minLength: {
                                                    value: 3
                                                }
                                            } ) }
                                    />
                                </div>

                                <hr></hr>

                                <div className={ styles.inputContainer }>
                                    <label>Password</label>
                                    <input
                                            className={ styles.input }
                                            type={ "password" }
                                            { ...register( "password", {
                                                required: {
                                                    value: true
                                                },
                                                minLength: {
                                                    value: 4
                                                }
                                            } ) }
                                    />
                                </div>

                                <hr></hr>

                                <button id="buttonRegister" type="submit">
                                    Log in
                                </button>
                            </form>

                            <br/>
                            <div>
                                <a>Don&#39;t have an account? Click </a> <Link href="/register"><a
                                    className={ styles.logInRegisterLink }>here</a></Link> <a>to register</a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
    );
}
