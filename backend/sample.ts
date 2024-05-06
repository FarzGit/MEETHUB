


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_5f63c87089e91681345ae6b7b8c80d3ed8a322839658aa869e349a689e596ace";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

