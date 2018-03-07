// reference: https://developer.paypal.com/docs/accept-payments/express-checkout/ec-braintree-sdk/server-side/node/
var express = require('express'),
    router = express.Router(),
    braintree = require('braintree');

var ACCESS_TOKEN =　'access_token$sandbox$ACCESSTOKEN';

var BT_ENV = braintree.Environment.Sandbox,
    BT_ID = "DUMMYID",
    BT_PUB = "DUMMYPUBLIC",
    BT_PRI = "DUMMYPRIVATE";

/* GET home page. */
router.get('/', function(req, res, next) {

  // Construct your gateway object
  var gateway = braintree.connect({
      accessToken: ACCESS_TOKEN
  });

  // Generate a client token
  gateway.clientToken.generate({}, function (err, response) {
    res.render('index', { clientToken: response.clientToken });
  });

});

router.post("/checkout", function (req, res) {
  // Use payment method nonce here
  var gateway = braintree.connect({
    accessToken: ACCESS_TOKEN
　});
  var saleRequest = {
    amount: req.body.amount,
    merchantAccountId: "JPY",
    paymentMethodNonce: "" + req.body.payment_method_nonce,
    options: {
      submitForSettlement: true,
      paypal: {
        customField: "販売者:ショップ１"
      }
    },
    descriptor: {
      name: "PAYPAL *12345678901234"
    }
  };
  gateway.transaction.sale(saleRequest, function (err, result) {
    if (err) {
      res.send("<h1>Error:  " + err + "</h1><br/>" + JSON.stringify(result, null, 4).replace(/\n/g, "\n<br/>").replace(/ /g, " &nbsp;") + "<br/><br/><a href=\"/\">Try again</a>");
    } else if (result.success) {
      res.send("<h1>Success! Transaction ID: " + result.transaction.id + "</h1><br/>" + JSON.stringify(result, null, 4).replace(/\n/g, "\n<br/>").replace(/ /g, " &nbsp;") + "<br/><br/><a href=\"/\">Try again</a>");
    } else {
      res.send("<h1>Error:  " + result.message + "</h1><br/>" + JSON.stringify(result, null, 4).replace(/\n/g, "\n<br/>").replace(/ /g, " &nbsp;") + "<br/><br/><a href=\"/\">Try again</a>");
    }
  });
});
  

module.exports = router;
