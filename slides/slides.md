## User's Guide to Simple Auth


This presentation

`https://github.com/csand/ember-simple-auth-talk`


Ember Simple Auth

`https://github.com/simplabs/ember-simple-auth`



You've decided to write an application in Ember.js, and you need to store user
specific data. Congratulations! you need authentication and authorization.


But you want to do things the modern way, developing the front end as
standalone web application, and use nice tools like Ember CLI.


You should use Ember Simple Auth.



Installation

Sessions

Mixins

Authenticators

Authorizers

Configuration



## Installation


Courtesy of Ember CLI's addon system, this is now the easiest part of using
Simple Auth


```
$ npm install ember-cli-simple-auth
```


`config/environment.js`
```
var ENV = {
  ...

  SimpleAuthENV: {
  }
};
```


`app/index.html`
```javascript
window.MyAppENV = require('my-app/config/environment')['default'];
window.EmberENV = window.MyAppENV.EmberENV;
window.ENV = window.ENV || {};
window.ENV['simple-auth'] = window.MyAppENV.SimpleAuthENV;
```


And we're done.



## Sessions


The session is the core object of Simple Auth, and gets injected onto every
route and controller in your application as a property named `session`.


Sessions are little data caches that have some useful methods, and that you
can add information to as you like.  They can be backed by a few different
storage classes, but the primary one we'll be using relies on the browser's
`localStorage` API.


Probably the most important method of sessions is `authenticate`, which we'll
get to later.


They also have a bunch of useful properties, like `isAuthenticated`.


Which let you do things like
```handlebars
{{#if session.isAuthenticated}}
  Congratulations!
{{else}}
  {{link-to 'Would you kindly sign in?' 'login'}}
{{/if}}
```


Sessions are one of the few things in Simple Auth that *just happen*.

Note: installation instructions pull in the initializer



## Mixins


AuthenticatedRouteMixin

ApplicationRouteMixin

AuthenticationControllerMixin

LoginControllerMixin

Note: Class deluge time


Worth noting, both route mixins do their work in the route's `beforeModel`
hook, so if you include them make sure to call `this._super()`.


### AuthenticatedRouteMixin

Checks the session to see if it's authenticated. If it isn't, the transition
will be saved in the session, and the `authenticateSession` action will be
sent.


### ApplicationRouteMixin

Almost entirely action handlers. This is what actually handles the
`authenticateSession` action, redirecting the user to the authentication route
by default.


### AuthenticationControllerMixin & LoginControllerMixin


It's best to address these two as a pair because of what they do, which
is handle the `authenticate` action. Also, they don't do all that much.


<small>
`simple-auth/mixins/authentication-controller-mixin.js`
</small>
```javascript
authenticate: function(options) {
  var authenticator = this.get('authenticator');
  Ember.assert('...', !Ember.isEmpty(authenticator));
  return this.get('session').authenticate(this.get('authenticator'), options);
}
```


<small>
`simple-auth/mixins/login-controller-mixin.js`
</small>
```javascript
export default Ember.Mixin.create(AuthenticationControllerMixin, {
  actions: {
    authenticate: function() {
      var data = this.getProperties('identification', 'password');
      this.set('password', null);
      return this._super(data);
    }
  }
});
```



## Authenticators


Authenticators handle all of the logic behind validating a user's
credentials, restoring a session from storage, and invalidating the
session when a user signs out.


Three main methods

- `authenticate`
- `invalidate`
- `restore`


`code/app/authenticators/my-app.js`

Note: Switch to code here, easier to show it this way. Note the use of promises



## Authorizers


Authorizers are best thought of as being analagous to server-side session
middleware. They have a single method, `authorize`, which intercepts outgoing
XMLHttpRequests and modifies the request to include a session's identifiying
information.


`code/app/initializers/my-app-authorizer.js`

Note: Not really best practice, put the authorizer in `app/authorizers`



## Configuration


The only thing you actually need to configure in Simple Auth is the authorizer.


`code/config/environment.js`
```javascript
var ENV = {
  ...

  SimpleAuthENV: {
    authorizer: 'authorizer:my-app'
  }
};
```

Note: This was all set up in Installation


But just about everything is configurable.


Ember.js Persistence Foundation (an alternative to Ember Data) also likes to
use the property `session` for its data store.


`code/config/environment.js`
```javascript
var ENV = {
  ...

  SimpleAuthENV: {
    authorizer: 'authorizer:my-app',
    sessionPropertyName: 'simpleAuthSession'
  }
};
```


Simple Auth also needs to know which hosts the authorizer should modify
outgoing requests for if you're trying to do CORS.


`code/config/environment.js`
```javascript
var ENV = {
  ...

  SimpleAuthENV: {
    authorizer: 'authorizer:my-app',
    crossOriginWhitelist: ['api.myapp.com']
  }
};
```



## Leftovers


### Torii


Simplified authentication flow for social auth (OAuth, etc).


`ember-simple-auth-torii`

<small>
`https://github.com/simplabs/ember-simple-auth/tree/master/packages/ember-simple-auth-torii`
</small>


### Cookie Storage


Alternative to the `localeStorage` store for older browsers.


`ember-simple-auth-cookie-store`

<small>
`https://github.com/simplabs/ember-simple-auth/tree/master/packages/ember-simple-auth-cookie-store`
</small>
