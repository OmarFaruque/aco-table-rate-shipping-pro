import React, {useState, useEffect} from "react";
import style from './Singletablerate.scss';
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CsvDownloader from 'react-csv-downloader';
import ReactTooltip from "react-tooltip";
import { Multiselect } from 'multiselect-react-dropdown';
import Modal from 'react-awesome-modal';
import DayPicker from 'react-day-picker';
import AdditionalSettings from "./Additional-settings";
import MomentLocaleUtils, {
    formatDate
  } from 'react-day-picker/moment';


const { __ } = window.wp.i18n;


const Svgicon = () =>{
    return(
        <>
            <span className={style.svgIcon}>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-earmark-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                    <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"/>
                    <path fillRule="evenodd" d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </span>
        </>
    );
}


const CloseIcon = () => {
    return(
        <>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            
        </>
    );
}


const BlanckRow = () => {
    return(
        <>
            <tr>
                <td colSpan="4">{ __('No shipping options have been added yet.', 'advanced-table-rate-shipping-for-woocommerce') }</td>
            </tr>
        </>
    );
}


const Plusicon = () => {
    return(
        <>
        <span className={style.plusIcon}>
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </span>
        </>
    );
}


const SvgOrderIcon = () =>{
    return(
        <>
        <span className={style.orderIcon}>
            <svg width="7" height="18" viewBox="0 0 7 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="1.21429" cy="2.09934" rx="1.21429" ry="1.20896" fill="#0F1A29" fillOpacity="0.5"/>
                <ellipse cx="1.21429" cy="6.93519" rx="1.21429" ry="1.20896" fill="#0F1A29" fillOpacity="0.5"/>
                <ellipse cx="1.21429" cy="11.771" rx="1.21429" ry="1.20896" fill="#0F1A29" fillOpacity="0.5"/>
                <ellipse cx="1.21429" cy="16.6068" rx="1.21429" ry="1.20896" fill="#0F1A29" fillOpacity="0.5"/>
                <ellipse cx="5.46429" cy="13.5845" rx="1.21429" ry="1.20896" fill="#0F1A29" fillOpacity="0.5"/>
                <ellipse cx="5.46429" cy="8.74863" rx="1.21429" ry="1.20896" fill="#0F1A29" fillOpacity="0.5"/>
                <ellipse cx="5.46429" cy="3.91276" rx="1.21429" ry="1.20896" fill="#0F1A29" fillOpacity="0.5"/>
            </svg>
        </span>
        </>
    );
}


/*
* Component For every selector
*/
const ForeveryComponent = (props) =>{
    const [foreveryoptions, setForeveryoptions] = useState({
        subtotal: acotrs_object.currency_symbol, 
        weight: 'kg', 
        dimensions: 'cm', 
        quantity: 'Item(s)'
    });

    const [costoptionitems, setCostoptionitems] = useState({
        length: 'Length', 
        width: 'Width', 
        height: 'Height', 
        s_area: 'Surface Area', 
        volume: 'Volume'
    });

    
    return(
        <>
            <TextInput 
                type="number" 
                placeholder="0.00" 
                name="cost_forevery_unit"
                onChange={props.onChange}
                cmnt="table_of_rates" 
                min="0"
                max="999999"
                index={props.tab_index}
                row_index={props.row_index}
                order={props.order}
                value={typeof props.values.cost_forevery_unit != 'undefined' ? props.values.cost_forevery_unit : ""}


            />
            <SelectInput 
                type="select" 
                options={foreveryoptions} 
                onChange={props.onChange} 
                name="cost_forevery_condition"
                cmnt="table_of_rates"
                index={props.tab_index}
                row_index={props.row_index}
                order={props.order}
                value={typeof props.values.cost_forevery_condition != 'undefined' ? props.values.cost_forevery_condition : ""}
            />


            
            { typeof props.values.cost_forevery_condition != 'undefined' &&  props.values.cost_forevery_condition == "dimensions"
                ? 
                <SelectInput 
                    type="select" 
                    options={costoptionitems} 
                    onChange={props.onChange} 
                    name="cost_forevery_extra_secondary"
                    cmnt="table_of_rates"
                    index={props.tab_index}
                    row_index={props.row_index}
                    order={props.order}
                    value={ typeof props.values.cost_forevery_extra_secondary != 'undefined' ? props.values.cost_forevery_extra_secondary : '' }
                    /> 
                : 
                null 
            }
        </>
    );
}



/*
* Single Cost
*/
const Singlecost = (props) => {
    const [costoptions, setCostoptions] = useState({
        "": acotrs_object.currency_symbol, 
        "%": "%", 
        "x": "Multiplied by", 
        "every": "For Every",
    });
    const [order, setKey] = useState(props.order);
    const [multby, setMultby] = useState({
        weight: 'Weight', 
        height: 'Height', 
        width: 'Width', 
        length: 'Length', 
        area: 'Surface Area', 
        volume: 'Volume', 
        quantity: 'Item Quantity', 
        products: 'Products'
    });
    const [multipliedby, setMultipliedby] = useState(false);
    const [forevery, setForevery] = useState(false);

    const costConditions = (cost_unit) =>{
        if(cost_unit == '' || cost_unit == '%'){
            setForevery(false);
            setMultipliedby(false);
        }
        if(cost_unit == 'x'){
            setForevery(false);
            setMultipliedby(true);
        }
        if(cost_unit == 'every'){
            setMultipliedby(false);
            setForevery(true);
        }
    }


    useEffect(  () => {
        costConditions(props.values.cost_unit);
    });


    return(
        <>
            <div className={style.singleCost}>
                <div className={style.row}>
                <TextInput 
                    type="number" 
                    placeholder="00.00"
                    name="cost"
                    onChange={props.onChange}
                    cmnt='table_of_rates'
                    min={0}
                    max={999999999999}
                    index={props.tab_index}
                    row_index={props.row_index}
                    order={props.order}
                    value={typeof props.values.cost != 'undefined' ? props.values.cost : "" }
                />
                <SelectInput
                    type="select" 
                    options={costoptions} 
                    name="cost_unit"
                    onChange={props.onChange}
                    cmnt="table_of_rates"
                    index={props.tab_index}
                    row_index={props.row_index}
                    order={props.order}
                    value={typeof props.values.cost_unit != 'undefined' ? props.values.cost_unit : ""}
                />
                    <div className={style.closeBtn}>
                        <span className={style.closeIcon} onClick={() => props.deleteCondition(props.tab_index, props.row_index, props.order, 'cost')}>  
                            <CloseIcon />
                        </span>
                    </div>
                </div>

                <div className={`${style.row} ${style.last}`}>
                    {
                    multipliedby ? 
                    <SelectInput 
                        type="select" 
                        options={multby} 
                        name="cost_multipliedby"
                        onChange={props.onChange}
                        cmnt="table_of_rates" 
                        index={props.tab_index}
                        row_index={props.row_index}
                        order={props.order}
                        value={typeof props.values.cost_multipliedby != 'undefined' ? props.values.cost_multipliedby : ""}
                    /> 
                    : null }

                    { forevery ? 
                    <ForeveryComponent 
                        onChange={props.onChange}
                        values={props.values}
                        order={props.order}
                        row_index={props.row_index}
                        tab_index={props.tab_index}
                    /> 
                    : null }
                </div>

            </div>
        </>
    );
}


/*
* Single Condition
*/
const SingleCondition = (props) => {
    const [order, setKey] = useState(props.order);
    const [options, setOptions] = useState({
        subtotal: __('Subtotal', 'advanced-table-rate-shipping-for-woocommerce'), 
        quantity: __('Quantity', 'advanced-table-rate-shipping-for-woocommerce'),
        weight: 'Weight', 
        height: 'Height', 
        width: 'Width', 
        length: 'Length', 
        area: 'Surface Area', 
        volume: 'Volume', 
        product: 'Products', 
        dates: 'Date Range', 
        times: 'Times', 
        dayweek: 'Day of Week', 
        coupon: 'Coupon', 
        ...props.wc.taxonomy
    });
    const [days, setDays] = useState([
        {name: 'monday', label: 'Monday'}, 
        {name: 'tuesday', label: 'Tuesday'}, 
        {name: 'wednesday', label: 'Wednesday'}, 
        {name: 'thursday', label: 'Thursday'}, 
        {name: 'friday', label: 'Friday'}, 
        {name: 'saturday', label: 'Saturday'}, 
        {name: 'sunday', label: 'Sunday'}
    ]);

    const [compairOptions, setCompairOptions] = useState({
        "greater_than": "Greater than (>=)", 
        "less_than": "Less than (<=)", 
        "equal_to": "Equal to"
    });

    const [modal, setModal] = useState(false);

    const [includetypes, setIncludetypes] = useState(['product', 'dates', 'times', 'dayweek', 'coupon', ...Object.keys(props.wc.taxonomy)]);



    useEffect( () => {
    });

    const modalHandler = (e) =>{
        e.preventDefault();
        setModal(false);
    }

    const displayDayRangePopUP = () => {
        setModal(true);
  }




    return(
        <>
            <div className={style.singleCondition}>
                {/* Condition */}
                <SelectInput 
                    type="select" 
                    options={options} 
                    name="condition"
                    onChange={props.onChange} 
                    cmnt="table_of_rates"
                    value={props.values.condition}
                    index={props.tab_index}
                    row_index={props.row_index}
                    order={props.order}
                /> 

                <div className={style.closeBtn}>
                    <span className={style.closeIcon} onClick={() => props.deleteCondition(props.tab_index, props.row_index, props.order, 'condition')}>  
                        <CloseIcon />
                    </span>
                </div>
                {
                    (() => {
                        if(includetypes.includes(props.values.condition) ){
                            var condoptions;
                            if(props.values.condition == 'times'){
                                condoptions = {
                                    before: __('Before', 'advanced-table-rate-shipping-for-woocommerce'), 
                                    after: __('After', 'advanced-table-rate-shipping-for-woocommerce')
                                    }
                            }else{
                                condoptions = {
                                    includes: __('Includes', 'advanced-table-rate-shipping-for-woocommerce'), 
                                    excludes: __('Excludes', 'advanced-table-rate-shipping-for-woocommerce')
                                }
                            }

                            return(
                                <>
                                    <SelectInput type="select" 
                                        options={condoptions} 
                                        onChange={props.onChange} 
                                        index={props.tab_index} 
                                        value={props.values.compair} 
                                        cmnt="table_of_rates" 
                                        name="compair" 
                                        row_index={props.row_index}
                                        order={props.order}
                                    />
                                    <div className={style.multiselectItems}>
                                        {
                                            (() => {
                                                switch(props.values.condition){
                                                    case "product":
                                                        return(
                                                            <>
                                                                <div className={style.multiselect}>
                                                                    <Multiselect 
                                                                        onSelect={(event) => props.onChange(event, props.row_index, 'wc_products', props.order)} 
                                                                        onRemove={(selectedList, removeItem) => props.onRemove(selectedList, removeItem, 'table_of_rates', props.row_index, props.order)} 
                                                                        selectedValues={props.values.cvalue[0] && typeof props.values.cvalue[0].id != 'undefined' ? props.values.cvalue : null} 
                                                                        options={props.wc.products} 
                                                                        displayValue="title" 
                                                                    />
                                                                </div>
                                                            </>
                                                        )
                                                    break;
                                                    case 'dates':
                                                        const from = typeof props.values.cvalue.from != 'undefined' ? new Date(props.values.cvalue.from) : undefined;
                                                        const to = typeof props.values.cvalue.to != 'undefined' ? new Date(props.values.cvalue.to) : undefined;
                                                        const modifiers = { start: from, end: to };
                                                        return(
                                                            <>
                                                                <Modal visible={modal} width="900" height="370" effect="fadeInLeft" onClickAway={modalHandler}>
                                                                   <div className={style.datePickerWrap}>
                                                                        <DayPicker
                                                                            className={style.Selectable}
                                                                            numberOfMonths={3}
                                                                            selectedDays={[from, { from, to }]}
                                                                            modifiers={modifiers}
                                                                            onDayClick={ (day) => props.onChange(day, props.row_index, 'row_date_range', props.order)}
                                                                        />
                                                                        
                                                                         <div className={style.buttonGroup}>
                                                                            <button className={style.resetBtn} onClick={(e) => props.resetDatePicker(e, props.index)} type="button">{__('Reset', 'advanced-table-rate-shipping-for-woocommerce')}</button>
                                                                            <button onClick={modalHandler} type="button">{__('Apply', 'advanced-table-rate-shipping-for-woocommerce')}</button>
                                                                         </div>
                                                                         <a className={style.closeBtn} href="#" onClick={modalHandler}>
                                                                            <span>
                                                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                                                </svg>
                                                                            </span>
                                                                        </a>
                                                                   </div>
                                                                </Modal>
                                                                <TextInput
                                                                    type="text"
                                                                    customClass={style.datarangePicker}
                                                                    onClick={displayDayRangePopUP}
                                                                    value={typeof from != 'undefined' && typeof to != 'undefined' ? formatDate(from, 'MMMM Do YYYY') + ' - ' + formatDate(to, 'MMMM Do YYYY') : ''}
                                                                    readOnly='readOnly'
                                                                />
                                                            </>
                                                        )
                                                    break;
                                                    case 'times':
                                                        return(
                                                            <>
                                                                <TextInput
                                                                    type="time"
                                                                    onChange={props.onChange}
                                                                    name="cvalue"
                                                                    cmnt="table_of_rates"
                                                                    value={props.values.cvalue}
                                                                    index={props.tab_index}
                                                                    row_index={props.row_index}
                                                                    order={props.order}
                                                                />
                                                            </>
                                                        )
                                                    break;
                                                    case 'dayweek':
                                                        return(
                                                            <> 
                                                                <div className={style.multiselect}>
                                                                    <Multiselect 
                                                                        onSelect={(event) => props.onChange(event, props.row_index, 'dayweek', props.order)} 
                                                                        onRemove={(selectedList, removeItem) => props.onRemove(selectedList, removeItem, 'table_of_rates', props.row_index, props.order)} 
                                                                        selectedValues={props.values.cvalue[0] && typeof props.values.cvalue[0].label != 'undefined' ? props.values.cvalue: null} 
                                                                        options={days} 
                                                                        displayValue="label" 
                                                                    />
                                                                </div>
                                                            </>
                                                        )
                                                    break;
                                                    case 'coupon':
                                                        return(
                                                            <> 
                                                                <div className={style.multiselect}>
                                                                    <Multiselect 
                                                                        onSelect={(event) => props.onChange(event, props.row_index, 'coupon', props.order)} 
                                                                        onRemove={(selectedList, removeItem) => props.onRemove(selectedList, removeItem, 'table_of_rates', props.row_index, props.order)} 
                                                                        selectedValues={props.values.cvalue[0] && typeof props.values.cvalue[0].id != 'undefined' ? props.values.cvalue: null} 
                                                                        options={props.wc.coupons} 
                                                                        displayValue="title" 
                                                                    />
                                                                </div>
                                                            </>
                                                        )
                                                    break;
                                                    default:
                                                        return(
                                                            <> 
                                                                <div className={style.multiselect}>
                                                                    <Multiselect 
                                                                        onSelect={(event) => props.onChange(event, props.row_index, props.values.condition, props.order)} 
                                                                        onRemove={(selectedList, removeItem) => props.onRemove(selectedList, removeItem, 'table_of_rates', props.row_index, props.order)} 
                                                                        selectedValues={props.values.cvalue[0] && typeof props.values.cvalue[0].term_id != 'undefined' ? props.values.cvalue: null} 
                                                                        options={props.wc.terms[props.values.condition]} 
                                                                        displayValue="name" 
                                                                    />
                                                                </div>
                                                            </>
                                                        )
                                                }
                                            })()
                                        }
                                    </div>
                                </>
                            )
                        }else{
                            return(
                                <>
                                    {/* Compair */}
                                    <SelectInput 
                                        type="select" 
                                        options={compairOptions} 
                                        onChange={props.onChange} 
                                        name="compair"
                                        cmnt="table_of_rates"
                                        value={props.values.compair}
                                        index={props.tab_index}
                                        row_index={props.row_index}
                                        order={props.order}
                                    /> 
                                    <TextInput 
                                        type="number" 
                                        placeholder={ __('Value', 'advanced-table-rate-shipping-for-woocommerce') } 
                                        onChange={props.onChange} 
                                        name="cvalue"
                                        min="0"
                                        step="0.01"
                                        max={999999999999}
                                        cmnt="table_of_rates"
                                        value={props.values.cvalue}
                                        index={props.tab_index}
                                        row_index={props.row_index}
                                        order={props.order}
                                    />
                                </>
                            )
                        }
                    })()
                }


                {
                (props.order <= 0 && props.deliver_day_status) && (
                    <div className={style.delivery_Day_input}>
                        <span className={style.before}>{__('Delivery Within', 'advanced-table-rate-shipping-for-woocommerce')} :</span>
                        <TextInput 
                            type="number" 
                            placeholder={__('Delivery Day', 'advanced-table-rate-shipping-for-woocommerce')} 
                            name="delivery_day"
                            min="0"
                            step="1"
                            max={999}
                            onChange={props.onChange}
                            cmnt="table_of_rates"
                            index={props.tab_index}
                            row_index={props.row_index}
                            order={props.order}
                            value={typeof props.values.delivery_day != 'undefined' ? props.values.delivery_day : ""}
                        />
                        <span className={style.after}>{__('Day(s)', 'advanced-table-rate-shipping-for-woocommerce')}</span>
                    </div> 
                )                     
                }


                
                
            </div>
            
        </>
    );
}


const SingleRows = (props) => {
    const [conditions, setConditions] = useState([]);
    const [costs, setCosts] = useState([{}]);
    const [selected, setSelected] = useState(0);



    const addNewCondition = (event) => {
        event.preventDefault();
        setConditions([...conditions, ""]);
        
    }

    const addAdditionalCost = (event) => {
        event.preventDefault();
        setCosts([...costs, ""]);
    }

    useEffect(()=>{
        if(typeof props.values.conditions != 'undefined' ) setConditions(props.values.conditions);
        
        if(typeof props.values.costs != 'undefined' ){
            setCosts(props.values.costs);
        }
        
        
        let deleterows = props.deleterows; 
        deleterows = Object.values(deleterows);

        let cselected = (deleterows.length > 0 && deleterows.includes(props.row_index.toString())) ? 1 : 0;

        setSelected(cselected);

    });


    return(
        
        <>
                <td>
                        <TextInput 
                            type="checkbox"
                            defaultChecked={selected}
                            row_index={props.row_index}
                            onChange={props.delAction}
                            value={1}
                        /> 
                </td>
                <td>
                    {
                            conditions.map((v, index) => {
                                    return(
                                        <SingleCondition
                                            key={index} 
                                            order={index} 
                                            row_index={props.row_index}
                                            tab_index={props.index}
                                            onChange={props.onChange}
                                            deleteCondition={props.deleteCondition}
                                            values={v}
                                            d_day={props.d_day}
                                            wc={props.wc}
                                            deliver_day_status = {typeof props.values.conditions[0].deliver_day_status != 'undefined' ? props.values.conditions[0].deliver_day_status : false}
                                            onRemove={props.onRemove}
                                        />
                                    );
                            })
                    }
                        <a 
                            onClick={props.addNewCondition} 
                            href="#"
                            index={props.index}
                            row_index={props.row_index}
                        > 
                            <Plusicon /> { __('Add Condition', 'advanced-table-rate-shipping-for-woocommerce') }
                        </a>

                        {
                            typeof props.values.conditions[0] != 'undefined' && (
                                <a 
                                    onClick={(e) => props.addDaliveryDays(e)} 
                                    href="#"
                                    index={props.index}
                                    row_index={props.row_index}
                                    className={style.addDeliveryDay}
                                > 
                                    {
                                        (typeof props.values.conditions[0].deliver_day_status == 'undefined' || (typeof props.values.conditions[0].deliver_day_status != 'undefined' && !props.values.conditions[0].deliver_day_status)) && (
                                            <>
                                                <Plusicon /> { __('Add Delivery Days', 'advanced-table-rate-shipping-for-woocommerce') }
                                            </>
                                        )
                                    }
        
                                    {
                                        (typeof props.values.conditions[0].deliver_day_status != 'undefined' && props.values.conditions[0].deliver_day_status) && (
                                            <>
                                                <span className="dashicons dashicons-minus"></span>&nbsp; { __('Remove Delivery Days', 'advanced-table-rate-shipping-for-woocommerce') }
                                            </>
                                        )
                                    }
                                    
        
                                </a>
                            )
                        }
                    </td>
                <td>

                    
                    {/* Costs */}
                    {
                        costs.map((v, index) => {
                                if(typeof v.cost_unit == 'undefined') v.cost_unit = '';
                                return(
                                    <Singlecost 
                                        key={index} 
                                        order={index} 
                                        values={v}
                                        row_index={props.row_index}
                                        tab_index={props.index}
                                        onChange={props.onChange}
                                        deleteCondition={props.deleteCondition}
                                    />
                                );
                        })

                    }
                    <a 
                        className={style.mt_1} 
                        onClick={props.addNewCosts} 
                        index={props.index}
                        row_index={props.row_index}
                        href="#"> <Plusicon /> 
                        { __('Add Additional Cost', 'advanced-table-rate-shipping-for-woocommerce') }
                    </a>
                </td>
                <td>
                    <TextInput 
                        type="textarea" 
                        name="description"
                        onChange={props.onChange}
                        cmnt="table_of_rates"
                        max={120}
                        index={props.index}
                        row_index={props.row_index}
                        value={typeof props.values.description != 'undefined' ? props.values.description : ""}
                    />
                </td>
                <td className={style.changeOrder}>
                    <SvgOrderIcon />
                </td>
        </>
    );
}




export default class Optionbody extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            show_options: false,
            equation: '/', 
            rows: [], 
            settings: props.t_rates, 
            count: 1, 
            selectAll: 0, 
            csv_columns: [
                {
                    id: 'index',
                    displayName: __('Index', 'advanced-table-rate-shipping-for-woocommerce')
                }, 
                {
                    id: 'condition',
                    displayName: __('Condition', 'advanced-table-rate-shipping-for-woocommerce'), 
                }, 
                {
                    id: 'compair',
                    displayName: __('Compare', 'advanced-table-rate-shipping-for-woocommerce'), 
                }, 
                {
                    id: 'cvalue',
                    displayName: __('Condition value', 'advanced-table-rate-shipping-for-woocommerce'), 
                }, 
                {
                    id: 'delivery_day',
                    displayName: __('Delivery day', 'advanced-table-rate-shipping-for-woocommerce'), 
                },
                {
                    id: 'cost',
                    displayName: __('Cost', 'advanced-table-rate-shipping-for-woocommerce'), 
                }, 
                {
                    id: 'cost_unit',
                    displayName: __('Cost unit', 'advanced-table-rate-shipping-for-woocommerce'), 
                }, 
                {
                    id: 'cost_multipliedby',
                    displayName: __('Cost multiplied by', 'advanced-table-rate-shipping-for-woocommerce'), 
                }, 
                {
                    id: 'cost_forevery_unit',
                    displayName: __('Cost for every unit', 'advanced-table-rate-shipping-for-woocommerce'), 
                }, 
                {
                    id: 'cost_forevery_condition',
                    displayName: __('Cost for every condition', 'advanced-table-rate-shipping-for-woocommerce'), 
                }, 
                {
                    id: 'cost_forevery_extra_secondary',
                    displayName: __('Cost for every extra secondary', 'advanced-table-rate-shipping-for-woocommerce'), 
                }, 
                {
                    id: 'description',
                    displayName: __('Description', 'advanced-table-rate-shipping-for-woocommerce'), 
                }
            ]
            
        }

        this.handleUpdate = this.handleUpdate.bind(this);  
        this.addNewRow = this.addNewRow.bind(this);  
        
    }

    
    handleUpdate = (event) => {
        this.setState({data: {[event.target.name]: event.target.value} });
    }

    /**
     * @return true/fale
     * @desc    More options visible on mouse hover
     */
    mouseOverMoreOptions = (e) => {
        this.setState({
            show_options: true
        })
    }

    /**
     * @return  bullian
     * @description back to previous if mouse leave
     */
     mouseOutOptions = (e) => {
        this.setState({
            show_options: false
        })
     }

    componentDidUpdate(){
    }

    addNewRow = (event) => {
        // Add New Row to condition table
        event.preventDefault();
        this.setState({rows: [...this.state.rows, ""]});
        
    }


    
    render(){  

        let {show_options} = this.state

        if(typeof this.props.t_rates.rows == 'undefined' || (typeof this.props.t_rates.rows != 'undefined' && this.props.t_rates.rows.length <= 0)){
            return(
                <>
                    <div className={style.optionBody}>
                        <div className={`${style.d_flex} ${style.blankRow}`}>
                            <div className={style.blankItem}>
                                <div className={style.icon}>
                                    <span>
                                        <svg width="80" height="80" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M53.1668 18.8742V36.6367C52.466 36.2983 51.6927 36.0567 50.8227 35.9117L50.0735 35.7908L49.4451 34.4858C48.116 31.7792 45.941 30.2083 43.5002 30.2083C41.0593 30.2083 38.8843 31.7792 37.5552 34.4858L36.9026 35.7908L36.1777 35.9117C33.3018 36.395 31.2235 37.99 30.4743 40.2617C29.7493 42.5575 30.4985 45.0708 32.5527 47.1492L33.3018 47.8983L33.2293 48.1883C32.746 50.3392 32.9393 51.9825 33.3985 53.1667H18.8743C10.0777 53.1667 4.8335 47.9225 4.8335 39.1258V18.8742C4.8335 10.0775 10.0777 4.83333 18.8743 4.83333H39.126C47.9227 4.83333 53.1668 10.0775 53.1668 18.8742Z" fill="#1A78F2"/>
                                            <path d="M46.2066 36.105L46.9799 37.6758C47.3666 38.4492 48.3574 39.1742 49.1791 39.3192L50.2183 39.4883C53.3841 40.02 54.1091 42.34 51.8616 44.6117L50.8949 45.5783C50.2424 46.2308 49.9041 47.4875 50.0975 48.4058L50.2183 48.9858C51.0883 52.8042 49.0582 54.2783 45.7474 52.2725L45.0466 51.8375C44.2008 51.33 42.7991 51.33 41.9532 51.8375L41.2525 52.2725C37.9175 54.2783 35.9116 52.8042 36.7816 48.9858L36.9024 48.4058C37.0957 47.5117 36.7574 46.2308 36.1049 45.5783L35.1383 44.6117C32.8908 42.3158 33.6158 40.02 36.7816 39.4883L37.8208 39.3192C38.6666 39.1742 39.6333 38.4492 40.0199 37.6758L40.7933 36.105C42.2916 33.0842 44.7083 33.0842 46.2066 36.105Z" fill="#1A78F2"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M38.9796 19.1333C39.7708 19.7466 39.915 20.8851 39.3017 21.6763L33.7084 28.8917C32.2708 30.7099 29.6201 31.0415 27.7709 29.6125L27.7583 29.6028L23.3441 26.1293C23.0714 25.9221 22.691 25.9737 22.4839 26.2408C22.4837 26.2411 22.4841 26.2406 22.4839 26.2408L16.7334 33.7068C16.1226 34.4999 14.9845 34.6476 14.1915 34.0368C13.3984 33.426 13.2507 32.2879 13.8615 31.4948L19.6149 24.0251C21.0502 22.1677 23.7115 21.832 25.5649 23.2641L25.5775 23.2739L29.9917 26.7474C30.2673 26.9567 30.6556 26.9028 30.8612 26.6479L36.4367 19.4554C37.05 18.6642 38.1885 18.52 38.9796 19.1333Z" fill="#1A78F2"/>
                                        </svg>
                                    </span>
                                </div>
                                <p>{__('No shipping options have been added yet.', 'advanced-table-rate-shipping-for-woocommerce')}</p>
                                <button index={this.props.index} onClick={this.props.addNewRow}>
                                    <span index={this.props.index} className="dashicons dashicons-plus-alt2"></span>
                                    {__('Add Table Row', 'advanced-table-rate-shipping-for-woocommerce')}
                                </button>
                                <button className={style.svgImport} data-tip data-for="importFromCSVTip" onClick={this.props.importFromCSV}> <Svgicon /> 
                                    {__('Import from CSV', 'advanced-table-rate-shipping-for-woocommerce')}
                                </button>

                                {
                                    this.props.length > 1 && (
                                        <>
                                            <button onClick={()=>this.props.deleteThisOption(this.props.index)} value="" className={`${style.deleteBtn} ${style.deleteBtnEmpty}`}> <span className={style.svgIcon + " dashicons dashicons-trash"}></span>{__('Delete this method', 'advanced-table-rate-shipping-for-woocommerce')}</button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        return(
            <>
                 {/* Option Body */}
                 <div className={style.optionBody}>
                    <div className={style.d_flex}>
                        {/* Left Side */}
                        <div className={style.condition}>
                            {/* Row Controller */}
                            <div className={style.rawOperation}>

                                <div className={style.d_flex}>
                                    <div className={style.text_left}>
                                    <h3>{this.props.t_rates.title}</h3>
                                        {
                                            (() => {
                                                if(this.props.deleterows.length > 0){
                                                    return(
                                                        <>
                                                        {/* Delete table rows */}
                                                        <button data-tip data-for="deleteTableRowTip" value="" onClick={ (e) => this.props.deleteSelected(e, this.props.deleterows)} className={`${style.deleteBtn} ${style.all}`}> 
                                                        <span className={style.svgIcon + " dashicons dashicons-trash"}></span>
                                                        {__('Delete Selected', 'advanced-table-rate-shipping-for-woocommerce')}
                                                        </button>
                                                            <ReactTooltip id="deleteTableRowTip" place="top" effect="solid">
                                                                {__('Delete selected rows.', 'advanced-table-rate-shipping-for-woocommerce')}
                                                            </ReactTooltip>
                                                        </>
                                                    )
                                                }
                                            })()  
                                        }
                                    </div>
                                    <div className={style.text_right}>


                                    {
                                        (() => {

                                            let newArray = [];

                                            if(typeof this.props.t_rates.rows != 'undefined'){
                                                this.props.t_rates.rows.map((v, index) => {
                                                    let round = Math.max(v.conditions.length, v.costs.length);
                                                    for(let i = 0; i < round; i++){
                                                        let cvalue = typeof v.conditions[i] != 'undefined' ? v.conditions[i].cvalue : '';
                                                        if(typeof v.conditions[i] != 'undefined' && typeof v.conditions[i].cvalue == 'object' && v.conditions[i].condition !== 'dates' && v.conditions[i].cvalue[0] !== null ){
                                                                cvalue = v.conditions[i].cvalue.map((cv) => {
                                                                    return cv.title ? cv.title : cv.name;
                                                                });
                                                            cvalue = cvalue.join(', ');
                                                        }

                                                        if(typeof v.conditions[i] != 'undefined' && typeof v.conditions[i].cvalue == 'object' && v.conditions[i].condition === 'dates' ){
                                                            cvalue = v.conditions[i].cvalue.from + ', ' + v.conditions[i].cvalue.to;
                                                        }
                                                        
                                                        newArray.push(
                                                            {
                                                                index: v.id, 
                                                                condition: typeof v.conditions[i] != 'undefined' ? v.conditions[i].condition : '', 
                                                                compair: typeof v.conditions[i] != 'undefined' ? v.conditions[i].compair : '', 
                                                                cvalue: cvalue,
                                                                delivery_day: typeof v.costs[i] != 'undefined' && typeof v.costs[i].delivery_day != 'undefined' ? v.costs[i].delivery_day : '', 
                                                                cost: typeof v.costs[i] != 'undefined' ? v.costs[i].cost : '',
                                                                cost_unit: typeof v.costs[i] != 'undefined' ? v.costs[i].cost_unit : '',
                                                                cost_multipliedby: typeof v.costs[i] != 'undefined' ? v.costs[i].cost_multipliedby : '',
                                                                cost_forevery_unit: typeof v.costs[i] != 'undefined' ? v.costs[i].cost_forevery_unit : '',
                                                                cost_forevery_condition: typeof v.costs[i] != 'undefined' ? v.costs[i].cost_forevery_condition : '',
                                                                cost_forevery_extra_secondary: typeof v.costs[i] != 'undefined' ? v.costs[i].cost_forevery_extra_secondary : '',
                                                                description: typeof v.description != 'undefined' ? v.description : ''
                                                            }
                                                        );      
                                                    } 
                                                });
                                            }
                                            
                                            return(
                                                <>
                                                <CsvDownloader 
                                                    filename="advanced-table-rate-shipping-for-woocommerce" 
                                                    datas={newArray} 
                                                    separator=";"
                                                    wrapColumnChar=""
                                                    columns={this.state.csv_columns}
                                                    >
                                                    <button data-tip data-for="exporttoCSVTip" onClick={ (e)=>{e.preventDefault()} }><span className={style.svgIcon + " dashicons dashicons-database-export"}></span>
                                                    {__('Export to CSV', 'advanced-table-rate-shipping-for-woocommerce')}
                                                    </button>
                                                    <ReactTooltip id="exporttoCSVTip" place="top" effect="solid">
                                                                {__('Table row export to CSV.', 'advanced-table-rate-shipping-for-woocommerce')}
                                                    </ReactTooltip>
                                                </CsvDownloader>
                                                </>
                                            )
                                        })()
                                    }
                                    
                                        <button data-tip data-for="importFromCSVTip" onClick={this.props.importFromCSV}> <Svgicon /> 
                                            {__('Import from CSV', 'advanced-table-rate-shipping-for-woocommerce')}
                                        </button>
                                            <ReactTooltip id="importFromCSVTip" place="top" effect="solid">
                                                                {__('Import From CSV.', 'advanced-table-rate-shipping-for-woocommerce')}
                                            </ReactTooltip>
                                        {/* <a className={style.downloadCSV} data-tip data-for="downloadDemoCSVTip" download target="_blank" href={window.acotrs_object.assets_url + 'csv/acotrs_sample.csv'} ><span className={style.svgIcon + " dashicons dashicons-download"}></span></a>
                                            <ReactTooltip id="downloadDemoCSVTip" place="top" effect="solid">
                                                                {__('Download Demo CSV file.', 'advanced-table-rate-shipping-for-woocommerce')}
                                            </ReactTooltip> */}

                                        <button data-tip data-for="addNewTableRowTip" index={this.props.index} onClick={this.props.addNewRow}> <span index={this.props.index} className={style.svgIcon + " dashicons dashicons-plus-alt2"}></span> {__('Add Table Row', 'advanced-table-rate-shipping-for-woocommerce')}  </button>
                                            <ReactTooltip id="addNewTableRowTip" place="top" effect="solid">
                                                                {__('Add new table row.', 'advanced-table-rate-shipping-for-woocommerce')}
                                            </ReactTooltip>
                                        
                                        {
                                            this.props.length > 1 && (
                                                <>
                                                    <button onClick={()=>this.props.deleteThisOption(this.props.index)}  data-tip data-for="deleteTableRowTip" value="" className={style.deleteBtn}> 
                                                        <span className={style.svgIcon + " dashicons dashicons-trash"}></span>
                                                    </button>
                                                        <ReactTooltip id="deleteTableRowTip" place="top" effect="solid">
                                                            {__('Delete this method.', 'advanced-table-rate-shipping-for-woocommerce')}
                                                        </ReactTooltip>        
                                                </>
                                            )
                                        }
                                        

                                        <button data-tip data-for="moreOPtions" onMouseOver={this.mouseOverMoreOptions} className={style.moreOption}> 
                                            <span className={style.svgIcon + " dashicons dashicons-ellipsis"}></span>
                                        </button>

                                        <div className={ show_options ? `${style.moreOptions} ${style.show}` : style.moreOptions}>
                                            <span className={style.moreOptiondisable} onClick={this.mouseOutOptions}></span>
                                            <AdditionalSettings
                                                index={this.props.index}
                                                t_rates={this.props.t_rates}
                                                onChangeValue={this.props.onChangeValue}
                                            />
                                        </div>
                                        
                                            
                                    </div>
                                </div>
                            </div>   
    
                            {/* Raw Tables */}
                                <div className={style.RawTable}>
                                    <div className={style.wraptable}>
                                        <table className={style.table}>
                                            <thead>
                                                <tr>
                                                    <td>
                                                        <TextInput 
                                                            type="checkbox" 
                                                            onChange={this.props.delAction}
                                                            row_index="all"
                                                            value={1}
                                                            defaultChecked={this.props.t_rates.rows && this.props.deleterows.length == this.props.t_rates.rows.length && this.props.t_rates.rows.length > 0 ? 1 : 0}
                                                        />
                                                    </td>
                                                    <td>{__( 'Conditions' )}</td>
                                                    <td>{__('Costs')}</td>
                                                    <td>{__('Description')}</td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                                <DragDropContext onDragEnd={this.props.dragNdropEvent}>
                                                    <Droppable droppableId="characters">
                                                        {(provided, snapshot) => (
                                                            <tbody className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                                            {
                                                                this.props.t_rates.rows.map((v, index) => {
                                                                    if(typeof v.costs == 'undefined') v.costs = [{}];
                                                                    if(typeof v.conditions == 'undefined') v.conditions = [{}];
                                                                        return(
                                                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                                                {(provided, snapshot)=>(
                                                                                    <tr {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                                    <SingleRows 
                                                                                        key={index} 
                                                                                        items={v}
                                                                                        addDaliveryDays={this.props.addDaliveryDays}
                                                                                        sortId={index}
                                                                                        index={this.props.index}
                                                                                        row_index={index}
                                                                                        onChange={this.props.onChangeValue} 
                                                                                        values={v}
                                                                                        addNewCondition={this.props.addNewCondition}
                                                                                        addNewCosts={this.props.addNewCosts}
                                                                                        deleteCondition={this.props.deleteCondition}
                                                                                        selectAll={this.state.selectAll}
                                                                                        delAction={this.props.delAction}
                                                                                        deleterows={this.props.deleterows}
                                                                                        wc={this.props.wc}

                                                                                        onRemove={this.props.onRemove}
                                                                                    />
                                                                                    </tr>
                                                                                )}
                                                                                
                                                                            </Draggable>
                                                                        );
                                                                    
                                                                })
                                                            }
                                                            {provided.placeholder}
                                                            </tbody>
                                                        )}
                                                    </Droppable>
                                                </DragDropContext>
                                        </table>
                                    </div>
                                </div>
                        </div> 
                        {/* End Left Side */}
                       


                    </div>
                </div>
                {/* End Option body */}
            </>
        );
    }
}