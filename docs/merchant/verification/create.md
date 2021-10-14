# Create

POST /authorization -> `"error": "verification required"`

Post to the verification endpoint with the query `method=GET`.
In the body set a verification creatable as well as the `target` url you want the 3D Secure data to be http POSTed to.

``` JSON {1}
POST /verification&method=GET

{
    "items": 7.5,
    "number": "abcdef",
    "currency": "EUR",
    "card": {
        "number": "abcdef",
		"amount": 7.5,
		"currency": "EUR",
		"card": {
			"pan": "4111111111111111",
			"expires": [2, 22],
			"csc": "987"
		}
    },
    "target": "http://your.example-url.com/",
}
```

The Response should look like this:
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

This can be implemented in two ways either you redirect to the url specified in `content.details.url` or you put the url as the source of an Iframe.


This will cause an http POST to the url specified in the `target` property specified in the verification creatable.

The request will look something like this
``` json
{
    "data": {
        "": ""
        "messageVersion": "2.2.0"
    }
}
``` 

Post the data to verification endpoint 

The response from the verification endpoint can either be:
1. verification, Status 201
2. error, Status: 400
    - Verification required
    - failed verification

GET /verification/redirect?origin=...&threeDSMethodData=...&v=...
-> challenge


POST /authorization -> success


