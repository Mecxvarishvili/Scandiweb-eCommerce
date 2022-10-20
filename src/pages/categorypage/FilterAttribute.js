import React, { Component } from 'react';

class FilterAttribute extends Component {
    constructor(props) {
        super(props)
        this.attributes = props.attr
        this.type = props.type
        this.title = props.title
        this.arr = "checked"
        this.state = {
            name: ""
        }
        this.handleName = this.handleName.bind(this)
        
    }

    componentDidMount() {
        if(this.props.default !== null) {
            this.setState({name: this.props.title})
        }
    }
    radioCheck(attr) {
        if(attr === this.props.default) {
            return "checked"
        }else {
            return ""
        }
    }
    
    handleName(e) {
        if(e.target.value === "") {
            this.setState({name: ""})
        } else {
            this.setState({name: this.props.title})
        }
    }

    render() {
        return (
            this.type === "select" ?
            <div className="selectBox">
                <select onChange={(e) => {this.handleName(e)}} defaultValue={this.props.default} name={this.state.name}>
                    <option value={""} >{this.props.title}</option>
                    {this.attributes.map(attr => (
                        <option key={attr} value={attr.replace("B", "")}>{attr}</option>
                    ))}
                </select>
            </div>
            :
            this.type === "radio" ?
            <div  className="colorsBox" >
                <div className="colorTitle" >Color:</div>
                <div className="colorBox" >
                    {
                        this.attributes.map((attr) => (
                            <span key={attr.color}>
                                <input onChange={() => this.setState({name: this.props.title})} defaultChecked={this.radioCheck(attr.value)} className='colorInput' type="radio" id={attr.color} name={this.state.name} value={attr.value} />
                                <label className='colorLabel' htmlFor={attr.color} style={{backgroundColor: attr.color}} ><span className="span" ></span></label>
                            </span>
                        ))
                    }
                </div>
            </div>
            : 
            <div className="checkBox" >
                <label htmlFor={this.props.title} >{this.props.title}</label>
                <input defaultChecked={this.props.default} type="checkbox" id={this.props.title} name={this.props.title} value="Yes" />
            </div>

        );
    }
}

export default FilterAttribute;