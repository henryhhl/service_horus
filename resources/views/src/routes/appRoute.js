
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import App from '../layouts/app';

function AppRoute( props ) {

    const {} = props;

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <App />
                </Switch>
            </BrowserRouter>
        </>
    );

};

export default React.memo( AppRoute );
