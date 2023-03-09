import { LightningElement } from 'lwc';
import LightningPrompt from 'lightning/prompt';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendEmail from '@salesforce/apex/HomeworkLWCController.sendEmail';
export default class HomeworkLWC extends LightningElement {

toAddress;
subject;
body;

/*testSendButtonClick() {
    console.log(this.subject);
    console.log(this.body);
} */

handleSendButtonClick() {
sendEmail({
    toAddress : this.toAddress,
    subject : this.subject,
    body : this.body
}) .then(result => {
    this.showToast();
}) .catch(error => {

})
}
/*handleInputChange(event) {
    componentName = event.target.name;

    this.toAddress = event.detail.value;
    console.log(this.toAddress);
    var componentNAme = event.target.name;
    if (componentName == 'toAddress') {
        this.toAddress = event.detail.value;
    } else if (componentName =='subject') {
        this.subject - event.detail.value;
    } else if (componentNAme =='body') {
        this.body - event.detail.value
    }
}
*/
handleInputChange(event) {
var componentName = event.target.name
switch (componentName) {
    case 'toAddress':
        this.toAddress = event.detail.value;
    case 'subject':
        this.subject = event.detail.value;
    case 'body':
        this.body = event.detail.value
}
}

showToast() {
    const newEvent = new ShowToastEvent({
        title: 'Success',
        message:'Email Sent Successfully',
        variant: 'success',
    });
    this.dispatchEvent(newEvent);
}
}
