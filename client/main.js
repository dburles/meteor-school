Meteor.subscribe('events');
Meteor.subscribe('users');

Template.main.helpers({
  members: function() {
    return Meteor.users.find({}, { sort: { 'profile.name': 1 }});
  },
  latestEvent: function() {
    return Events.findOne({ date: { $gte: new Date() }}, { sort: { date: -1 }});
  },
  allEvents: function() {
    return Events.find({}, { sort: { date: -1 }});
  }
});

Template.main.events({
  'click [data-sign-in]': function() {
    Meteor.loginWithTwitter();
  },
  'click [data-sign-out]': function() {
    Meteor.logout();
  }
});

Template.event.events({
  'click [data-yes]': function() {
    Events.update(this._id, { $addToSet: { userIds: Meteor.userId() }});
    showAlert("You're attending!");
  },
  'click [data-no]': function() {
    Events.update(this._id, { $pull: { userIds: Meteor.userId() }});
    showAlert("You're not attending");
  }
});

Template.schedule.events({
  'submit form': function(event, template) {
    event.preventDefault();

    var date = template.$('[name=date]').val();
    if (! moment(date).isValid())
      return showError("Invalid date: " + date);

    Meteor.call('createEvent', date, function(error) {
      if (error)
        return showError("There was an error creating this event");

      return showAlert("Created new event");
    });
  }
});

Template.schedule.helpers({
  events: function() {
    return Events.find({}, { sort: { date: -1 }});
  }
});
