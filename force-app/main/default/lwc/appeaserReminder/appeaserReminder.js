import { LightningElement, api, wire, track } from 'lwc';
import getReminderData from '@salesforce/apex/reminderController.getReminderData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

const columns = [
   { label: 'Subject', fieldName: 'Subject__c', hideDefaultActions: 'true' },
   { label: 'Due Date', fieldName: 'Due_Date__c', hideDefaultActions: 'true', type: 'date'}
];

export default class AppeaserReminder extends LightningElement {
    reminderData = [];
    columns = columns;

    //Wire method that reand refresh apex
    wiredReminderData;
    error;

    //Opening and Closing Modal
    modalPopUp = false;

    //Handling selected rows. Delete button will only show when reminderSelectedRows > 0
    reminderSelectedRows = [];
    get showDeleteButton() {
        return (this.reminderSelectedRows.length > 0);
    }

    //Wire Apex class that retrieves Reminder__c data, and updates data table
    @wire(getReminderData)
    wiredReminders(response) {
        this.wiredReminderData = response;
        if (response.data) {
            this.reminderData = response.data;
            this.error = undefined;

        } else if (response.error) {
            this.error = response.error;
            reminderData = undefined;
            console.log(this.error);
        }
    }

    showModalPopUp() {           
        this.modalPopUp = true;
    }

    hideModalPopUp() {   
        this.modalPopUp = false;
    }
    //pushing reminders to salesforce via lightning record edit form
    handleSave() {
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
    }

    handleSuccess() {
        this.hideModalPopUp();
        this.dispatchEvent(
            new ShowToastEvent({
            title: 'Success',
            message: 'Reminder is Saved!',
            variant: 'success'
            }));
        return refreshApex(this.wiredReminderData);
    }

    handleRowSelection(event) {
        this.reminderSelectedRows = event.detail.selectedRows;
    }

    handleDelete() {
        this.reminderSelectedRows.map(reminder => {
            deleteRecord(reminder.Id)
        .then(result => {
            console.log(result);
            this.dispatchEvent(
                new ShowToastEvent({
                title: 'Success',
                message: 'Reminder Deleted!',
                variant: 'success'
            }));
            return refreshApex(this.wiredReminderData);
            });
        });
    }
}