import React, { Component } from 'react';

class Loader extends Component {
    
    render() {
        return (
            this.props.loader ? <div className="lds-ringBox"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div> : this.props.children
        
        );
    }
}

export default Loader;