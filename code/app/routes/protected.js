import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import {request} from 'ic-ajax';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return request('/protected', {
      dataType: 'json',
      contentType: 'application/json'
    });
  }
});
