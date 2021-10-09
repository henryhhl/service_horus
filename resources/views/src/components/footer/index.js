
import React from 'react';
import PropTypes from "prop-types";

import C_Button from '../button';
import C_Pagination from '../pagination';

function C_Footer( props ) {

    const {} = props;

    return (
        <div className="form-group mb-1 pl-1 pr-1 pt-2 border-top">
            <div className="d-flex justify-content-between">
                <div className="form-row center-elem pl-2">
                    <C_Pagination 
                        total={props.pagination.total}
                        page={props.pagina}
                        pageSize={1}
                        onChangePage={props.onChangePage}
                    />
                </div>
                <div className="form-row">
                    <C_Button
                        outline={true}
                        onClick={props.onCreate}
                        disabled={ props.disabled.btnnuevo }
                    >
                        Nuevo
                    </C_Button>
                    <C_Button
                        outline={true}
                        onClick={props.onGrabar}
                        disabled={ props.disabled.btngrabar }
                    >
                        Grabar
                    </C_Button>
                    { props.onUpdate && 
                        <C_Button
                            outline={true}
                            onClick={props.onUpdate}
                            disabled={ props.disabled.btnmodificar }
                        >
                            Modificar
                        </C_Button>
                    }
                    <C_Button
                        outline={true}
                        onClick={props.onSearch}
                        disabled={ props.disabled.btnbuscar }
                    >
                        Buscar
                    </C_Button>
                    <C_Button
                        outline={true}
                        onClick={props.onDelete}
                        disabled={ props.disabled.btneliminar }
                    >
                        Eliminar
                    </C_Button>
                    <C_Button
                        outline={true}
                        onClick={props.onCancelar}
                        disabled={ props.disabled.btncancelar }
                    >
                        Cancelar
                    </C_Button>
                    <C_Button
                        outline={true}
                        onClick={props.onImprimir}
                        disabled={ props.disabled.btnimprimir }
                    >
                        Imprimir
                    </C_Button>
                    <C_Button
                        outline={true}
                        onClick={props.onClose}
                        disabled={ props.disabled.btnterminar }
                    >
                        Terminar
                    </C_Button>
                </div>
            </div>
        </div>
    );
};

C_Footer.propTypes = {
    onClose:     PropTypes.func,
    onCreate:    PropTypes.func,
    onGrabar:    PropTypes.func,
    onUpdate:    PropTypes.func,
    onSearch:    PropTypes.func,
    onDelete:    PropTypes.func,
    onCancelar:  PropTypes.func,
    onImprimir:  PropTypes.func,
    onChangePage: PropTypes.func,

    disabled:   PropTypes.object,
    pagination: PropTypes.object,

    pagina: PropTypes.any,
};

C_Footer.defaultProps = {
    disabled: {
        btnnuevo:     true,
        btnmodificar: true,
        btnimprimir:  true,
        btngrabar:    true,
        btneliminar:  true,
        btncancelar:  true,
        btnbuscar:    true,
        btnterminar:  false,
    },
    pagination: {
        total: 0,
    },
    pagina: 0,
};

export default C_Footer;
