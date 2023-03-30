public with sharing class reminderController {

        @AuraEnabled(cacheable=true)
        public static List<Reminder__c> getReminderData() {
            try { 
                return [
                    SELECT Subject__c, Due_Date__c, Id
                    FROM Reminder__c
                ];
            } catch (Exception error) {
                throw new AuraHandledException(error.getMessage());
            }
        }
    }