import React, {useState} from "react";
import style from './ShippingByCity.scss'
import ReactTooltip from "react-tooltip";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import {NavLink, useParams} from "react-router-dom";

import Tabs from "../components/Tabs"
import Topbar from './Topbar'

const { __ } = window.wp.i18n;

const ShippingByCity = (props) => {
    const [region, setRegion] = useState({including: 'Including Cities', excluding: 'Excluding Cities'})
    const params = useParams()
    const instance_id = params.instance_id

    
        return (
        <>
        <Topbar 
            config={props.config}
            methodRegenerate={props.methodRegenerate}
        />
        <div className={style.bgWhite}>
            <Tabs/>
            <div className={style.wrap}>
                {/* Enable Shipping by City */}
                <div className={style.d_flex}>
                    <div>
                        <h3>{__('Enable Shipping by City', 'advanced-table-rate-shipping-for-woocommerce')}</h3>
                    </div>

                    {/* Rounded switch */}
                    <div className={style.ml_auto}>
                        <label className={style.switch}>
                            <input type="checkbox" 
                                defaultChecked={props.config.shipping_by_city.enable} 
                                value={1} 
                                name="enable" 
                                cmnt="shipping_by_city" 
                                onChange={props.handleUpdate} 
                                />
                            <span className={style.slider}></span>
                        </label>
                    </div>
                </div>
                {

                    (() => {
                        if(props.config.shipping_by_city.enable){
                            return(
                                <>
                                {/* Region is.. */}
                                <label>{__('Region is...','advanced-table-rate-shipping-for-woocommerce')} <span data-tip data-for="regionis" className={style.tooltip + ' dashicons dashicons-editor-help'}>
                                    <ReactTooltip id="regionis" place="top" effect="solid">
                                    {__('Set Including or Excluding City.', 'advanced-table-rate-shipping-for-woocommerce')}
                                    </ReactTooltip>
                                </span></label>
                                <SelectInput type="select" value={props.config.shipping_by_city.region_is} name="region_is" cmnt="shipping_by_city" options={region} onChange={props.handleUpdate}/>

                                {/* Allowed City */}
                                <label>{__('Allowed City','advanced-table-rate-shipping-for-woocommerce')} <span data-tip data-for="allowedCity" className={style.tooltip + ' dashicons dashicons-editor-help'}>
                                    <ReactTooltip id="allowedCity" place="top" effect="solid">
                                    {__('Set list of city. List one city per line.', 'advanced-table-rate-shipping-for-woocommerce')}
                                    </ReactTooltip>
                                </span></label>
                                <TextInput 
                                    type="textarea" 
                                    customClass={ props.config.shipping_by_city.allowed_city.length <= 0 ? 'error':null } 
                                    rows={10} 
                                    value={props.config.shipping_by_city.allowed_city} 
                                    name="allowed_city" 
                                    cmnt="shipping_by_city" 
                                    placeholder={__('List one city name per line', 'advanced-table-rate-shipping-for-woocommerce')} 
                                    onChange={props.handleUpdate}
                                />
                                </>
                            )
                        }
                    })()
                }


                {/* Disable other methods */}
                <div className={style.d_flex + ' mt-2'}>
                    <div>
                        <h3>{__('Disable Other Methods', 'advanced-table-rate-shipping-for-woocommerce')}
                            <span data-tip data-for="desableOther" className={style.tooltip + ' dashicons dashicons-editor-help'}>
                                        <ReactTooltip id="desableOther" place="top" effect="solid">
                                        {__('Applicable only for selected city.', 'advanced-table-rate-shipping-for-woocommerce')}
                                        </ReactTooltip>
                            </span>
                        </h3>
                    </div>

                    {/* Rounded switch */}
                    <div className={style.ml_auto}>
                        <label className={style.switch}>
                            <input type="checkbox" defaultChecked={props.config.shipping_by_city.desable_other} value={1} cmnt="shipping_by_city" name="desable_other" onChange={props.handleUpdate} />
                            <span className={style.slider}></span>
                        </label>
                    </div>
                </div>

                {
                    (props.config.shipping_by_city.enable && props.config.shipping_by_city.allowed_city.length <= 0) || props.config.general.title == ''
                    ? 
                    <button onClick={props.saveHandler} disabled >
                        {__('Next', 'advanced-table-rate-shipping-for-woocommerce')}
                    </button>
                    : 
                    
                    <NavLink className={style.navlink} onClick={(e) => {props.saveHandler(e)}} to={`/${params.instance_id}/method_condition`}>    
                            {__('Next', 'advanced-table-rate-shipping-for-woocommerce')}
                    </NavLink>
                    
                    
                }

            </div>
        </div>
        </>        
        )
}


export default ShippingByCity;
