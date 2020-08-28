import React, { Component } from "react";
import { Drawer, Button, List, Avatar } from "antd";
import { observer, inject } from "mobx-react";
import { set } from "lodash";
import AddToCart from "./AddToCart";



@inject("pizzaStore", "authStore")
@observer
class CartDrawer extends Component {
    
    render() {
        const { cartList, total, order  } = this.props.pizzaStore;
        const { isAuthenticated, setModalVisible } = this.props.authStore;
        const { onClose, visible  } = this.props;
        const closenotif = () => document.getElementById("notif").remove()
        
      
        
        return (
            <Drawer
                title="Cart"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            > 
            
            
                <List
           
                    itemLayout="horizontal"
                    dataSource={cartList}
                    
                    renderItem={item => (
                        
                        <div id="notif">
                        <List.Item>
                            
                            <List.Item.Meta
                                avatar={<Avatar src={item.image} />}
                                title={item.name}
                            
                                description={`quantity: ${item.quantity}`}
                                
                               
                            />
                             
                            <Button className="btn btn-sm btn-warning float-right"  
                           onClick={() =>{ item.quantity = item.quantity - item.quantity}}
                            >
                                Remove
                            </Button> 
                           {/* <button onClick={() =>{ item.quantity = 0}}  className="btn btn-sm btn-warning float-right"> close </button> */}
                             
                        </List.Item>
                        </div>
                       
                      
                    )}
                 
                  
                    footer={
                        !!total && (
                            <>
                                <p>Total price: {total} </p>
                                <Button
                                 style={{ width: "100%", paddingBottom:"10px", marginBottom:"10px", backgroundColor:"#71dab1"}}
                                 onClick={() => {onClose();}}
                                 >
                                  Order more pizza!
                                </Button>
                                <Button
                                    style={{ width: "100%" }}
                                    onClick={() => {
                                        onClose();
                                        !isAuthenticated
                                            ? setModalVisible(true)
                                            : order();
                                    }}
                                >
                                    Checkout
                                </Button>
                                
                            </>
                        )
                    }
                   
                />
              
            </Drawer>
            
        );
        
    }
    
}

export default CartDrawer;
