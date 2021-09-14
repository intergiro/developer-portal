# Create

In order to create a [Verification](./reference.html#verification), first send a request with the body of the request set as an [Verification creatable](./reference.html#verification).

``` {1} JSON
POST /v1/verification

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <access_token>

{
	"number": "a_unique_identifier",
	"items": 3,
	"currency": "EUR",
	"card": {
		"pan": "4111111111111111",
		"expires": [2, 22],
		"csc": "987"
	},
	"target": "https://localhost:1337/target/for/iframe/post/"
}
```

Example Responses:

Success:
``` {1} JSON
HTTP 200 OK

{
	"type": "challenge",
	"data": {
		"authentication": "testtest",
		"status": "Y",
		"reference": {
			"server": "00000000-0000-0000-0000-000000000000",
			"directory": "11111111-1111-1111-1111-111111111111",
		}
	}
}
```
Verification required:
``` JSON
HTTP 400 Bad Request
{
  "status": 400,
  "type": "malformed content",
  "content": {
    "property": "card",
    "type": "Card.Creatable | Card.Token",
    "description": "verification required",
    "details": {
      "visible": false,
      "method": "POST",
      "url": "https://acs.sandbox.3dsecure.io/3dsmethod",
      "data": {
        "type": "method",
        "threeDSServerTransID": "29673dd1-d33e-40fe-be64-5c68b490904c",
        "messageVersion": "2.2.0"
      }
    }
  },
  "error": "verification required"
}
```
## 3D Secure
\
<img :src="$withBase('/assets/img/merchant/verification/3dflow.png')" alt="3dsecure">

If a verification error is returned, a frontend iframe has to be rendered based on the data in the verification error as specified in the Frontend iframe section. During one verification cycle this may have to be done several times.

### Frontend iframe

A frontend iframe is rendered in the cardholder browser, for the purpose of authentication.
The details in the verification error specifies how the iframe should be rendered. Whether the iframe should be rendered visible or not is determined by the visible property of the details in the verification error response. Inside the iframe there must be a form that posts the data to the url specified in the verification error response with the HTML iframe as the target. How the data should be added to the form depends on the type.

### Method
``` JSON
{
  "visible": false,
  "method": "POST",
  "url": "https://acs.sandbox.3dsecure.io/3dsmethod",
  "data": {
    "type": "method",
    "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9"
  }
}
```
Example of the details of the verification response with type method.

Stringify the json including the threeDSServerTransID and a Requestor callback URL. The callback URL has to match the target field that you specify in the verification creatable. Then base Base-64-URL encode the data and add it to the input field `threeDSMethodData`.

``` JSON
{
 "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
 "threeDSMethodNotificationURL": "Requestor.callback.URL"
}
```
Example of a Method request

When the 3DS Method is finished, the hidden iframe will HTTP POST a form to the threeDSMethodNotificationURL.

The POST body will contain the value threeDSMethodData, which can be used to identify the request.

``` JS
threeDSMethodData=eyJ0aHJlZURTTWV0aG9kRGF0YSI6ICJkNDYxZjEwNS0xNzkyLTQwN2YtOTVmZi05YTQ5NmZkOT
                  E4YTkifQ
```
Example of a Method response

### Challenge
Stringify a json including everything from the data except the type. Then Base-64-URL encode the data and add it to the input field `creq`.

``` JSON
{
  "visible": true,
  "method": "POST",
  "url": "https://acs.sandbox.3dsecure.io/browser/challenge/manual",
  "data": {
    "type": "challenge",
    "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
    "acsTransID": "13521d57-581c-44d0-b321-40c58a9cf74e",
    "messageVersion": "2.1.0",
    "messageType": "CReq",
    "challengeWindowSize": "01"
  }
}
```
Example of the details of the verification response with type challenge.

The iframe will post the challenge response to the URL specified in the verification creatable target field.

``` JS
cres=eyJhY3NUcmFuc0lEIjoiODc3OTFjZWUtMjUxNC00MzZjLW
  JlZDgtYTYzYTg3YmJkZjAxIiwiY2hhbGxlbmdlQ29tcGxldGl
  vbkluZCI6IlkiLCJtZXNzYWdlVHlwZSI6IkNSZXMiLCJtZXNz
  YWdlVmVyc2lvbiI6IjIuMS4wIiwidGhyZWVEU1NlcnZlclRyY
  W5zSUQiOiJkNDFmNjIwMC0wNDM1LTQ5ZWUtYWExMS1mMzY2Zj
  A2NjFjNmYiLCJ0cmFuc1N0YXR1cyI6IlkifQ
```
Example of a Challenge response


### Iframe response handling

Make a new verification creatable and include the response from the iframe into the response field of the creatable. 
Post it to the verification endpoint.

``` JSON
{
  "type": "challenge" | "method",
  "data": "iframe_response_string"
}
```
Example of a response field in the verification creatable.
