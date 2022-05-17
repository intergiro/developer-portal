# Update

To update the merchant information send a patch with a `Partial<Merchant>` in the body and the merchant id in the url to the merchant endpoint.

``` {1} JSON
PATCH /v1/merchant/:id

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <agent.api.key>

{
  "number": "Example",
  "name": "Example Merchant",
  "currency": "SEK",
}
```

The response is the updated merchant on the same form as in [create merchant](./create.html), in this case with the currency updated to SEK.

Note that the [rules](./rules.html) can also be updated through a patch call.

## Guards
To activate certain [guards](./rules.html#extended-state) PATCH the merchant with a list off all [guards](./rules.html#extended-state) that should be activated.

``` {1} JSON
PATCH /v1/merchant/:id

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <agent.api.key>

{
  "guard": ["iin"],
}
```
