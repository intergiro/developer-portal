# Cancel

Only non-captured authorizations can be canceled.

``` {1}
DELETE /v1/authorization/:id

Host: merchant.intergiro.com
Authorization: Bearer <access_token>
```

Example response for succesful cancelation:
```
HTTP 204 No Content

```