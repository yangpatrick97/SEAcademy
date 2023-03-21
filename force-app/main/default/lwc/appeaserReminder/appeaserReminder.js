import { LightningElement, api, wire, track } from 'lwc';
import getTaskData from '@salesforce/apex/reminderController.getTaskData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const columns = [
    { label: 'Subject', fieldName: 'Name' },
    { label: 'Due Date', fieldName: 'EndDate', type: 'date' },
];
export default class AppeaserReminder extends LightningElement {
    @api valueFromParentComponent;

    @track data = [];
    @track columns = columns;
    //https://salesforce.stackexchange.com/questions/355193/how-do-i-display-field-values-from-a-related-objects-in-my-lightning-data-table
    //Wire Apex class that retrieves Campaign data, and updates data table
    @wire(getTaskData)
    wiredTasks({ error, data }) {
        if (data) {
            let fixeddata = [];
            data.forEach((row) =>{
                let dataline = {};
                dataline.Name = row.Name;
                dataline.EndDate = row.EndDate;

                fixeddata.push(dataline);
                console.log(fixeddata);
            })
            this.data = fixeddata;
            this.error = undefined;

        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
    //Opening and Closing Modal
    @track customFormModal = false;
    customShowModalPopup() {            
        this.customFormModal = true;
    }
  
    customHideModalPopup() {    
        
        this.customFormModal = false;
    }
  
    //pushing tasks/campaigns to salesforce 
    saveAndNew = false;

    handleSave() {
        this.saveAndNew = false;
        this.handleRecordSave();
    }

    handleSaveAndNew() {
        this.saveAndNew = true;
        this.handleRecordSave();
    }

    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
            field.reset();
            });
        }
    }

    handleSuccess() {
        if(this.saveAndNew) {
            this.handleReset();
        } else {
            this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.activityId,
                objectApiName: 'GRA_RV_Rig_Verification__c',
                actionName: 'view'
            },
            });
        }
    }

    handleRecordSave() {
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
        this.customHideModalPopup()
        //refreshApex(this.getTaskData); *NOT WORKING FIGURE OUT REFRESH UPON SAVE
        .then(result => {
            if(result){
                this.showNotification();
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    showNotification() {
        const toastEvent = new ShowToastEvent({
            title: 'Success!',
            message: 'Reminder is Saved',
            variant: 'success',
        });
        this.dispatchEvent(toastEvent);
    }
}
