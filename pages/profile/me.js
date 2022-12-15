import axiosInstance from "../../common/axios-instance";
import styles from "../../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "../../components/loading-indicator";
import Image from "next/image";
import DefaultLayout from "../../layouts/default-layout";
import { useForm } from "react-hook-form";
import { router } from "next/client";

export default function Me() {
    const [ user, setUser ] = useState();

    const [ profileData, setProfileData ] = useState();

    const [ picture, setPicture ] = useState( { path: "/pepe.jpg" } );

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const keys = [ "Casual Score: ", "Roundtime Score: ", "Totaltime Score: ", "Casual Games Played: ", "Roundtime Games Played: ",
        "Totaltime Games Played: " ];

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

    const onSubmit = async ( data ) => {
        console.log( data );
        try {
            const response = await axiosInstance.post( "/user/update/" + user.id, data );
            setUser( response.data );
        } catch {
        }
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

    const deleteUser = async () => {
        sessionStorage.removeItem( "User" );
        await axiosInstance.delete( "/user/" + user.id );
        await router.push( "/login" );
    };

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
                            onClick={ handleProfilePictureClick }
                    />
                    <div id="profilePictureText">
                        Click to change image
                    </div>
                    <div id="profileUsername">
                        { user.username }
                    </div>
                    <button type={ "button" } onClick={ deleteUser }>Delete User</button>

                </div>
                <input
                        type={ "file" }
                        id="profilePictureInput" //DONE style="display: none"
                        onInput={ uploadPicture }
                        name="profilePictureInput"
                        ref={ inputRef }
                />

                <div id="profileBodyContainer">
                    <hr/>
                    <div id="personalDataContainer">
                        <form onSubmit={ handleSubmit( onSubmit ) }>
                            <div className={ styles.inputContainer }>
                                <label>Username</label>
                                <input
                                        className={ styles.input }
                                        type={ "text" }
                                        defaultValue={ user.username }
                                        { ...register( "username", {
                                            required: {
                                                value: true,
                                                message: "Username darf nicht leer sein!"
                                            },
                                            minLength: {
                                                value: 3,
                                                message:
                                                        "Username muss mindestens 3 Buchstaben lang sein!"
                                            }
                                        } ) }
                                />
                                { errors.username && <p>{ errors.username.message }</p> }
                            </div>

                            <hr></hr>

                            <div className={ styles.inputContainer }>
                                <label>Email</label>
                                <input
                                        className={ styles.input }
                                        type={ "text" }
                                        defaultValue={ user.email }
                                        { ...register( "email", {
                                            required: {
                                                value: true,
                                                message: "Die Email darf nicht leer sein!"
                                            },
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Die Email Adresse ist nicht valide"
                                            }
                                        } ) }
                                />
                                { errors.email && <p>{ errors.email.message }</p> }
                            </div>

                            <hr></hr>

                            <div id="profileDescriptionContainer">
                                <label id="descriptionLabel">Description</label>
                                <textarea
                                        id="description"
                                        className={ styles.input }
                                        rows={ 4 }
                                        defaultValue={ user.description }
                                        { ...register( "description" ) }
                                />
                            </div>

                            <hr></hr>

                            <button id="buttonRegister" type="submit">
                                Save
                            </button>
                        </form>
                    </div>


                    <div id="listContainer">
                        <div style={ { fontSize: "150%", marginBottom: "3%" } }>Game Data</div>
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

Me.getLayout = function getLayout( page ) {
    return (
            <DefaultLayout>{ page }</DefaultLayout>
    );
};