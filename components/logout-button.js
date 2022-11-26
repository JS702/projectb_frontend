import { useRouter } from "next/router";

export default function LogoutButton() {
    const router = useRouter();

    const logout = () => {
        sessionStorage.removeItem( "User" );
        router.push( "/login" );
    };
    return (
            <div id="logOutButtonContainer">
                <button onClick={ logout } id="logOutButton">
                    Abmelden
                </button>
            </div>
    );
}
