# External 

The External method is suitable if you want to create an authorization using an external 3Ds service. In this flow, the whole 3D Secure process will be performed externally, which includes verifying the result. This method requires an api-key which does not include any configurations for 3Ds. 

<img style="width: 90%; display: block; margin: auto" :src="$withBase('/assets/img/merchant/verification/external-flow.jpg')" alt="POST flow">

POST an [authorization creatable](../authorization/reference#authorization-creatable.html) to the [authorization create](../authorization/create.html#create) endpoint.

There are two ways the verification result can be sent. This is decided by either specifying the `target` field or the `browser.parent` field in the authorization creatable. 
1. Sent using a HTTP POST request, with form data as the payload, to the url you specify in the `target` field. This can be received through an endpoint.
2. Sent using the `window.postMessage()` method to the window you specify in the `browser.parent` field. This can be received through an event listener.


``` JSON {1}
POST /authorization

{
    "number": "abcdef",
    "items": 7.5,
    "currency": "EUR",
    "card":  {
		"pan": "4111111111111111",
		"expires": [2, 22],
		"csc": "987"
    },
    "target": "http://your.example-url.com/",
}
```

## Authorization Responses

The authorization response can be one of three things: 
1. A [`"verification required"`](./external.html#verification-required) error response with status 400
2. A [successful authorization](./external.html#authorization-success) response with status 201
3. A [failed authorization](./external.html#authorization-failed)

### Verification required 

- If the error response includes a `content` field with a `content.details.url`, antifraud verification needs to be performed.

    Example response:
    ``` json
    {
        "status": 400,
        "type": "malformed content",
        "content": {
            "property": "card",
            "type": "Card.Creatable | Card.Token",
            "description": "verification required",
            "details": {
                "visible": false,
                "method": "GET",
                "url": "https://merchant.intergiro.com/v1/verification/redirect?target=https://3dsecure.io/&origin=http://your.example-url.com/&v=2.2.0"
            }
        },
        "error": "verification required"
    }
    ```

    A GET call to the url specified in `content.details.url` returns html that will perform the verification. This call can be done by either redirecting to the url or by setting the url as the source of an Iframe.

    If the `target` field is specified in the authorization creatable, the response data will be POSTed to the specified url. The payload is sent as form data with `card` as key and a tokenized card as value. 

    ``` {1}
    card=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXJkIiwiaWF0IjoxNjM0ODAzMDAyLCJhdWQiOiJkZXZlbG9wbWVudCIsImVuYyI6IjU2LlNoeGpDalMxMk96b05IbHRXaFN6ZWcuMTRMZVhnS2dla3hQX2Vjd3NYc0RlNmVmVVgxZVp3bXJ3LUFTYWFFUmgxZUxEeFBXIiwieHByIjpbMiwyMl0sInZlciI6eyJ0eXBlIjoibWV0aG9kIiwiZGF0YSI6eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6IjFiYTE5MDgwLWNkMTMtNDk3MS1hNmRlLTllNzhmN2M4OGUzZCIsIm1lc3NhZ2VWZXJzaW9uIjoiMi4yLjAifX19.qLY7bX6SgTHtqTRec2GRmYE0ZlICVc0axYO65g0poc8FQUnlAUmAnrrLUfbcrApbk67n4Lc0taag8XwoAYw-_Kaiqa1G7T1lJEiW-SxWT6uiXPmCmmZBcjs_bVHCFS9251SZ5QRaldK1pDLcbW6RhoYcviUFzgTFz0RI3srYHHnjDsnP-YEcWTvugrvFZxM0KNnTT_C56zbMmDD1QlCHqjyg_XnkbJiGUegKW0MoKMFuJUbKI3ipxDbB_HNO7sfIiEsXl3Zkst_VuevBoQIcy3BnOJ15opNQp_WqGgZ76hwIUwTJLpIpYPgzljQ0MGOAY2FbRp4TD5buIP2cXjjmZg
    ``` 

    If the `browser.parent` field is specified in the authorization creatable, the response data will be sent using the `window.postMessage()` method to the specified window. To receive the data, add an event lister as below:

    ``` js
    window.addEventListener("message", async e => {
        if (e.data.destination == "parent" && e.data.content.name == "card") {
        authorization.card = e.data.content.value
        }
    })

    ``` 
    Take the tokenized card from the payload and set it on the property `card` on the authorization creatable and POST to the authorization endpoint as previously.


- If the error response does not include a `content` field, 3DS needs to be performed.
    Example response:
    ``` json
    {
        "status": 400,
        "type": "malformed content",
        "error": "verification required"
    }
    ```
    - Perform 3D and verify the result.
    - Update the authorization creatable to include the response from 3D into the `card.verification` field of the creatable. 
    - Post it to the authorization endpoint.


    ``` JSON
    {
        "number": "abcdef",
        "items": 7.5,
        "currency": "EUR",
        "card": {
            "pan": "4111111111111111",
            "expires": [2, 22],
            "csc": "987",
            "verification": {
                "type": "challenge" | "method",
                "data": "3d-response"
            }
        },
        "target": "http://your.example-url.com/",
    }
    ```

### Authorization Success
A successful [authorization](../authorization/reference.html#authorization-2) has status 201.

### Authorization Failed
Any other error than [`"verification required"`](./external.html#verification-required) and a [successful authorization](./external.html#authorization-success) is a failed authorization.