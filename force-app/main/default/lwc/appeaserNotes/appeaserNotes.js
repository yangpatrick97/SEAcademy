import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NOTES_FIELD from '@salesforce/schema/Notepad__c.Notes__c';


export default class AppeaserNotes extends LightningElement {
    existingNotesData;
    wiredNotepadData;
    showEditForm = false;
    @api recordId
    @wire(getRecord, {recordId: 'a03Dn0000050vbGIAQ', fields: [NOTES_FIELD]})
    record;
    
    get existingNotes() {
        return getFieldValue(this.record.data, NOTES_FIELD);
    }

    handleSave() {
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
    }

    handleSuccess() {
        this.dispatchEvent(
            new ShowToastEvent({
            title: 'Success',
            message: 'Notes are Saved!',
            variant: 'success'
            }))
        this.showEditForm = false
    }

    handleEditButtonClick() {
        this.showEditForm = true
    }
}