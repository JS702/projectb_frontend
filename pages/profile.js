import axiosInstance from "../common/axios-instance";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "../components/loading-indicator";
import DefaultLayout from "../layouts/default-layout";
import Image from "next/image";

function Profile() {
    const [ user, setUser ] = useState();

    const [ picture, setPicture ] = useState( { path: "/pepe.jpg" } );

    const inputRef = useRef();

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
                        <li className={ styles.profileList }>Best score (Modus 1):</li>
                        <li className={ styles.profileList }>Best score (Modus 2):</li>
                        <li className={ styles.profileList }>Best score (Modus 3):</li>
                        <br></br>
                        <li className={ styles.profileList }>Games played (Modus 1):</li>
                        <li className={ styles.profileList }>Games played (Modus 2):</li>
                        <li className={ styles.profileList }>Games played (Modus 3):</li>
                        <li className={ styles.profileList }>Games played (total):</li>
                    </div>
                    <div id="listValueContainer">
                        <p className={ styles.listValues }>1234</p>
                        <p className={ styles.listValues }>1234</p>
                        <p className={ styles.listValues }>1234</p>
                        <br></br>
                        <p className={ styles.listValues }>1234</p>
                        <p className={ styles.listValues }>1234</p>
                        <p className={ styles.listValues }>1234</p>
                        <p className={ styles.listValues }>1234</p>
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
