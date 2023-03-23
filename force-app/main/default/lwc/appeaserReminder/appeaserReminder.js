import { LightningElement, api, wire, track } from 'lwc';
import getTaskData from '@salesforce/apex/reminderController.getTaskData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Subject', fieldName: 'Name' },
    { label: 'Due Date', fieldName: 'EndDate', type: 'date' },
];

export default class AppeaserReminder extends LightningElement {
    @api valueFromParentComponent;

    data = [];
    columns = columns;
    //Wire Apex class that retrieves Campaign data, and updates data table
    @wire(getTaskData)
    wiredTasks({ error, data }) {
        if (data) {
            let fixeddata = [];
            data.forEach((row) => {
                let dataline = {};
                dataline.Name = row.Name;
                dataline.EndDate = row.EndDate;
                dataline.recordId = row.Id;

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
    customFormModal = false;

    customShowModalPopup() {            
        this.customFormModal = true;
    }

    customHideModalPopup() {    
        this.customFormModal = false;
    }
  
    //pushing tasks/campaigns to salesforce 
    handleSave() {
        this.handleRecordSave();
    }

    handleRecordSave() {
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
        this.customHideModalPopup();
        this.dispatchEvent(
            new ShowToastEvent({
            title: 'Success',
            message: 'Reminder is Saved!',
            variant: 'success'
            }))
            //NEED TO FIGURE OUT REFRESHAPEX
    }

    //Deleting selected reminders
    reminderSelectedRows = [];

    handleRowSelection(event) {
        this.reminderSelectedRows = event.detail.selectedRows;
    }
 
    handleDelete() {
        this.reminderSelectedRows.map(reminder => {
            deleteRecord(reminder.recordId);
        });
    }
}