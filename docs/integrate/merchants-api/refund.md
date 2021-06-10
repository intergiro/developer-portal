# Refund
In order to create a [Refund](../merchants-reference/refund.html), first send a request with the body of the request set as an [Refund creatable](../merchants-reference/refund.html#creatable).

``` {1}
POST authorization/:id/refund

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>
```