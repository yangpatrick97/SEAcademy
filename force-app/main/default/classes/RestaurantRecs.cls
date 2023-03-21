public with sharing class RestaurantRecs {

    @AuraEnabled
    public static List<Restaurant__c> findRestaurants(string preferredCuisine){ 
    //public static void findRestaurants(string preferredCuisine){
        try {List<Restaurant__c> myRestaurants = new List<Restaurant__c>([
            SELECT Name, Cuisine_Type__c, Price__c, Rating__c, Phone_Number__c
            FROM Restaurant__c    
                                    //placeholder for 'preferredCuisine'                                    
            WHERE (Cuisine_Type__c = 'Thai')             
            LIMIT 20]);
            
            
            System.debug(myRestaurants); 
           
        return myRestaurants;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    

    }

