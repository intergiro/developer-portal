# Create using API

We strongly recommend creating customers by integrating [Customer Registration](./customer-registration.html#customer-registration). 
However creating a customer can also be done via a call to the customer creation endpoint.
When integrating through the endpoint the customer can be initialized with [`Contact information`](../../integrate/acquiring/reference.html#contact) 
and [`payment methods`](./customer-methods.html#customer-methods) if you already have tokenized card information. [Card Input](../card-input) can be used to generate a card token.

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
          "colorDepth": 24,
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
  "customer": <contact information>,
  "method": [<payment method>],
  "status": "<Customer Status>",
  "schedule": "<customer payment schedule>",
  "currency": "<customer currency>"
}
```
``` JSON
{
  "number": "customer-number-001",
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
  "contact": {
    "name": "Joe Smith",
    "email": "joe.smith@example.com"
  },
  "status": "active",
  "total": 0,
  "balance": [],
  "currency": "SEK",
  "schedule": "monthly",
  "id": "SMmmIYXgLFTgE8qW"
}
```