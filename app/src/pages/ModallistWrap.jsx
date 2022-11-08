import React, {useEffect,  useState} from "react"
import Modal from 'react-awesome-modal'
import FetchWP from '../utils/fetchWP'
import style from './Methodlists.scss'
import Acoloader from '../utils/acoloader'
import TextInput from "../components/TextInput"
import SelectInput from "../components/SelectInput" 


import { HashRouter, NavLink, useNavigate } from "react-router-dom"
import ReactTooltip from "react-tooltip"

const { __ } = window.wp.i18n;



const BlankIcon = () => {
    return(
        <>
            <svg width="80" height="80" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M53.1668 18.8742V36.6367C52.466 36.2983 51.6927 36.0567 50.8227 35.9117L50.0735 35.7908L49.4451 34.4858C48.116 31.7792 45.941 30.2083 43.5002 30.2083C41.0593 30.2083 38.8843 31.7792 37.5552 34.4858L36.9026 35.7908L36.1777 35.9117C33.3018 36.395 31.2235 37.99 30.4743 40.2617C29.7493 42.5575 30.4985 45.0708 32.5527 47.1492L33.3018 47.8983L33.2293 48.1883C32.746 50.3392 32.9393 51.9825 33.3985 53.1667H18.8743C10.0777 53.1667 4.8335 47.9225 4.8335 39.1258V18.8742C4.8335 10.0775 10.0777 4.83333 18.8743 4.83333H39.126C47.9227 4.83333 53.1668 10.0775 53.1668 18.8742Z" fill="#1A78F2"/>
                <path d="M46.2066 36.105L46.9799 37.6758C47.3666 38.4492 48.3574 39.1742 49.1791 39.3192L50.2183 39.4883C53.3841 40.02 54.1091 42.34 51.8616 44.6117L50.8949 45.5783C50.2424 46.2308 49.9041 47.4875 50.0975 48.4058L50.2183 48.9858C51.0883 52.8042 49.0582 54.2783 45.7474 52.2725L45.0466 51.8375C44.2008 51.33 42.7991 51.33 41.9532 51.8375L41.2525 52.2725C37.9175 54.2783 35.9116 52.8042 36.7816 48.9858L36.9024 48.4058C37.0957 47.5117 36.7574 46.2308 36.1049 45.5783L35.1383 44.6117C32.8908 42.3158 33.6158 40.02 36.7816 39.4883L37.8208 39.3192C38.6666 39.1742 39.6333 38.4492 40.0199 37.6758L40.7933 36.105C42.2916 33.0842 44.7083 33.0842 46.2066 36.105Z" fill="#1A78F2"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M38.9796 19.1333C39.7708 19.7466 39.915 20.8851 39.3017 21.6763L33.7084 28.8917C32.2708 30.7099 29.6201 31.0415 27.7709 29.6125L27.7583 29.6028L23.3441 26.1293C23.0714 25.9221 22.691 25.9737 22.4839 26.2408C22.4837 26.2411 22.4841 26.2406 22.4839 26.2408L16.7334 33.7068C16.1226 34.4999 14.9845 34.6476 14.1915 34.0368C13.3984 33.426 13.2507 32.2879 13.8615 31.4948L19.6149 24.0251C21.0502 22.1677 23.7115 21.832 25.5649 23.2641L25.5775 23.2739L29.9917 26.7474C30.2673 26.9567 30.6556 26.9028 30.8612 26.6479L36.4367 19.4554C37.05 18.6642 38.1885 18.52 38.9796 19.1333Z" fill="#1A78F2"/>
            </svg>
        </>
    )
}

const Singlemethod = (props) => {
    return(
        <>
            <div className={style.tr}>
                <div>
                    <TextInput
                        type="checkbox"
                        name="item_select"
                        value={props.index}
                        onChange={props.changeHandler}
                        defaultChecked={props.selected.includes(props.index.toString()) ? true : false}
                    />
                </div>
                <div>
                    <NavLink className={style.titleNav} onClick={(e) => props.setInstanceID(props.method.instance_id)} to={`/${props.method.instance_id}/general`}>
                        {props.method.title}
                    </NavLink>
                </div>
                <div>
                    {props.method.no_of_options}
                </div>
                <div>
                    {props.method.zone_name}
                </div>
                <div>
                    <label className={style.switch}>
                        <input type="checkbox" 
                            defaultChecked={props.method.enabled == 'yes' ? true : false} 
                            value={1} 
                            name="enabled" 
                            onClick={(e) => props.changeHandler(e, props.index)} 
                            />
                        <span className={style.slider}></span>
                    </label>
                </div>
                <div>
                    
                    <NavLink data-tip data-for="quickEdit" onClick={(e) => props.setInstanceID(props.method.instance_id)} className="dashicons dashicons-edit-large" to={`/${props.method.instance_id}/general`}>
                    </NavLink>
                    <ReactTooltip id="quickEdit" place="bottom" effect="solid">
                                {__('Quick Edit.', 'advanced-table-rate-shipping-for-woocommerce')}
                    </ReactTooltip>

                    <span onClick={(e) => props.deleteThis(e, props.index)} data-tip data-for="deleteMethod" className="dashicons dashicons-trash"></span>
                        <ReactTooltip id="deleteMethod" place="bottom" effect="solid">
                                    {__('Delete this Options.', 'advanced-table-rate-shipping-for-woocommerce')}
                        </ReactTooltip>
                </div>
            </div>
        </>
    )
}

const Blankmethods = (props) => {
    return(
        <>
         <div className={style.tr}>
            <div className={style.optionBody}>
                <div className={`${style.d_flex} ${style.blankRow}`}>
                    <div className={style.blankItem}>
                        <div className={style.icon}>
                            <span><BlankIcon /></span>
                        </div>
                        <p>{__('No shipping method have been added yet.', 'advanced-table-rate-shipping-for-woocommerce')}</p>
                        <button  onClick={props.addNewMethod}>
                            <span className="dashicons dashicons-plus-alt2"></span>
                            {__('Add New Method', 'advanced-table-rate-shipping-for-woocommerce')}
                        </button>
                    </div>
                </div>
            </div>
         </div>
        </>
    )
}

//Modal List Wrap 
const ModallistWrap = (props) => {
    const navigate = useNavigate()
    useEffect(() => {
        if(props.redirect)
            navigate(`/${props.instance_id}/general`)
    }, [props.redirect])


    return(
        <>
            {/* New Method & title edit modal */}
            <div className={style.modalWrap}>
                <Modal visible={props.zone_modal} width="500" height="300" effect="fadeInUp"  onClickAway={props.openEditZoneModule}>
                    <div className={style.text_left}>
                        <div>
                            <h2>{__('Add New Shipping Method', 'advanced-table-rate-shipping-for-woocommerce')}
                                <a href="#" onClick={props.openEditZoneModule}>
                                    <span>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </span>
                                </a>
                            </h2>
                            <p>{__('Select Shipping Zone', 'advanced-table-rate-shipping-for-woocommerce')}</p>
    
                            {
                                typeof props.zones != 'undefined' && (
                                    <>
                                        <SelectInput 
                                            type="select"
                                            name="selected_zone"
                                            onClick={props.refreshMethodLists}
                                            options={props.zones}
                                            refresh={props.refresh}
                                            onChange={props.onChange}
                                        />
                                    </>
                                )
                            }
    
    
                            <a target='_blank' href={`${window.acotrs_object.base_url}admin.php/?page=wc-settings&tab=shipping&zone_id=new`} className={style.addNewShingMethod} >
                                {__('Add New Shipping Zone', 'advanced-table-rate-shipping-for-woocommerce')}
                            </a>
    
                            <button onClick={props.addNewMethod}>
                                {__('Done', 'advanced-table-rate-shipping-for-woocommerce')}
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
                
                <div className={style.methodListsWrap}>
                    <div>
                        <div>
                            <div className={style.header}>
                                <div>
                                    <h2>{__('Shipping Methods', 'advanced-table-rate-shipping-for-woocommerce')}</h2>
                                </div>
                                <div>
                                    
                                    {
                                        (props.selected.length > 0) && (
                                            <button className={style.deleteAll} onClick={(e) => props.deleteSelectedZone(e)}>
                                                <span className="dashicons dashicons-trash"></span>
                                                {__('Delete Selected', 'advanced-table-rate-shipping-for-woocommerce')}
                                            </button>
                                        )
                                    }
        
                                    <button onClick={props.selectShippingZone}>
                                        <span className="dashicons dashicons-plus-alt2"></span>
                                        {__('New Method', 'advanced-table-rate-shipping-for-woocommerce')}
                                    </button>
                                </div>
                            </div>
        
                            <div className={style.listbody}>
                                <div className={style.table}>
                                    <div className={style.thead}>
                                        <div className={style.tr}>
                                            <div>
                                                <TextInput
                                                    type="checkbox"
                                                    name="select_all"
                                                    onChange={(e) => props.changeHandler(e)}
                                                    defaultChecked={props.methods.length == props.selected.length ? true : false}
                                                />
                                            </div>
                                            <div>{__('Method Title', 'advanced-table-rate-shipping-for-woocommerce')}</div>
                                            <div>{__('No. of Options', 'advanced-table-rate-shipping-for-woocommerce')}</div>
                                            <div>{__('Zone', 'advanced-table-rate-shipping-for-woocommerce')}</div>
                                            <div>{__('Status', 'advanced-table-rate-shipping-for-woocommerce')}</div>
                                            <div></div>
                                        </div>
                                    </div>
        
                                    <div className={style.tbody}>
                                        {
                                        (() => {
                                            if(props.methods.length > 0){
                                                    return(
                                                        <>
                                                        {
                                                            props.methods.map((k, v) => {
                                                                return(
                                                                    <Singlemethod 
                                                                        key={v} 
                                                                        index={v}
                                                                        method={k} 
                                                                        setInstanceID={props.setInstanceID}
                                                                        changeHandler={props.changeHandler}
                                                                        deleteThis={props.deleteThisMetod}
                                                                        selected={props.selected}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                        </>
                                                    )
                                            }else{
                                                    return(
                                                        <>
                                                            <Blankmethods addNewMethod={props.selectShippingZone} />
                                                        </>
                                                    ) 
                                            }
                                        })()
                                        } 
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Banner */}
                    </div>
                </div>
            </>
    )
}

export default ModallistWrap