import Head from "next/head";
import Image from "next/image";
import axiosInstance from "../helper/axios-instance";
import styles from "../styles/Home.module.css";
import LogoutButton from "../components/logoutButton";

export async function getServerSideProps() {
  const response = await axiosInstance.get(localStorage.get("user").id);

  return {
    props: { response }, // will be passed to the page component as props
  };
}


function Profile({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div id="headContainer">
          <div id="profileHeadContainer">
            
            <Image
              id="profileUserImage"
              style={{
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
              }}
              src="/pepe.jpg"
              alt="pepe"
              width={200}
              height={200}
            />
           
            <div id="profileUsernameContainer">
              <p id="profileUsername">Username</p>
            </div>
            <div id="regInfoContainer">
              <p id="regInfo">Registered since: 09.11.2001</p>
            </div>
            
          </div>
          <input id="searchUser" placeholder="Search for user..."></input>

          <div id="userContainer">
            <LogoutButton />
            <p id="username">
              Username
            </p>
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
        <div id="buttonContainer">
          <hr></hr>
          <button className={styles.homeButtons}></button>
          <button className={styles.homeButtons}></button>
          <button className={styles.homeButtons}></button>
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

export default Profile;
