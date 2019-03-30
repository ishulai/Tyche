import React, { Component } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import './ETFComponent.css';

export default class ETFComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="ETFComponent">

                <div className="ETFName"> 
                    {this.props.etfname}
                </div> 

                <div className="quantityIndicator"> 
                    {this.props.quantity}
                    <br /> 
                    {this.props.equity} 
                </div> 

                <div className="d-flex flex-column toggleGroup">

                <ButtonGroup toggle className="mt-3">
                    <ToggleButton type="radio" name="radio" value="1">
                        Buy - {this.props.buyCount}
                    </ToggleButton>
                    <ToggleButton type="radio" name="radio" value="2">
                        Hold - {this.props.holdCount}
                    </ToggleButton>
                    <ToggleButton type="radio" name="radio" value="3">
                        Sell - {this.props.sellCount}
                    </ToggleButton>
                    </ButtonGroup>
                </div>

            {/*

            <div className="buyField"> 
            Buy - {this.props.buyCount}
            </div> 

            <div className="holdFiled"> 
            Hold - {this.props.holdCount}
            </div> 

            <div className="sellField"> 
            Sell - {this.props.sellCount}
            </div> 

            */ } 

            </div>
        );
    }
}

