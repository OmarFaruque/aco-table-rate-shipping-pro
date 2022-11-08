import React from 'react'
import {NavLink, useParams} from "react-router-dom"

import style from './style.scss'

//Icons 
const { __ } = window.wp.i18n;


const settingIcon = () => {
    return(
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" >
            <path opacity="0.34" d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 11.88V10.12C1 9.08 1.85 8.22 2.9 8.22C4.71 8.22 5.45 6.94 4.54 5.37C4.02 4.47 4.33 3.3 5.24 2.78L6.97 1.79C7.76 1.32 8.78 1.6 9.25 2.39L9.36 2.58C10.26 4.15 11.74 4.15 12.65 2.58L12.76 2.39C13.23 1.6 14.25 1.32 15.04 1.79L16.77 2.78C17.68 3.3 17.99 4.47 17.47 5.37C16.56 6.94 17.3 8.22 19.11 8.22C20.15 8.22 21.01 9.07 21.01 10.12V11.88C21.01 12.92 20.16 13.78 19.11 13.78C17.3 13.78 16.56 15.06 17.47 16.63C17.99 17.54 17.68 18.7 16.77 19.22L15.04 20.21C14.25 20.68 13.23 20.4 12.76 19.61L12.65 19.42C11.75 17.85 10.27 17.85 9.36 19.42L9.25 19.61C8.78 20.4 7.76 20.68 6.97 20.21L5.24 19.22C4.33 18.7 4.02 17.53 4.54 16.63C5.45 15.06 4.71 13.78 2.9 13.78C1.85 13.78 1 12.92 1 11.88Z" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
}

const cityIcon = () => {
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 22H22" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2C13.6 2.64 15.4 2.64 17 2V5C15.4 5.64 13.6 5.64 12 5V2Z" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5V8" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 8H7C5 8 4 9 4 11V22H20V11C20 9 19 8 17 8Z" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.58 12H19.42" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path opacity="0.4" d="M7.99001 12V22" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round"/>
            <path opacity="0.4" d="M11.99 12V22" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round"/>
            <path opacity="0.4" d="M15.99 12V22" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round"/>
        </svg>

    )
}


const methodIcon = () => {
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.70001 9.26001L12 12.33L17.26 9.28001" stroke="#69717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17.77V12.32" stroke="#69717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.76 6.29001L7.56 8.07001C6.84 8.47001 6.23999 9.48001 6.23999 10.31V13.7C6.23999 14.53 6.83 15.54 7.56 15.94L10.76 17.72C11.44 18.1 12.56 18.1 13.25 17.72L16.45 15.94C17.17 15.54 17.77 14.53 17.77 13.7V10.3C17.77 9.47001 17.18 8.46001 16.45 8.06001L13.25 6.28001C12.56 5.90001 11.44 5.90001 10.76 6.29001Z" stroke="#69717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path opacity="0.4" d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25" stroke="#69717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path opacity="0.4" d="M2 9C2 5.13 5.13 2 9 2L7.95001 3.75" stroke="#69717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

const additionalIcon = () => {
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#69717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <g opacity="0.4">
            <path d="M15.5703 18.4996V14.5996" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.5703 7.45V5.5" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.5697 12.6502C17.0057 12.6502 18.1697 11.4861 18.1697 10.0502C18.1697 8.61426 17.0057 7.4502 15.5697 7.4502C14.1338 7.4502 12.9697 8.61426 12.9697 10.0502C12.9697 11.4861 14.1338 12.6502 15.5697 12.6502Z" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.42969 18.4998V16.5498" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.42969 9.4V5.5" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.43008 16.5496C9.86602 16.5496 11.0301 15.3855 11.0301 13.9496C11.0301 12.5137 9.86602 11.3496 8.43008 11.3496C6.99414 11.3496 5.83008 12.5137 5.83008 13.9496C5.83008 15.3855 6.99414 16.5496 8.43008 16.5496Z" stroke="#69717B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        </svg>
    )
}

const tableIcon = () => {
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.4">
            <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="#69717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V18" stroke="#69717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#69717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
const Tabs = (props) => {
    let params = useParams()

    return (
        <>
        <div className={style.wrap + ' ' + style.headertab}>
            <ul>
                <li>
                    <NavLink className={({ isActive }) => isActive? style.active : ''} to={`/${params.instance_id}/general`} >
                        <span className={`${style.tabindex}`}>{settingIcon()}</span>
                        {__('General Settings', 'advanced-table-rate-shipping-for-woocommerce')}
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive? style.active : ''} to={`/${params.instance_id}/shipping_by_city`} >
                        <span className={style.tabindex} >{cityIcon()}</span>
                        {__('City Settings', 'advanced-table-rate-shipping-for-woocommerce')}
                    </NavLink>
                </li>
                
                <li>
                    <NavLink className={({ isActive }) => isActive? style.active : ''} to={`/${params.instance_id}/method_condition`} >
                        <span className={style.tabindex}>{methodIcon()}</span>
                        {__('Method & Volumetric Settings', 'advanced-table-rate-shipping-for-woocommerce')}
                    </NavLink>
                </li>
              
                <li>
                    <NavLink className={({ isActive }) => isActive? style.active : ''} to={`/${params.instance_id}/additional_options`} >
                        <span className={style.tabindex}>{additionalIcon()}</span>
                        {__('Additional Options', 'advanced-table-rate-shipping-for-woocommerce')}
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive? style.active : ''} to={`/${params.instance_id}/table_of_rates`} >
                        <span className={style.tabindex}>{tableIcon()}</span>
                        {__('Table of Rates', 'advanced-table-rate-shipping-for-woocommerce')}
                    </NavLink>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Tabs;