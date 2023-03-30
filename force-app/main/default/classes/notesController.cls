public with sharing class notesController {
    @AuraEnabled(cacheable=true)
    public static List<Notepad__c> getGirlfriendNotes() {
        try { 
            return [
                SELECT Notes__c
                FROM Notepad__c
                LIMIT 1
            ];
        } catch (Exception error) {
            throw new AuraHandledException(error.getMessage());
        }
    }
}
