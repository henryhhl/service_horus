
import React from 'react';
import PropTypes from 'prop-types';

import C_Button from '../button';

function C_Pagination( props ) {

    const {} = props;

    function disabledLeft() {
        let page = props.page;
        if ( ( page == "" || props.total == "" ) && page != 0 ) {
            return true;
        }
        page = ( isNaN( page ) ) ? 0 : parseInt( page );
        var total = ( isNaN( props.total ) ) ? 0 : parseInt( props.total );

        var nropagina =   parseInt( total  / page * props.pageSize );

        if ( page == 1 || total == 0 || page == 0 ) {
            return true;
        }
        return false;
    };

    function disabledRight() {
        let page = props.page;
        if ( ( page == "" || props.total == "" ) && page != 0 ) {
            return true;
        }
        page = ( isNaN( page ) ) ? 0 : parseInt( page );
        var total = ( isNaN( props.total ) ) ? 0 : parseInt( props.total );

        var nropagina = ( props.pageSize == total ) ? 1 : ( props.pageSize * 1 / total * 1 ) + 1;

        if ( page == total || total == 0 ) {
            if ( total > 0 && page != total ) return false;
            return true;
        }
        return false;
    };

    let page = props.page;

    function onComponent() {
        return (
            <>
                <C_Button
                    disabled={ disabledLeft() }
                    onClick={ () => {
                        if ( props.onChangePage ) {
                            props.onChangePage(1);
                        }
                    } }
                    style={ { marginRight: 5, height: 23, } }
                >
                    <i className="fa fa-step-backward" />
                </C_Button>
                <C_Button
                    disabled={ disabledLeft() }
                    onClick={ () => {
                        if ( props.onChangePage ) {
                            let pagina = parseInt( page ) - 1;
                            props.onChangePage( pagina );
                        }
                    } }
                    style={ { marginRight: 5, height: 23, } }
                >
                    <i className="fa fa-angle-left" />
                </C_Button>

                <C_Button
                    disabled={true}
                    style={ { marginRight: 5, height: 23, } }
                >
                    { ( page == "" || page == 0 || isNaN( page ) ) ? '-' : page }
                </C_Button>

                <C_Button
                    disabled={ disabledRight() }
                    onClick={ () => {
                        if ( props.onChangePage ) {
                            let pagina = parseInt( page ) + 1;
                            props.onChangePage( pagina );
                        }
                    } }
                    style={ { marginRight: 5, height: 23, } }
                >
                    <i className="fa fa-angle-right" />
                </C_Button>
                <C_Button
                    disabled={ disabledRight() }
                    onClick={ () => {
                        if ( props.onChangePage ) {
                            props.onChangePage( props.total );
                        }
                    } }
                    style={ { marginRight: 5, height: 23, } }
                >
                    <i className="fa fa-step-forward" />
                </C_Button>
            </>
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );
};

C_Pagination.propTypes = {
    onChangePage: PropTypes.func,

    page:     PropTypes.any,
    total:    PropTypes.any,
    pageSize: PropTypes.any,
}


C_Pagination.defaultProps = {
    page:     0,
    total:    0,
    pageSize: 20,
}

export default C_Pagination;
