import { LightningElement, api } from 'lwc';

const columns = [
    { label: 'Subject', fieldName: 'name' },
    { label: 'Due Date', fieldName: 'dueDate', type: 'date' },
    /*{ label: 'Remind?', fieldName: 'remind', type: 'boolean' },*/
];

export default class AppeaserReminderComplimentNotes extends LightningElement {
    @api valueFromParentComponent;
    //Task Reminder:
    data = [];
    columns = columns;
    randomText = '';
    randomImage = '';
    //need to make a function for {onclick} to save new reminders to the table
//Compliment generator:
    sentence = [
        "I Hope You Are Doing Well Today!",
        "You're pretty cool B).",
        "Oh My Goodness! You're Outfit's Lookin' Amazing!",
        "Uwu",
        "You should have your own talk show!",
        "You Are Greatly Appreciated!",
        "I Hope You Have A Great Week!",
        "You have cute elbows",
        "Even babies think you're cute!",
        "I Hope Your Pillows Are Just The Way You Like Them When You Head To Bed."
      ];
      pictures = [
        "https://www.tcnorth.com/wp-content/uploads/2010/02/compliment-900x675.jpg",
        "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_40/3038846/191004-better-compliments-high-fives-se-654p.jpg",
        "https://watv.org/wp-content/uploads/2021/04/compliment-criticism.jpg",
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F03%2F12%2Fpomeranian-white-puppy-921029690-2000.jpg",
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=640:*",
        "https://www.publicdomainpictures.net/pictures/130000/nahled/single-big-red-heart.jpg",
        "https://i.pinimg.com/originals/02/d5/db/02d5dbbd0b5814e044c1b11dc3ca4846.jpg",
        "https://www.seekpng.com/png/detail/13-137763_thumbs-up-emoticon-thumb-up-and-down-emoji.pnghttps://www.seekpng.com/png/detail/13-137763_thumbs-up-emoticon-thumb-up-and-down-emoji.png",
        "http://media.pixcove.com/R/0/2/Samuel-Smiley-Smilies-Together-Free-Image-Emoticon-7138.jpg",
        "https://i.pinimg.com/originals/af/14/f5/af14f5687f4359b0a19867e6886a8f7c.jpg"
      ];
      
      
      setRandomText() {
        console.log(1);
        var randomnumber = Math.floor(Math.random() * 10);
        var compliment = this.sentence[randomnumber];
        console.log(compliment);
        this.randomText = compliment;
        // textElement.innerHTML += compliment;
        //alert(compliment);
      }
      
      setRandomPic() {
        console.log(2);
        var randomnumber = Math.floor(Math.random() * 10);
        this.randomImage = this.pictures[randomnumber];
        console.log(this.randomImage);
      }

      randomcomp() {
        this.setRandomText();
        this.setRandomPic();
        
      }
      
      /**
       * Case: The datatable should also retrieve tasks when it renders.
       * 
       * Solution: 
       * 1. Set up Columns to mirror task field api names
       * 2. Create an apex class with a method that returns a List of Tasks
       * 3. import that method into lwc and call it from the connectedCallback()
       * 4. set this.data = the response of the apex method in the JS
       */


      /**
       * Case: I want to push a button and create a task in Salesforce and push it to the datatable. 
       * 
       * Solution: 
       * 1. It should call a function that creates a task and push it to this.data
       *    var task = {
          name: `Name (${index})`,
          website: 'www.salesforce.com',
          amount: Math.floor(Math.random() * 100),
          phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          closeAt: new Date(
              Date.now() + 86400000 * Math.ceil(Math.random() * 20)
          ),
        };
        this.data.push(task);
      
       * 0.8. Create another method in apex class that takes values and creates a task and inserts into database
       * 0.9. Import method into JS
       * 2. Call method from Javascript and send task field values as parameters
       * 3. Display a toast message 
       */

}