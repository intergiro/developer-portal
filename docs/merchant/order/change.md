# Change

To change an order use a patch request with with an array where each element contains an id of the order and an array of [Event Creatables](./reference.html#event) for that changes you want to be made.

#### Request 
``` {1}
PATCH /v1/order

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <private.api.key>
[
    {
        id: <Identifier of order in Intergiro's system>,
        event: <Array of Event Creatables>
    },
    ...
]
```

#### Response 

You should get a 200 response with the same changes you requested in the body.

``` json
[
    {
        "id": "<Identifier of order in Intergiro's system>",
        "event": "<Array of Event Creatables>"
    },
    ...
]
```