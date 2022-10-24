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
    <div>
      <button onClick={logout}>Abmelden</button>
    </div>
  );
}
