
import axios from 'axios';

const dateToString = ( date = new Date() ) => {
    let year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();

    month = month < 10 ? "0" + month : month;
    day   = day   < 10 ? "0" + day : day;

    return year + "-" + month + "-" + day;
};

const hourToString = ( date = new Date() ) => {
    let hour     = date.getHours();
    let minutes  = date.getMinutes();
    let segundos = date.getSeconds();
    hour     = hour < 10 ? "0" + hour : hour;
    minutes  = minutes < 10 ? "0" + minutes : minutes;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    return hour + ":" + minutes + ":" + segundos;
};

export const httpRequest = ( method, uri, data = {} ) => {
    // const token = readData(keysStorage.token);
    // const user = JSON.parse(readData(keysStorage.user));
    // const connection = readData(keysStorage.connection);

    let data_aditional = {
        // x_idusuario: user == undefined ? 0 : user.idusuario,
        // x_grupousuario: user == undefined ? 0 : user.idgrupousuario,
        // x_login: user == undefined ? null : user.login,
        // x_conexion: connection,

        x_fecha: dateToString(),
        x_hora:  hourToString(),
    };

    const body = Object.assign( data, data_aditional );
    let config = {
        method: method,
        url: uri,
        responseType: "json",
        headers: {
            // 'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'multipart/form-data',
            // 'enctype' : 'multipart/form-data',
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // }
    };

    let met = method.toLowerCase();
    if ( met == "get" || met == "delete" ) {
        config.params = body;
    } else {
        config.data = body;
    }

    return axios( config ) .then( ( response ) => {
        if ( response.status == 200 ) {
            return response.data;
        }
        if (response.status == 401 || response.status == 405) {
            // significa que la session se termino o no inicio sesion
            return { response: -2 };
        }
        return response.data;
    }) .catch( (error) => {
        if (error.response.status === 401 || error.response.status == 405) {
            return { response: -2, error: error, }; // significa que la session se termino o no inicio sesion
        }
        return { response: -5, error: error };
    }) .finally ( () => {
        // console.log("final ejecucion...");
    });
};
