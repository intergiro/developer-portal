# Create

An authorization is the reservation of a specified amount of money on a cardholder's credit/debit card. 
An authorization often require a verification. 
A verification is usually needed if the amount is large enough or when creating an initial recurring authorization.
A verification is a Strong Customer Authentication (SCA) supported by the issuing bank. 

The Create Authorization API let's you create authorizations for single time payments as well as recurring payments.
After creating an authorization, the authorization can be [captured](../authorization/capture.html), [canceled](../authorization/cancel.html) or [refunded](../authorization/refund.html).

In order to create an [Authorization](./reference.html#authorization), first send a request with the body of the request set as an [Authorization creatable](./reference.html#authorization).

Example Authorization request:
``` {1} JSON
POST /v1/authorization

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <public.api.key>

{
  "number": "a_unique_identifier",
  "amount": 23,
  "currency": "EUR",
  "card": {
    "pan": "4111111111111111",
    "expires": [2, 22],
    "csc": "987"
  },
  "browser": {
    "color_depth": 24,
    "resolution": [2560,1440],
    "java": false,
    "javascript": true,
    "locale": "sv-SE",
    "timezone": -60,
    "parent": "https://your.webshop.com"
  }
}
```
See [browser](../common/reference.html#browser) section for information on how to get the browser information above.

Example Response:

``` {1} JSON
HTTP 200 OK

{
  "id": "1234567890123456",
  "number": "a_unique_identifier",
  "merchant": "testtest",
  "amount": 23,
  "currency": "EUR",
  "history": [],
  "change": [],
  "capture": [],
  "refund": [],
  "created": "2021-04-01T09:00:00.000Z",
  "reference": "12341234",
  "card": {
    "csc": "matched",
    "expires": [2, 22],
    "iin": "411111",
    "last4": "1111",
    "scheme": "visa",
    "type": "debit",
  },
}
```
