import React, { Component } from 'react';

class ProductAttributes extends Component {
    
    render() {
        return (
            !!this.props.attribute ? 
                    this.props.attribute.id === "Color"
                    ?
                    <div className="attributesCont" key={this.props.attribute.id}>
                        <div className="attributeTitle">{this.props.attribute.id}:</div>
                        <div className="attributeBox" >
                        {this.props.attribute.items.map((item) => {
                            return (
                                <div className="colorBox" key={item.value}>
                                    <input className="colorInput" type="radio" id={item.value} name={this.props.attribute.id+"color"}  value={item.value}  onClick={(e) => this.props.setAtt({id: this.props.attribute.id, value: e.target.value})} defaultChecked />
                                    <label className="colorLabel"  style={{backgroundColor: item.value}} htmlFor={item.value}><span className="span" ></span></label>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    :
                    <div className="attributesCont" key={this.props.attribute.id} >
                        <div className="attributeTitle">{this.props.attribute.id}:</div>
                        <div className="attributeBox">
                        {this.props.attribute.items.map((item) => {
                            return (
                                <div className="inputBox" key={item.value}>
                                    <input className="input" type="radio" id={this.props.attribute.id + item.value} name={this.props.attribute.id}  value={item.value}   onClick={(e) => this.props.setAtt({id: this.props.attribute.id, value: e.target.value})} defaultChecked />
                                    <label className="label" htmlFor={this.props.attribute.id + item.value}>{item.value}</label>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                : <></>
        );
    }
}

export default ProductAttributes;