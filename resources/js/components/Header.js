import React, { Component } from "react";
import { Layout, Button, Badge } from "antd";

const { Header } = Layout;

import { ShoppingCartOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";

import UserPopOver from "./UserPopOver";
import CartDrawer from "./CartDrawer";
import AuthModal from "./AuthModal";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

@inject("pizzaStore", "authStore")
@observer
export default class extends Component {
    constructor() {
        super();
        this.state = { visible: false };
    }

    showDrawer = () => this.setState({ visible: true });

    onClose = () => this.setState({ visible: false });

    render() {
        const { cartList } = this.props.pizzaStore;
        const { setModalVisible, isAuthenticated } = this.props.authStore;
        return (
            
            <Header
                style={{
                    display: "flex",
                    backgroundColor: "#FFA500",
                    alignItems: "center",
                    position:"fixed",
                    width:"100%",
                    zIndex:1,
                   
                    
                }}
               
            >
                
                <Link
                    to={ROUTES.HOME}
                    style={{ fontSize: 30, flex: 1, margin: 0, color: "White", fontFamily:"Comic Sans MS, cursive"}}
                >
                   Home
                   
                </Link>

                <Badge count={cartList.length}>
                   
                    <ShoppingCartOutlined
                
                        style={{ fontSize: 30, marginRight: 10, color:"Grey"}}
                        onClick={this.showDrawer}
                    />
                </Badge>

                {!isAuthenticated ? (
                    <Button
                        onClick={() => setModalVisible(true)}
                        style={{ margin: "0px 10px", borderRadius: 20, background: "#1E64E0", color: "white", fontSize: 15, border: "2px"}}
                        
                        
                    >
                        Login
                    </Button>
                ) : (
                    <UserPopOver />
                )}

                <CartDrawer
                
                    visible={this.state.visible}
                    onClose={this.onClose}
                />

                <AuthModal />
            </Header>
        );
    }
}
