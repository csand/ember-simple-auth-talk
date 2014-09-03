function createToken(length) {
  var text = '';
  var hexChars = 'abcdef0123456789';

  for (var i = 0, l = hexChars.length; i < length; i++) {
    text += hexChars.charAt(Math.floor(Math.random() * l));
  }

  return text;
}

export default {
  name: 'pretender-routes',
  initialize: function() {
    new Pretender(function() {
      this.post('/sessions', function(req) {
        var body = JSON.parse(req.requestBody);
        return [
          200,
          {'Content-Type': 'application/json'},
          JSON.stringify({
            email: body.email,
            token: createToken(48)
          })
        ];
      });
      this.get('/protected', function(req) {
        return [
          200,
          {'Content-Type': 'application/json'},
          JSON.stringify({
            authHeader: req.requestHeaders.Authorization
          })
        ];
      });
    });
  }
};
