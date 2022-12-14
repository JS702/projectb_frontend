import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
            <div className={ styles.container }>
                <Head>
                    <title>Start</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <main className={ styles.main }>

                    <h1 className={ styles.title }>
                        Welcome to GeoGamer
                    </h1>

                    <p className={ styles.description }>
                        Guess locations from your favorite games in multiple modes!
                    </p>

                    <div className={ styles.grid }>
                        <Link href="/login">
                            <a className={ styles.card }>
                                <h2>Log in &rarr;</h2>
                                <p>Log in to play games, edit your profile and and look at the global statistics.</p>
                            </a>
                        </Link>

                        <Link href="/register">
                            <a className={ styles.card }>
                                <h2>Register &rarr;</h2>
                                <p>Register a new account for free to use GeoGamer and have fun.</p>
                            </a>
                        </Link>

                        <Link href="/settings">
                            <a className={ styles.card }>
                                <h2>Play &rarr;</h2>
                                <p>Get right in the game and reach a new highscore to make your friends jealous.</p>
                            </a>
                        </Link>

                        <Link href="/profile/me">
                            <a className={ styles.card }>
                                <h2>Profile &rarr;</h2>
                                <p>Change your profile information or just take a look at your own statistics.</p>
                            </a>
                        </Link>
                    </div>
                </main>

                <footer className={ styles.footer }>
                    <a
                            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                    >
                        Powered by{ " " }
                        <span className={ styles.logo }>
            <Image src="/vercel.svg" alt="Vercel Logo" width={ 72 } height={ 16 }/>
          </span>
                    </a>
                </footer>
            </div>
    );
}
