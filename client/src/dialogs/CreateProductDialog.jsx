import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const LoginDialog = ({ openProduct, closeCreateProd }) => {
    return (
        <Modal
            title="Create a product"
            visible={openProduct}
            onCancel={closeCreateProd}
            footer={[
                <Button key="back" onClick={closeCreateProd}>
                    Cancel
                </Button>,

                <Button style={{ marginRight: 10 }} key="submit" type="primary">
                    Add
                </Button>,
            ]}
        >
            <div className="body"></div>
        </Modal>
    );
};

export default LoginDialog;
