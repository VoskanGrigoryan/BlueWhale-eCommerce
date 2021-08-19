import React, { useState } from 'react';
import { Menu } from 'antd';
import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import UserWizard from './auth/UserWizard';
// import { useLocation } from 'react-router-dom';
import CreateProductDialog from '../../dialogs/CreateProductDialog';

const { SubMenu } = Menu;

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [navValue, setNavValue] = useState('');

    const [openProduct, setOpenProduct] = useState(false);

    const openCreateProd = () => {
        setOpenProduct(true);
    };

    const closeCreateProd = () => {
        setOpenProduct(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (e) => {
        setNavValue(e.key);
    };

    // const location = useLocation();

    return (
        <Menu
            onClick={handleClick}
            selectedKeys={[navValue]}
            mode="horizontal"
            className="d-flex justify-content-center navigationBar w-100 position-fixed"
        >
            <SubMenu key="products" title="Products">
                <Menu.ItemGroup title="Choose:">
                    <Menu.Item key="subcat-store">
                        <Link to="/store">Drinks</Link>
                    </Menu.Item>

                    <Menu.Item key="subcat-store-cocktails">
                        <Tooltip title="Not yet implemented.." placement="right">
                            <Link to="/store">Cocktails</Link>
                        </Tooltip>
                    </Menu.Item>

                    <Menu.Item key="subcat-store-wine">
                        <Tooltip title="Not yet implemented.." placement="right">
                            Wines
                        </Tooltip>
                    </Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>

            <Menu.Item key="cart">
                <Link to="/shopping-cart">Shopping Cart</Link>
            </Menu.Item>

            <Menu.Item key="new-product" onClick={openCreateProd}>
                <Tooltip title="Only for admins!" placement="bottom">
                    Add product
                </Tooltip>
            </Menu.Item>

            <Menu.Item key="settings">
                <Tooltip title="Not yet implemented.." placement="bottom">
                    Settings
                </Tooltip>
            </Menu.Item>
            <Menu.Item key="user">
                <Tooltip title="Login in order to buy stuff!" placement="bottom">
                    <Link onClick={handleClickOpen}>User</Link>
                </Tooltip>
            </Menu.Item>
            <Menu.Item key="help">
                <Tooltip title="Not yet implemented.." placement="bottom">
                    <Link to="/">Help</Link>
                </Tooltip>
            </Menu.Item>
            <UserWizard open={open} handleClose={handleClose} />
            <CreateProductDialog
                openProduct={openProduct}
                closeCreateProd={closeCreateProd}
            />
        </Menu>
    );
};

export default Navbar;
