var sendmail = require('sendmail')();
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

//app.use(express.static('static'));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/contact', function(req, res) {
  if (req.body.choice == 1) {
    choiceStr = 'Domanda generica';
  }
  if (req.body.choice == 2) {
    choiceStr = 'Domanda su uno dei miei progetti';
  }
  if (req.body.choice == 3) {
    choiceStr = 'Suggerimento - Feedback';
  }

  message = 'Da: ' + req.body.from + '<br>';
  message += 'Tipo: ' + choiceStr + '<br><br>';
  message += 'Messaggio:<br>' + req.body.message;

  sendmail({
      from: 'Marco Mascarucci <info@marcomascarucci.com>',
      to: 'marco.mascarucci@outlook.it',
      subject: 'Contatto: ' + req.body.subject,
      html: message,
  });

  res.send('ok');
});

app.listen(3000);
