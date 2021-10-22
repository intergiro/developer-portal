# Redirect

This endpoint allows you to perform 3D Secure and create an [Authorization](./reference.html#authorization-2). The request body should be an [Authorization creatable](./reference.html#authorization) and the response will be html that when you render performs the whole 3D flow. For more information, see the [Automated](../3d-secure/automated.html) section. 


``` {1} JSON
POST /v1/authorization/redirect

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <public.api.key> or <customer.api.key>

{
	"number": "a_unique_identifier",
	"items": 50,
	"currency": "EUR",
	"card": {
		"pan": "4111111111111111",
		"expires": [2, 22],
		"csc": "987"
	},
    "target": "http://your.example-url.com/"
}
```

