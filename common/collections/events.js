Events = new Meteor.Collection('events');

Meteor.methods({
  createEvent: function(date) {
    Events.insert({ date: moment(new Date(date)).toDate() });
  }
});

Events.helpers({
  attendees: function() {
    if (! this.userIds)
      return [];
    return Meteor.users.find({ _id: { $in: this.userIds }}, { sort: { 'profile.name': 1 }});
  },
  formattedDate: function() {
    return moment(this.date).format('dddd D MMM');
  },
  hasRSVP: function(userId) {
    return _.contains(this.userIds, userId);
  }
});