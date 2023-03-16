public class AcademyUtility {
    public static void createContacts(Integer numContacts, String firstName, String lastName, String email, String phone) {
        List<Contact> contacts = new List<Contact>();
        for (Integer i = 0; i < numContacts; i++) {
            Contact con = new Contact();
            if (Math.mod(i,2) == 0) {
                con.FirstName = 'Test' + firstName + i;
                con.LastName = lastName + i;
                con.Email = email + i + '@gmail.com';
                con.Phone = phone + i;
            } else {
                con.FirstName = 'Test' + firstName + i;
                con.LastName = lastName + i;
                con.Email = null;
                con.Phone = null;
            }
            contacts.add(con);
        }
        insert contacts;
    }
    public List<Contact> getBlankContactFields(String fieldName) {
        String blankFields = 'SELECT Id, FirstName, LastName, Email, Phone FROM Contact WHERE FirstName LIKE \'%test\' AND' + fieldName + ' = null';
        List<Contact> blankContacts = Database.query(blankFields);
        return blankContacts;
    }
}