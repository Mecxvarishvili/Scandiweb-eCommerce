import React, { Component } from 'react';
import { withRouter } from 'react-router';

class ProductsFilter extends Component {
    render() {
        return (

            this.props.location.pathname === "/" ? <></> :

            <form method="GET">

                {
                    this.props.match.params.id === "clothes" ?

                    <div>
                        <div className="selectBox" >
                            <select name="Shoes Size" defaultValue={false} >
                                <option value={false}  disabled hidden>Shoes Size:</option>
                                <option value="39" >39</option>
                                <option value="40" >40</option>
                                <option value="41" >41</option>
                                <option value="42" >42</option>
                                <option value="43" >43</option>
                                <option value="44" >44</option>
                            </select>
                        </div>
                        <div className="selectBox" >
                            <select name="Jacket Size"  defaultValue={false}>
                                <option value={false} disabled hidden>Jacket Size:</option>
                                <option value="S" >S</option>
                                <option value="M" >M</option>
                                <option value="L" >L</option>
                                <option value="XL" >XL</option>
                                <option value="XXL" >XXL</option>
                            </select>
                        </div>
                    </div>

                    : 

                    <div>
                        <div  className="colorsBox" >
                            <div className="colorTitle" >Color:</div>
                            <div className="colorBox" >
                                <input className='colorInput' type="radio" id="Green" name="Color" value="Green" />
                                <label className='colorLabel' htmlFor="Green" style={{backgroundColor: "#44FF03"}}><span className="span" >&#10003;</span></label>
                                <input className='colorInput' type="radio" id="Cyan" name="Color" value="Cyan" />
                                <label className='colorLabel' htmlFor="Cyan" style={{backgroundColor: "#03FFF7"}} ><span className="span" >&#10003;</span></label>
                                <input className='colorInput' type="radio" id="Blue" name="Color" value="Blue" />
                                <label className='colorLabel' htmlFor="Blue" style={{backgroundColor: "#030BFF"}} ><span className="span" >&#10003;</span></label>
                                <input className='colorInput' type="radio" id="Black" name="Color" value="Black" />
                                <label className='colorLabel' htmlFor="Black" style={{backgroundColor: "#000000"}} ><span className="span" >&#10003;</span></label>
                                <input className='colorInput' type="radio" id="White" name="Color" value="White" />
                                <label className='colorLabel' htmlFor="White" style={{backgroundColor: "#FFFFFF"}} ><span className="span" >&#10003;</span></label>
                            </div>
                        </div>
                        <div  className="selectBox" >
                            <select  name="Capacity" defaultValue={false}>
                                <option value={false} disabled hidden >Capacity:</option>
                                <option value="256G" >256G</option>
                                <option value="512G" >512G</option>
                                <option value="1T" >1T</option>
                            </select>
                        </div>
                        <div className="checkBox" >
                            <label htmlFor="Touch ID in keyboard" >Touch ID in keyboard</label>
                            <input type="checkbox" id="Touch ID in keyboard" name="Touch ID in keyboard" value="Yes" />

                        </div>
                        <div className="checkBox" >
                            <label htmlFor="Touch ID in keyboard" >With USB 3 ports</label>
                            <input type="checkbox" id="With USB 3 ports" name="With USB 3 ports" value="Yes" />
                        </div>
                    </div>



                }

                
                <button type="submit" >Search</button>

            </form>
        );
    }
}

export default  withRouter(ProductsFilter);