import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import findRestaurants from '@salesforce/apex/appeaserRestaurantDataController.findRestaurants';
import selectYourGirlfriend from '@salesforce/apex/appeaserRestaurantDataController.selectYourGirlfriend';


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

export default class myRestaurantShenanigans extends LightningElement {

    
    data = [];    
    @api recordId; 
    girlfriendName;
    name;
    cuisine;
    @api preferredCuisine;
    price;
    rating;
    phone;
    @api valueFromParentComponent;       
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
    error;
  
    // @wire(getRecords, {
    //     records: [
    //         {
    //           recordIds: ['003Dn00000G2tiOIAR'],
    //           fields: [NAME_FIELD, PREFERRED_CUISINE_FIELD]            
    //         },
    //         {
    //           recordIds: ['003Dn00000G2tiNIAR'],
    //           fields: [NAME_FIELD, PREFERRED_CUISINE_FIELD]
    //         },
    //         {
    //           recordIds: ['003Dn00000G3Zm7IAF'],
    //           fields: [NAME_FIELD, PREFERRED_CUISINE_FIELD]
    //         },
    //     ]
    // }) wiredRecords;


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
    


    handleOptionChange(event) {
        this.selectedOption = event.detail.value;
    }

    
    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }
   
    customFormModal = false;

    options = [ 
        {label: 'Tori Tang', value: 'Tori Tang'},
        {label: 'Riana Chen', value: 'Riana Chen'},
        {label: 'One and Done', value: 'Tinder Date'},
        {label: 'Looking to Impress', value: 'Gold Digger'},
        {label: 'Rita Kushner', value: 'Rita Kushner'},
        {label: 'Felicia Li', value: 'Felicia Li'},
        {label: 'Patrick Yang', value: 'Patrick Yang'},
        {label: '#foreveralone', value: 'Forever Alone'}
    ];
    selectedOption = 'girlfriendName';
    

    customShowModalPopup() {
        this.customFormModal = true;
    }

    girlfriendCloseModal() {
               
        this.customFormModal = false;
        let preferredCuisine;
        selectYourGirlfriend({

            
            girlfriendName : this.selectedOption
            
        })            
          .then((result) => {            
            console.log('Result', result);
            this.preferredCuisine = result;                       
            
            console.log(this.preferredCuisine)
        
        })      
      .catch((error) => {            
          console.error('Error in selectYourGirlfriend', error);
      });
    };
    
    
    
    @wire(selectYourGirlfriend)
    wiredGirlfriend({error, preferredCuisine}) {
        if (preferredCuisine) {
          
          this.preferredCuisine = data.preferredCuisine
          console.log('wired', result);
          console.log('wired', this.preferredCuisine);         
          } else if (error) {
            this.error = error;
         
            } else {
              console.log('this didnt work');
        }
      };  
 
     

   
    @wire(findRestaurants, { preferredCuisine: '$preferredCuisine' })
    wiredRetaurants({error, data}) {
      console.log(data);
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