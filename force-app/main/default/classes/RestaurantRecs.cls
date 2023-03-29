public with sharing class RestaurantRecs {
//appeaserRestaurantDataController
   @AuraEnabled(cacheable=true)
    public static List<Restaurant__c> findRestaurants(String preferredCuisine){     
        try {List<Restaurant__c> myRestaurants = new List<Restaurant__c>([
            SELECT Name, Cuisine_Type__c, Price__c, Rating__c, Phone_Number__c
            FROM Restaurant__c    
                                                                       
            WHERE (Cuisine_Type__c = :preferredCuisine)             
            LIMIT 20]);
            
            System.debug(preferredCuisine);
            System.debug(myRestaurants); 
           
        return myRestaurants;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static String selectYourGirlfriend(String girlfriendName) {
        Contact myGirlfriend = [SELECT name, preferred_Cuisine__c
                                FROM Contact
                                WHERE ((name = :girlfriendName))];
        System.debug(girlfriendName);        
        System.debug(myGirlfriend);
        String preferredCuisine = myGirlfriend.preferred_Cuisine__c;
        System.debug(preferredCuisine);

        return preferredCuisine;
    }

    }
