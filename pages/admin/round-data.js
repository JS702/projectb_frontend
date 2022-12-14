import styles from "../../styles/Home.module.css";
import { useForm } from "react-hook-form";
import axiosInstance from "../../common/axios-instance";
import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/default-layout";
import LoadingIndicator from "../../components/loading-indicator";

export default function RoundData() {
    const { handleSubmit, register } = useForm();

    const [ isAuthenticated, setIsAuthenticated ] = useState( false );

    useEffect( () => {
        if ( JSON.parse( sessionStorage.getItem( "User" ) ).type === "ADMIN" ) {
            setIsAuthenticated( true );
        }
    }, [] );

    const onSubmit = async ( data ) => {
        try {
            const file = data.file[ 0 ];
            const formData = new FormData();

            formData.append( "file", file );
            const response = await axiosInstance.put( "/admin/round_file", formData );
            data.round.mediaFileId = response.data.id;
            data.round.name = file.name;
            await axiosInstance.put( "/admin/round_data", data.round );

        } catch {
            //Todo error anzeigen
        }
    };
    if ( !isAuthenticated ) {
        return <LoadingIndicator/>;
    }
    return (
            <>
                <form onSubmit={ handleSubmit( onSubmit ) }>
                    <div className={ styles.inputContainer }>
                        <input
                                type={ "file" }
                                id="roundPicture"
                                name="roundPicture"
                                { ...register( "file" ) }
                        />
                    </div>

                    <hr/>
                    <div className={ styles.inputContainer }>
                        <label> Position X</label>
                        <input
                                type="text"
                                className={ styles.input }
                                { ...register( "round.position.x" ) }
                        />
                    </div>
                    <hr/>

                    <div className={ styles.inputContainer }>
                        <label> Position Y</label>
                        <input
                                type="text"
                                className={ styles.input }
                                { ...register( "round.position.y" ) }
                        />
                    </div>

                    <hr/>

                    <div className={ styles.inputContainer }>
                        <label> Typ</label>
                        <select
                                name="type"
                                className={ styles.input }
                                { ...register( "round.type" ) }
                        >
                            <option value="PUBG">PUBG</option>
                            <option value="APEX_LEGENDS">APEX LEGENDS</option>
                        </select>
                    </div>

                    <hr/>

                    <button id="buttonRegister" type="submit">
                        Abschicken
                    </button>
                </form>
            </>
    );
};

RoundData.getLayout = function getLayout( page ) {
    return (
            <DefaultLayout>{ page }</DefaultLayout>
    );
};