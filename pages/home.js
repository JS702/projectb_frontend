import styles from "../styles/Home.module.css";
import DefaultLayout from "../layouts/default-layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../common/axios-instance";

export default function Home() {

    const [ gameMode, setGameMode ] = useState( "CASUAL" );

    const [ tableData, setTableData ] = useState( [] );

    useEffect( () => {
        axiosInstance.get( "/game/leaderboard", { params: { gameMode: gameMode } } ).then( ( response ) => {
            setTableData( response.data );
        } );
    }, [ gameMode ] );
    return (
            <>
                <div id="buttonContainer">
                    <hr></hr>
                    <div className={ styles.tableContainer } id="tableContainerLeft">
                        <table className={ styles.scoreTable }>

                            <tbody>
                            <tr>
                                <td colSpan={ "3" }>
                                    <select className={ styles.tableSelect } onChange={ e => setGameMode( e.target.value ) }>
                                        <option>CASUAL</option>
                                        <option>ROUNDTIME</option>
                                        <option>TOTALTIME</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Place</th>
                                <th>Player</th>
                                <th>Distance</th>
                            </tr>
                            { tableData.map( ( user, idx ) => {
                                return (
                                        <tr key={ idx }>
                                            <td>{ idx + 1 }</td>
                                            <td>{ user.username }</td>
                                            <td>{ user.score }</td>
                                        </tr>
                                );
                            } ) }
                            </tbody>
                        </table>
                    </div>

                    <Link href={ "/settings" }>
                        <button id="playButton">
                            <div>
                                <span id="playButtonText">Play</span>
                            </div>
                        </button>
                    </Link>

                    <div className={ styles.tableContainer } id="tableContainerRight">
                        <table className={ styles.scoreTable }>

                            <tbody>
                            <tr>
                                <td id="tableHeadRight" colSpan={ "3" }>Most played games</td>
                            </tr>
                            <tr>
                                <th>Place</th>
                                <th>Player</th>
                                <th>Games</th>
                            </tr>
                            { tableData.map( ( user, idx ) => {
                                return (
                                        <tr key={ idx }>
                                            <td>{ idx + 1 }</td>
                                            <td>{ user.username }</td>
                                            <td>{ user.gamesPlayed }</td>
                                        </tr>
                                );
                            } ) }
                            </tbody>
                        </table>
                    </div>

                </div>
            </>
    );
}
Home.getLayout = function getLayout( page ) {
    return (
            <DefaultLayout>{ page }</DefaultLayout>
    );
};
