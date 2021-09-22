# Capture

In order to create a [Capture](./reference.html#capture), first send a request with the body of the request set as an [Capture creatable](./reference.html#capture).

``` {1} JSON
POST /v1/authorization/:id/capture

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <private.api.key>

{
    "amount": 1
}
```

Example Response:
``` {1} JSON
HTTP 200 OK

{
  "amount": 1,
  "created": "2021-06-11T09:19:12.618Z",
  "reference": "00000000000",
  "status": "approved"
}
```


