public with sharing class reminderController {

        @AuraEnabled
        public static List<String> taskDataTableLookUp() {
            try { 
                List<Task> taskDataTable = [SELECT Description, ActivityDate FROM Task
                ];
                return taskDataTable;
                
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
    }
