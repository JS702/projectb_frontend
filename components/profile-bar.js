import LogoutButton from "./logout-button";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "../common/axios-instance";
import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "./loading-indicator";
import { useRouter } from "next/router";


export default function ProfileBar() {

    const [ user, setUser ] = useState();

    const [ picture, setPicture ] = useState( { path: "/pepe.jpg" } );

    const inputRef = useRef();

    const router = useRouter();


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

    const searchUser = () => {
        const username = inputRef.current.value;
        axiosInstance.get( "/user", { params: { userName: username } } )
                .then( ( response ) => router.push( { pathname: "/profile/[userId]", query: { userId: response.data.id } } ) );
    };

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
                    <LogoutButton/>
                </div>
                <div>
                    <input id="searchUser" type={ "text" } ref={ inputRef } placeholder="Find user"></input>
                </div>
                <button id="searchButton" onClick={ searchUser }></button>
            </div>
    );
}
