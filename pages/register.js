import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await makePostRequest("/user/create", data);
    console.log(response);
  };

  function testPasswordEquality() {
    console.log("Pw1: " + password1.value);
    console.log("Pw2: " + password2.value);
    if(password1.value !== password2.value) {
      console.log("ungleiches Passwort");
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Username</label>
                <input
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

              <div>
                <label>Email</label>
                <input
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

              <div>
                <label>Passwort</label>
                <input id="password1"
                  type={"password"}
                  ref={input => (this.password1 = input)}
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

              <div>
                <label>Bestätige Passwort</label>
                <input id="password2"
                  onInput={testPasswordEquality}
                  type={"password"}
                  ref={input => (this.password2 = input)}
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
              <button type="submit">Submit</button>
            </form>
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
