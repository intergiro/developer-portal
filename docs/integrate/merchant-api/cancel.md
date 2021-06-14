# Cancel Authorization


Only non-captured authorizations can be canceled.

``` {1}
DELETE authorization/:id

Host: api.payfunc.com
Authorization: Bearer <access_token>
```

Example response for succesful cancelation:
```
HTTP 204 No Content

```