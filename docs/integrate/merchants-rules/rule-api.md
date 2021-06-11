# Rules API

## Creating Rule

Example Rule request:
``` {1}
PUT /merchant/:id/rule

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>

{
    "master": ["reject capture if merchant.captured > 250000"],
}
```




## Changing Rule


Example PATCH request:
``` {1}
PUT /merchant/:id/rule

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>

{
    "master": ["reject capture if merchant.captured > 250000"],
}
```