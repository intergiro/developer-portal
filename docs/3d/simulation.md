# Simulation

Simulation API can be used to test certain things that are truly possible only in live environment. For example a card payment or a refund.

## Card payment

Once a card is activated, you can simulate a card payment.

Example simulate card payment request:

```{1}
POST /v3/simulations/card_payment

Content-Type: application/json
Authorization: Bearer <access_token>
```

Response:

```{1}
HTTP 200 OK

{
  "card_id": "fc19e3bd-bc42-4a1a-8641-154be6d91bb1",
  "amount": 1200,
  "currency": "SEK"
}
```
