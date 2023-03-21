import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import findRestaurants from '@salesforce/apex/RestaurantRecs.findRestaurants';

const data = [
    { id: 1, name: 'Chipotle', rating: 4.0, phone: '212-575-8424' },
    { id: 2, name: 'Chick-fil-A', rating: 5.0, phone: '718-504-6528' },
    { id: 3, name: 'Popeyes', rating: 4.5, phone: '917-475-1546' },
    { id: 4, name: 'Starbucks', rating: 3.7, phone: '212-221-7515' },    
];

const columns = [
    { label: 'Restaurant', fieldName: 'name' },
    {
        label: 'Rating',
        fieldName: 'rating',
        type: 'number',
        sortable: true,
        cellAttributes: { alignment: 'left' },
    },
    { label: 'Phone', fieldName: 'phone', type: 'number' },

];

export default class DemoApp extends LightningElement {
    @api valueFromParentComponent;
    data = data;
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;

    // Used to sort the 'Age' column
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
}