# Create

To create an order, post an [Order Creatable](./reference.html#order) to the order endpoint. The `payment` field must be a [Card Payment Creatable](./reference.html#card-payment). 

#### Request
``` {1} JSON
POST /v1/order

Host: merchant.intergiro.com
Content-Type: application/json
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
On failure, an [Error](../common/error.html) will be returned together with the id of the order. The `id` in the error response should be included in the request body in all following calls to the order-create endpoint, concerning the same order. This is important if you want to keep a correct [History](../authorization/reference.html#history) of the authorization creation, and to make sure 3Ds is done correctly.


<b>Note:</b> The id field in an Order Creatable should never be populated with any id other than the id received from the order endpoint.

<!-- If, for example, a verification required error is returned, all following calls to the order-create endpoint in the 3DS cycle should include the id in the request body. -->

<!-- ```json
{
    "status": 400,
    "type": "malformed content",
    "content": {
        "property": "card",
        "type": "Card.Creatable | Card.Token",
        "description": "verification required",
        "details": {
            "visible": false,
            "method": "POST",
            "url": "https://acs.sandbox.3dsecure.io/3dsmethod",
            "data": {
                "type": "method",
                "threeDSServerTransID": "8ca068b6-4b45-49eb-9807-1c21aa661bde",
                "messageVersion": "2.2.0"
            }
        }
    },
    "error": "verification required",
    "id": "SpyMA1U1g4iPwf8l"
}
``` -->
