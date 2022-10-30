import Head from "next/head";
import styles from "../styles/Home.module.css";
import routes from "../common/routes";
import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem("User");
    router.push("/login");
  };
  return (
    <div id="logOutButtonContainer">
      <button onClick={logout} id="logOutButton">
        Abmelden
      </button>
    </div>
  );
}
