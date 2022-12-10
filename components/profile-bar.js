import LogoutButton from "./logout-button";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "../common/axios-instance";
import { useEffect, useState } from "react";
import LoadingIndicator from "./loading-indicator";


export default function ProfileBar() {

    const [ user, setUser ] = useState();

    const [ picture, setPicture ] = useState( { path: "/pepe.jpg" } );

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
                    <Link href="/profile">
                        <a id="username">{ user.username }</a>
                    </Link>
                    <LogoutButton/>
                </div>
                <div>
                    <input id="searchUser" type={ "text" } placeholder="Find user" ></input>
                </div>
                <button id="searchButton"></button>
            </div>
            
            
    );
}
