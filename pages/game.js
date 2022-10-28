import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LogoutButton from "../components/logoutButton";
import Link from "next/link";
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/loading-indicator";
import axiosInstance from "../helper/axios-instance";

export default function Game() {
  const [user, setUser] = useState();
  const [game, setGame] = useState();

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

  useEffect(() => {
    axiosInstance
      .get("/game", { params: { rounds: 5 } })
      .then((response) => setGame(response.data));
  }, []);

  function handleClick(event) {
    calculateCoordinates(event);
    console.log(game);
  }

  function calculateCoordinates(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let rect = document.querySelector("#mapImage").getBoundingClientRect();

    let x = ((mouseX - rect.left) / rect.width) * 8;
    let y = 8 - ((mouseY - rect.top) / rect.height) * 8;

    console.log(x, y);
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
        <div id="headContainer">
          <input id="searchUser" placeholder="Search for user..." />

          <Link href="/profile">
            <a>Profil</a>
          </Link>
          <div id="userContainer">
            <LogoutButton />
            <p id="username">{user.username}</p>
            <div id="userImageContainer">
              <Image
                id="userImage"
                style={{
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                  borderBottomLeftRadius: 25,
                  borderTopLeftRadius: 25,
                }}
                src="/pepe.jpg"
                alt="pepe"
                width={50}
                height={50}
              />
            </div>
          </div>
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
            <p>Round 12/21</p>
            <div>
              <Image
                id="locationImage"
                src={"/test_location.jpg"}
                alt="map"
                width={2560}
                height={1440}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
