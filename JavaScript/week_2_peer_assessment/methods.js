Meteor.methods({
    'insertMessage': function(message){
        console.log("If you manage to call the method, you'll see this message in the server console");
        if (!Meteor.user()){
            return; // returns undefined → falsy → triggers the alert on the client
        }
        else {
            return Messages.insert(message); // returns the new _id → truthy → no alert      
        }

                // Ensure the message has exactly the fields we expect


    }
});