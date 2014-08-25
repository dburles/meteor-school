Meteor.publish('events', function() {
  return Events.find();
});

Meteor.publish('users', function() {
  return Meteor.users.find({}, {
    fields: {
      'profile.name': true,
      'services.twitter.screenName': true,
      'services.twitter.profile_image_url': true
    }
  });
});