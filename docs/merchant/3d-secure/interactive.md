# Interactive

The Interactive 3DS method provides control of what happens between the steps in the 3D cycle. This method is suitable for those who need <em>some</em> control in the 3DS process and want an easy integration. 

<img style="width: 90%; display: block; margin: auto" :src="$withBase('/assets/img/merchant/verification/get-flow.jpg')" alt="GET flow">

POST an [authorization creatable](../authorization/reference#authorization-creatable.html) to the [authorization create](../authorization/create.html#create) endpoint with the query `method=GET`. The `items` field must be populated and the `amount` must be undefined.

There are two ways the 3D result can be sent. This is decided by either specifying the `target` field or the `browser.parent` field in the authorization creatable. 
1. Sent using a HTTP POST request, with form data as the payload, to the url you specify in the `target` field. This can be received through an endpoint.
2. Sent using the `window.postMessage()` method to the window you specify in the `browser.parent` field. This can be received through an event listener.

``` JSON {1}
POST /authorization?method=GET

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

## Authorization Responses

The authorization response can be one of three things: 
1. A [`"verification required"`](./interactive.html#verification-required) error response with status 400
2. A [successful authorization](./interactive.html#authorization-success) response with status 201
3. A [failed authorization](./interactive.html#authorization-failed)

### Verification required 

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
    "error": "verification required",
    "id": "g44QVj3iQXiElrUa"
}
```
A GET call to the url specified in `content.details.url` returns html that will perform one step of the 3D cycle. This call can be done by either redirecting to the url or by setting the url as the source of an Iframe.

If the `target` field is specified in the authorization creatable, the 3D response data will be POSTed to the specified url. The payload is sent as form data with `card` as key and a tokenized card as value. 

``` {1}
card=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXJkIiwiaWF0IjoxNjM0ODAzMDAyLCJhdWQiOiJkZXZlbG9wbWVudCIsImVuYyI6IjU2LlNoeGpDalMxMk96b05IbHRXaFN6ZWcuMTRMZVhnS2dla3hQX2Vjd3NYc0RlNmVmVVgxZVp3bXJ3LUFTYWFFUmgxZUxEeFBXIiwieHByIjpbMiwyMl0sInZlciI6eyJ0eXBlIjoibWV0aG9kIiwiZGF0YSI6eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6IjFiYTE5MDgwLWNkMTMtNDk3MS1hNmRlLTllNzhmN2M4OGUzZCIsIm1lc3NhZ2VWZXJzaW9uIjoiMi4yLjAifX19.qLY7bX6SgTHtqTRec2GRmYE0ZlICVc0axYO65g0poc8FQUnlAUmAnrrLUfbcrApbk67n4Lc0taag8XwoAYw-_Kaiqa1G7T1lJEiW-SxWT6uiXPmCmmZBcjs_bVHCFS9251SZ5QRaldK1pDLcbW6RhoYcviUFzgTFz0RI3srYHHnjDsnP-YEcWTvugrvFZxM0KNnTT_C56zbMmDD1QlCHqjyg_XnkbJiGUegKW0MoKMFuJUbKI3ipxDbB_HNO7sfIiEsXl3Zkst_VuevBoQIcy3BnOJ15opNQp_WqGgZ76hwIUwTJLpIpYPgzljQ0MGOAY2FbRp4TD5buIP2cXjjmZg
``` 

If the `browser.parent` field is specified in the authorization creatable, the 3D response data will be sent using the `window.postMessage()` method to the specified window. To receive the data, add an event lister as below:

``` js
window.addEventListener("message", async e => {
    if (e.data.destination == "parent" && e.data.content.name == "card") {
     authorization.card = e.data.content.value
    }
})

``` 

Update the previous authorization creatable with the following:
- Add an `id` property populated with the id returned from the verification required error. The id field should never be populated with any id other than the id received from the error response.
- Take the tokenized card from the payload and set it on the property `card` 

POST to the authorization endpoint as previously.

``` JSON {1}
POST /authorization?method=GET

{
    "id": "g44QVj3iQXiElrUa",
    "number": "abcdef",
    "items": 7.5,
    "currency": "EUR",
    "card": "<tokenized-card>",
    "target": "http://your.example-url.com/",
}
```

Treat the authorization response according to [Authorization Response Section](./interactive.html#authorization-responses).
### Authorization Success
A successful [authorization](../authorization/reference.html#authorization-2) has status 201.

### Authorization Failed
Any other error than [`"verification required"`](./interactive.html#verification-required) and a [successful authorization](./interactive.html#authorization-success) is a failed authorization.

## Example

A full example can be accessed from the <a target="_blank" href="https://github.com/intergiro/verification-example">github repository</a> or downloaded as a <a target="_blank" :href="$withBase('/assets/scripts/verification/method-get.html')" download="index.html">html file</a>. To test the code, a public api key is required to be added to the const `key` in the code. 