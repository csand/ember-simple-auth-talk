import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.ObjectController.extend(
LoginControllerMixin,
{
  authenticator: 'authenticator:my-app',
  identification: null,
  password: null
});
