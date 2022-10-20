import axios from "axios";

const headers = {};

export const makePostRequest = async ( url, dataobj ) => {
    const { data } = await axios.post( process.env.NEXT_PUBLIC_API_URL + url, {
                ...dataobj
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem( "jwt" )
                }
            } );
    return data;
};

export const makePutRequest = async ( url, dataobj ) => {
    const { data } = await axios.put( process.env.NEXT_PUBLIC_API_URL + url, {
        ...dataobj
    },{
      headers: {
        Authorization: "Bearer " + localStorage.getItem( "jwt" )
      }
    } );
    return data;
};

export const makeDeleteRequest = async ( url, dataobj ) => {
    const { data } = await axios.delete( process.env.NEXT_PUBLIC_API_URL + url, {
        ...dataobj
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem( "jwt" )
      }
    } );
    return data;
};

export const makeGetRequest = async ( url ) => {
    const { data } = await axios.get( process.env.NEXT_PUBLIC_API_URL + url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem( "jwt" )
      }
    } );
    return data;
};
