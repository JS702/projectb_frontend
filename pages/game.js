import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/loading-indicator";
import axiosInstance from "../common/axios-instance";
import DefaultLayout from "../layouts/default-layout";
import bg from '../public/map.png';

export default function Game() {
  const [user, setUser] = useState();
  const [game, setGame] = useState();
  const [imagePath, setImagePath] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [round, setRound] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const [locationPosition, setLocationPosition] = useState([0, 0]);
  const [endScreenSize, setEndScreenSize] = useState(0);
  const [endScreenLeft, setEndScreenLeft] = useState(-900);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem("User"))?.id;
    axiosInstance.get(`/user/${id}`).then((response) => setUser(response.data));
  }, []);

  useEffect(() => {
    axiosInstance.get("/game", { params: { rounds: 2 } }).then((response) => {
      setGame(response.data);
      setImagePath(response.data[0].mediaFile.path);
    });
  }, []);

  useEffect(() => {
    if (round > 0 && round < game.length) {
      setImagePath(game[round].mediaFile.path);
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
    console.log(game);
    if(!gameOver) {
      if (round < game.length) {
        setRound(round + 1);
        let userPosition = calculateUserCoordinates(event);
        let distance = calculateDistance(
          userPosition[0],
          userPosition[1],
          game[round].roundData.position.x,
          game[round].roundData.position.y
        );

        setTotalDistance(totalDistance + distance);
        console.log("distance: " + distance);
        document.querySelector("#distanceOutput").innerHTML =
          "Distance: " + distance + "m";

        setMousePosition([event.clientX, event.clientY]);
        let locationPosition = calculateLocationCoordinates();
        setLocationPosition(locationPosition);
      }
      if(round + 1 === game.length){
        setGameOver(true);
        setEndScreenSize(document.querySelector("#mapImage").getBoundingClientRect().right -
          document.querySelector("#mapImage").getBoundingClientRect().left);
        setEndScreenLeft(document.querySelector("#mapImage").getBoundingClientRect().left);
      }
    }
  }

  function calculateDistance(x1, y1, x2, y2) {
    return Math.round(
      Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) * 1000
    );
  }

  function calculateUserCoordinates(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let rect = document.querySelector("#mapImage").getBoundingClientRect();

    let x = ((mouseX - rect.left) / rect.width) * 8;
    let y = 8 - ((mouseY - rect.top) / rect.height) * 8;

    return [x, y];
  }

  function calculateLocationCoordinates() {
    let rect = document.querySelector("#mapImage").getBoundingClientRect();

    let x = rect.left + rect.width / 8 * game[round].roundData.position.x;
    let y = rect.bottom - rect.width / 8 * game[round].roundData.position.y;

    return [x, y];
  }

  useEffect(() => {
    function handleResize() {
      if (gameOver) {
        setEndScreenSize(document.querySelector("#mapImage").getBoundingClientRect().right -
          document.querySelector("#mapImage").getBoundingClientRect().left);
        setEndScreenLeft(document.querySelector("#mapImage").getBoundingClientRect().left);
      }
    }
    window.addEventListener('resize', handleResize)
  })

  function handleMove(event) {
    let preview = document.querySelector("#preview");

    preview.style.backgroundImage = `url(${bg.src})`;

    preview.style.backgroundSize = "1000%";

    let rect = document.querySelector("#mapImage").getBoundingClientRect();

    let x = ((event.clientX - rect.left) / rect.width) * 100;
    let y = ((event.clientY - rect.top) / rect.height) * 100;

    preview.style.backgroundPositionX = x  + "%";
    preview.style.backgroundPositionY = y + "%";
    
  }

  function handleMouseOut(event) {
    let preview = document.querySelector("#preview");

    preview.style.background = null;
  }



  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
          <>
                <div id="yellowMarkerContainer"
                     className={styles.markerContainer}
                     style={{
                       left: mousePosition[0] - 9,
                       top: mousePosition[1] - 43 + window.scrollY}}>
                  <Image
                          src={"/MarkerYellow.png"}
                          alt="markerYellow"
                          width={19}
                          height={85}
                  />
                </div>

                <div id="orangeMarkerContainer"
                     className={styles.markerContainer}
                     style={{
                       left: locationPosition[0] - 9,
                       top: locationPosition[1] - 43 + window.scrollY}}>
                  <Image
                          src={"/MarkerOrange.png"}
                          alt="markerOrange"
                          width={19}
                          height={85}
                  />
                </div>

                <div id="gameContainer">
                  <hr></hr>

                  <div id="gameOverScreen"
                       style={{
                         width: endScreenSize,
                         left: endScreenLeft,
                       }}>
                    <p id="gameOverMessage">Winner<br></br>Winner<br></br>Chicken<br></br>Dinner!</p>
                    <p id="averageDistanceOutput">
                      Average Distance: {Math.round(totalDistance / game.length)}m
                    </p>
                  </div>

                  <div id="mapContainer">
                    <Image
                            id="mapImage"
                            src={"/map.png"}
                            alt="map"
                            width={1384}
                            height={1384}
                            onClick={handleClick}
                            onMouseMove={handleMove}
                            onMouseOut={handleMouseOut}
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
