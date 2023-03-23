import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import findRestaurants from '@salesforce/apex/RestaurantRecs.findRestaurants';
import RESTAURANT_OBJECT from '@salesforce/schema/Restaurant__c';
import { refreshApex } from '@salesforce/apex';
import LightningModal from 'lightning/modal';
import selectYourGirlfriend from '@salesforce/apex/RestaurantRecs.selectYourGirlfriend';

import NAME_FIELD from '@salesforce/schema/Restaurant__c.name';
import CUISINE_FIELD from '@salesforce/schema/Restaurant__c.cuisine_Type__c';
import PRICE_FIELD from '@salesforce/schema/Restaurant__c.price__c';
import RATING_FIELD from '@salesforce/schema/Restaurant__c.rating__c';
import PHONE_FIELD from '@salesforce/schema/Restaurant__c.phone_Number__c';
import PREFERRED_CUISINE_FIELD from '@salesforce/schema/contact.preferred_Cuisine__c'




const data = [
    /*{ id: 1, name: 'Chipotle', cuisine: 'Fast Food', price: '$', rating: 4.0, phone: '212-575-8424' },
    { id: 2, name: 'Chick-fil-A', cuisine: 'Fast Food', price: '$', rating: 5.0, phone: '718-504-6528' },
    { id: 3, name: 'Popeyes', cuisine: 'Fast Food', price: '$', rating: 4.5, phone: '917-475-1546' },
    { id: 4, name: 'Starbucks', cuisine: 'Dessert', price: '$', rating: 3.7, phone: '212-221-7515' },    
    */
];

const columns = [
    { label: 'Restaurant', fieldName: 'name' },
    { label: 'Cuisine', fieldName: 'cuisine', type: 'string' },
    { label: 'Rating',
      fieldName: 'rating',
      type: 'number',
      sortable: true,
      cellAttributes: { alignment: 'left' }, },    
    { label: 'Price', fieldName: 'price', type: 'string', sortable: true, cellAttributes: { alignment: 'left'  },  },      
    { label: 'Phone', fieldName: 'phone', type: 'string' },
];

export default class myModal extends LightningElement {

    firstName;
    lastName;
    name;
            //placeholder
    cuisine = 'Thai';
    price;
    rating;
    phone;
    @api valueFromParentComponent;
    restaurantData = data;
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;


    handleOptionChange(event) {
        this.selectedOption = event.detail.value;
    }

    
    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }
   
    customFormModal = false;

    options = [ 
        {label: 'Tori Tong', value: 'option1'},
        {label: 'Riana Chen', value: 'option2'},
        {label: '#foreveralone', value: 'option3'}
    ];
    selectedOption = '';

    customShowModalPopup() {
        this.customFormModal = true;
    }

    customHideModalPopup() {

        this.customFormModal = false;
        selectYourGirlfriend({

            girlfriendFirstName : this.FirstName,
            girlfriendLastName : this.LastName
        })
    }
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
            })
            .catch((error) => {
                // Handle any errors
            });
    }
   
    wiredData({ error, restaurantData }) {
    if (restaurantData) {
        this.data = restaurantData;
    } else if (error) {
        // Handle error
    }
    };

    addRow() {
        this.restaurantData.push({
            name: this.name,
             cuisine: this.cuisine,
             price: this.price,
             rating: this.rating,
             phone: this.phone
        });
    console.log(this.restaurantData)}    
    // var table = $('#restaurantTable').DataTable();
    // if (this.name && this.cuisine && this.price && this.rating && this.phone) {
    // var newRow = {
    //     name: this.name,
    //     cuisine: this.cuisine,
    //     price: this.price,
    //     rating: this.rating,
    //     phone: this.phone
    // };
    // if (table) {
    //     table.row.add(newRow).draw();
    // } else {
    //     console.log("Error: DataTable is not defined or initialized.");
    // }
    // } else {
    // console.log("Error: One or more required values are missing.");
    // }            
    }
