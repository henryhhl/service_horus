
import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';

function C_Loading( props ) {
    const {} = props;

    return (
        <Modal
            title={null}
            centered closable={ false }
            visible={ props.visible }
            footer={ null } bodyStyle={{ padding: 2, }}
            zIndex={9999}
        >
            <div className='forms-groups'>
                <div className="loader-wrapper d-flex justify-content-center align-items-center" style={{ width: '100%', }}>
                    <div className="loader">
                        <div className="ball-clip-rotate-multiple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <p style={{ textAlign: 'center', }}>CARGANDO...</p>
            </div>
        </Modal>
    );
};

C_Loading.propTypes = {
    visible: PropTypes.bool,
}

C_Loading.defaultProps = {
    visible: false,
}

export default C_Loading;
