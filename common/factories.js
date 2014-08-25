Factory.define('user', Meteor.users, {
  'profile.name': function() { return Fake.user().fullname; },
  services: {
    twitter: {
      screenName: function() { return Fake.user().name.toLowerCase(); }
      // profile_image_url: function() { return 'http://placepu.gs/250/250'; }
    }
  }
});

Factory.define('event', Events, {
  date: function() { return new Date(); }
}).after(function(doc) {
  var userIds = _.times(10, function() {
    return Factory.create('user')._id;
  });
  Events.update(doc._id, { $set: { userIds: userIds }});
});

Meteor.methods({
  seedFactory: function() {
    if (Events.find().count() === 0)
      Factory.create('event');
  }
});