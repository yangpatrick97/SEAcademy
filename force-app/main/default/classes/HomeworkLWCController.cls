public with sharing class HomeworkLWCController {

        @AuraEnabled
        public static void sendEmail(String toAddress, String subject, String body) {
            try {
                List<String> allToAddresses = new List<String>();
                allToAddresses.add(toAddress);  //have to figure out how to add multiple toAddresses
                
                List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();
                Messaging.SingleEmailMessage email = new MEssaging.SingleEmailMessage(); //maybe a for-each loop, if there are many emails
                email.setToAddresses(allToAddresses);
                email.setHtmlBody(body);
                email.setSubject(subject);
                emails.add(email);
                
                Messaging.sendEmail(emails);

                System.debug('MY APEX METHOD FIRED');
                
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
    }
