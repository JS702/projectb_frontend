import styles from "../styles/Home.module.css";
import DefaultLayout from "../layouts/default-layout";
import Link from "next/link";

export default function Home() {
    return (
            <>
                <div id="buttonContainer">
                    <hr></hr>
                    <div className={ styles.tableContainer } id="tableContainerLeft">
                        <table className={ styles.scoreTable }>

                            <tbody>
                            <tr>
                                <td colSpan={ "3" }>
                                    <select className={ styles.tableSelect }>
                                        <option>Best Player First Mode</option>
                                        <option>Best Player Second Mode</option>
                                        <option>Best Player Third Mode</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Place</th>
                                <th>Player</th>
                                <th>Score</th>
                            </tr>
                            <tr>
                                <td>1st</td>
                                <td>Hugh G. Rection</td>
                                <td>20010911</td>
                            </tr>
                            <tr>
                                <td>2nd</td>
                                <td>Ryan Stekken</td>
                                <td>4206988</td>
                            </tr>
                            <tr>
                                <td>3rd</td>
                                <td>Ben Dover</td>
                                <td>573701</td>
                            </tr>
                            <tr>
                                <td>4th</td>
                                <td>Hugh Jass</td>
                                <td>125561</td>
                            </tr>
                            <tr>
                                <td>5th</td>
                                <td>Suq Maddiq</td>
                                <td>90054</td>
                            </tr>
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
                            <tr>
                                <td>1st</td>
                                <td>Hugh G. Rection</td>
                                <td>200</td>
                            </tr>
                            <tr>
                                <td>2nd</td>
                                <td>Ryan Stekken</td>
                                <td>42</td>
                            </tr>
                            <tr>
                                <td>3rd</td>
                                <td>Ben Dover</td>
                                <td>41</td>
                            </tr>
                            <tr>
                                <td>4th</td>
                                <td>Hugh Jass</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>5th</td>
                                <td>Suq Maddiq</td>
                                <td>7</td>
                            </tr>
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
