import LogoutButton from "../components/logoutButton";
import Link from "next/link";
import Image from "next/image";

export default function ProfileBar({ user }) {
  return (
    <div id="userContainer">
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
      <Link href="/profile">
        <a id="username">{user.username}</a>
      </Link>
      <LogoutButton />
    </div>
  );
}
