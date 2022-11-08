import React, { useEffect, useState } from "react";
import {HashRouter, Route, Routes, useRoutes} from 'react-router-dom'

import { DateUtils } from "react-day-picker";
import FetchWP from '../utils/fetchWP';

import General from "./General";

import ShippingByCity from "./ShippingByCity";
import Methodconditions from "./Methodconditions";
import Additionaloptions from "./Additionaloptions";
import Tableofrates from "./Tableofrates";
import Acoloader from '../utils/acoloader';


import ModallistWrap from './ModallistWrap'

const { __ } = window.wp.i18n;

const defaultItem = {
    general: {
        title: 'Title', 
        tax_status: 'taxable', 
        base_rule: '', 
        handlingfree: 0, 
        flatrate: 0, 
        shipping_option_appear_for: 'everyone', 
        ship_to_role: ''
    }, 
    shipping_by_city: {
        enable: 0, 
        desable_other: 0, 
        region_is: 'excluding', 
        allowed_city: ''
    }, 
    method:{
        volume: '', 
        operand: '/', 
        exclude_weight: 0,
        method_condtion: []
    }, 
    additional_settings:{
        ad_exclude_weight: 0, 
        ad_include_coupons: 0, 
        ad_round_weight: 0, 
        ad_hide_this_method: 0, 
        ad_hide_other_method: 0, 
        ad_set_delivery_date_automatically: 0, 
        ad_get_minimum_value_from_condition: 0,
        ad_single_class_only: 'disabled'
    }, 
    table_of_rates: [
        {
            title: 'first title', 
            rows: [], 
            option_id: 1
        }
    ]
}



class App extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            saving: false,
            refresh: false,
            zone_modal: false,
            redirect: false,
            csv_modal:false,
            action_delete: false,
            uplodable_csv_data:[],
            licence_key: '',
            selected:[],
            methods: [],
            zones: [],
            selected_zone: 0,
            config: {
                general: {
                    title: 'Title', 
                    tax_status: 'taxable', 
                    base_rule: '', 
                    handlingfree: 0, 
                    flatrate: 0, 
                    shipping_option_appear_for: 'everyone', 
                    ship_to_role: ''
                }, 
                shipping_by_city: {
                    enable: 0, 
                    desable_other: 0, 
                    region_is: 'excluding', 
                    allowed_city: ''
                }, 
                method:{
                    volume: '', 
                    operand: '/', 
                    exclude_weight: 0,
                    method_condtion: []
                }, 
                additional_settings:{
                    ad_exclude_weight: 0, 
                    ad_include_coupons: 0, 
                    ad_round_weight: 0, 
                    ad_hide_this_method: 0, 
                    ad_hide_other_method: 0, 
                    ad_set_delivery_date_automatically: 0, 
                    ad_get_minimum_value_from_condition: 0,
                    ad_single_class_only: 'disabled'
                }, 
                table_of_rates: [
                    {
                        title: 'first title', 
                        rows: [], 
                        option_id: 1
                    }
                ]
            }, 
            roles: false, 
            count: 2,
            rates: [
                {
                    title: __('Shipping Option', 'advanced-table-rate-shipping-for-woocommerce')
                }
            ], 
            activeIndex: 0, 
            json_modal: false,
            deleterows: [], 
            wc:[],
            instance_id: false
        }

        this.fetchWP = new FetchWP({
            restURL: window.acotrs_object.root,
            restNonce: window.acotrs_object.api_nonce,
        });

        this.addNewTableRateRow = this.addNewTableRateRow.bind(this)
        this.addNewCondition = this.addNewCondition.bind(this)
        this.addNewCosts = this.addNewCosts.bind(this)
        this.deleteCondition = this.deleteCondition.bind(this)
        this.deleteSelected = this.deleteSelected.bind(this)
        this.delAction = this.delAction.bind(this)
        this.saveHandler = this.saveHandler.bind(this)
        this.methodRegenerate = this.methodRegenerate.bind(this)
        this.tabActiveIndex = this.tabActiveIndex.bind(this)
        this.csvFileForUpload = this.csvFileForUpload.bind(this)
        this.addDaliveryDays = this.addDaliveryDays.bind(this)
        this.modalHandler = this.modalHandler.bind(this)
        this.importSettingsFromJson = this.importSettingsFromJson.bind(this)
        this.settingUploadHandlerFromJson = this.settingUploadHandlerFromJson.bind(this)
        this.onRemoveMultipleSelectVal = this.onRemoveMultipleSelectVal.bind(this)
        this.deleteSelectedZone = this.deleteSelectedZone.bind(this)
        this.setInstanceID = this.setInstanceID.bind(this)
        }
    


    /**
     * 
     * @param {instd id from linki} instance_id 
    */
    setInstanceID = (instance_id) => {
        this.setState({instance_id: instance_id})
        this.getConfig(instance_id)
    }


    /**
     * Regenerate method
     */
    methodRegenerate = () => {
        this.setState({redirect: false})
        this.getConfig(false)
    }

    /**
     * 
     * @param {Clicked tab index} index 
     */
    tabActiveIndex = (index) => {
        if(typeof index.target.attributes.order == 'undefined')
            return false

        this.setState({activeIndex: index.target.attributes.order.nodeValue})
    }


    saveHandler = (e) =>{
        if(e.target.type == 'submit') e.preventDefault();

        let {config} = this.state
        this.setState({loader: true})
        this.updateWPDB(config);
    }

    /**
     * 
     * @param {Default event} event 
     * Add new table rates by button click
     */
    addNewRates = (event) => {
        event.preventDefault();
        let {config} = this.state
        let newNumber = parseInt(config.table_of_rates.length) + 1;
        config.table_of_rates[config.table_of_rates.length] = {
            title: __('Shipping Option #', 'advanced-table-rate-shipping-for-woocommerce') + newNumber, 
            option_id: newNumber
        }

        this.setState({config:config})        
    }


    /**
     * 
     * @param {default event} e 
     * Table rates left checkbox click handler
     */
    delAction = (e) => {
        // e.preventDefault();
        let {config, deleterows, activeIndex} = this.state
        const item = e.target.attributes.row_index.nodeValue;
        
        switch(item){
            case "all":
                deleterows = [];
                if(e.target.checked){
                    config.table_of_rates[activeIndex].rows.map((v, index) => {
                        deleterows.push(String(index));
                    });      
                }
            break;
            default:
                if(e.target.checked){
                    deleterows.push(item);
                }else{
                    const newArray = [] 
                    const index = deleterows.indexOf(parseInt(item));
                    deleterows.forEach(function(k, v){
                        if(k != parseInt(item)) newArray.push(k);
                    });
                   deleterows = newArray;
                }
        }

        this.setState({deleterows: deleterows})
    }



    /**
     * 
     * @param {default click event} e 
     * Add new Table rows for table rates
     */

    addNewTableRateRow = (e) => {
        // Add New Table rate row in "Table of Rates"
        e.preventDefault();
        let {config} = this.state

        const index = e.target.attributes.index.nodeValue;
        if( typeof config.table_of_rates[index].rows == 'undefined' ) config.table_of_rates[index].rows = [];
        config.table_of_rates[index].rows.push({
            costs: [{cost_unit: '', cost: 0}],
            conditions: [{condition: 'subtotal', delivery_day: 0, compair: 'greater_than', cvalue: 0}]
        });
        
        this.setState({config:config})
        
    }



    /**
     * 
     * @param {default element event} e 
     */
    addNewCondition = (e) =>{
        // Add New Condition to Contions column in "Table of Rates"        
        e.preventDefault();
        let {config} = this.state
        const index = e.target.attributes.index.nodeValue, 
        row_index = e.target.attributes.row_index.nodeValue;
        
        if(typeof config.table_of_rates[index].rows[row_index].conditions == 'undefined') config.table_of_rates[index].rows[row_index].conditions = [];
        config.table_of_rates[index].rows[row_index].conditions.push({condition: 'subtotal', compair: 'greater_than', cvalue: 0});
        
        this.setState({config:config})

    }


    /**
     * 
     * @param {index number} index 
     * @param {row index number} row_index 
     * @param {order number} order 
     * @param {column name} colmn 
     */
    deleteCondition = (index, row_index, order, colmn) => {
        // Delete Each condition from "table of rates" tab
        let {config} = this.state
        
        if(colmn == 'cost'){
            config.table_of_rates[index].rows[row_index].costs.splice(order,1); // remove index number element from conditions
        }else{
            config.table_of_rates[index].rows[row_index].conditions.splice(order,1); // remove index number element from conditions
        }
        
        this.setState({config:config})
        this.updateWPDB(config);
    }


    /**
     * 
     * @param {default event} e 
     * @param {list of delete rows index} delrows
     */
    deleteSelected = (e, delrows) => {
        e.preventDefault();
        let {config} = this.state

        delrows.sort(function(a, b){return b-a});
        delrows.map((k, v) => {
            config.table_of_rates[this.state.activeIndex].rows.splice(parseInt(k), 1); // remove index number element from conditions
        });

        this.setState({config: config, action_delete: true, deleterows: []})
        
        this.updateWPDB(config);
    }





    /**
     * React Ready event
     */

     componentDidMount() {
        this._isMounted = true;
        if(this._isMounted){
            this.fetchData();
        }

        var scrollpos = window.scrollY;
        var header = document.querySelector("#acotrs_ui_root");
        var adminbar = document.querySelector('#wpadminbar');

        function add_class_on_scroll() {
            header.classList.add("fixed-header--active");
        }
        
        function remove_class_on_scroll() {
                header.classList.remove("fixed-header--active");
        }
        
        window.addEventListener('scroll', function(){ 
            let scrollpos = window.scrollY;
            let topHeight = scrollpos - adminbar.offsetHeight;

            if(topHeight > header.offsetTop){
                add_class_on_scroll();
            }
            else {
                remove_class_on_scroll();
            }
        });
    }
    


    /**
     * Reset Date Picker Range
    */
    resetDatePicker = (e, event_index) => {
        e.preventDefault();
        let {config} = this.state
        
        config['method']['method_condtion'][event_index].cvalue = {};
        this.setState({config:config})
    }


    /**
     * 
     * @param {Default Event} event 
     * Update data by onchange input type
     */
    handleUpdate = (event, event_index = false, event_type = false, order_index = false ) => {
        let {config, activeIndex} = this.state

        // Special Cracrater valication for text input
        if(typeof event.target != 'undefined' && (event.target.type == 'text' || event.target.type == 'textarea')){
            event.target.value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
            if(event.target.name == 'allowed_city')
                event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '')
        }
        
        
        //Min  number validation
        if(typeof event.target != 'undefined' && typeof event.target.min != 'undefined'){
            if(parseInt(event.target.value) < parseInt(event.target.min)){
                event.target.value = event.target.min;
            }
        }

        //max number validation 
        if(typeof event.target != 'undefined' && typeof event.target.max != 'undefined' && event.target.type == 'number'){
            if(event.target.max.length < event.target.value.length) 
                event.target.value = parseFloat(event.target.value).toFixed(2)

            if( parseInt(event.target.value) > parseInt(event.target.max)){
                event.target.value =  Math.floor(event.target.value / 10)
            }
        }

        if(order_index !== false){
            if(event_type === 'row_date_range' ){
                if(typeof config.table_of_rates[activeIndex].rows[event_index].conditions[order_index].cvalue.from != 'undefined') config.table_of_rates[activeIndex].rows[event_index].conditions[order_index].cvalue.from = new Date(config.table_of_rates[activeIndex].rows[event_index].conditions[order_index].cvalue.from);
                if(typeof config.table_of_rates[activeIndex].rows[event_index].conditions[order_index].cvalue.to != 'undefined') config.table_of_rates[activeIndex].rows[event_index].conditions[order_index].cvalue.to = new Date(config.table_of_rates[activeIndex].rows[event_index].conditions[order_index].cvalue.to);
                const range = DateUtils.addDayToRange(event, config.table_of_rates[activeIndex].rows[event_index].conditions[order_index].cvalue);

                config.table_of_rates[activeIndex].rows[event_index].conditions[order_index].cvalue = range;
            }else{
                config.table_of_rates[activeIndex].rows[event_index].conditions[order_index].cvalue = event;
            }

        }else{
            if(event[0] && typeof event[0].role != "undefined" && event_type == false){
                config['general']['ship_to_role'] = event;
            }
            
            // Update product state / Category State
            else if(event[0] && event_type != false && event_type != 'additional_settings' && event_type != 'additional_settings_weekend'){
                config['method']['method_condtion'][event_index].cvalue = event;
            }

            // Update specific days from additional tab
            else if(event_type == 'additional_settings'){
                config[event_type]['ad_special_days'] = event;
            }

            // Update weekend from additional tab
            else if(event_type == 'additional_settings_weekend'){
                config['additional_settings']['ad_weekends'] = event;
            }
            
            // Date Range
            else if(event && event_type == 'date_range'){
                if(typeof config['method']['method_condtion'][event_index].cvalue.from != 'undefined') config['method']['method_condtion'][event_index].cvalue.from = new Date(config['method']['method_condtion'][event_index].cvalue.from);
                if(typeof config['method']['method_condtion'][event_index].cvalue.to != 'undefined') config['method']['method_condtion'][event_index].cvalue.to = new Date(config['method']['method_condtion'][event_index].cvalue.to);
                const range = DateUtils.addDayToRange(event, config['method']['method_condtion'][event_index].cvalue);
            
                config['method']['method_condtion'][event_index].cvalue = range;
            }

            else{
                let tab = event.target.attributes.cmnt.nodeValue;
                switch(tab){
                    case "table_of_rates":
                        switch(event.target.type){
                            case "checkbox":
                                config[tab][event.target.attributes.index.nodeValue][event.target.name] = config[tab][event.target.attributes.index.nodeValue][event.target.name] ==0 || typeof config[tab][event.target.attributes.index.nodeValue][event.target.name] == 'undefined' ? 1 : 0;
                            break;
                            default: 
                            
                                if(typeof event.target.attributes.order != 'undefined'){
                                    const order = event.target.attributes.order.nodeValue, 
                                    row_index = event.target.attributes.row_index.nodeValue;
                                        if(typeof config[tab][event.target.attributes.index.nodeValue].rows[row_index].id == 'undefined'){
                                            config[tab][event.target.attributes.index.nodeValue].rows[row_index].id = row_index.toString();
                                        }
                                        switch(event.target.name){
                                            case "cost":
                                            case "cost_unit":
                                            case "cost_multipliedby":
                                            case "cost_forevery_unit":
                                            case "cost_forevery_condition":
                                            case "cost_forevery_extra_secondary":
                                                if(typeof config[tab][event.target.attributes.index.nodeValue].rows[parseInt(row_index)].costs == 'undefined'){
                                                    config[tab][event.target.attributes.index.nodeValue].rows[parseInt(row_index)].costs = [];
                                                    config[tab][event.target.attributes.index.nodeValue].rows[parseInt(row_index)].costs.push({});
                                                } 
                                                config[tab][event.target.attributes.index.nodeValue].rows[parseInt(row_index)].costs[parseInt(order)][event.target.name] = event.target.value;

                                            break;
                                            
                                            default:
                                                if(event.target.name === 'condition') config[tab][event.target.attributes.index.nodeValue].rows[parseInt(row_index)].conditions[parseInt(order)].cvalue = ''
                                                config[tab][event.target.attributes.index.nodeValue].rows[parseInt(row_index)].conditions[parseInt(order)][event.target.name] = event.target.value;
                                        }
                                    
                                    
                                }else{
                                    switch(event.target.name){
                                        case "description": 
                                            const row_index = event.target.attributes.row_index.nodeValue;
                                            config[tab][event.target.attributes.index.nodeValue].rows[parseInt(row_index)].description = event.target.value;
                                        break;
                                        default: 
                                            config[tab][event.target.attributes.index.nodeValue][event.target.name] = event.target.value;
                                    }
                                    
                                }
                                
                                
                        }
                        
                    break;
                    default:   
                        if(typeof config[tab] == 'undefined'){
                            config[tab] = {}
                        }

                        switch(event.target.type){
                            case "checkbox":
                                config[tab][event.target.name] = config[tab][event.target.name] == 0 ? 1 : 0;
                            break;
                            default:
                                if(
                                    event.target.name == 'condition'
                                    || event.target.name == 'compair'
                                    || event.target.name == 'cvalue'
                                ){
                                    
                                    if( 
                                        !config[tab]['method_condtion'][parseInt(event.target.attributes.index.nodeValue)] 
                                        || typeof config[tab]['method_condtion'][parseInt(event.target.attributes.index.nodeValue)] != 'object' 
                                    )
                                    {
                                        // New Condition
                                        config[tab]['method_condtion'][parseInt(event.target.attributes.index.nodeValue)] = {};
                                    }
                                    
                                    config[tab]['method_condtion'][parseInt(event.target.attributes.index.nodeValue)][event.target.name] = event.target.value;
                                }else{
                                    config[tab][event.target.name] = event.target.value;
                                }
                                
                        }
                }
            }
        }

        // Update config
        this.setState({config:config})
    }



    /**
     * 
     * @param {Update to DB} config 
     * Update rendered data to DB
     */
    updateWPDB = (config = {}) => {    
        let {instance_id, selected_zone} = this.state
        let data = {
            instance_id: instance_id,
            shipping_id: typeof acotrsshipping_settings.id != 'undefined' ? acotrsshipping_settings.id : acotrsshipping_settings.method_id,
            zone_id: selected_zone,
            config: config
        }


        this.fetchWP.post('updatedata/', data)
        .then(
            (json) => {
                this.setState({loader: false})
            }
        );  
    }



    /**
     * 
     * @param {Index Number} index 
     * Remove method conditions by index number
     */
    handleClose = (index) => {
        let condition = this.state.config;
        condition['method']['method_condtion'].splice(index,1); // remove index number element from method_condition

        this.setState({config:condition})
        
        // this.updateWPDB(condition);    
    }



    /**
     * Add New Method condition
     */
    addNewMethodCondition = () => {
        // Add new method condition
        let condition = this.state.config;
        condition['method']['method_condtion'][condition['method']['method_condtion'].length] = {
            compair: 'greater_than', 
            cvalue: '', 
            condition: 'subtotal'
        };
        this.setState({config:condition})
    }




    /**
     * 
     * @param {Drg and drop event} result 
     * Drag and drop by react-butifi-DND
     */
    dragNdropEvent = (result) => {
        let {config, activeIndex} = this.state
        let source = result.source.index;
        
        let destination = result.destination.index;
        let tem = config.table_of_rates[activeIndex].rows[source];
        
        config.table_of_rates[activeIndex].rows.splice(source, 1);
        
        config.table_of_rates[activeIndex].rows.splice(destination, 0, tem);

        this.setState({config:config})
        
        this.updateWPDB(config); 
    }


    /**
     * 
     * @param {Selected user role list from General Tab} selectedList 
     * @param {Removed item} removeItem 
     * Remove user role from General Tab
     */
    onRemoveMultipleSelectVal = (selectedList, removeItem, event_type = false, index = false, order=false) =>{
        let {config, activeIndex} = this.state
        switch(event_type){
            case "products":
            case "wc_cat":
                config['method']['method_condtion'][index].cvalue = selectedList;
            break;
            case 'table_of_rates': 
                config.table_of_rates[activeIndex].rows[index].conditions[order].cvalue = selectedList;
            break;
            default:
                config.general.ship_to_role = selectedList;
        }

        this.setState({config:config})
    }



    /**
     * 
     * @param {CSV file data as array} data 
     * @param {CSV file information} fileInfo 
     * CSV file upload & store to state
     */
    csvFileForUpload = (data, fileInfo) => {
        let ext = fileInfo.name.split('.').pop()        
        if(ext == 'csv'){
            this.setState({uplodable_csv_data: data})
        }else{
            this.setState({uplodable_csv_data: []})
        }
    }



    /**
     * 
     * @param {Default element event} e 
     * State CSV data store to DB
     */
    handleCSVUpload = (e) => {
        e.preventDefault();
        let {wc, config, activeIndex} = this.state
        
        let obj = {};

        this.state.uplodable_csv_data.forEach(function(element, index){
            if(index != 0 && element.length > 1 && element[1] != ''){
                element[0] = element[0] == '' ? '0' : element[0];
                index = parseInt(element[0]), obj[index] ? obj[index].push(element) : (obj[index] = [element]);
            }
        });

        
        
        for(var key in obj){
            let newItem = {};
            newItem.conditions = [];
            newItem.costs = [];
            newItem.description = '';
            
            obj[key].forEach((e, i) => {
                

                let cvalue = e[3];
                cvalue = cvalue.split(',');
                
                //If Product
                switch(e[1]){
                    case 'product':
                        let temp_cvalue = [];
                        cvalue.map((s) => {
                            let cvArray = wc.products.filter(obj=>obj.title === s.trim());
                            temp_cvalue.push( cvArray[0] );
                        });
                        cvalue = temp_cvalue;
                    case 'coupon':
                        let temp_copons = [];
                        cvalue.map((s) => {
                            let cvArray = wc.coupons.filter(obj=>obj.title === s.trim());
                            temp_copons.push( cvArray[0] );
                        });
                        cvalue = temp_copons;
                    break;
                    case 'dates':
                        cvalue = {
                            from: cvalue[0].trim(), 
                            to: cvalue[1].trim()
                        }
                    break;
                    case 'dayweek':
                        cvalue = cvalue.map((v) => {
                            return {
                                name: v,
                                label: v
                            }
                        });

                    break;
                    default:
                        if(e[1] in wc.terms){
                            let temp_terms = [];
                            cvalue.map((s) => {
                                let temArray = wc.terms[e[1]].filter(obj=>obj.name === s.trim());
                                temp_terms.push( temArray[0] );
                            });
                            cvalue = temp_terms;
                        }
                }

                newItem.conditions.push({
                        condition: e[1], 
                        compair: e[2], 
                        delivery_day: e[4], 
                        cvalue: cvalue
                    });
                newItem.costs.push({
                    cost: e[5], 
                    cost_unit: e[6], 
                    cost_multipliedby: e[7], 
                    cost_forevery_unit: e[8], 
                    cost_forevery_condition: e[9], 
                    cost_forevery_extra_secondary: e[10], 
                });
                if(e[11] != ''){
                    newItem.description = e[11]
                }

            });
            
            if(typeof config.table_of_rates[activeIndex].rows == 'undefined') config.table_of_rates[activeIndex].rows = []
            config.table_of_rates[activeIndex].rows.push(newItem);
        }
        
        this.setState({config:config, csv_modal: false})
        this.updateWPDB(config); 
    }


    /**
     * 
     * @param {Add new cost on table rates} e 
     */
    addNewCosts = (e) => {
        e.preventDefault();
        let {config} = this.state

        const index = e.target.attributes.index.nodeValue,
        row_index = e.target.attributes.row_index.nodeValue;
        
        if(typeof config.table_of_rates[index].rows[row_index].costs == 'undefined') config.table_of_rates[index].rows[row_index].costs = [];
        config.table_of_rates[index].rows[row_index].costs.push({});
        this.setState({config:config})
    }


    /**
     * 
     * @param {DEFAULT} event 
     * Open CSV modal for import rows via csv
     */
    modalHandler = (e) =>{
        e.preventDefault();
        let {csv_modal} = this.state
        this.setState({csv_modal: csv_modal ? false : true})
    }
 

    /**
     * 
     * @param {Number of table rows} e 
     * Delete table rates option permanently
     */
    deleteThisOption = (e) => {     
        let {config} = this.state
        config.table_of_rates.splice(e, 1);
        this.setState({config:config})
        
        this.updateWPDB(config); 
    }



    /**
     * Get configaration from DB
     */
    getConfig = (instance_id_is = false) => {
        this.setState({loader: true})

        if(!instance_id_is){
            let url = document.URL
            url = url.split('#/')

            if(url.length > 1){
                url = url[1].split('/')
                instance_id_is = url[0]
            }
        }

        const data = {
            instance_id: instance_id_is,
            shipping_id: typeof acotrsshipping_settings.id != 'undefined' ? acotrsshipping_settings.id : acotrsshipping_settings.method_id
        }


        this.fetchWP.post('config/', data)
            .then(
                (json) => {
                    this.setState({
                        loader: false, 
                        config: !json.config.error ? json.config : defaultItem,
                        wc: {
                            products: json.products, 
                            cat: json.cat, 
                            sclass: json.shipping_class, 
                            coupons: json.coupons, 
                            taxonomy: json.taxonomy, 
                            terms: json.terms
                        }, 
                        licenced: json.licenced, 
                        instance_id: data.instance_id, 
                        selected_zone: json.zone_id, 
                        zones: json.zones,
                        methods: json.methods
                    })
                })
                .catch(function(error) {
                    console.log('error', error);
                });
    }



    get_user_role = () => {
        // Get User roles
        this.fetchWP.get('user-roles/')
        .then(
            (json) => {
                this.setState({
                    loader: false, 
                    roles: json
                })
            }
        )
    }


    /**
     * Get Configaration And User role from DB
     */
    fetchData = () => {
        this.getConfig();
        this.get_user_role();

    }


    importSettingsFromJson = (e) => {
        e.preventDefault();
        let {json_modal} = this.state
        this.setState({json_modal: json_modal ? false : true})
    }

    /**
     * 
     * @param {Default Event} e 
     * Purpose: Handle json upload for settings
     */
    settingUploadHandlerFromJson = (e) =>{
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");

        fileReader.onload = e => {
            this.updateWPDB(JSON.parse(e.target.result));

            this.setState({config: JSON.parse(e.target.result), json_modal: false})
        }
    }


    /**
     * 
     * @param {default event} e 
     * Set Licence Key
     */
    setLicenceKey = (e) => {
        this.setState({licence_key: e.target.value})
    }


    /**
     * 
     * @param {default} e 
     * Save Licence key to DB
     */
    saveLicenceKey = (e) => {
        e.preventDefault();
        let {licence_key} = this.state
        let data = {
            licence_key : licence_key
        }
        
        this.fetchWP.post('update_licence_key/', data)
        .then(
            (json) => {
                this.setState({licenced: json.licenced, error_msg: json.msg})
            }
        );    
    }



    changeHandler = (e, index = false) => {
        let {selected, methods} = this.state

        switch(e.target.name){
            case 'enabled':
                methods[index].enabled = methods[index].enabled == 'yes' ? 'no' : 'yes'
                let data = {
                    instance_id: methods[index].instance_id, 
                    enabled: methods[index].enabled
                }

                this.fetchWP.post('change_shipping_option_status/', data)
                .then(
                    (json) => {
                        if(json == 'success'){
                            this.setState({
                                methods: methods
                            })
                        }
                })
                .catch(function(error) {
                    console.log('error', error);
                });
            break;
            case 'select_all':
                selected = selected.length <  methods.length ? Object.keys(methods) : []
                this.setState({selected: selected})
            break;
            case 'item_select':
                selected.includes(e.target.value) ? selected.splice(selected.indexOf(e.target.value), 1) :  selected.push(e.target.value)
                this.setState({selected: selected})
            break;
        }
    }


    /**
     * 
     * @param {event} e 
     * @description is delivery day field visiable or not
     */
    addDaliveryDays = (e) => {
        e.preventDefault()
        let {config, activeIndex} = this.state,
        row_index = e.target.attributes.row_index.nodeValue
        
        config.table_of_rates[activeIndex].rows[row_index].conditions[0].deliver_day_status = !config.table_of_rates[activeIndex].rows[row_index].conditions[0].deliver_day_status ? true : false
        this.setState({config:config})
    }



    /**
     * @param {default event} e
     * Input handler
     */
    methodZoneController = (e, instance_id = false) => {
        this.setState({selected_zone: e.target.value})
    }

    /**
      * 
      * @param {default event} e 
      * @param {instance_id} id 
      * @purpose   delete specific shipping option by id
      */
    deleteThisMetod = (e, index = false) => {
        let {methods} = this.state
        let data = {
            instance_id: methods[index].instance_id
        }

        
        this.fetchWP.post('delete_shipping_option/', data)
            .then(
                (json) => {
                    
                    if(typeof json.msg != 'undefined' && json.msg == 'success'){
                        methods.splice(index, 1)
                        this.setState({methods:methods})
                    }
            })
            .catch(function(error) {
                    console.log('error', error);
            })
    }


    

    /**
     * @param {default event} e
     * Add New methods
     */
    addNewMethod = (e) => {
        e.preventDefault();
        let {selected_zone} = this.state
        const data = {
            method_id : acotrsshipping_settings.method_id, 
            zone_id: selected_zone
        }

        this.fetchWP.post('add_new_method/', data)
            .then(
                (json) => {
                    if(typeof json.msg != 'undefined' && json.msg == 'success'){
                        this.setState({
                            instance_id: json.instance_id, 
                            loader: false, 
                            zone_modal: false, 
                            config:{
                                general: {
                                    title: 'Title', 
                                    tax_status: 'taxable', 
                                    base_rule: '', 
                                    handlingfree: 0, 
                                    flatrate: 0, 
                                    shipping_option_appear_for: 'everyone', 
                                    ship_to_role: ''
                                }, 
                                shipping_by_city: {
                                    enable: 0, 
                                    desable_other: 0, 
                                    region_is: 'excluding', 
                                    allowed_city: ''
                                }, 
                                method:{
                                    volume: '', 
                                    operand: '/', 
                                    exclude_weight: 0,
                                    method_condtion: []
                                }, 
                                additional_settings:{
                                    ad_exclude_weight: 0, 
                                    ad_include_coupons: 0, 
                                    ad_round_weight: 0, 
                                    ad_hide_this_method: 0, 
                                    ad_hide_other_method: 0, 
                                    ad_set_delivery_date_automatically: 0, 
                                    ad_set_delivery_date: 1,
                                    ad_get_minimum_value_from_condition: 0,
                                    ad_single_class_only: 'disabled', 
                                }, 
                                table_of_rates: [
                                    {
                                        title: 'first title', 
                                        rows: [], 
                                        option_id: 1
                                    }
                                ]
                            },
                            redirect: true
                        })
                    }
            })
            .catch(function(error) {
                    console.log('error', error);
            })
    }



    /**
     * 
     * @param {Default Event} e 
     * @return true/false
     */
    selectShippingZone = (e) => {
        e.preventDefault()
        let {zone_modal, zones} = this.state
        this.setState({
            zone_modal: zone_modal ? false:true,
            selected_zone: Object.keys(zones)[0]
        })  
        
    }


    /**
     * 
     * @param {default event} e 
     * return bullian
    */
    openEditZoneModule = (e) => {
        let {zone_modal} = this.state
        this.setState({zone_modal: zone_modal ? false : true})
    }


    /**
     * 
     * @param {default event} e 
     * @description refresh zone lists
     */
    refreshMethodLists = (e) => {
        this.setState({refresh: true})
        
        this.fetchWP.get('listsof_zones/')
            .then(
                (json) => {
                    this.setState({
                        refresh: false, 
                        zones: json.zones
                    })
                })
                .catch(function(error) {
                    console.log('error', error);
                });
    }



    
    /**
     * 
     * @param {default event} e 
     * @return success message
     */
    deleteSelectedZone = (e) => {
    e.preventDefault()
    let {selected, methods} = this.state
    selected.sort(function(a, b){return b-a})

    let post_methods = selected.map((k, v) => {
        return methods[k].instance_id
    })


    let data = {
        instance_id: post_methods
    }

    this.fetchWP.post('delete_methods/', data)
        .then(
            (json) => {
                if(typeof json.msg != 'undefined' && json.msg == 'success'){                        
                    selected.map((k, v) => {
                        methods.splice(k, 1)
                    })
                    this.setState({
                        methods: methods, 
                        selected: []
                    })
                }
        })
        .catch(function(error) {
                console.log('error', error);
        })
    
}

    
    
    /**
     * Render main component
     */
    render(){
    const {config, roles, loader, deleterows, wc, instance_id, csv_modal, redirect, action_delete, json_modal, zone_modal, refresh, activeIndex, selected, selected_zone, zones, uplodable_csv_data, methods} = this.state;

    if(loader) return <Acoloader/>;
    return (
            <>
                <HashRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ModallistWrap
                                    selected={selected}
                                    refreshMethodLists={this.refreshMethodLists}
                                    onChange={this.methodZoneController}
                                    selected_zone={selected_zone}
                                    zones={zones}
                                    refresh={refresh}
                                    methods={methods}
                                    addNewMethod={this.addNewMethod}
                                    changeHandler={this.changeHandler}
                                    deleteThisMetod={this.deleteThisMetod}
                                    selectShippingZone={this.selectShippingZone}
                                    openEditZoneModule={this.openEditZoneModule}
                                    zone_modal={zone_modal}
                                    redirect={redirect}
                                    instance_id={instance_id}
                                    setInstanceID={this.setInstanceID}
                                    deleteSelectedZone={this.deleteSelectedZone}
                                />
                            }
                        />
                        <Route
                            path="/:instance_id/general"
                            element={
                                <General 
                                    refreshMethodLists={this.refreshMethodLists}
                                    config={config} 
                                    handleUpdate={this.handleUpdate} 
                                    roles={roles}
                                    onRemoveRoles={this.onRemoveMultipleSelectVal}
                                    saveHandler={this.saveHandler}
                                    methodZoneController={this.methodZoneController}
                                    methodRegenerate={this.methodRegenerate}
                                    selected_zone={selected_zone}
                                    refresh={refresh}
                                    instance_id={instance_id}
                                    zones={zones}
                                />
                            }
                        />

                        <Route
                            path="/:instance_id/shipping_by_city"
                            element={
                                <ShippingByCity 
                                    config={config} 
                                    handleUpdate={this.handleUpdate} 
                                    saveHandler={this.saveHandler}
                                    instance_id={instance_id}
                                    methodRegenerate={this.methodRegenerate}
                                />
                            }
                        />

                        <Route
                            path="/:instance_id/method_condition"
                            element={
                                <Methodconditions 
                                    config={config} 
                                    addnew={this.addNewMethodCondition} 
                                    handleUpdate={this.handleUpdate} 
                                    handleClose={this.handleClose}
                                    saveHandler={this.saveHandler}
                                    onRemove={this.onRemoveMultipleSelectVal}
                                    resetDatePicker={this.resetDatePicker}
                                    wc={wc}
                                    instance_id={instance_id}
                                    methodRegenerate={this.methodRegenerate}
                                />
                            }
                        />

                        <Route
                            path="/:instance_id/additional_options"
                            element={
                                <Additionaloptions 
                                    config={config}
                                    handleUpdate={this.handleUpdate} 
                                    saveHandler={this.saveHandler}
                                    instance_id={instance_id}
                                    methodRegenerate={this.methodRegenerate}
                                />
                            }
                        />

                        <Route
                            path="/:instance_id/table_of_rates"
                            element={
                                <Tableofrates 
                                    addNewRates={this.addNewRates}
                                    tabActiveIndex={this.tabActiveIndex}
                                    config={config}
                                    activeIndex={activeIndex}
                                    handleUpdate={this.handleUpdate} 
                                    addNewRow={this.addNewTableRateRow}
                                    addNewCondition={this.addNewCondition}
                                    addNewCosts={this.addNewCosts}
                                    deleteCondition={this.deleteCondition}
                                    deleteSelected={this.deleteSelected}
                                    action_delete={action_delete}
                                    dragNdropEvent={this.dragNdropEvent}
                                    deleteThisOption={this.deleteThisOption}
                                    csvFileForUpload={this.csvFileForUpload}
                                    addDaliveryDays={this.addDaliveryDays}
                                    handleCSVUpload={this.handleCSVUpload}
                                    modalHandler={this.modalHandler}
                                    csv_modal={csv_modal}
                                    deleterows={deleterows}
                                    delAction={this.delAction}
                                    saveHandler={this.saveHandler}
                                    importFromJson={this.importSettingsFromJson}
                                    json_modal={json_modal}
                                    settingUploadHandlerFromJson={this.settingUploadHandlerFromJson}
                                    wc={wc}
                                    instance_id={instance_id}
                                    onRemove={this.onRemoveMultipleSelectVal}
                                    methodRegenerate={this.methodRegenerate}
                                    uplodable_csv_data={uplodable_csv_data}
                                    />
                            }
                        />
                    </Routes>
                </HashRouter>
            </>
        )
    }
}

export default App;