import React, { Component } from 'react';
import { withRouter } from 'react-router';
import FilterAttribute from './FilterAttribute';

class ProductsFilter extends Component {
    constructor(props) {
        super()
        this.params = new URLSearchParams(props.location.search)
        this.selectForm = React.createRef()
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
        this.selectForm.current.submit()
    }
    
    render() {
        return (
            this.props.location.pathname === "/" ? <></> :
            <form method="GET" ref={this.selectForm} onChange={() => setTimeout(this.handleChange, 10) }>
                {this.props.match.params.id === "clothes" ?
                <>
                <FilterAttribute key={"shoes Size"} title="Shoes Size" type="select" attr={[ "40", "41", "42", "43", "44" ]} default={this.params.get("Shoes Size")}/>
                <FilterAttribute key={"jacket size"} title="Jacket Size" type="select" attr={["S", "M", "L", "XL", "XXL"]} default={this.params.get("Jacket Size")}/>
                </> : <>
                <FilterAttribute key={"color"} title="Color" type="radio" default={this.params.get("Color")} attr={[
                    {value: "Green", color: "#44FF03"},
                    {value: "Cyan", color: "#03FFF7"},
                    {value: "Blue", color: "#030BFF"},
                    {value: "Black", color: "#000000"},
                    {value: "White", color: "#FFFFFF"},
                    ]} />
                <FilterAttribute key={"Capacity"} title="Capacity" type="select" attr={["256GB", "512GB", "1TB"]} default={this.params.get("Capacity")} />
                <FilterAttribute key={"Touch ID in keyboard"} title="Touch ID in keyboard" type="checkbox" default={this.params.get("Touch ID in keyboard")} />
                <FilterAttribute key={"With USB 3 Ports"} title="With USB 3 ports" type="checkbox" default={this.params.get("With USB 3 ports")} />
                </>
                }
            </form>
        );
    }
}

export default withRouter(ProductsFilter);