# Capture

In order to create a [Capture](../merchants-reference/capture.html), first send a request with the body of the request set as an [Capture creatable](../merchants-reference/capture.html#creatable).

``` {1}
POST authorization/:id/capture

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>

{
    "amount": 1
}
```

Example Response:
``` {1}
HTTP 200 OK

{
  "amount": 1,
  "created": "2021-06-11T09:19:12.618Z",
  "reference": "00000000000",
  "status": "approved"
}
```

