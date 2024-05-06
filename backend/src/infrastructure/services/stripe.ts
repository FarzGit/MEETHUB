import Stripe from "stripe";
const stripe = new Stripe('sk_test_51PB8mpSEVuL1FI1rpi7YKIS4RSHjq4EYFVnHlTsottQHi9Q841QM3ZdkzYom6mL1NukmqFcrRQ1BNehgsZeEJ3Dg00fdb5bZxG',{
    apiVersion: "2024-04-10"
});
import IStripe from "../../usecaseLayer/interface/services/IStripe";
import { IResponse} from "../../usecaseLayer/interface/services/Iresponse";


class StripeService implements IStripe {

    async  createPaymentIntent(
      amount:number,
      email:string,
      userId:string

    ):Promise<IResponse> {
      console.log(amount)
      console.log(email)
      console.log(userId)



      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: 'Premium Payment is',
              },
              unit_amount: amount *100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173/premium',
        cancel_url: 'http://localhost:5173/',
        metadata: {
          email: email,
          userId: userId,
          amount:amount
        },
      });


      console.log(session)
      console.log('the stripe session id is :',session.id)
   
        return {
          status:200,
          data:session.id
        }


  }


  async paymentSuccess(req:any){
    // console.log('payment success request is :',req)
    const payload = req.body;     
    const payloadString = JSON.stringify(payload, null, 2);
    const signature = req.headers["stripe-signature"];

    if (typeof signature !== "string") {
      return false;
    }

    const endpointSecret= "whsec_5f63c87089e91681345ae6b7b8c80d3ed8a322839658aa869e349a689e596ace";
    const header = stripe.webhooks.generateTestHeaderString({
      payload:payloadString,
      secret:endpointSecret
    });

    let event
       event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
    if (event.type == "charge.succeeded") {
      return true;
    } else {
      return false;
    }

    

  }

    






}

export default StripeService