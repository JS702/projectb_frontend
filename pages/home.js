import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/loading-indicator";
import axiosInstance from "../common/axios-instance";
import DefaultLayout from "../layouts/default-layout";

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

  let rounds = 10;

  function handleChange(event) {
    rounds = event.target.value;
    console.log("change", rounds);
    document.getElementById("outputRounds").innerHTML = "Rounds: " + rounds;
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
          <>
            <div id="buttonContainer">
              <hr></hr>
              <button className={styles.homeButtons}></button>
              <button className={styles.homeButtons}></button>
              <button className={styles.homeButtons}></button>
            </div>
            <div id="sliderContainer">
              <input
                      type={"range"}
                      min={"1"}
                      max={"21"}
                      defaultValue={11}
                      id="sliderRounds"
                      onChange={handleChange}
              />
            </div>
            <span id="outputRounds">Rounds: 10</span>
          </>
  );
}
Home.getLayout = function getLayout( page ) {
  return (
          <DefaultLayout>{ page }</DefaultLayout>
  );
};
