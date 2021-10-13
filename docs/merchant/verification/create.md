# Create

POST /authorization -> "verification required"


Post to the verification endpoint with the query method set to `"GET"`.

``` JSON
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
    "target": "http://your.url.com/",
}
```

The Response should look like this:
``` json
{
    "type": "method",
    "content": {
        "details": {
            "method": "GET",
            "url": "https://merchant.intergiro.com/v1/verification?origin=http://your.url.com/&v=2.2.0"
        }
    },
    "data": {
        "authentication": "string",
        "status": "A" | "N" | "U" | "Y" | "C" | "R",
        "reference": {
            "server": "string",
            "directory": "string",
            "access": "string",
        }
    }
}
```


Follow the in JSON instructions by doing the type of request suggested by `request.contenct.details`.



GET /verification/redirect?origin=...&threeDSMethodData=...&v=...
-> method


GET /verification/redirect?origin=...&threeDSMethodData=...&v=...
-> challenge


POST /authorization -> success


