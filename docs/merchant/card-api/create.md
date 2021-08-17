# Create

To create a card token post an [Card Creatable](../acquiring/reference.html#creatable-5) to the card endpoint. The card token generated can be used together with: 

- [Order API](../order/create.html)
- [Authorization API](../acquiring/api.html#authorization)
- [Verification API](../acquiring/api.html#verification)
- [Customer API](../customer/create.html)

#### Request
``` {1}
POST /card

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
