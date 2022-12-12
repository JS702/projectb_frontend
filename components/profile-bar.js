import LogoutButton from "./logout-button";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "../common/axios-instance";
import { useEffect, useState } from "react";
import LoadingIndicator from "./loading-indicator";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";


export default function ProfileBar() {

    const [ user, setUser ] = useState();

    const [ picture, setPicture ] = useState( { path: "/pepe.jpg" } );

    const router = useRouter();

    const {
        handleSubmit,
        register
    } = useForm();


    useEffect( () => {
        const id = JSON.parse( sessionStorage.getItem( "User" ) )?.id;
        axiosInstance.get( `/user/${ id }` ).then( ( response ) => setUser( response.data ) );
    }, [] );

    useEffect( () => {
        if ( user?.profilePictureId ) {
            axiosInstance.get( `/mediafile/${ user.profilePictureId }` )
                    .then( ( response ) => setPicture( response.data ) );
        }
    }, [ user ] );


    const searchUser = ( data ) => {
        axiosInstance.get( "/user", { params: { userName: data.username } } )
                .then( ( response ) => router.push( { pathname: "/profile/[userId]", query: { userId: response.data.id } } ) );
    };

    const logout = () => {
        sessionStorage.removeItem( "User" );
        router.push( "/login" );
    };

    const showBurgerContent = () => {
        var x = document.getElementById("burgerContent");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    if ( !user ) {
        return <LoadingIndicator/>;
    }

    return (
            <div id="profileBar">
                <div id="userContainer">
                    <div id="userImageContainer">
                        <Image
                                id="userImage"
                                alt="user Image"
                                style={ {
                                    borderTopRightRadius: 25,
                                    borderBottomRightRadius: 25,
                                    borderBottomLeftRadius: 25,
                                    borderTopLeftRadius: 25
                                } }
                                src={ picture.path }
                                width={ 50 }
                                height={ 50 }
                        />
                    </div>
                    <Link href="/profile/me">
                        <a id="username">{ user.username }</a>
                    </Link>
                    {/* <LogoutButton/> */}
                    
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                    <div id="burgerContent">
                        <Link href="/home">Home</Link>
                        <br></br>
                        <Link href="/settings">Play</Link>
                        <br></br>
                        <a id="logOutLink" onClick={ logout }>Log out</a>
                        <br></br>
                        <Link href="/admin">Admin</Link> { /** TODO: nur für Admin sichtbar */}
                    </div>
                    
                    <a id="burger"  class="icon" onClick={ showBurgerContent }>
                        <i class="fa fa-bars"></i>
                    </a>

                </div>
                <div>
                    <form onSubmit={ handleSubmit( searchUser ) }>
                        <input id="searchUser" type={ "text" } placeholder="Find user" { ...register( "username", {
                            required: {
                                value: true
                            },
                            minLength: {
                                value: 3
                            }
                        } ) }></input>
                        <button id="searchButton" type={ "submit" }></button>
                    </form>
                </div>
            </div>
    );
}
