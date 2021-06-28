# Balance
One of the main features of the customer is to charge items against the balance of the customer. For this there are three main features. 
Adding items to Balance, Adding funds to the Balance and settling the Balance. 

### Adding items to Balance
If a customer pays for an item with their balance, you can add that item to the balance using the customer-balance-item endpoint. 
In this case just make a simple post request. 
The body of a valid request should either be a strictly positive, nonzero `number`, an [`Item`](../../integrate/acquiring/reference.html#item) or an array of [`Items`](../../integrate/acquiring/reference.html#item).

#### Request
``` {1}
POST customer/<customerId>/balance

Host: merchant.intergiro.com 
Conent-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <private.api.key>

{
  "number": "<product number in your system>",
  "name": "<name or description of product>",
  "price": "<item price>",
  "quantity": "<quantity>",
  "unit": "<unit>",
  "vat": "<vat>",
  "rebate": "<rebate>"
}
```

#### Response
A successful response will return the updated [`Customer`](../reference/customer.html#customer).

### Adding funds to Balance
Adding funds to the balance can be done via the regular **Order Endpoint ???**. 
To charge the balance of an customer, specify the `charge` field of the Customer payment as `"balance"`.
Once the payment is authorized, it will automatically credit the balance with the total of the payment and [charge](#) the order.

An order that failed authorization will set the Custoomer status to `"pending"` and retry authorization as specified in [retrying failed customer orders](#).

#### Request
``` {1}
POST /order

Host: merchant.intergiro.com/
Content-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <private.api.key>

{
    "number": "your order identifier",
    "items": "<Item or number indicating the charge to the balance>",
    "currency": "<Currency 3 digit identifier>",
    "customer": "<customerIdentifier>",
    "payment": {
        "type": "customer",
        "charge": "balance"
	}
}
```

#### Response
A successful response will be as detailed in the [`Order Endpoint API`](../order#card-account-payment).

### Settling Balance
Calling this endpoint will settle the balance and move all Items that are charged towards the balance, but have not been settled yet, to an Order. 
Thus, all items charged to the balance will inevitably end up being added to an Order, so a receipt can be created for them.

A Request to this endpoint can either be made with a "private" authorization key or with the "customer" authorization key. 
With the "customer" authorization key you have to specify "me" as the customer id, for "private" authorization specify the customer id of the customer you wish to settle or "all" if you want settle all customers tied to the customer.

If the balance already partially paid for the items specified in the "balance" field of the customer, that amount will be added to the order as its own item.

The order will be an customer order with the "charge" field in the "payment" field set to "balance" and will be automatically charged. 
Only a successful payment will update the "total" field of the customer. 
A failed payment will retry authorization as specified in [`retrying failed customer orders.`](../order#retry-failed-account-payments)

#### Request

```{1}
DELETE /v1/customer/<customerId>/balance

Host: merchant.intergiro.com
Authentication: Bearer <customer.api.key> | Bearer <private.api.key>
```
#### Response
A response will be a json object specifying how many customers updated their balance and how many customers generated an error instead. 
If all customers are correctly set up, the errors field should always equal 0.
```json
{
  "updated":"<amount of updated customers>",
  "errors":"<amount of customers generating an error>"
}
```
