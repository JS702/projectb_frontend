import axiosInstance from "../common/axios-instance";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/loading-indicator";
import DefaultLayout from "../layouts/default-layout";

function Profile() {
    const [ user, setUser ] = useState();

    useEffect( () => {
        const id = JSON.parse( sessionStorage.getItem( "User" ) )?.id;
        axiosInstance.get( `/user/${ id }` ).then( ( response ) => setUser( response.data ) );
    }, [] );


    const uploadPicture = async ( data ) => {
        const file = data.target.files[ 0 ];
        const formData = new FormData();

        formData.append( "file", file );
        const id = JSON.parse( sessionStorage.getItem( "User" ) )?.id;
        try {
            const response = await axiosInstance.post( `/mediafile/profilepicture/${ id }`, formData );
            setUser(response.data);
        } catch {

        }
    };

    if ( !user ) {
        return <LoadingIndicator/>;
    }

    return (
            <>
                <input
                        type={ "file" }
                        id="profilePicture"
                        onInput={ uploadPicture }
                        name="profilePicture"
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
