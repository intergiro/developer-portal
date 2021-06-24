# Topup

In order to make a topup or any customer payment, first the customer must be registerned in the [customer registration](./integration-guide/customer-registration.html#customer-registration).


Add order.creatable.catagory in reference: "withdrawal" "payment"

send order creatable to endpoint [order createable](./reference/order.html#creatable)

``` {1}
PUT 
{
    "number": <order number in your system>,
    "customer": <customer id or contact information>,
    "items": <number or item information or array item objects>,
    "category": "withdrawal",
    "meta": { relevant data },
    "callback": "https://example.webpage.com/somewhere"
}
```

set creatable.category to withdrawal for topup

use order.creatable.meta to put whatever they want 

set order.creatable.callback with URL

entire order will be posted when order changes, including the creation of the order

[Read more about callback here](./reference/callback.html#callback)


