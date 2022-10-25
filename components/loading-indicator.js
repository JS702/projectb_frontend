import Head from "next/head";
import styles from "../styles/Home.module.css";
import routes from "../common/routes";
import { useRouter } from "next/router";

export default function LoadingIndicator() {
  //todo besserer indicator
  return <div>Lädt, bitte warten</div>;
}
