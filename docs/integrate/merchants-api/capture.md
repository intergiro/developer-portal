# Capture

In order to create a [Capture](../merchants-reference/capture.html), first send a request with the body of the request set as an [Capture creatable](../merchants-reference/capture.html#creatable).

``` {1}
POST authorization/:id/capture

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>
```