# Create using API

We strongly recommend creating customers by integrating [Customer Registration](./registration-ui.html#registration-ui). 
However creating a customer can also be done via a call to the customer creation endpoint.
When integrating through the endpoint a customer can be initialized with [`Contact information`](../common/reference.html#contact) 
and a [`payment method`](./payment-methods.html) with a tokenized card. [Card Input](../card-input/embed.html) can be used to generate a card token.

#### Request
``` HTTP {1}
POST /v1/customer

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <public.api.key | private.api.key>

{
  "number": "customer-number-001",
  "method": [
    {
      "card": "<single-use.card.token>",
      "type": "token",
      "client": {
        "browser": {
          "color_depth": 24,
          "resolution": [
            2560,
            1440
          ],
          "java": false,
          "javascript": true,
          "locale": "en-GB",
          "timezone": -120,
          "parent": "<origin of current page url>"
        }
      }
    }
  ],
  "contact": {
    "name": "Joe Smith",
    "email": "joe.smith@example.com"
  }
}
```

#### Response
``` JSON
{
  "id": "<Intergiro customer identifier>",
  "number": "<your customer number>",
  "contact": <contact information>,
  "method": [<payment method>],
  "status": "<Customer Status>",
  "total": <Customer Balance>,
  "schedule": "<customer payment schedule>",
  "currency": "<customer currency>"
}
```
``` JSON
{
  "id": "SMmmIYXgLFTgE8qW",
  "number": "customer-number-001",
  "contact": {
    "name": "Joe Smith",
    "email": "joe.smith@example.com"
  },
  "method": [
    {
      "type": "card",
      "scheme": "<scheme>",
      "iin": "123456",
      "last4": "1234",
      "expires": [
        2,
        22
      ],
      "acquirer": "intergiro",
      "created": "1970-01-01T00:00:00.000Z",
      "token": "<card.token>"
    }
  ],
  "status": "active",
  "total": 0,
  "balance": [],
  "schedule": "monthly",
  "currency": "SEK"
}
```