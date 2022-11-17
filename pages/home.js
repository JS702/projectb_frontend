import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/loading-indicator";
import axiosInstance from "../common/axios-instance";
import DefaultLayout from "../layouts/default-layout";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem("User"))?.id;
    axiosInstance.get(`/user/${id}`).then((response) => setUser(response.data));
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
          <>
            <div id="buttonContainer">
              <hr></hr>
              <div className={styles.tableContainer}>
              <table className={styles.scoreTable}>
                <caption>Normale Mode</caption>
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
              </table>
              </div>

              <Link href={"/settings"}>
                <button id="playButton">
                  <div>
                    <span id="playButtonText">Play</span>
                  </div>
                </button>
              </Link>

              <div className={styles.tableContainer}>
              <table className={styles.scoreTable}>
                <caption>Normale Mode</caption>
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
