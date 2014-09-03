import Ember from 'ember';
import BaseAuthenticator from 'simple-auth/authenticators/base';
import {request} from 'ic-ajax';

var isEmpty = Ember.isEmpty;

export default BaseAuthenticator.extend({

  authenticate: function authenticate(options) {
    var data = {
      email: options.identification,
      password: options.password
    };

    return request('/sessions', {
      type: 'POST',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json'
    });
  },

  restore: function restore(session) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!isEmpty(session.token) && !isEmpty(session.email)) {
        resolve(session);
      } else {
        reject();
      }
    });
  },

  invalidate: function invalidate() {
    return Ember.RSVP.resolve();
  }
});
