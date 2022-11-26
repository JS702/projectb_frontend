import axios from "axios";
import routes from "../common/routes";

const headers = () => {
    if ( typeof window !== "undefined" ) {
        return sessionStorage.getItem( "User" )
                ? {
                    Authorization:
                            "Bearer " + JSON.parse( sessionStorage.getItem( "User" ) )?.jwtToken
                }
                : null;
    }
};

export default axios.create( {
    baseURL: routes.baseApiPath,
    headers: headers()
} );
