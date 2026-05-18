// this will configure the sign up field so it
// they only need a username
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});


Template.chatroomList.events({
    'click .js-toggle-chatform':function(){
        $('#chatroomForm').toggle();
    }
});

/*
Template.chatroomList.helpers({
    chatrooms:function(){
        Meteor.subscribe("chatrooms");
        return Chatrooms.find();
    }
}); 
*/
Template.chatroomList.onCreated(function(){
    this.autorun(() => {
        Meteor.subscribe("chatrooms");
    });
});

Template.chatroomList.helpers({
    chatrooms: function(){
        return Chatrooms.find();
    }
});

Template.messageList.events({
    'click .js-del-message':function(){
        Meteor.call('removeMessage', this._id, function(err, res){
            if (!res){
                alert('Can only delete your own ones...');
            }
        });
    }
});

Template.header.helpers({
    nickname:function(){
        if (Meteor.user()){
            return Meteor.user().username;
        }
    },
});
/*
Template.messageList.helpers({
    messages:function(chatroomId){
        if (Meteor.user() && chatroomId){
            return Messages.find({chatroomId:chatroomId}, {sort: {createdOn: -1}});
        }
    }
});
*/

Template.messageList.onCreated(function(){
    this.autorun(() => {
        var chatroomId = this.data && this.data._id;
        if (chatroomId){
            Meteor.subscribe('messages.filtered', chatroomId);
        }
    });
});

Template.messageList.helpers({
    messages: function(){
        var chatroomId = Template.instance().data && Template.instance().data._id;
        if (Meteor.user() && chatroomId){
            return Messages.find(
                { chatroomId: chatroomId },
                { sort: { createdOn: -1 } }
            );
        }
    },
    title: function(){
        return Template.instance().data && Template.instance().data.title;
    }
});