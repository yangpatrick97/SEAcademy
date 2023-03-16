public class ContactTriggerHandler {
    public static void contactNotifier(){
        List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();
        List<String> toAddress = new List<String>();
        toAddress.add('patrickyang@gmail.com');
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setTemplateId('123456789');
        email.setToAddresses(toAddress);
        email.setTargetObjectId(UserInfo.getUserId());
        emails.add(email);
    }
}