import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import LoadingIndicator from "../components/loading-indicator";
import axiosInstance from "../common/axios-instance";
import DefaultLayout from "../layouts/default-layout";
import Router from "next/router";

export default function Settings() {
    const [ user, setUser ] = useState();

    const [ isLoading, setIsLoading ] = useState( true );

    const [ rounds, setRounds ] = useState( 11 );

    useEffect( () => {
        const id = JSON.parse( sessionStorage.getItem( "User" ) )?.id;
        axiosInstance.get( `/user/${ id }` ).then( ( response ) => setUser( response.data ) );
    }, [] );

    useEffect( () => {
        if ( user ) {
            setIsLoading( false );
        }
    }, [ user ] );

    function handleChange( event ) {
        let rounds = event.target.value;
        document.getElementById( "outputRounds" ).innerHTML = "Rounds: " + rounds;
        setRounds( rounds );
    }

    function sendProps( mode ) {
        Router.push( {
            pathname: "/game",
            query: {
                mode,
                rounds
            }
        } );
    }

    if ( isLoading ) {
        return <LoadingIndicator/>;
    }

    return (
            <>
                <div id="buttonContainer">
                    <hr></hr>

                    <button
                            className={ styles.homeButtons }
                            onClick={ () => sendProps( "casual" ) }>
                    </button>

                    <button
                            className={ styles.homeButtons }
                            onClick={ () => sendProps( "roundTime" ) }>
                    </button>

                    <button
                            className={ styles.homeButtons }
                            onClick={ () => sendProps( "totalTime" ) }>
                    </button>

                </div>
                <div id="sliderContainer">
                    <input
                            type={ "range" }
                            min={ "1" }
                            max={ "21" }
                            defaultValue={ 11 }
                            id="sliderRounds"
                            onChange={ handleChange }
                    />
                </div>
                <span id="outputRounds">Rounds: 11</span>
            </>
    );
}
Settings.getLayout = function getLayout( page ) {
    return (
            <DefaultLayout>{ page }</DefaultLayout>
    );
};
