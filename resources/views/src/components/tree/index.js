
import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

import { Tree, Switch, Row, Col, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import './css/tree.css';
import C_Button from '../button';
import { Functions } from '../../utils/functions';

function C_Tree( props ) {
    const {} = props;
    const [ treeData, setTreeData ] = useState( [] );
    const [ expandedKeys, setExpandedKeys ] = useState( [] );
    const [ expanded, setExpanded ] = useState( false );
    const [ arrayKeys, setArrayKeys ] = useState( [] );

    useEffect( ( ) => {
        if ( Array.isArray( props.data ) ) {
            if ( props.data.length > 0 ) {
                loadTree( props.data );
            };
        };
    }, [ props.data ] );

    function loadTree( array ) {
        let array_aux = [];
        let keys = [];
        for ( let index = 0; index < array.length; index++ ) {
            let element = array[index];
            keys.push(element[props.option.value]);
            if ( element[props.option.fkidpadre] === null ) {
                if ( props.fkiddata != null ) {
                    if ( props.fkiddata == element[props.option.value] ) {
                        let obj = {
                            title: (
                                <span style={{ fontSize: 14, paddingRight: 25, paddingBottom: 4, borderBottom: '1px solid #E8E8E8', }}
                                    onClick={ () => {
                                        if ( props.selectedPadre)  props.onSelect(element);
                                    } }
                                >
                                    { Functions.esBoolean( props.show ) &&
                                        <Tooltip title="VER" placement="topLeft" color={'#3DC7BE'}>
                                            <EyeOutlined className="icon-operation-horus"
                                                style={{ position: 'relative', top: -2, left: 10, marginRight: 4, }}
                                                onClick={ () => {
                                                    if ( props.onShow ) props.onShow(element);
                                                } }
                                            />
                                        </Tooltip>
                                    }
                                    { Functions.esBoolean( props.editar ) &&
                                        <Tooltip title="EDITAR" placement="topLeft" color={'#2db7f5'}>
                                            <EditOutlined className="icon-operation-horus"
                                                style={{ position: 'relative', top: -2, left: 10, marginRight: 4, }}
                                                onClick={ () => {
                                                    if ( props.onEdit ) props.onEdit(element);
                                                } }
                                            />
                                        </Tooltip>
                                    }
                                    { Functions.esBoolean( props.delete ) &&
                                        <Tooltip title="ELIMINAR" placement="topLeft" color={'red'}>
                                            <DeleteOutlined className="icon-operation-horus"
                                                style={{ position: 'relative', top: -2, left: 10, marginRight: 4, }}
                                                onClick={ () => {
                                                    if ( props.onDelete ) props.onDelete(element);
                                                } }
                                            />
                                        </Tooltip>
                                    }
                                    <span style={{ position: 'relative', paddingLeft: 10, }}>
                                        { element[props.option.title] }
                                    </span>
                                </span>
                            ),
                            key:   element[props.option.value],
                            value: element[props.option.value],
                            data: element,
                        };
                        array_aux.push(obj);
                    }
                } else {
                    let obj = {
                        title: (
                            <span style={{ fontSize: 14, paddingRight: 25, paddingBottom: 4, borderBottom: '1px solid #E8E8E8', }}
                                onClick={ () => {
                                    if ( props.selectedPadre)  props.onSelect(element);
                                } }
                            >
                                { Functions.esBoolean( props.show ) &&
                                    <Tooltip title="VER" placement="topLeft" color={'#3DC7BE'}>
                                        <EyeOutlined className="icon-operation-horus"
                                            style={{ position: 'relative', top: -2, left: 10, marginRight: 4, }}
                                            onClick={ () => {
                                                if ( props.onShow ) props.onShow(element);
                                            } }
                                        />
                                    </Tooltip>
                                }
                                { Functions.esBoolean( props.editar ) &&
                                    <Tooltip title="EDITAR" placement="topLeft" color={'#2db7f5'}>
                                        <EditOutlined className="icon-operation-horus"
                                            style={{ position: 'relative', top: -2, left: 10, marginRight: 4, }}
                                            onClick={ () => {
                                                if ( props.onEdit ) props.onEdit(element);
                                            } }
                                        />
                                    </Tooltip>
                                }
                                { Functions.esBoolean( props.delete ) &&
                                    <Tooltip title="ELIMINAR" placement="topLeft" color={'red'}>
                                        <DeleteOutlined className="icon-operation-horus"
                                            style={{ position: 'relative', top: -2, left: 10, marginRight: 4, }}
                                            onClick={ () => {
                                                if ( props.onDelete ) props.onDelete(element);
                                            } }
                                        />
                                    </Tooltip>
                                }
                                <span style={{ position: 'relative', paddingLeft: 10, }}>
                                    { element[props.option.title] }
                                </span>
                            </span>
                        ),
                        key:   element[props.option.value],
                        value: element[props.option.value],
                        data: element,
                    };
                    array_aux.push(obj);
                }
            }
        }
        if ( props.showChildren ) treeFamily(array, array_aux);
        setTreeData(array_aux);
        setArrayKeys(keys);
        if ( Functions.esBoolean(props.expanded) ) {
            setExpandedKeys(keys);
            setExpanded(true);
        }
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
                    title: (
                        <span style={{ fontSize: 14, paddingRight: 25, paddingBottom: 4, borderBottom: '1px solid #E8E8E8', }}
                            onClick={ () => props.onSelect(element) }
                        >
                            { Functions.esBoolean( props.show ) &&
                                <Tooltip title="VER" placement="topLeft" color={'#3DC7BE'}>
                                    <EyeOutlined className="icon-operation-horus"
                                        style={{ position: 'relative', top: -2, left: 10, marginRight: 4, }}
                                        onClick={ () => {
                                            if ( props.onShow ) props.onShow(element);
                                        } }
                                    />
                                </Tooltip>
                            }
                            { Functions.esBoolean( props.editar ) &&
                                <Tooltip title="EDITAR" placement="topLeft" color={'#2db7f5'}>
                                    <EditOutlined className="icon-operation-horus"
                                        style={{ position: 'relative', top: -2, left: 10, marginRight: 4, }}
                                        onClick={ () => {
                                            if ( props.onEdit ) props.onEdit(element);
                                        } }
                                    />
                                </Tooltip>
                            }
                            { Functions.esBoolean( props.delete ) &&
                                <Tooltip title="ELIMINAR" placement="topLeft" color={'red'}>
                                    <DeleteOutlined className="icon-operation-horus"
                                        style={{ position: 'relative', top: -2, left: 10, marginRight: 4, }}
                                        onClick={ () => {
                                            if ( props.onDelete ) props.onDelete(element);
                                        } }
                                    />
                                </Tooltip>
                            }
                            <span style={{ position: 'relative', paddingLeft: 10, }}>
                                { element[props.option.title] }
                            </span>
                        </span>
                    ),
                    key:   element[props.option.value],
                    value: element[props.option.value],
                    data: element,
                };
                children.push(obj);
            }
        };
        return children;
    };

    function onSelect(selectedKeys, info) {
        // console.log('selected', selectedKeys, 'infos', info);
        // if ( props.onSelect ) {
        //     props.onSelect(info.node.data);
        // }
    };

    function onCheckedExpanded(checked) {
        if ( checked ) {
            setExpandedKeys( arrayKeys );
        } else {
            setExpandedKeys( [] );
        }
        setExpanded(checked);
    };

    function onComponent() {
        return (
            <div className="p-2 pl-3">
                { Functions.esBoolean( props.create ) && <Row gutter={ [12, 8] } justify={"end"}>
                    <C_Button onClick={props.onCreate}>
                        Nuevo
                    </C_Button>
                </Row>}
                <Row gutter={ [12, 8] }>
                    <Col xs={{ span: 24, }}>
                        <Tree
                            showLine={props.showLine}
                            showIcon={false}
                            // switcherIcon={<DownOutlined />}
                            onSelect={onSelect}
                            treeData={treeData}
                            defaultExpandAll={true}
                            height={400}
                            expandedKeys={expandedKeys}
                            onExpand={ ( expandedKeys ) => setExpandedKeys(expandedKeys) }
                            draggable
                            // blockNode
                        />
                    </Col>
                </Row>
                { Functions.esBoolean( props.showExpanded ) &&
                    <Row gutter={ [12, 8] } justify={"end"}>
                        <Switch style={{ height: 30, lineHeight: 'normal', paddingRight: 5, }}
                            unCheckedChildren={'MOSTRAR TODOS'}
                            checkedChildren={'OCULTAR TODOS'}
                            checked={expanded}
                            onChange={ onCheckedExpanded }
                        />
                    </Row>
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

C_Tree.propTypes = {
    showLine: PropTypes.bool,
    showChildren: PropTypes.bool,
    selectedPadre: PropTypes.bool,

    create: PropTypes.bool,
    editar: PropTypes.bool,
    delete: PropTypes.bool,
    show:   PropTypes.bool,
    showExpanded: PropTypes.bool,

    expanded: PropTypes.bool,

    option:   PropTypes.object,
    data:     PropTypes.array,
    fkiddata: PropTypes.any,

    onSelect: PropTypes.func,
    onCreate: PropTypes.func,
    onShow:   PropTypes.func,
    onEdit:   PropTypes.func,
    onDelete: PropTypes.func,
};

C_Tree.defaultProps = {
    showLine: true,
    showChildren: true,
    selectedPadre: true,
    expanded: false,
    showExpanded: true,

    create: false,
    editar: false,
    delete: false,
    show:   false,



    option: {
        title: "",
        value: "",
        fkidpadre: "",
    },
    fkiddata: null,

    data: [],
};

export default C_Tree;
