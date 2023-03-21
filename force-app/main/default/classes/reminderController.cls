public with sharing class reminderController {

        @AuraEnabled(cacheable=true)
        public static List<Campaign> getTaskData() {
            try { 
                return [
                    SELECT Name, EndDate 
                    FROM Campaign
                ];
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
    }