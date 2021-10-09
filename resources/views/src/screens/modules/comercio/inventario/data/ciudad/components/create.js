
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Skeleton } from 'antd';

import { C_Loading } from '../../../../../../../components';
import { ciudadActions } from '../../../../../../../redux/actions/comercio/inventario/ciudadActions';
import C_Form from './form';

function C_CreateCiudad( props ) {
    const { ciudad } = props;

    useEffect(() => {
        props.onCreate();
    }, [] );

    if ( ciudad.loading ) {
        return  (
            <div className="p-2 pl-4 pr-4">
                <Skeleton active />
            </div>
        );
    };

    return (
        <div className="p-2 pl-4 pr-4">
            <C_Loading visible={ props.loading } />
            <C_Form 
                ciudad={ciudad}
                onChange={props.onChange}
                onCancel={props.onClose}
                onOk={ () => {
                    props.onGrabar(ciudad).then( (result) => {
                        if ( result?.response == 1 ) {
                            props.onClose();
                        }
                    } );
                } }
            />
        </div>
    );
};

C_CreateCiudad.propTypes = {
    ciudad: PropTypes.object,

    onChange: PropTypes.func,
};

C_CreateCiudad.defaultProps = {
    onChange: ( evt ) => {},
};

const mapStateToProps = ( state ) => ( {
    ciudad:  state.ciudad,
    loading: state.loading.visible,
} );

const mapDispatchToProps = {
    onChange:   ciudadActions.onChange,

    onCreate:   ciudadActions.onCreate,
    onGrabar:   ciudadActions.onGrabar,

};

export default connect( mapStateToProps, mapDispatchToProps )( C_CreateCiudad );
