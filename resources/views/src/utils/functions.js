
const cleanObejct = ( object = {} ) => {
    for (let index in object) {
        if ( typeof object[index] === 'boolean' ) {
            object[index] = false;
        } else {
            if ( Array.isArray( object[index] ) ) {
                object[index] = [];
            } else {
                if ( typeof object[index] === 'object' ) {
                    for ( let data in object[index] ) {
                        if ( typeof object[index][data] === 'boolean' ) {
                            object[index][data] = false;
                        } else {
                            if ( Array.isArray( object[index][data] ) ) {
                                object[index][data]= [];
                            } else {
                                object[index][data] = "";
                            }
                        }
                    }
                } else {
                    object[index] = "";
                }
            }
        }
    }
};

const initDate = ( ) => {
    let date = new Date();
    let year = date.getFullYear();
    return `01/01/${year}`;
};

const existeData = ( data ) => {
    return ( ( typeof data !== "undefined" ) && ( data !== null ) );
};

const esString = ( data ) => {
    return ( (typeof data === "string") && (typeof data !== "undefined") && (data !== null) );
};

const esBoolean = ( data ) => {
    return ( (typeof data == "boolean") ? data : false );
};

const esObject = ( data ) => {
    return ( typeof data == "object" );
};

const esArray = ( data ) => {
    return ( Array.isArray( data ) );
};

const convertDMYToYMD = ( date ) => {
    if ( date === null || typeof date === "undefined" || date === "" ) {
        return "";
    }
    let array = date.split('/');
    if ( array.length !== 3 ) return;
    let year  = array[2];
    let month = array[1];
    let day   = array[0];

    return year + "-" + month + "-" + day;
};

const convertYMDToDMY = ( date ) => {
    if ( date === null || typeof date === "undefined" || date === "" ) {
        return "";
    }
    let array= date.split('-');
    if ( array.length !== 3 ) return;
    let year  = array[0];
    let month = array[1];
    let day   = array[2];

    return day + "/" + month + "/" + year;
};

const dateToString = ( date = new Date() ) => {
    let year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();

    month = ( month < 10 ) ? "0" + month : month;
    day   = ( day < 10 )   ? "0" + day : day;

    return day + "/" + month + "/" + year;
};

const esDecimal = ( number, decimal, unsigned = false ) => {
    if ( !unsigned ) {
        if ( parseInt( number ) < 0 ) return false;
    }
    let array = number.toString().split(".");
    if ( array.length > 1 ) {
        let numberdecimal = array[1];
        if ( numberdecimal.toString().length <= decimal ) {
            return true;
        }
        return false;
    };
    return true;
};

const onChangeNumberDecimal = ( value ) => {
    value += '';
    const list = value.split('.');
    let number = `${ ( list[0] ) ? parseInt( list[0] ) : '0' }${ ( list[1] ) ? `.${ list[1] }` : ( list.length > 1 ) ? '.' : '' }`;
    return number;
};

const onIncrementarNumberDecimal = ( value ) => {
    let array = value.toString().split(".");
    if ( array.length > 1 ) {
        let decimal = array[1];
        let number  = array[0];
        number = parseInt(number) + 1;
        return number + "." + decimal;
    }
    return parseInt( array[0] ) + 1;
};

const onDecrementarNumberDecimal = ( value ) => {
    let array = value.toString().split(".");
    let number = array[0];
    if ( array.length > 1 ) {
        let decimal = array[1];
        if ( parseInt(number) > 0 ) {
            number = parseInt( number ) - 1;
            return number + "." + decimal;
        }
        return parseInt(number) + "." + decimal;
    }
    if (parseInt(number) > 0) {
        return parseInt(number) - 1;
    }
    return parseInt(number);
};

export const Functions = {
    cleanObejct,
    initDate,
    esArray,
    esBoolean,
    esString,
    esObject,
    esDecimal,
    existeData,
    convertDMYToYMD,
    convertYMDToDMY,
    dateToString,
    onChangeNumberDecimal,
    onIncrementarNumberDecimal,
    onDecrementarNumberDecimal,
};