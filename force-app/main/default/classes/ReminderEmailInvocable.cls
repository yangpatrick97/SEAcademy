public with sharing class ReminderEmailInvocable {
    @InvocableMethod(label='Send Reminder Email' description='Sends an email reminder.' category='Reminder__c')
    public static void sendReminderEmail(List<Id> reminderId) {
        List<Reminder__c> flowReminders = [SELECT OwnerId, Subject__c FROM Reminder__c WHERE Id = :reminderId[0]];
        EmailTemplate emailTemplate = [SELECT Id, Subject, HTMLValue FROM EmailTemplate WHERE Name = 'GF APPeaser Reminder Notification' LIMIT 1];
        List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setSaveAsActivity(false);
            email.setTargetObjectId(flowReminders[0].OwnerId);
            email.setHTMLBody(emailTemplate.HTMLValue);
            email.setSubject(flowReminders[0].Subject__c + ' ' + emailTemplate.Subject);
            emails.add(email);
        Messaging.sendEmail(emails);
    }
}
