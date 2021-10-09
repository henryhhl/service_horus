
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TreeSelect  } from 'antd';
import { Functions } from '../../utils/functions';

import './css/treeselect.css';

const C_TreeSelect = ( props ) => {
    const {} = props;
    const [ treeData, setTreeData ] = useState( [] );

    useEffect( ( ) => {
        if ( Array.isArray( props.treeData ) ) {
            if ( props.treeData.length > 0 ) {
                loadTree( props.treeData );
            };
        };
    }, [ props.treeData ] );

    function loadTree( array ) {
        let array_aux = [];
        let keys = [];
        for ( let index = 0; index < array.length; index++ ) {
            let element = array[index];
            keys.push(element[props.option.value]);
            if ( element[props.option.fkidpadre] === null ) {
                let obj = {
                    title: element[props.option.title],
                    key:   element[props.option.value],
                    value: element[props.option.value],
                    data: element,
                };
                array_aux.push(obj);
            }
        }
        treeFamily(array, array_aux);
        setTreeData(array_aux);
        // setArrayKeys(keys);
    };

    function treeFamily( data, array ) {
        if (array.length === 0) {
            return;
        }
        for ( let i = 0; i < array.length; i++ ) {
            let children = childrenFamily( data, array[i].value );
            array[i].children = children;
            treeFamily(data, children);
        }
    };

    function childrenFamily(array, idpadre) {
        let children = [];
        for ( let index = 0; index < array.length; index++ ) {
            let element = array[index];
            if ( element[props.option.fkidpadre] == idpadre ) {
                let obj = {
                    title: element[props.option.title],
                    key:   element[props.option.value],
                    value: element[props.option.value],
                    data: element,
                };
                children.push(obj);
            }
        };
        return children;
    };

    function onComponent() {
        let label = "lbls-treeselect active";
        let value = props.value;
        value = (value == null || value == "") ? undefined : value;
        return (
            <div className={props.column} style={{ paddingTop: 12, position: 'relative', }} >
                {
                    props.label && 
                    <label className={ label } htmlFor={"idTreeSelect"}
                        // onClick={ () => {
                        //     document.getElementById("idSelect").click();
                        // } }
                    >
                        { props.label }
                    </label>
                }
                <TreeSelect
                    id={"idTreeSelect"}
                    treeLine
                    allowClear={props.allowClear}
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    value={value}
                    style={ { 
                        width: '100%', minWidth: '100%', maxWidth: '100%', fontWeight: '400',
                        fontSize: 13, color: 'rgba(0, 0, 0, 0.87)',
                    } }
                    dropdownStyle={{ zIndex: 9999, }}
                    onChange={ (value, labelList, extra) => {
                        console.log(value)
                        console.log(labelList)
                        console.log(extra)
                        props.onChange(value)
                    } }
                    treeData={treeData}
                    className={ Functions.esBoolean( props.error ) ? "tree-input-select border-danger-error" : "tree-input-select" }
                >

                </TreeSelect>
                { Functions.esBoolean( props.error ) && 
                    <div className="ant-form-item-explain ant-form-item-explain-error">
                        <div role="alert" style={{ fontSize: 10, }}>
                            {props.message}
                        </div>
                    </div>
                }
            </div>
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );
};

C_TreeSelect.propTypes = {
    treeData: PropTypes.array,
    option:   PropTypes.object,

    allowClear: PropTypes.bool,
    error:      PropTypes.bool,
    disabled:   PropTypes.bool,

    value: PropTypes.any,

    message: PropTypes.node,

    placeholder: PropTypes.string,
    column:      PropTypes.string,
    label:       PropTypes.node,
};

C_TreeSelect.defaultProps = {
    treeData: [],
    option:   {
        title: "",
        value: "",
        fkidpadre: "",
    },

    allowClear: false,
    disabled:   false,
    error:      false,

    placeholder: "",
    column:      "",
};

export default C_TreeSelect;
