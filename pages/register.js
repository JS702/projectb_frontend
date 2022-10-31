import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import axiosInstance from "../common/axios-instance";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/footer";

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (sessionStorage.getItem("User")) {
      location.href = "/home";
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put("/user/create", data);
      router.push("/login");
    } catch {
      //Todo error anzeigen
    }
  };

  function testPasswordEquality() {
    if (password2.value !== "" && password1.value !== "") {
      return password1.value === password2.value;
    } else {
      return false;
    }
  }

  function setLabelColor() {
    if (password2.value !== "") {
      if (testPasswordEquality()) {
        document.querySelector("#password2Label").style.color = "green";
      } else {
        document.querySelector("#password2Label").style.color = "red";
      }
    } else {
      document.querySelector("#password2Label").style.color = "white";
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.register}>
        <div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputContainer}>
                <label>Username</label>
                <input
                  className={styles.input}
                  type={"text"}
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username darf nicht leer sein!",
                    },
                    minLength: {
                      value: 3,
                      message:
                        "Username muss mindestens 3 Buchstaben lang sein!",
                    },
                  })}
                />
                {errors.username && <p>{errors.username.message}</p>}
              </div>

              <hr></hr>

              <div className={styles.inputContainer}>
                <label>Email</label>
                <input
                  className={styles.input}
                  type={"text"}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Die Email darf nicht leer sein!",
                    },
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Die Email Adresse ist nicht valide",
                    },
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <hr></hr>

              <div className={styles.inputContainer}>
                <label>Passwort</label>
                <input
                  id="password1"
                  className={styles.input}
                  onInput={setLabelColor}
                  type={"password"}
                  ref={(input) => (this.password1 = input)}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Passwort darf nicht leer sein!",
                    },
                    minLength: {
                      value: 4,
                      message:
                        "Passwort muss mindestens 4 Buchstaben lang sein!",
                    },
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>

              <hr></hr>

              <div className={styles.inputContainer}>
                <label id="password2Label">Bestätige Passwort</label>
                <input
                  id="password2"
                  className={styles.input}
                  onInput={setLabelColor}
                  type={"password"}
                  ref={(input) => (this.password2 = input)}
                  {...register("password2", {
                    required: {
                      value: true,
                      message: "Passwort darf nicht leer sein!",
                    },
                    minLength: {
                      value: 4,
                      message:
                        "Passwort muss mindestens 4 Buchstaben lang sein!",
                    },
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <span id="passwordOutput"></span>
              </div>

              <hr></hr>

              <button id="buttonRegister" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
