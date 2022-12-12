import Head from "next/head";
import ProfileBar from "../components/profile-bar";
import Footer from "../components/footer";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingIndicator from "../components/loading-indicator";

export default function DefaultLayout( { children } ) {

    const router = useRouter();

    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect( () => {
        if ( !sessionStorage.getItem( "User" ) ) {
            router.push( "/login" );
        } else {
            setIsLoggedIn( true );
        }

    }, [] );

    if ( !isLoggedIn ) {
        return (
                <LoadingIndicator></LoadingIndicator>
        );
    }

    return (
            <>
                <Head>
                    <title>GeoGamer</title>
                    <meta name="description" content="Generated by create next app"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <main className={ styles.main }>
                    <ProfileBar/>
                    { children }
                </main>

                <Footer/>
            </>
    );
}