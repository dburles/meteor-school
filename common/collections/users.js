Meteor.users.helpers({
  name: function() {
    return this.services &&
      this.services.twitter.screenName;
  },
  avatar: function() {
    if (this.services && this.services.twitter.profile_image_url)
      return this.services.twitter.profile_image_url.replace(/_normal/, '');
  },
  admin: function() {
    return this.services &&
      this.services.twitter.screenName === 'dburles';
  }
});