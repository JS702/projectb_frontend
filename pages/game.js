import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import LoadingIndicator from "../components/loading-indicator";
import axiosInstance from "../common/axios-instance";
import DefaultLayout from "../layouts/default-layout";
import bg from "../public/map.png";
import { useRouter } from "next/router";

export default function Game() {
    const [ game, setGame ] = useState();
    const [ imagePath, setImagePath ] = useState();
    const [ round, setRound ] = useState( 0 );
    const [ totalDistance, setTotalDistance ] = useState( 0 );
    const [ mousePosition, setMousePosition ] = useState( [ 0, 0 ] );
    const [ locationPosition, setLocationPosition ] = useState( [ 0, 0 ] );
    const [ endScreenSize, setEndScreenSize ] = useState( 0 );
    const [ endScreenLeft, setEndScreenLeft ] = useState( -900 );
    const [ gameOver, setGameOver ] = useState( false );
    const [ time, setTime ] = useState( 10 );
    const [ totalTime, setTotalTime ] = useState();

    const router = useRouter();

    const { query: { mode, rounds } } = router;

    let timeout = null;

    const props = { mode, rounds };

    useEffect( () => {
        axiosInstance.get( "/game", { params: { rounds: props.rounds } } ).then( ( response ) =>
                setGame( response.data ) );
    }, [] );

    useEffect( () => {
        if ( game ) {
            setImagePath( game.mediaFiles[ 0 ].path );
            if ( props.mode === "totalTime" ) {
                setTotalTime( time * props.rounds );
            }
        }
    }, [ game ] );

    useEffect( () => {
        if ( round > 0 && round < game.rounds.length ) {
            setImagePath( game.mediaFiles[ round ].path );
            document.querySelector( "#roundOutput" ).innerHTML = "Round " + ( round + 1 ) + " / " + game.rounds.length;
        }
    }, [ round, game ] );


    useEffect( () => {

        if ( props.mode === "roundTime" ) {
            if ( !gameOver ) {
                timeout = setTimeout( () => {
                    if ( time > 0 ) {
                        setTime( time - 1 );
                    } else if ( round < game.rounds.length - 1 ) {
                        setRound( round + 1 );
                        setTime( 10 );
                    }
                    if ( time === 0 ) {
                        setTotalDistance( totalDistance + 10000 );
                    }
                }, 1000 );
            }
        } else if ( props.mode === "totalTime" ) {
            if ( !gameOver ) {
                timeout = setTimeout( () => {
                    if ( totalTime > 0 ) {
                        setTotalTime( totalTime - 1 );
                    } else if ( totalTime === 0 ) {
                        setTotalDistance( totalDistance + ( ( game.rounds.length - round ) * 10000 ) );
                        setGameOver( true );
                        setEndScreenSize( document.querySelector( "#mapImage" ).getBoundingClientRect().right -
                                document.querySelector( "#mapImage" ).getBoundingClientRect().left );
                        setEndScreenLeft( document.querySelector( "#mapImage" ).getBoundingClientRect().left );
                    }
                }, 1000 );
            }
        }
    }, [ time, round, game, props ] );


    function handleClick( event ) {
        console.log( game );
        if ( !gameOver ) {

            if ( props.mode === "roundTime" ) {
                clearTimeout( timeout );
                setTime( 10 );
            }

            if ( round < game.rounds.length ) {
                setRound( round + 1 );
                let userPosition = calculateUserCoordinates( event );
                let distance = calculateDistance(
                        userPosition[ 0 ],
                        userPosition[ 1 ],
                        game.rounds[ round ].position.x,
                        game.rounds[ round ].position.y
                );

                setTotalDistance( totalDistance + distance );
                console.log( "distance: " + distance );
                document.querySelector( "#distanceOutput" ).innerHTML =
                        "Distance: " + distance + "m";

                setMousePosition( [ event.clientX, event.clientY ] );
                let locationPosition = calculateLocationCoordinates();
                setLocationPosition( locationPosition );
            }
            if ( round + 1 === game.rounds.length ) {
                setGameOver( true );
                axiosInstance.post( `/game` ).then();//TODO Game an backend schicken und dann kp

                setEndScreenSize( document.querySelector( "#mapImage" ).getBoundingClientRect().right -
                        document.querySelector( "#mapImage" ).getBoundingClientRect().left );
                setEndScreenLeft( document.querySelector( "#mapImage" ).getBoundingClientRect().left );
            }
        }
    }

    function calculateDistance( x1, y1, x2, y2 ) {
        return Math.round(
                Math.sqrt( Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1, 2 ) ) * 1000
        );
    }

    function calculateUserCoordinates( event ) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = document.querySelector( "#mapImage" ).getBoundingClientRect();

        let x = ( ( mouseX - rect.left ) / rect.width ) * 8;
        let y = 8 - ( ( mouseY - rect.top ) / rect.height ) * 8;

        return [ x, y ];
    }

    function calculateLocationCoordinates() {
        let rect = document.querySelector( "#mapImage" ).getBoundingClientRect();

        let x = rect.left + rect.width / 8 * game.rounds[ round ].position.x;
        let y = rect.bottom - rect.width / 8 * game.rounds[ round ].position.y;

        return [ x, y ];
    }

    function handleResize() {
        if ( gameOver ) {
            setEndScreenSize( document.querySelector( "#mapImage" ).getBoundingClientRect().right -
                    document.querySelector( "#mapImage" ).getBoundingClientRect().left );
            setEndScreenLeft( document.querySelector( "#mapImage" ).getBoundingClientRect().left );
        }
    }

    window.addEventListener( "resize", handleResize );

    function handleMove( event ) {
        let preview = document.querySelector( "#preview" );

        preview.style.backgroundImage = `url(${ bg.src })`;

        preview.style.backgroundSize = "1000%";

        let rect = document.querySelector( "#mapImage" ).getBoundingClientRect();

        let x = ( ( event.clientX - rect.left ) / rect.width ) * 100;
        let y = ( ( event.clientY - rect.top ) / rect.height ) * 100;

        preview.style.backgroundPositionX = x + "%";
        preview.style.backgroundPositionY = y + "%";

    }

    function calculateScore() {
        //Todo calculate score
        return 1000;
    }


    function handleMouseOut( event ) {
        let preview = document.querySelector( "#preview" );

        preview.style.background = null;
    }


    if ( !( game && imagePath ) ) {
        return <LoadingIndicator/>;
    }

    return (
            <>
                <div id="yellowMarkerContainer"
                     className={ styles.markerContainer }
                     style={ {
                         left: mousePosition[ 0 ] - 9,
                         top: mousePosition[ 1 ] - 43 + window.scrollY
                     } }>
                    <Image
                            src={ "/MarkerYellow.png" }
                            alt="markerYellow"
                            width={ 19 }
                            height={ 85 }
                    />
                </div>

                <div id="orangeMarkerContainer"
                     className={ styles.markerContainer }
                     style={ {
                         left: locationPosition[ 0 ] - 9,
                         top: locationPosition[ 1 ] - 43 + window.scrollY
                     } }>
                    <Image
                            src={ "/MarkerOrange.png" }
                            alt="markerOrange"
                            width={ 19 }
                            height={ 85 }
                    />
                </div>

                <div id="gameContainer">
                    <hr></hr>

                    <div id="gameOverScreen"
                         style={ {
                             width: endScreenSize,
                             left: endScreenLeft
                         } }>
                        <p id="gameOverMessage">Winner<br></br>Winner<br></br>Chicken<br></br>Dinner!</p>
                        <p id="averageDistanceOutput">
                            Average Distance: { Math.round( totalDistance / game.rounds.length ) }m
                        </p>
                    </div>

                    <div id="mapContainer">
                        <Image
                                id="mapImage"
                                src={ "/map.png" }
                                alt="map"
                                width={ 1384 }
                                height={ 1384 }
                                onClick={ handleClick }
                                onMouseMove={ handleMove }
                                onMouseOut={ handleMouseOut }
                        />
                    </div>
                    <div id="infoContainer">
                        <p id="roundOutput">Round 1 / { game.rounds.length }</p>
                        <p id="distanceOutput">Distance: 0m</p>
                        <p id="totalDistanceOutput">Total Distance: { totalDistance }m</p>
                        <p id="timeOutput">Remaining time { ( () => {
                            if ( props.mode === "roundTime" ) {
                                return "(round): " + time;
                            } else if ( props.mode === "totalTime" ) {
                                return "(total): " + totalTime;
                            } else {
                                return "infinite";
                            }
                        } )() } seconds</p>
                        <div>
                            <Image
                                    id="locationImage"
                                    src={ imagePath }
                                    alt="location"
                                    width={ 2560 }
                                    height={ 1440 }
                            />
                        </div>
                        <div id="preview">

                        </div>
                    </div>
                </div>
            </>
    );
}

Game.getLayout = function getLayout( page ) {
    return (
            <DefaultLayout>{ page }</DefaultLayout>
    );
};
