import axiosInstance from "../common/axios-instance";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "../components/loading-indicator";
import Image from "next/image";
import DefaultLayout from "../layouts/default-layout";

function Profile() {
    const [ user, setUser ] = useState();

    const [ profileData, setProfileData ] = useState();

    const [ picture, setPicture ] = useState( { path: "/pepe.jpg" } );

    const inputRef = useRef();

    useEffect( () => {
        const id = JSON.parse( sessionStorage.getItem( "User" ) )?.id;
        Promise.all( [ axiosInstance.get( `/user/${ id }` ), axiosInstance.get( `/user/profile/${ id }` ) ] )
                .then( ( response ) => {
                    setUser( response[ 0 ].data );
                    setProfileData( response[ 1 ].data );
                } );
    }, [] );

    useEffect( () => {
        if ( user?.profilePictureId ) {
            axiosInstance.get( `/mediafile/${ user.profilePictureId }` )
                    .then( ( response ) => setPicture( response.data ) );
        }
    }, [ user ] );

    const handleProfilePictureClick = () => {
        inputRef.current.click();
    };


    const uploadPicture = async ( data ) => {
        const file = data.target.files[ 0 ];
        const formData = new FormData();

        formData.append( "file", file );
        try {
            const response = await axiosInstance.post( `/mediafile/profilepicture/${ user.id }`, formData );
            setUser( response.data );
        } catch {

        }
    };

    if ( !user ) {
        return <LoadingIndicator/>;
    }

    return (
            <>
                <div id="userImageContainer">
                    <Image
                            id="userImage"
                            style={ {
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25,
                                borderBottomLeftRadius: 25,
                                borderTopLeftRadius: 25
                            } }
                            src={ picture.path }
                            width={ 100 }
                            height={ 100 }
                            onClick={ handleProfilePictureClick }
                    />
                </div>
                <input
                        type={ "file" }
                        id="profilePicture" //TODO style="display: none"
                        onInput={ uploadPicture }
                        name="profilePicture"
                        ref={ inputRef }
                />

                <div id="profileBodyContainer">
                    <hr/>
                    <div id="descriptionContainer">{ user.description }</div>
                    <div id="listContainer">
                        { Object.keys( profileData ).map( ( key, idx ) => {
                            return (
                                    <li className={ styles.profileList } key={ idx }>{ key }</li>
                            );
                        } ) }
                        <br/>
                    </div>
                    <div id="listValueContainer">
                        { Object.values( profileData ).map( ( value, idx ) => {
                            return (
                                    <li className={ styles.profileList } key={ idx }>{ value }</li>
                            );
                        } ) }
                    </div>
                </div>
            </>
    );
}

Profile.getLayout = function getLayout( page ) {
    return (
            <DefaultLayout>{ page }</DefaultLayout>
    );
};

export default Profile;
