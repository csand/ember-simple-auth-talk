import Ember from 'ember';
import BaseAuthorizer from 'simple-auth/authorizers/base';

var authorizer = BaseAuthorizer.extend({
  authorize: function(xhr) {
    var token = this.get('session.token');
    var email = this.get('session.email');
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
      var authData = 'token="' + token + '", email="' + email + '"';
      xhr.setRequestHeader('Authorization', 'Token ' + authData);
    }
  }
});

export default {
  name: 'my-app-authorizer',
  before: 'simple-auth',
  initialize: function(app, container) {
    container.register('authorizer:my-app', authorizer);
  }
};
