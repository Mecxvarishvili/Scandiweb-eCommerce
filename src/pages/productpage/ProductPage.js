import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Loader from '../../components/Loader';
import { SINGLE_PRODUCT_QUERY } from '../../serialzie/querySerialize';

class ProductPage extends Component {
    constructor() {

        super()
        this.state = {
            isLoading: true,
            data: [],
            pathname: window.location.pathname.substring(1),
            img: 0,
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: SINGLE_PRODUCT_QUERY(this.state.pathname)})
        })
            .then(res => res.json())
            .then(data => this.setState({data: data.data.product}))
            .then(this.setState({isLoading: false}))
    }

    render() {
        return (
            <Loader loader={this.state.isLoading}>
                <div className="productPage" >
                    <div className="imgsCont">
                        {this.state.data.gallery && this.state.data.gallery.map((el, index) => {
                            return (
                                    <img className="img" src={el} onClick={() => this.setState({img: index})} />
                            )
                        })}
                    </div>
                    <div className="imgCont">
                        <img src={this.state.data.gallery ? this.state.data.gallery[this.state.img] : <></>} />
                    </div>
                    <div className="describeCont">
                        <div className="title" >{this.state.data.name}</div>
                        <div className="category" >{this.state.data.category}</div>
                        <div className="sizeCont" >
                            <div className='size'>SIZE:</div>
                            <div className="inSizeCont">
                               {/* {this.state.data.attributes && this.state.data.attributes[0].items.map((el, index) => {
                                   return (
                                    <div className="sizeBox" key={index}>
                                        <input className="input" type="radio" id={el.value} name="size" value={el.value} />
                                        <label className="label" for={el.value}>{el.value}</label>
                                    </div>
                                   )

                                })} */}
                                {/* <div className="sizeBox">
                                    <input className="input" type="radio" id="S" name="size" value="S" checked />
                                    <label className="label" for="S">S</label>
                                </div>
                                <div className="sizeBox">
                                    <input className="input" type="radio" id="M" name="size" value="M" />
                                    <label className="label" for="M">M</label>
                                </div>
                                <div className="sizeBox">
                                    <input className="input" type="radio" id="L" name="size" value="L" checked />
                                    <label className="label" for="L">L</label>
                                </div>
                                <div className="sizeBox">
                                    <input className="input" type="radio" id="XS" name="size" value="XS" checked />
                                    <label className="label" for="XS">XS</label>
                                </div> */}
                            </div>
                        </div>
                        <div className="priceCont" >
                            <div className="priceTitle" >PRICE:</div>
                            <div className="price" >{this.state.data.prices ? this.state.data.prices[0].amount  : <></>}</div>
                        </div>
                        <button onClick={() => console.log(this.state.data.attributes[0].items)}>ADD TO CART</button>
                        <div dangerouslySetInnerHTML={{ __html: this.state.data.description}}></div>
                    </div>
                </div>
            </Loader>
        );
    }
}

export default withRouter(ProductPage) ;