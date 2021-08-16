import React from 'react';
import { List, Avatar, Button } from 'antd';

const Cart = () => {
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    return (
        <div className="min-vh-100" style={{ paddingTop: '140px' }}>
            <div className="catalog row">
                <div className="text-center mb-2">
                    <Button type="primary">Confirm order</Button>
                </div>
                <List
                    className="px-4 col-6 shoppingCart"
                    size="small"
                    itemLayout="horizontal"
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <a key="list-loadmore-edit">delete</a>,
                                <a key="list-loadmore-more">more</a>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title="Product title"
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default Cart;
