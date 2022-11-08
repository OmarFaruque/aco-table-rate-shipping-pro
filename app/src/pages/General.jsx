import React, { useState, useEffect} from "react"
import style from './General.scss'
import {NavLink, useParams} from "react-router-dom"
import ReactTooltip from "react-tooltip"
import TextInput from "../components/TextInput"
import SelectInput from "../components/SelectInput"
import Userpermission from "../pages/Userpermission"

import FetchWP from '../utils/fetchWP'
import Topbar from './Topbar'
import Tabs from "../components/Tabs"
import Acoloader from '../utils/acoloader'


const { __ } = window.wp.i18n;

const General = (props) => {
    
    const [taxs, setTaxs] = useState({'taxable': 'Taxable' ,'non-taxable': 'Non-Taxable'})
    const [roles, setRoles] = useState(props.roles)
    const [rules, setRules] = useState({"per_order": "Per Order", "per_item": "Per Item", "per_line_item": "Per Line Item", "per_class": "Per Class", "per_order": "Per Order"})
    
    const params = useParams()

    /**
     * React Ready event
     */
     useEffect(() => {}, [])


    return (
        <>
        <Topbar 
            config={props.config}
            methodRegenerate={props.methodRegenerate}
        />
        <div className={style.bgWhite}>
            <Tabs instance_id={params.instance_id} />
        <div className={style.wrap}>
            <div className={style.header}>
                <h2>{__('General Settings', 'advanced-table-rate-shipping-for-woocommerce')}</h2>
            </div>

            {/* Method Title */}
            <label>{__('Method Title','advanced-table-rate-shipping-for-woocommerce')} <span data-tip data-for="mehtodTitle" className={style.tooltip + ' dashicons dashicons-editor-help'}></span>
                <ReactTooltip id="mehtodTitle" place="top" effect="solid">
                    {__('Method title for identify shipping method in list page and for shipping title in cart page, when flat rate are applicable.', 'advanced-table-rate-shipping-for-woocommerce')}
                </ReactTooltip>
            </label>
            <TextInput type="text" max={50} customClass={ props.config.general.title.length <= 0 ? 'error' : null } value={props.config.general.title} name="title" cmnt="general" onChange={props.handleUpdate}/>

            {/* Shipping Zone */}
            <label>{__('Shipping Zone','advanced-table-rate-shipping-for-woocommerce')} <span data-tip data-for="shippingzone" className={style.tooltip + ' dashicons dashicons-editor-help'}>
                <ReactTooltip id="shippingzone" place="top" effect="solid">
                    {__('Shipping Zone', 'advanced-table-rate-shipping-for-woocommerce')}
                </ReactTooltip>
                </span></label>
                {
                    typeof props.zones != 'undefined' && (
                        <>
                            <SelectInput 
                                type="select"  
                                name="selected_zone" 
                                value={props.selected_zone} 
                                refresh={props.refresh}
                                options={props.zones} 
                                onClick={props.refreshMethodLists}
                                onChange={props.methodZoneController} 
                            />
                        </>
                    )
                }


            {/* Taxs */}
            <label>{__('Tax Status','advanced-table-rate-shipping-for-woocommerce')} <span data-tip data-for="registerTip" className={style.tooltip + ' dashicons dashicons-editor-help'}>
                <ReactTooltip id="registerTip" place="top" effect="solid">
                    {__('Shipping Tax Status (Taxable / Non-Taxable)', 'advanced-table-rate-shipping-for-woocommerce')}
                </ReactTooltip>
                </span></label>
            <SelectInput type="select"  name="tax_status" value={props.config.general.tax_status} cmnt="general" options={taxs} onChange={props.handleUpdate}/>


            {/* Base Table Rules */}
            <label>{__('Base Table Rules','advanced-table-rate-shipping-for-woocommerce')} <span data-tip data-for="baseTableRow" className={style.tooltip + ' dashicons dashicons-editor-help'}>
                <ReactTooltip id="baseTableRow" place="top" effect="solid">
                    {__('Advance Shipping default rules', 'advanced-table-rate-shipping-for-woocommerce')}
                </ReactTooltip>
                </span></label>
            <SelectInput type="select" options={rules} name="base_rule" value={props.config.general.base_rule} cmnt="general" onChange={props.handleUpdate}/>


            {/* Handling Fee */}
            <label>{__('Handling fee','advanced-table-rate-shipping-for-woocommerce')} <span data-tip data-for="handlingfee" className={style.tooltip + ' dashicons dashicons-editor-help'}>
                <ReactTooltip id="handlingfee" place="top" effect="solid">
                    {__('Product Handling Fee', 'advanced-table-rate-shipping-for-woocommerce')}
                </ReactTooltip>
            </span></label>
            <TextInput 
                type="number" 
                max={999999999999} 
                min="0" 
                step="any" 
                value={props.config.general.handlingfree} 
                cmnt="general" 
                name="handlingfree" 
                onChange={props.handleUpdate}
                placeholder="00.00"
            />

            {/* Flat Rate */}
            <label>{__('Flat Rate','advanced-table-rate-shipping-for-woocommerce')} <span data-tip data-for="flatrate" className={style.tooltip + ' dashicons dashicons-editor-help'}>
                <ReactTooltip id="flatrate" place="top" effect="solid">
                    {__('Flat rate should be applicable while table rates are return empty.', 'advanced-table-rate-shipping-for-woocommerce')}
                </ReactTooltip>
                </span></label>
        
                <TextInput 
                    type="number" 
                    min="0" 
                    max={999999999999}
                    step="0.01" 
                    value={props.config.general.flatrate} 
                    name="flatrate" 
                    cmnt="general" 
                    placeholder="00.00" 
                    onChange={props.handleUpdate} 
                />


            <Userpermission 
                handleUpdate={props.handleUpdate} 
                config={props.config} 
                roles={roles} 
                onRemoveRoles={props.onRemoveRoles}
                />

                {
                    props.config.general.title.length <= 0 || (props.config.general.shipping_option_appear_for == 'specific' && props.config.general.ship_to_role.length <= 0)
                    ?
                        <button onClick={props.saveHandler} disabled >
                            {__('Next', 'advanced-table-rate-shipping-for-woocommerce')}
                        </button>
                    :
                    <NavLink className={style.navlink} onClick={(e) => {props.saveHandler(e)}} to={`/${params.instance_id}/shipping_by_city`}>
                        {__('Next', 'advanced-table-rate-shipping-for-woocommerce')}
                    </NavLink>
                }

        </div>
        </div>
        </>
    )

}

export default General;


