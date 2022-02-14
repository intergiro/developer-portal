# Create

To create an order, post an [Order Creatable](./reference.html#order) to the order endpoint. The `payment` field must be a [Card Payment Creatable](./reference.html#card-payment). 

#### Request
``` {1} JSON
POST /v1/order

Host: merchant.intergiro.com
Content-Type: application/json
Accept: application/json
Authentication: Bearer <customer.api.key> | Bearer <private.api.key>
{
  "items": <number or item information or array of items objects>,
  "currency": "<currency of the transaction>",
  "payment": {
    "type": "card"
    "card": "<card JWT>"
    "client": {
      "browser":
        {
          "color_depth": 24,
          "resolution": [2560,1440],
          "java": false,
          "javascript": true,
          "locale": "sv-SE",
          "timezone": -60,
          "parent": "https://your.webshop.com"
        }
      }
    }
  }
}
```
See [browser](../common/reference.html#browser) section for information on how to get the browser information above.

**Note:** Including `application/json` in the Accept header will return the Order as a JSON, otherwise the Order will be in a signed JWT.

#### Response
On success, the response will be an [Order](./reference.html#order-2).
```json
{
    "id": "<Identifier of order in Intergiro's system>",
    "created": "<datetime of order>",
    "items": "<numer or item information or array of items objects>",
    "currency": "<Currency of order>",
    "payment": "<Card payment>",
}
```
On failure, an [Error](../common/error.html) will be returned together with the id of the order. If a `verification required` error is returned, [verification](../card-api/verification.html) needs to be performed.

**Note: Include the `id` from the error response in the request body for all following calls to the order-create endpoint, concerning the same order.** This is important to keep a correct [History](../authorization/reference.html#history) of the authorization creation, and to make sure 3DS is done correctly. The id field in an Order Creatable should never be populated with any id other than the id received from the order endpoint.


