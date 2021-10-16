import React, { Component } from 'react';

class Loader extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            this.props.loader ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : this.props.children
        
        );
    }
}

export default Loader;