import axiosInstance from "../../common/axios-instance";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import LoadingIndicator from "../../components/loading-indicator";
import Image from "next/image";
import DefaultLayout from "../../layouts/default-layout";
import { useRouter } from "next/router";

export default function ProfileView() {
    const [ user, setUser ] = useState();

    const [ userId, setUserId ] = useState();

    const [ profileData, setProfileData ] = useState();

    const [ picture, setPicture ] = useState( { path: "/pepe.jpg" } );

    const router = useRouter();


    useEffect( () => {
        if ( router.isReady ) {
            setUserId( router.query.userId );
        }
    }, [ router.isReady, router.query ] );


    const keys = [ "Casual Score: ", "Roundtime Score: ", "Totaltime Score: ", "Casual Games Played: ", "Roundtime Games Played: ",
        "Totaltime Games Played: " ];

    useEffect( () => {
        if ( userId ) {
            Promise.all( [ axiosInstance.get( `/user/${ userId }` ), axiosInstance.get( `/user/profile/${ userId }` ) ] )
                    .then( ( response ) => {
                        setUser( response[ 0 ].data );
                        setProfileData( response[ 1 ].data );
                    } );
        }
    }, [ userId ] );

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
            <>
                <div id="profilePictureContainer">
                    <Image
                            id="userImage"
                            style={ {
                                borderTopRightRadius: 35,
                                borderBottomRightRadius: 35,
                                borderBottomLeftRadius: 35,
                                borderTopLeftRadius: 35
                            } }
                            alt="profile Picture"
                            src={ picture.path }
                            width={ 200 }
                            height={ 200 }
                    />
                    <div id="profileUsername">
                        { user.username }
                    </div>
                </div>

                <div id="profileBodyContainer">
                    <hr/>

                    <div id="personalDataContainer">

                    <label>Username</label>
                    <p>{ user.username }</p>
                    <hr/>

                    <label>Email</label>
                    <p>{ user.email }</p>

                    <hr/>

                    <label id="descriptionLabel">Description</label>
                    <p>{ user.description }</p>

                    <hr/>

                    </div>

                    <div id="listContainer">
                        <div style={ { fontSize: "150%" , marginBottom: "3%" } }>Game Data</div>
                        { Object.entries( profileData ).map( ( [ key, value ], idx ) => {
                            if ( !value ) {
                                value = "No Data";
                            }
                            return (
                                    <li className={ styles.profileList } key={ idx }>{ keys[ idx ] + value }</li>
                            );
                        } ) }
                    </div>
                </div>
            </>
    );
}

ProfileView.getLayout = function getLayout( page ) {
    return (
            <DefaultLayout>{ page }</DefaultLayout>
    );
};