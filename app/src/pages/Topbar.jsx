import React from "react";
import {HashRouter, NavLink, BrowserRouter as Router} from 'react-router-dom'
import style from "./App.scss"
const { __ } = window.wp.i18n

const Topbar = (props) => {
    let {config} = props
    return(
        <>
        <div className={style.topbar}>
                <div>
                        <NavLink onClick={props.methodRegenerate} className={style.buttona} to="/" > 
                            <span className="dashicons dashicons-arrow-left-alt"></span>
                            {__('Back', 'advanced-table-rate-shipping-for-woocommerce')}
                        </NavLink>
                    
                    {
                        (() => {
                            if(typeof config.general != 'undefined' && typeof config.general.title != 'undefined'){
                                return(
                                    <h4>{config.general.title}</h4>
                                )
                            }else{
                                return(
                                    <h4>{__('Table Rate Shipping', 'advanced-table-rate-shipping-for-woocommerce')}</h4>
                                )
                            }
                        })()
                    }
                </div>
                <div>
                    {/* <a target="_blank" href="https://acowebs.com/woocommerce-table-rate-shipping/">
                        <span className="dashicons dashicons-star-filled"></span>
                        {__('Check Premium Options', 'advanced-table-rate-shipping-for-woocommerce')}
                    </a> */}
                </div>
            </div>
            </>
    )
}

export default Topbar