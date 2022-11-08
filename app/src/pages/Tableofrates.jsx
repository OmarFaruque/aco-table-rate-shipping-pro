import React, {useState, useEffect, useRef} from "react";
import style from './Tableofrates.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Singletablerate from "../components/Singletablerate/Singletablerate";
import Modal from 'react-awesome-modal';
import TextInput from "../components/TextInput";
import CSVReader from 'react-csv-reader'
import ReactTooltip from "react-tooltip";
import Topbar from './Topbar'
import Ctabs from "../components/Tabs"


const { __ } = window.wp.i18n;



const Tableofrates = (props) =>{
    const [modal, setModal] = useState(false)
    const [title_modal, setTitle_modal] = useState(false)
    

    /**
     * 
     * @param {Default click hander event} e 
     */
    const importFromCSV = (e) =>{
        e.preventDefault();
        setModal(true)
    }
    
    

    const openEditTitleModule = (e) => {
        e.preventDefault()
        setTitle_modal(!title_modal ? true : false)
    }

    const exportToJson = (e) => {
        e.preventDefault();
        let objectData = props.config;
        let filename = "advanced-table-rate-shipping-for-woocommerce.json";
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
          navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          var a = document.createElement('a');
          a.download = filename;
          a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
    }




    
    return (
            <>
            <Topbar 
                config={props.config}
                methodRegenerate={props.methodRegenerate}
            />
            <div className={style.bgWhite}>
                <Ctabs />
                <div className={style.wrapfull}>
                    
                    {/* CSV Import Form */}
                    <div className={style.modalWrap}>
                            <Modal visible={props.csv_modal} width="400" height="300" effect="fadeInLeft" onClickAway={props.modalHandler}>
                                <div className={style.text_center}>
                                    <div>
                                        <h2>{__('Import Table of Rates', 'advanced-table-rate-shipping-for-woocommerce')}</h2>
                                        <p><i>{__('Select a CSV file')}</i></p>
                                        <CSVReader 
                                            onFileLoaded={props.csvFileForUpload} />

                                            {
                                                (() => {
                                                    if(props.uplodable_csv_data.length > 0){
                                                        return(
                                                            <>
                                                                <button onClick={props.handleCSVUpload} type="button">{__('Upload CSV', 'advanced-table-rate-shipping-for-woocommerce')}</button>               
                                                            </>
                                                        )
                                                    }else{
                                                        return(
                                                            <>
                                                                <button disabled type="button">{__('Upload CSV', 'advanced-table-rate-shipping-for-woocommerce')}</button>               
                                                            </>
                                                        )
                                                    }
                                                })()
                                            }
                                            <a href="#" onClick={props.modalHandler}>
                                                <span>
                                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                    </svg>
                                                </span>
                                            </a>
                                    </div>
                                </div>
                            </Modal>
                    </div>


                    {/* json import wrap */}
                    <div className={style.modalWrap}>
                            <Modal visible={props.json_modal} width="400" height="250" effect="fadeInLeft" onClickAway={props.importFromJson}>
                                <div className={style.text_center}>
                                    <div>
                                        <h2>{__('Import table rate settings', 'advanced-table-rate-shipping-for-woocommerce')}</h2>
                                        <p><i>{__('Select a JSON file')}</i></p>
                                        <TextInput 
                                            type="file"
                                            accept="application/JSON, .json"
                                            onChange={props.settingUploadHandlerFromJson}
                                        />
                                        <a href="#" onClick={props.importFromJson}>
                                            <span>
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </Modal>
                    </div>


                    {/* New Method & title edit modal */}
                    <div className={style.modalWrap}>
                            <Modal visible={title_modal} width="500" height="300" effect="fadeInUp"  onClickAway={openEditTitleModule}>
                                <div className={style.text_left}>
                                    <div>
                                        <h2>{__('Update Shipping Option', 'advanced-table-rate-shipping-for-woocommerce')}
                                            <a href="#" onClick={openEditTitleModule}>
                                                <span>
                                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                    </svg>
                                                </span>
                                            </a>
                                        </h2>
                                        <p>{__('Shipping Option Title', 'advanced-table-rate-shipping-for-woocommerce')}</p>
                                       

                                        {
                                            // console.log('nan check: ', props.config.table_of_rates[props.activeIndex])
                                        }
                                        <TextInput 
                                            type="text" 
                                            value={typeof props.config.table_of_rates[props.activeIndex] != 'undefined' ? props.config.table_of_rates[props.activeIndex].title : ''} 
                                            cmnt="table_of_rates" 
                                            index={props.activeIndex}
                                            name="title" 
                                            max={30}
                                            onChange={props.handleUpdate} 
                                            placeholder={ __('Enter the title customers will see (required)', 'advanced-table-rate-shipping-for-woocommerce') }
                                        />


                                        {
                                            (()=>{
                                                if(typeof props.config.table_of_rates[props.activeIndex] == 'undefined' || props.config.table_of_rates[props.activeIndex].title == ''){
                                                    return(
                                                        <>
                                                            <button disabled>
                                                                {__('Done', 'advanced-table-rate-shipping-for-woocommerce')}
                                                            </button>                
                                                        </>
                                                    )
                                                }else{
                                                    return(
                                                        <>
                                                            <button onClick={openEditTitleModule}>
                                                                {__('Done', 'advanced-table-rate-shipping-for-woocommerce')}
                                                            </button>               
                                                        </>
                                                    )
                                                }
                                            })()
                                        }
                                    </div>
                                </div>
                            </Modal>
                    </div>

                    <div className={style.header}>
                        <h2>{__('Table of Rates', 'advanced-table-rate-shipping-for-woocommerce')}</h2>

                        <button data-tip data-for="exportSettings" onClick={(e) => exportToJson(e)} className={style.saveBtn} >
                            <span className="dashicons dashicons-database-export"></span>
                        </button>
                            <ReactTooltip id="exportSettings" place="top" effect="solid">
                                {__('Export Settings as json format.', 'advanced-table-rate-shipping-for-woocommerce')}
                            </ReactTooltip>
                        <button data-tip data-for="importSettings" onClick={props.importFromJson} className={style.saveBtn} >
                            <span className="dashicons dashicons-database-import"></span>
                        </button>
                            <ReactTooltip id="importSettings" place="top" effect="solid">
                                {__('Import Settings from json file.', 'advanced-table-rate-shipping-for-woocommerce')}
                            </ReactTooltip>



                        <button data-tip data-for="addanotherOptionsTip" className={style.saveBtn} onClick={props.addNewRates}>
                            <span className="dashicons dashicons-screenoptions"></span> &nbsp;
                            {__('Add option', 'advanced-table-rate-shipping-for-woocommerce')}</button>
                            <ReactTooltip id="addanotherOptionsTip" place="top" effect="solid">
                                {__('Add another option for this method.', 'advanced-table-rate-shipping-for-woocommerce')}
                            </ReactTooltip>
                        {
                            (() => {
                                if(props.config.general.title != '' && props.config.table_of_rates.length > 0 && typeof props.config.table_of_rates[0].rows !='undefined' && props.config.table_of_rates[0].rows.length > 0){
                                    return(
                                        <>
                                            <button data-tip data-for="saveThisMethodTip" className={style.saveBtn} onClick={props.saveHandler}><span className="dashicons dashicons-cloud-saved"></span> &nbsp;{__('Save', 'advanced-table-rate-shipping-for-woocommerce')}</button>
                                            <ReactTooltip id="saveThisMethodTip" place="top" effect="solid">
                                                    {__('Save this mehtod.', 'advanced-table-rate-shipping-for-woocommerce')}
                                            </ReactTooltip>
                                        </>
                                    )
                                }else{
                                    return(
                                        <>
                                            <button data-tip data-for="saveThisMethodTip" className={style.saveBtn} disabled ><span className="dashicons dashicons-cloud-saved"></span> &nbsp;{__('Save', 'advanced-table-rate-shipping-for-woocommerce')}</button>
                                        </>
                                    )
                                }
                            })()
                        }
                    </div>

                    {/* Option Tabs */}
                    <div className={style.optionTab}>
                        <Tabs>
                            <TabList>

                                {
                                    props.config.table_of_rates.map((v, item) => { 
                                        return(
                                            <Tab order={item} onClick={props.tabActiveIndex.bind(item)} key={item}>
                                                { v.title }
                                                <span className={style.editTitle} onClick={openEditTitleModule}>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.05 3L4.20829 10.2417C3.94996 10.5167 3.69996 11.0583 3.64996 11.4333L3.34162 14.1333C3.23329 15.1083 3.93329 15.775 4.89996 15.6083L7.58329 15.15C7.95829 15.0833 8.48329 14.8083 8.74162 14.525L15.5833 7.28334C16.7666 6.03334 17.3 4.60834 15.4583 2.86667C13.625 1.14167 12.2333 1.75 11.05 3Z" stroke="#006FFF" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path opacity="0.4" d="M9.9082 4.20833C10.2665 6.50833 12.1332 8.26666 14.4499 8.49999" stroke="#006FFF" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path opacity="0.4" d="M2.5 18.3333H17.5" stroke="#006FFF" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </span>
                                            </Tab>
                                        );
                                    })
                                }

                                {/* <Tab>{ props.t_rates.title ? props.t_rates.title : __('Shipping Option # ', 'advanced-table-rate-shipping-for-woocommerce') + this.state.count }</Tab> */}
                                
                            </TabList>
                            {
                                props.config.table_of_rates.map((v, index) => {
                                    return(
                                            <div key={index} className={`${style.singleTabPanel} index_${index}`}>
                                                <TabPanel>
                                                    <Singletablerate 
                                                        key={index}
                                                        deleteThisOption={props.deleteThisOption}
                                                        index={index}
                                                        onChangeValue={props.handleUpdate} 
                                                        t_rates={v}
                                                        addDaliveryDays={props.addDaliveryDays}
                                                        addNewRow={props.addNewRow}
                                                        addNewCondition={props.addNewCondition}
                                                        addNewCosts={props.addNewCosts}
                                                        deleteCondition={props.deleteCondition}
                                                        deleteSelected={props.deleteSelected}
                                                        action_delete={props.action_delete}
                                                        dragNdropEvent={props.dragNdropEvent}
                                                        importFromCSV={props.modalHandler}
                                                        deleterows={props.deleterows}
                                                        delAction={props.delAction}
                                                        wc={props.wc}
                                                        onRemove={props.onRemove}
                                                        length={props.config.table_of_rates.length}
                                                    />
                                                </TabPanel>
                                            </div>
                                    );
                                })
                            }
                        </Tabs>
                    </div>
                </div>
            </div>
            </>
        )
}

export default Tableofrates;


