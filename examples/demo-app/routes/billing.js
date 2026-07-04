const { Router } = require('express');
const Stripe = require('stripe');
const supabase = require('../lib/supabase');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = Router();

// start a Pro checkout
router.post('/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: 'price_stickr_pro_monthly', quantity: 1 }],
    client_reference_id: req.body.userId,
    success_url: 'http://localhost:3000/?upgraded=1',
    cancel_url: 'http://localhost:3000/',
  });
  res.json({ url: session.url });
});

// Stripe tells us when someone pays
router.post('/webhook', async (req, res) => {
  const event = req.body;
  if (event.type === 'checkout.session.completed') {
    const userId = event.data.object.client_reference_id;
    await supabase.from('profiles').update({ plan: 'pro' }).eq('id', userId);
  }
  res.json({ received: true });
});

module.exports = router;
