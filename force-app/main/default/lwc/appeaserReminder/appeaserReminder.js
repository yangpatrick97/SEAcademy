import { LightningElement, api, wire, track } from 'lwc';
import getTaskData from '@salesforce/apex/reminderController.getTaskData';

const columns = [
    { label: 'Subject', fieldName: 'Name' },
    { label: 'Due Date', fieldName: 'EndDate', type: 'date' },
    /*{ label: 'Remind?', fieldName: 'remind', type: 'boolean' },*/
];
export default class AppeaserReminder extends LightningElement {
    @api valueFromParentComponent;

    @track data = [];
    @track columns = columns;
    //https://salesforce.stackexchange.com/questions/355193/how-do-i-display-field-values-from-a-related-objects-in-my-lightning-data-table
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
    @track customFormModal = false;
    customShowModalPopup() {            
        this.customFormModal = true;
    }
  
    customHideModalPopup() {    
        
        this.customFormModal = false;
    }
  
//pushing tasks to salesforce 
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
  } else{
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
  console.log('worked');
}
}
/**
       * Case: The datatable should also retrieve tasks when it renders.
       * 
       * Solution: 
       * 1. Set up Columns to mirror task field api names
       * 2. Create an apex class with a method that returns a List of Tasks
       * 3. import that method into lwc and call it from the connectedCallback()
       * 4. set this.data = the response of the apex method in the JS
       */


      /**
       * Case: I want to push a button and create a task in Salesforce and push it to the datatable. 
       * 
       * Solution: 
       * 1. It should call a function that creates a task and push it to this.data
       *    var task = {
          name: `Name (${index})`,
          website: 'www.salesforce.com',
          amount: Math.floor(Math.random() * 100),
          phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          closeAt: new Date(
              Date.now() + 86400000 * Math.ceil(Math.random() * 20)
          ),
        };
        this.data.push(task);
      
       * 0.8. Create another method in apex class that takes values and creates a task and inserts into database
       * 0.9. Import method into JS
       * 2. Call method from Javascript and send task field values as parameters
       * 3. Display a toast message 
       */