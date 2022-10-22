import Head from "next/head";
import styles from "../styles/Home.module.css";
import routes from "../common/routes";

const logout = () => {
  sessionStorage.removeItem("jwt");
  window.location.href = routes.login;
};

export default function LogoutButton() {
  return (
    <div>
      <button onClick={logout}>Abmelden</button>
    </div>
  );
}
