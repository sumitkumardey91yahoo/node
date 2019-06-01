
/**
 * Module dependencies.
 */

var app = require('../app');

app.set('port', process.env.PORT || 9000);

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});


