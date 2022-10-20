import React, { Component } from 'react';
import { serializeAttributes } from '../../serialzie/serialize';

class ProductAttributes extends Component {

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data) {
            this.props.setAtt(serializeAttributes(this.props.data.attributes))
        }
        
    }
    
    render() {
        return (
            !!this.props.data.attributes
            ?
            this.props.data.attributes.map((el) => {
                return (
                    el.id === "Color"
                    ?
                    <div className="attributesCont" key={el.id}>
                        <div className="attributeTitle">{el.id}:</div>
                        <div className="attributeBox" >
                        {el.items.map((item) => {
                            return (
                                <div className="colorBox" key={item.value}>
                                    <input className="colorInput" type="radio" id={item.value} name={this.props.data.id+"color"}  value={item.value}  onClick={(e) => this.props.setAtt({id: el.id, value: e.target.value})} defaultChecked />
                                    <label className="colorLabel"  style={{backgroundColor: item.value}} htmlFor={item.value}><span className="span" ></span></label>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    :
                    <div className="attributesCont" key={el.id} >
                        <div className="attributeTitle">{el.id}:</div>
                        <div className="attributeBox">
                        {el.items.map((item) => {
                            return (
                                <div className="inputBox" key={item.value}>
                                    <input className="input" type="radio" id={el.id + item.value} name={el.id}  value={item.value}   onClick={(e) => this.props.setAtt({id: el.id, value: e.target.value})} defaultChecked />
                                    <label className="label" htmlFor={el.id + item.value}>{item.value}</label>
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