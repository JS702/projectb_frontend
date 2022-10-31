import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/loading-indicator";
import axiosInstance from "../common/axios-instance";
import ProfileBar from "../components/profile-bar";
import Footer from "../components/footer";

export default function Game() {
  const [user, setUser] = useState();
  const [game, setGame] = useState();
  const [imagePath, setImagePath] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [round, setRound] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [mousePosition, setMousePosition] = useState([0, 0]);

  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem("User"))?.id;
    axiosInstance.get(`/user/${id}`).then((response) => setUser(response.data));
  }, []);

  useEffect(() => {
    axiosInstance.get("/game", { params: { rounds: 5 } }).then((response) => {
      setGame(response.data);
      setImagePath("/images/" + response.data[0].pictureName + ".png");
    });
  }, []);

  useEffect(() => {
    if (round > 0 && round < game.length) {
      setImagePath("/images/" + game[round].pictureName + ".png");
      document.querySelector("#roundOutput").innerHTML =
        "Round " + (round + 1) + " / " + game.length;
    }
  }, [round, game]);

  useEffect(() => {
    if (user && game) {
      setIsLoading(false);
    }
  }, [user, game]);

  function handleClick(event) {
    if (round < game.length) {
      setRound(round + 1);
      let userPosition = calculateCoordinates(event);
      let distance = calculateDistance(
        userPosition[0],
        userPosition[1],
        game[round].position.x,
        game[round].position.y
      );
      setTotalDistance(totalDistance + distance);
      document.querySelector("#distanceOutput").innerHTML =
        "Distance: " + distance + "m";
      setMousePosition([event.clientX, event.clientY]);
    }
  }

  function calculateDistance(x1, y1, x2, y2) {
    return Math.round(
      Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) * 1000
    );
  }

  function calculateCoordinates(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let rect = document.querySelector("#mapImage").getBoundingClientRect();

    let x = ((mouseX - rect.left) / rect.width) * 8;
    let y = 8 - ((mouseY - rect.top) / rect.height) * 8;

    return [x, y];
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ProfileBar user={user} />

        <div id="yellowMarkerContainer"
          className={styles.markerContainer}
          style={{
            left: mousePosition[0] - 9,
            top: mousePosition[1] - 43 + window.scrollY}}>
          <Image
            id="mapImage"
            src={"/MarkerYellow.png"}
            alt="map"
            width={19}
            height={85}
          />
        </div>

        <div id="gameContainer">
          <hr></hr>
          <div id="mapContainer">
            <Image
              id="mapImage"
              src={"/map.png"}
              alt="map"
              width={1384}
              height={1384}
              onClick={handleClick}
            />
          </div>
          <div id="infoContainer">
            <p id="roundOutput">Round 1 / {game.length}</p>
            <p id="distanceOutput">Distance: 0m</p>
            <p id="totalDistanceOutput">Total Distance: {totalDistance}m</p>
            <div>
              <Image
                id="locationImage"
                src={imagePath}
                alt="location"
                width={2560}
                height={1440}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}
