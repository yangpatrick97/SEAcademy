import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import findRestaurants from '@salesforce/apex/RestaurantRecs.findRestaurants';
import RESTAURANT_OBJECT from '@salesforce/schema/Restaurant__c';
import { refreshApex } from '@salesforce/apex';
import LightningModal from 'lightning/modal';
import selectYourGirlfriend from '@salesforce/apex/RestaurantRecs.selectYourGirlfriend';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PREFERRED_CUISINE_FIELD from '@salesforce/schema/Contact.Preferred_Cuisine__c'





const columns = [
    { label: 'Restaurant', fieldName: 'Name' },
    { label: 'Cuisine', fieldName: 'Cuisine_Type__c', type: 'string' },
    { label: 'Rating',
      fieldName: 'Rating__c',
      type: 'number',
      sortable: true,
      cellAttributes: { alignment: 'left' }, },    
    { label: 'Price', fieldName: 'Price__c', type: 'string', sortable: true, cellAttributes: { alignment: 'left'  },  },      
    { label: 'Phone', fieldName: 'Phone_Number__c', type: 'string' },
];

export default class myModal extends LightningElement {

    
    data = [
        /*{ id: 1, name: 'Chipotle', cuisine: 'Fast Food', price: '$', rating: 4.0, phone: '212-575-8424' },
        { id: 2, name: 'Chick-fil-A', cuisine: 'Fast Food', price: '$', rating: 5.0, phone: '718-504-6528' },
        { id: 3, name: 'Popeyes', cuisine: 'Fast Food', price: '$', rating: 4.5, phone: '917-475-1546' },
        { id: 4, name: 'Starbucks', cuisine: 'Dessert', price: '$', rating: 3.7, phone: '212-221-7515' },    
        */
    ];
    
    
    
    @api recordId; 
    girlfriendName;
    name;
            
    // cuisine = 'Thai';
    cuisine;
    price;
    rating;
    phone;
    @api valueFromParentComponent;   
    
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
    error;
  

    handleOptionChange(event) {
        this.selectedOption = event.detail.value;
    }

    
    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }
   
    customFormModal = false;

    options = [ //labels are one single string hmm
        {label: 'Tori Tang', value: 'option1'},
        {label: 'Riana Chen', value: 'option2'},
        {label: '#foreveralone', value: 'option3'}
    ];
    selectedOption = 'girlfriendName';

    customShowModalPopup() {
        this.customFormModal = true;
    }

    customHideModalPopup() {

        console.log(this.girlfriendName);        
        this.customFormModal = false;
        selectYourGirlfriend({

            girlfriendName : this.girlfriendName
            
        })            
        .then((result) =>{
            console.log('Result', result);
            this.girlFriendName = result.girlfriendName;           
            console.log(this.girlfriendName);
            refreshApex();
        })
        .catch(error =>{            

        })
        };
       
    
    @wire(selectYourGirlfriend)
    wiredGirlfriend({error, girlfriendName}) {
        if (girlfriendName) {
          this.girlfriendName = girlfriendName          
        } else if (error) {
          this.error = error;
          this.data = [];
        } else {
            console.log(this.girlfriendName);
        }
      };
    
    
    //sort the numerical fields
    sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.data];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.data = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }

    
    

    clickForMoreRestaurants() {
        findRestaurants({ preferredCuisine: this.cuisine })
            .then((result) => {
                this.data = result;
                console.log(this.data);                                            
            })
            .catch((error) => {                
            });
    }

    
    
    @wire(findRestaurants)
    wiredRetaurants({error, data}) {
      if (data) {
        this.data = data;
        this.error = undefined;
      } else if (error) {
        this.error = error;
        this.data = [];
      } else {
        this.data = [];
      }
    };
 
    
    
    
}