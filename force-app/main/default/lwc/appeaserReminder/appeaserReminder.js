import { LightningElement, api, track } from 'lwc';
//import apex class
const columns = [
    { label: 'Subject', fieldName: 'name' },
    { label: 'Due Date', fieldName: 'dueDate', type: 'date' },
    /*{ label: 'Remind?', fieldName: 'remind', type: 'boolean' },*/
];
export default class AppeaserReminder extends LightningElement {
    @api valueFromParentComponent;

    data = [this.name='Make reservation', this.dueDate='3/17/22'];
    columns = columns;
    @track customFormModal = false; 
    
    customShowModalPopup() {            
        this.customFormModal = true;
    }
 
    customHideModalPopup() {    
        
        this.customFormModal = false;
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