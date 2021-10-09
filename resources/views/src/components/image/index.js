
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { Functions } from '../../utils/functions';
import { Tooltip } from 'antd';

function C_Image( props ) {
    const {} = props;
    const [ object, setObject ] = useState( {
        default: '/img/default.jpg',
        isOpen: false,
        imagen: null,
        array_data: [],
        posicion: -1,
    } );

    function getImagen() {

        if ( Array.isArray( props.data ) ) {
            object.array_data = props.data;
            if ( object.array_data.length > 0 ) {
                return object.array_data[object.posicion];
            }
            return object.default;
        }

        if ( Functions.existeData(props.data) && Functions.esString( props.data ) ) {
            if ( props.data.toString().trim().length > 0 ) {
                return props.data;
            }
            return object.default;
        }
        if ( props.data == null ) {
            return object.default;
        }
        if ( object.imagen != null ) {
            return object.imagen;
        }
        return object.default;
    };

    function onPrevious() {
        let position = object.posicion;
        position = ( position == 0 ) ? object.array_data.length - 1 : position - 1;
        setObject( { ...object, posicion: position, });
    };

    function onNext() {
        let position = object.posicion;
        position = ( position == (object.array_data.length - 1) ) ? 0 : position + 1;
        setObject( { ...object, posicion: position, });
    };

    function onchangeImagen(event) {

        let files = event.target.files;
        if ( (files[0].type == 'image/png') || (files[0].type == 'image/jpg') || (files[0].type == 'image/jpeg') || (files[0].type == 'image/bmp') ) {
            let reader = new FileReader();
            reader.onload = ( e ) => {

                if ( Functions.existeData( props.data ) ) {
                    if ( !Functions.existeData( props.onChange ) ) {
                        setTimeout(() => {
                            var img = document.getElementById( props.id );
                            img.value = '';
                        }, 800);
                        return;
                    }
                }

                var data = null;

                if ( Array.isArray( props.data ) ) {
                    object.array_data.push(e.target.result);
                    object.posicion = object.array_data.length - 1;
                    data = object.array_data;
                }else {
                    object.imagen = e.target.result;
                    data = object.imagen;
                }

                // console.log(data);
                setObject( { 
                    ...object, imagen: object.imagen, array_data: object.array_data, posicion: object.posicion, 
                });

                if ( Functions.existeData( props.onChange ) ) {
                    props.onChange( data );
                };
                
            };
            reader.readAsDataURL(event.target.files[0]);
            return;
        }
        setTimeout(() => {
            var img = document.getElementById( props.id );
            // alerta de imagen incorrecto
            img.value = '';
        }, 800);
        return;
    };

    function onValidateComponent() {
        let array_data = object.array_data;

        const nextImg = array_data.length <= 1 ? null : array_data[(object.posicion + 1) % array_data.length];
        const prevImg = array_data.length <= 1 ? null : array_data[(object.posicion + array_data.length - 1) % array_data.length];
        return (
            <div className="main-card mb-1 card pb-1" style={{ width: '90%', margin: 'auto', }}>
                { ( object.isOpen ) ? 
                    <Lightbox
                        mainSrc={ getImagen() }
                        onCloseRequest={ () => setObject( { ...object, isOpen: false, }) }
                        onMovePrevRequest={ onPrevious }
                        onMoveNextRequest={ onNext }
                        nextSrc={nextImg}
                        prevSrc={prevImg}
                    />
                    : null 
                }
                <div className="card-body">
                    <h5 className="card-title" style={{ position: 'relative', }}> 
                        <span style={{ position: 'relative', top: -5, left: -8, }}>
                            { props.title }
                        </span>
                        { ( !Functions.esBoolean( props.disabled ) ) &&
                            <Tooltip title="SUBIR ARCHIVO" placement="topRight" color={'#2db7f5'}>
                                <button type="button" className="btn-wide btn btn-outline-info btn-sm p-1 pl-2 pr-2"
                                    style={{ position: 'absolute', top: -10, right: -10, }}
                                    onClick={ () => {
                                        document.getElementById(props.id).click();
                                    } }
                                >
                                    <span className="align-middle opacity-7">
                                        <i className="fa fa-upload" style={{ position: 'relative', top: -2, fontSize: 10, }}></i>
                                    </span>
                                </button>
                            </Tooltip>
                        }
                        <input type="file" style={{ display: 'none', }} id={props.id}
                            onChange={ onchangeImagen }
                        />
                    </h5>
                    <div className="slick-sliders slick-initialized slick-dotted" >
                        {(object.array_data.length > 0) ? 
                            <button className="slick-prev slick-arrow fa fa-angle-left" type="button"
                                onClick={ onPrevious }
                            >
                                Previous
                            </button> : null
                        }
                        <div className="slick-list draggable">
                            <div className="slick-track" style={{ width: '100%', display: 'flex', justifyContent: 'center', }}>
                                
                                <div className="slick-slide slick-active"
                                    id="slick-slide10" style={{ width: 250, }}
                                >
                                    <div>
                                        <div style={{ width: '100%', display: 'inline-block' }}>
                                            <div className="slider-item" style={{ height: 180, position: 'relative', }}>
                                                <img style={ { 
                                                        position: 'absolute', left: 0, top: 0,
                                                        right: 0, bottom: 0, width: '100%', height: '100%',
                                                        objectFit: 'cover', transition: 'all .8s ease',
                                                        cursor: 'pointer',
                                                    } }
                                                    onClick={ () => setObject( { ...object, isOpen: true, }) }
                                                    src={ getImagen() }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { ( object.array_data.length > 0)  ? 
                            <button className="slick-next slick-arrow fa fa-angle-right" type="button"
                                onClick={ onNext }
                            >
                                Next
                            </button> : null
                        }
                        <ul className="slick-dots">
                            <li role="presentation" className="slick-active">
                                <button type="button" id="slick-slide-control10">1</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            { onValidateComponent() }
        </>
    );
};

C_Image.propTypes = {
    title: PropTypes.any,
    data:  PropTypes.any,

    disabled: PropTypes.bool,

    onChange: PropTypes.func,

    id: PropTypes.string,
}


C_Image.defaultProps = {
    title: '',
    data:  null,
    id:    'img-img',

    disabled: false,
}

export default C_Image;
