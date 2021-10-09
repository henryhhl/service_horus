
import React from 'react';

import { Modal } from 'antd';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';

function C_Confirm( { title = "", onOk = () => {}, okType = "danger", content = "'Estás seguro de eliminar?", } ) {

    Modal.confirm( {
        title: title,
        content: content,
        icon:  okType === "danger" ? <DeleteOutlined style={ { color: 'red', } } /> : <InfoCircleOutlined style={ { color: '#1890ff', } } />,
        okText: 'Confirmar',
        okType: okType,
        cancelText: 'Cancelar',
        zIndex: 9999,
        onOk() { onOk(); },
        onCancel() { },
    } );

};

export default C_Confirm;
