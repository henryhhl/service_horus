
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { RightOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Drawer } from 'antd';
const { SubMenu } = Menu;

import {C_Button } from '../../components';

import { treeMenu } from '../../utils/treemenu';

function Header( props ) {

    const [ arrayMenu, setTreeMenu ] = useState( treeMenu );
    const [ open, setOpen ] = useState( false );
    const  {} = props;

    function updateMenu() {
        for (let index = 0; index < arrayMenu[0].children.length; index++) {
            arrayMenu[0].children[index].visible = false;
        }
        setTreeMenu( arrayMenu );
    };

    function objTreeMenu( arrayTreeMenu, array, key ) {
        if ( arrayTreeMenu.length == 0  ) return;
        for (let index = 0; index < arrayTreeMenu.length; index++) {
            const element = arrayTreeMenu[index];
            objTreeMenu( element.children, array, key );
            for (let pos = 0; pos < element.children.length; pos++) {
                const item = element.children[pos];
                let keyItem = array[array.length - 1];
                if ( item.key === keyItem ) {
                    array.push( element.key );
                }
            }
        }
    };

    function onComponentMenu( item = treeMenu ) {
        let array = [];
        item.map( ( element ) => {
            if ( element.children.length > 0 ) {
                array.push( 
                    <SubMenu key={ element.key }
                        title={ <span style={{ fontSize: 10, letterSpacing: 1, }}> { element.title } </span> }
                    >
                        { onComponentMenu( element.children ) }
                    </SubMenu>
                 );
            } else {
                array.push( 
                    <Menu.Item key={ element.key } style={{ marginLeft: 4, }}
                        onClick={ () => {
                            setOpen(false);
                            let array = [ element.key ];
                            objTreeMenu( arrayMenu, array, element.key );
                            updateMenu();
                            props.onMenu( array );
                        } }
                    >
                        <span style={{ fontSize: 10, letterSpacing: 1, }}>
                            { element.title }
                        </span>
                    </Menu.Item>
                 );
            }
        } );
        return array;
    };

    function componentMenu( item ) {
        return (
            <Menu style={{ borderRadius: 5, padding: "5px 10px 5px 6px", }} theme={"light"}>
                { onComponentMenu( item ) }
            </Menu>
        );
    };

    function componentSidebar( item ) {
        let array = [];
        item.map( ( element ) => {
            if ( element.children.length > 0 ) {
                array.push( 
                    <li key={element.key}>
                        <a href="#" onClick={ (event) => event.preventDefault() } style={{ fontSize: 11, fontWeight: 'bold', }}>
                            <i className="fa fa-fa-bookmark mr-1"></i>
                            { element.title }
                            <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-down"></i>
                        </a>
                        <ul>
                            { componentSidebar( element.children ) }
                        </ul>
                    </li>
                 );
            } else {
                array.push(
                    <li key={element.key}>
                        <a href="#" 
                            onClick={ (event) => {
                                event.preventDefault();
                                setOpen(false);
                                let array = [ element.key ];
                                objTreeMenu( arrayMenu, array, element.key );
                                props.onMenu( array );
                            } } 
                            style={{ fontSize: 10, }}
                        >
                            <i className="metismenu-icon"></i>
                            { element.title }
                        </a>
                    </li>
                 );
            }
        } );
        return array;
    };

    function onComponentSidebarMobile() {
        return (
            <Drawer
                title={null}
                placement={"left"}
                closable={false}
                onClose={ () => setOpen(false) }
                visible={open}
                bodyStyle={{ padding: 0, }}
                width={310}
                footer={
                    <div className="pull-right">
                        <C_Button
                            onClick={ () => setOpen(false) }
                        >
                            Cerrar <RightOutlined />
                        </C_Button>
                    </div>
                }
            >
                <div className="app-sidebars sidebar-shadow w-100 p-0" style={{width: '100% !important',}}>
                    <div className="scrollbar-sidebar">
                        <div className="app-sidebar__inner p-2">
                            <ul className="vertical-nav-menu">
                                <li className="app-sidebar__heading border-bottom border-primary">inicio</li>

                                { arrayMenu[0].children.map( ( item, key ) => {
                                    return (
                                        <li key={ item.key }>
                                            <a href="#" onClick={ (event) => event.preventDefault() } style={{ fontWeight: 'bold', }}>
                                                <i className="fa fa-clone pe-7s-rocket"></i>
                                                    <label > { item.title } </label>
                                                <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                                            </a>
                                            { componentSidebar( item.children ) }
                                        </li>
                                    );
                                } ) }

                            </ul>
                        </div>
                    </div>
                </div>
            </Drawer>
        );
    };

    return (
        <>
            { onComponentSidebarMobile() }
            <div className="app-header header-shadow">
                {/* <div className="app-header__logo">
                    <div className="logo-src"></div>
                    <div className="header__pane ml-auto">
                        <div>
                            <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div> */}
                <div className="app-header__mobile-menu">
                    <div>
                        <button type="button" className="hamburger hamburger--elastic"
                            onClick={ () => setOpen(true) }
                        >
                        {/* <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav"> */}
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>

                <div className="app-header__menu">
                    <span>
                        <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                            <span className="btn-icon-wrapper">
                                <i className="fa fa-ellipsis-v fa-w-6"></i>
                            </span>
                        </button>
                    </span>
                </div>

                <div className="app-header__content">
                    <div className="app-header-left">
                        <ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">

                            { arrayMenu[0].children.map( ( item, key ) => {
                                return (
                                    <Dropdown overlay={ componentMenu( item.children ) } trigger="click" key={key}
                                        visible={ item.visible }
                                        onVisibleChange={ ( ) => {
                                            item.visible = !item.visible;
                                            setTreeMenu( [ ...arrayMenu ] );
                                        } }
                                    >
                                        <li className="nav-item"
                                            style={{ marginRight: -8, display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                        >
                                            <a className={ `nav-link ${ item.visible && 'active' }` }
                                                style={{
                                                    padding: 6, paddingTop: 15, paddingBottom: 15, fontSize: 10, letterSpacing: 1,
                                                }}
                                            >
                                                <span>
                                                    { item.title }
                                                    <i className="fa fa-angle-down ml-1 opacity-5"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </Dropdown>
                                );
                            } ) }

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );

};

Header.propTypes = {
    onMenu: PropTypes.func,
}


Header.defaultProps = {
    onMenu: () => {},
}

export default React.memo( Header );
