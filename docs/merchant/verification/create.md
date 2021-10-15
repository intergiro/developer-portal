# Create

<img :src="$withBase('/assets/img/merchant/verification/get-flow.jpg')" alt="GET flow">


If you recieve a `"verification required"` error from the authorization endpoint, http POST to the verification endpoint with the query `method=GET` with, the body set as a [verification creatable](./reference.html#verification-creatable) and the `target` url you want the 3D Secure data to be http POSTed to. 

``` JSON {1}
POST /verification&method=GET

{
    "number": "abcdef",
    "items": 7.5,
    "currency": "EUR",
    "card": {
		"pan": "4111111111111111",
		"expires": [2, 22],
		"csc": "987"
    },
    "target": "http://your.example-url.com/",
}
```

## Verification Responses

The verification response can be one of three things: 
1. A [`"verification required"`](./create.html#verification-required) error response with status 400
2. A [successful verification](./create.html#verification-success) response with status 201
3. A [failed verification](./create.html#verification-failed)
### Verification required 

Example response:
``` json
{
    "type": "method",
    "content": {
        "details": {
            "visible": false,
            "method": "GET",
            "url": "https://merchant.intergiro.com/v1/verification/redirect?target=https://3dsecure.io/&origin=http://your.example-url.com/&v=2.2.0"
        }
    }
}
```

Either redirect to the url specified in `content.details.url` or put the url as the source of an Iframe.
This will initiate a step in the 3D Secure cycle.
The 3D response data will be POSTed to the url specified in the `target` property of the verification creatable. 


Example POST to the `target` URL:
``` {1}
POST http://your.example-url.com/;verification=%7B%22type%22%3A%22method%22%2C%22data%22%3A%7B%22threeDSServerTransID%22%3A%22454c0f37-8c07-4f22-abb2-e1e4781ab03c%22%2C%22messageVersion%22%3A%222.2.0%22%7D%7D
Content-Type=x-form-urlencoded
``` 

The payload is sent as form data.

Take the `verification` property from the payload and set it on the property `card.verification` on the verification creatable and POST to the verification endpoint.

Treat the verification response according to [Verification Response Section](./create.html#verification-required).
### Verification Success
A successful verification with status 201, means you can continue to the create an authorization using the [authorization endpoint](../authorization/create.html).

### Verification Failed
A failed verification has status 400 and contains no `"verification required"` error.


