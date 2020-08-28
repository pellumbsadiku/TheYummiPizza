import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

@inject("pizzaStore", "authStore")
@observer
class UserPopOver extends Component {
    constructor() {
        super();
        this.state = { visible: false };
    }

    handleVisibleChange = visible => this.setState({ visible });

    render() {
        const { logout, user } = this.props.authStore;
        const { name = "" } = user;

       
        return (
            
            <Popover
              
               
                trigger="click"
                visible={this.state.visible}
                //onVisibleChange={this.handleVisibleChange}
            >
               
                 <Link style={{textDecoration:"none", color:"white", paddingLeft:"10px", paddingRight:"10px"}} to={ROUTES.ORDERS}>My Orders</Link>
                <UserOutlined
                    type="primary"
                    style={{ fontSize: 20, margin: "0px 10px" }}
                />
                {name}
                <span class="badge badge-dark" style={{paddingLeft:"10px", marginLeft:15}}>
                <a style={{textDecoration:"none", color:"White", fontSize:16, padding:"3px , 3px"}}
                            onClick={() => {
                              logout();
                              
                            }}
                        >
                            Logout
                        </a>
                        </span>
            </Popover>

            
        );
    }
}

export default UserPopOver;
