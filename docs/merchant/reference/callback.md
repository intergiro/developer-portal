# Callback

## Receiving callbacks

When creating an [`order`](./reference/order) you can provide a callback url under the field [`callback`](). 
When the order is created or changed (charged, cancelled, refunded, or pended) information about the order is posted to the callback url.
The callback has the following structure for a successfull operation: 

``` {1}
POST <callback url>

Content-Type: "application/jwt; charset=utf-8"

signed.order.token
```

If the [`order`](./reference/order) is not properly created or changed, an [`Error`](./reference/error) will be posted to the callback url with `Content-Type: "application/json; charset=utf-8"`.

## Verify tokens
The signed tokens are json web tokens (jwt). The tokens are signed using HS256 algorithm. To manually verify the token, use the following public key. 

**Public key:**
```
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4b69lzXDidPJ2OtQIQtuYFlVWO1IBDXvN8iWyFph3HSP18EWCdZ6+5RcMgdyEfxWByurM7kbCgORMGqBm66n8XNBs78Rkva3jMudSoOHunsfI3Iu75dd8DJp3J2plti2eudbRw9v7T8F7f+MG9kITwXH5LHJ/bTA9R5JurcsyNY51iGpZ5spI+59GgJ8NomMyFKwkYcyPU3Elg+XiEK2vSmG3Onigo7Xo76CXPAyTRilwfvyNYM1s6a2P31fm8e0y98bwPxiv/qVNOQ8xu409R8gMC9ieyPeuR6pRR9/IK0vdcL62NhRQov6rd89exAxte909dpCHVqeDpSyNfgu6wIDAQAB
```


For information on how to implement verification of JWTs and available libraries, visit [jwt.io](https://jwt.io).

