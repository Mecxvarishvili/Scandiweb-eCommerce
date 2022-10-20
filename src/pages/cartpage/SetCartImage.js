import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_PAGE } from '../../serialzie/routes';

class SetCartImage extends Component {
    constructor() {
        super()
        this.state = ({
            gallery: 0
        })
    }

    imgInc(gallery) {
        if(this.state.gallery < gallery.length - 1) {
            this.setState({gallery: this.state.gallery + 1})
        } else {
            this.setState({gallery: 0})
        }

    }

    imgDec(gallery) {
        if(this.state.gallery === 0) {
            this.setState({gallery: gallery.length - 1})
        } else {
            this.setState({gallery: this.state.gallery - 1 })
        }

    }

    render() {
        return (
            <>
                <Link to={PRODUCT_PAGE.replace(":id", this.props.id)} >
                    <img src={this.props.gallery[this.state.gallery]} alt="product"  />
                </Link>
                {this.props.gallery.length > 1
                ?
                <div>
                    <button className="leftButtonBox" onClick={() =>this.imgDec(this.props.gallery)} >‹</button>
                    <button className="rightButtonBox" onClick={() =>this.imgInc(this.props.gallery)} >›</button>
                </div>
                :
                <></>
                }
            </>
        );
    }
}

export default SetCartImage;