var subs = {
  events: Meteor.subscribe('events'),
  users: Meteor.subscribe('users')
};

Template.main.helpers({
  members: function() {
    return Meteor.users.find({}, { sort: { 'profile.name': 1 }});
  },
  latestEvent: function() {
    return Events.findOne({ date: { $gte: moment().startOf('day').toDate() }}, { sort: { date: 1 }});
  },
  allEvents: function() {
    return Events.find({}, { sort: { date: -1 }});
  }
});

Template.body.events({
  'click [data-sign-in]': function() {
    Meteor.loginWithTwitter();
  },
  'click [data-sign-out]': function() {
    Meteor.logout();
  }
});

Template.event.helpers({
  ready: function() {
    return subs.events.ready();
  }
});

Template.usersList.helpers({
  ready: function() {
    return subs.users.ready();
  }
});

Template.event.events({
  'click [data-yes]': function() {
    var event = this.event;
    Events.update(event._id, { $addToSet: { userIds: Meteor.userId() }});
    showAlert("You're attending!");
  },
  'click [data-no]': function() {
    var event = this.event;
    Events.update(event._id, { $pull: { userIds: Meteor.userId() }});
    showAlert("You're not attending");
  }
});

Template.schedule.events({
  'submit form': function(event, template) {
    event.preventDefault();

    var date = template.$('[name=date]').val();
    if (! moment(new Date(date)).isValid())
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
