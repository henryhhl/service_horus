
import React, { useState } from 'react';

import { Route } from 'react-router-dom';

import Inicio from '../inicio';
import IndexComercio from '../screens/modules/comercio';

import Footer from './footer';
import Header from './header';

function App( props ) {

    console.log( "App")

    const {} = props;
    const [ visible, setVisible ] = useState( false );
    const [ arrayMenu, setArrayMenu ] = useState( [] );

    function onMenu( data ) {
        setArrayMenu( [ ...data ] );
        setVisible( true );
    };

    function onClose() {
        setVisible( false );
    };

    function componetMenuModal() {
        let submenu = arrayMenu.pop();
        switch ( submenu ) {
            case "COMERCIO":
                return (
                    <IndexComercio 
                        visible={ visible }
                        onClose={ onClose }
                        arrayMenu={ arrayMenu }
                    />
                );

            case "CONTABILIDAD":
                return null;
        
            default:
                return null;
        }
    };

    return (
        <>
            { componetMenuModal() }
            <div className="app-container app-theme-white body-tabs-shadow fixed-header closed-sidebar">
                <Header onMenu={ onMenu } />
                <div className="app-main">
                    <div className="app-main__outer">
                        <div className="app-main__inner">
                            <Route exact path={"/home"} render={ ( props ) => <Inicio { ...props } /> } />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );

}

export default React.memo( App );
