# Change
To update the [`"limit"`](../reference/customer.html#creatable), [`"schedule"`](../reference/subscription#schedule) or [`"currency"`](../acquiring/reference.html#currency) fields of the Customer, you can make a call to the patch customer endpoint. 
Note that it is only possible to change the `"currency"` field of the customer if the `"total"` field of the customer equals 0. 
This endpoint can also be called with an empty JSON object as body. 
In any case, calling this endpoint will fix deprecated customers with invalid due dates.

#### Request 
``` {1}
PATCH /v1/customer/<customer_id>

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <public.api.key> | Bearer <customer.api.key>

{
    "limit": "<updated limit>",
    "currency": "<updated currency>",
    "schedule": "<updated schedule>"
}
```

#### Response
A successful response will return an updated [`Customer`](../reference/customer.html#customer).