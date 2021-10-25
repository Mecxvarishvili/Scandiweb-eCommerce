import React, { Component } from 'react';

class ProductAttributes extends Component {
    render() {
        return (
            !!this.props.data.attributes
            ?
            this.props.data.attributes.map((el, index) => {
                return (
                    el.id === "Color"
                    ?
                    <div className="attributesCont" key={index}>
                        <div className="attributeTitle">{el.id}</div>
                        <div className="attributeBox" >
                        {el.items.map((el) => {
                            return (
                                <div className="inputBox" key={el.value}>
                                    <input className="input" type="radio" id={el.value} name={this.props.data.id+"color"}  value={el.value} defaultChecked />
                                    <label className="label"  style={{backgroundColor: el.value}} htmlFor={el.value}></label>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    :
                    <div className="attributesCont" key={index}>
                        <div className="attributeTitle">{el.id}</div>
                        <div className="attributeBox" >
                        {el.items.map((el, index) => {
                            return (
                                <div className="inputBox" key={el.value}>
                                    <input className="input" type="radio" id={this.props.bag + el.value} name={this.props.bag + this.props.data.id }  value={el.value} defaultChecked />
                                    <label className="label" htmlFor={this.props.bag + el.value}>{el.value}</label>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                )
            })
            :
            <></>
        );
    }
}

export default ProductAttributes;