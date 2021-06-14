# Rules API

## Patching Rules

Only a private or agent bearer token is authorized to make this call.

Example PATCH request:
``` {1}
PATCH /merchant/:id/rule

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <private or agent access_token>

{
    "agent": ["reject refund if merchant.refundable<0"],
    "merchant": [
        "reject capture if !authorization.currency:(EUR|SEK)",
        "reject capture if authorization.currency:(EUR) merchant.captured > 25000",
        "reject capture if authorization.currency:(SEK) merchant.captured > 250000"
    ]
}
```

## Putting Rules

Only an acquirer can make this call (agent access token with id="master").

Example PUT Rule request:
``` {1}
PUT /merchant/:id/rule

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <master access_token>

{
    "master": ["reject capture if merchant.captured > 250000"],
    "agent": ["reject refund if merchant.refundable<0"]
}
```
