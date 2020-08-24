import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { List, Card, Row } from "antd";
import { toJS } from "mobx";
const { Meta } = Card;
import { Form, Input, Button, Checkbox } from "antd";
import'bootstrap/dist/css/bootstrap.min.css';


const delivery = 5.0;
const convert=0.9;



function approve(id)
{
  $.ajax({
     //some ajax call to deal with your approve link
     type: 'put',
     beforeSend: function(request) {
        request.setRequestHeader("Authorization",  `Bearer ${localStorage.getItem("accessToken")}`);
        },
           url: '/api/update',
           data: "id="+id,
           success: function (data) { 
               alert('updated');
           }
  });
}

@inject("pizzaStore")
@observer
class Orders extends Component {
    componentDidMount() {
        const { getOrderList } = this.props.pizzaStore;
        getOrderList();
        
    }

    
   
    render() {
        
        const {
             
            orderList: { orders },
            orderListLoading
        } = this.props.pizzaStore;
        console.log(toJS(orders));
        return (
            <List
                itemLayout="horizontal"
                loading={orderListLoading}
                dataSource={orders}
                renderItem={item => (
                   
                    <div style={{ textAlign:"center"}}>
                       
                        <h2>Order Nr. {item.id}</h2>
                        <List.Item.Meta title={`Total in USD: ${item.total + delivery}$` }  /> 
                        <List.Item.Meta title={`Total in EUR: ${(item.total + delivery)* convert }€ ` }  /> 
                        <div>+ 5$ Delivery Cost</div>
                        <List
                            style={{textAlign:"center"}}
                            itemLayout="horizontal"
                            dataSource={item.pizzas}
                            renderItem={({
                                id,
                                image,
                                name,
                                price,
                                quantity,
                                pivot,
                                status
                            }) => (
                                <List.Item>
                                    
                                    <Card
                                    style={{width:200, left:"43%", position:"relative"}}
                                        cover={
                                            <img alt="pizza-img" src={image}  height="10px"/>
                                        }
                                    >
                                        <Meta
                                       
                                            title={name}
                                            description={`${
                                                quantity > 0
                                                    ? price * quantity 
                                                    : price 
                                            } $`}
                                        />
                                        <div>Quantity: {pivot.quantity}</div>
                                        <div>Total Pizza: {pivot.total }$</div>
                                        <div>Status:  </div>
                                        {(() => {
                                          if (item.status == 1) {
                                         return (
                                            <div style={{color:"Red"}} >On The Way </div>
                                            )
                                          } else {
                                          return (
                                        <div style={{color:"Green"}} >Delivered </div>
                                                         )
                                                }
                                             })()}
                                        
                                        
                                        <hr></hr>
                                    </Card>
                                </List.Item>
                                
                            )}
                        />
                        <div>
                        {(() => {
                                          if (item.status == 1) {
                                         return (
                                        //     <button  onClick={approve(item.id)} >
                                        //     Activate Lasers
                                        //   </button>
                                        <div></div>
                                            )
                                          } else {
                                          return (
                                        <div style={{color:"Green"}} > </div>
                                                         )
                                                }
                                             })()} </div>
                                           <h4>  <span class="badge badge-primary" >
  <a style={{padding:"5px", color:"White"}} href="#" onClick={()=>approve(item.id)}>Mark Delivered</a>
</span> </h4>
                        <hr></hr>
                        
                    </div>
                )}
            />
        );
    }
}

export default Orders;
