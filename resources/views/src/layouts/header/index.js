
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Menu, Dropdown } from 'antd';
const { SubMenu } = Menu;

import { treeMenu } from '../../utils/treemenu';

function Header( props ) {

    const [ arrayMenu, setTreeMenu ] = useState( treeMenu );
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

    return (
        <>
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
                        <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
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
