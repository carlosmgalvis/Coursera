/*
Meteor.methods({
    'insertMessage':function(message){
        if (!Meteor.user()){
            return;
        }
        else {
            // force the user field to be the current user
            message.nickname = Meteor.user().username;
            message.createdOn  = new Date();
            return Messages.insert(message);
        }
    },
    'insertChatroom':function(chatroom){
        if (!Meteor.user()){
            return;
        }
        else {
            // force the user field to be the current user
            chatroom.createdBy = Meteor.user().username;
            return Chatrooms.insert(chatroom);
        }
    }
})

Meteor.methods({
    'removeMessage':function(id){
        if (!Meteor.user()){
            return;
        }
        else {
            var msg = Messages.findOne({_id:id});
            if (msg.nickname == Meteor.user().username){
                    Messages.remove({_id:id});
                    return true;
            }
        }
    }
})
*/
Meteor.methods({
    insertChatroom: function(doc){
        if (!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        return Chatrooms.insert(doc);
    },

    insertMessage: function(doc){
        if (!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        doc.nickname = Meteor.user().username;
        doc.createdOn = new Date();
        return Messages.insert(doc);
    },

    removeMessage: function(messageId){
        var message = Messages.findOne(messageId);
        if (message && message.nickname === Meteor.user().username){
            Messages.remove(messageId);
            return true;
        }
        return false;
    }
});