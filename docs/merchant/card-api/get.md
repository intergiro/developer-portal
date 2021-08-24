# Get

To fetch information about a card, make a GET call to the card endpoint with the card token included in the url. The endpoint will return a [Card](./reference.html#card).

#### Request
``` {1}
GET v1/card/:card_token

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <public.api.key>

```

#### Response
``` 
{
    "scheme": "<card scheme>",
    "iin": "<card iin>",
    "last4": "<last 4>",
    "expires": [<card expires month>, <card expires year>]
}

```