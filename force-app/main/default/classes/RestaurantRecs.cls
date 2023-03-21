public with sharing class RestaurantRecs {

    @AuraEnabled
    //public static string? data
    public static void findRestaurants(string preferredCuisine){
        try {List<Restaurant__c> myRestaurants = new List<Restaurant__c>([
            SELECT Name, Cuisine_Type__c, Rating__c, Phone_Number__c, Price__c 
            FROM Restaurant__c    
                                    //placeholder for 'preferredCuisine'                                    
            WHERE (Cuisine_Type__c = 'Thai')             
            LIMIT 20]);
            
            
            System.debug(myRestaurants); 
           
        //return data;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    

    }