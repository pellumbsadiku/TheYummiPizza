import React, { Component } from "react";
import { List, Card } from "antd";
import AddToCart from "../components/AddToCart";
import { inject, observer } from "mobx-react";
import Form from "antd/lib/form/Form";
import Background from './images/background_image.png';


var sectionStyle = {
    
    width: "1200px",
    height: "400px",
    backgroundPosition: "center",
    margin:"0 auto",
    marginTop:"90px ",
    marginBottom:"50px",
    backgroundSize: "cover",
    backgroundImage: "url(" + Background + ")"
  };

const { Meta } = Card;



@inject("pizzaStore")
@observer
class Home extends Component {
    componentDidMount() {
        const { getPizzaList } = this.props.pizzaStore;
        getPizzaList();
    }

    

    render() {
       
        const { loading, pizzaList } = this.props.pizzaStore;
        return (
            
         
            <Form>
              <section style={ sectionStyle }>
            
     
      </section>
            <List
                style={{paddingTop:20}}
                grid={{ gutter: 16, column: 4 }}
                dataSource={pizzaList}
                loading={loading}
                renderItem={({ id, image, name, price, quantity }) => (
                   
                    <List.Item>
                        <Card
                            cover={
                                <img
                                    alt="pizza-img"
                                    src={image}
                                    style={{ height: 250}}
                                />
                            }
                        >
                            <Meta
                                style={{textAlign: "center"}}
                                title={name}
                                description={`${
                                    quantity > 0 ? price * quantity : price
                                } $`}
                            />
                            <AddToCart id={id} quantity={quantity} />
                        </Card>
                        
                    </List.Item>
                    
                )}
            />
           
            </Form>
        );
    }
}

export default Home;
