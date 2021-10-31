import React, { Component } from 'react';

class SelectedAttributes extends Component {
    render() {
        return (
            !!this.props.data.attributes.length && this.props.data.attributes.map(attr => {
                if(attr.id === "Color") {
                    return (
                        <div className="attributesBox" key={attr.id}>
                            <div className="attributeId" >{attr.id}:</div>
                            <div className="attributeColor" style={{backgroundColor: attr.value}}></div>
                        </div>
                    )
                } else {
                    return (
                        <div className="attributesBox" key={attr.id}>
                            <div className="attributeId" >{attr.id}:</div>
                            <div className="attributeValue">{attr.value}</div>
                        </div>
                    )
                }
            })
        )
    }
}

export default SelectedAttributes;