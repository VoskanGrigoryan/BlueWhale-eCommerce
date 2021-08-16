import React, { useState } from 'react';
import ProductDialog from '../dialogs/ProductDialog';
import { Card, Avatar } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import BlueWhale from '../assets/images/BlueWhale.png';

const { Meta } = Card;

const ProdCard = ({ item }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card
            className="col-4 m-1"
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <SearchOutlined key="visualize" onClick={handleOpen} />,
                <ShoppingCartOutlined key="cart" />,
                <b>Price: ${item.price}</b>,
            ]}
        >
            <Meta avatar={<Avatar src={BlueWhale} />} title={item.name} price="40" />

            <ProductDialog item={item} open={open} handleClose={handleClose} />
        </Card>
    );
};

export default ProdCard;
