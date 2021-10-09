
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './app';
import 'antd/dist/antd.css';

function AppRaiz() {
    return (
        <>
            <Provider store={store}>
                <App />
            </Provider>
        </>
    );
}

export default AppRaiz;

if (document.getElementById('app_raiz')) {
    ReactDOM.render(<AppRaiz />, document.getElementById('app_raiz'));
}
