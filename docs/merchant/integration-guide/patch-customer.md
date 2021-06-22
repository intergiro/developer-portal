# Patch Customer
To update the `"limit"`, `"schedule"` and `"currency"` fields of the Customer, you can make a call to the patch customer endpoint. 
Note that it is only possible to change the `"currency"` field of the customer if the `"total"` field of the customer equals 0. 
This endpoint can also be called with an empty JSON object as body. 
In any case, calling this endpoint will fix deprecated customers with invalid due dates.
<!-- In any case, calling this endpoint will fix deprecated customers with invalid balance configurations and due dates. -->

#### Request 
``` {1}
PATCH https://merchant.intergiro.com/customer/<customerId>
{
    "limit": "<updated limit>",
    "currency": "<updated currency>",
    "schedule": "<updated schedule>"
}
```

#### Response
A successful response will return an updated [`Customer`](../reference/customer.html#customer).