import styles from "../styles/Home.module.css";
import { useState } from "react";
import DefaultLayout from "../layouts/default-layout";
import Router from "next/router";

export default function Settings() {


    const [ rounds, setRounds ] = useState( 11 );


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

    return (
            <>
                <div id="buttonContainer">
                    <hr></hr>

                    <button
                            id ="buttonCasual"
                            className={ styles.modeButtons }
                            onClick={ () => sendProps( "CASUAL" ) }>
                    </button>

                    <button
                            id="buttonRoundTime"
                            className={ styles.modeButtons }
                            onClick={ () => sendProps( "ROUNDTIME" ) }>
                    </button>

                    <button
                            id="buttonTotalTime"
                            className={ styles.modeButtons }
                            onClick={ () => sendProps( "TOTALTIME" ) }>
                    </button>

                </div>

                <div id="modeDescriptionContainer">
                    <div id="casualDescription">
                        Just enjoy a causal game of GeoGuessing.
                        <br></br>
                        No time limit, no pressure, no consequences.
                    </div>

                    <div id="roundTimeDescription">
                        You got 10 seconds to guess each location.
                        <br></br>
                        Hurry up, for each round without guessing 10000m will be added to your total distance.
                    </div>

                    <div id="totalTimeDescription">
                        Again 10 seconds per round, but you can distribute them however you like.
                        <br></br>
                        For each round left after your time is up, 10000m will be added to your total distance.
                    </div>
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
