# Create

To create a [Card Token](./reference.html#token), post a [Card Creatable](./reference.html#card-creatable) to the card endpoint. The card token generated can be used together with: 

- [Order API](../order/create.html)
- [Authorization API](../authorization/create.html)
- [Verification API](../verification/create.html)
- [Customer API](../customer/create.html)

#### Request
``` {1} JSON
POST /v1/card

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <public.api.key>
{
	"pan": "<card number>",
	"csc": "<card security code>",
	"expires": [<card expires month>, <card expires year>]
}
```

#### Response
```json
<signed.card.token>
```

