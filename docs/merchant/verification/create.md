# Create
```
Post Authorization Creatable to Authorixation endpoint
If the response is status 400 and body.error = "verification required"
  Then make verification creatable and send to verification endpoint
  If Status == 400 and body.error == "verification required" and body.content.detail.method == "GET"
    then set iframe visible/hidden accoring to body.content.details.visible
    on window message event, () => {
      if event.data.destination == "parent" and event.data.content.name == "card"
        Then hide iframe
        set verification.response to a JSON parsed event.data.content.value 
        and then post to verification endpoint 
    }
```

In order to create a [Verification](./reference.html#verification), first send a request with the body of the request set as an [Verification creatable](./reference.html#verification).

``` {1} JSON
POST /v1/verification

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <public.api.key>

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
		"authentication": "spwg/pFPMex1AmPleL2eiVQ9OBc8=",
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

To perform 3D Secure an Iframe must be rendered in the cardholder browser for the purpose of authentication.

Include an iframe in the html body.

``` html
<iframe id="verification" class="hidden"></iframe>
```
### Authorization

The first step in the verification cycle is to post an [Authorization creatable](../authorization/reference.html) to the [Authorization create endpoint](../authorization/create.html#create).
The response can lead to three cases:
1. Success Status 201 -> succesful authorization
2. Fail Status 400 -> failed authorization
3. Fail Status 400 and verification required -> Follow the steps in [Verification](./create#Verification) 
### Verification

Post a verification creatable to the verification endpoint. 

The response can lead to three cases:
1. Success Status 201 -> succesful verification -> put the response body in the property authorization.card.verification and close iframe by setting class to hidden.
2. Fail Status 400 -> failed verification
3. Fail Status 400 and verification required -> Follow the steps in [iframe](./create#iframe) 

### Iframe

Check body.content.details.visible and set class to visible if true and hidden if false.

``` JS
	document.getElementById("verification").classList.replace("hidden", body.content.details.visible ? "visible" : "hidden")
```



``` js
window.addEventListener("message", async e => {
	if (e.data.destination ="parent" && e.data.content.name == "card") {
		const iframe = document.getElementById("verification")
		iframe.classList.add("hidden")
		await verify(JSON.parse(e.data.content.value))
	}
})
```
If verification is required post a verification creatable with an added `response` field 

<img :src="$withBase('/assets/img/merchant/verification/3dflow.png')" alt="3dsecure">

If a verification error is returned from the verification endpoint, a frontend iframe has to be rendered based on the data in the verification error, as specified in the [Frontend iframe](./create.html#frontend-iframe) section below. 

During one verification cycle, 3D secure may have to be done several times. They can either be without any user interaction and therefore hidden or they can involve some kind of user interaction.

### Frontend iframe

A frontend iframe is rendered in the cardholder browser, for the purpose of authentication.
The `details` in the verification error specifies how the iframe should be rendered. 
Whether the iframe should be rendered visible or not is determined by the `visible` property of the `details` in the verification error response. Inside the iframe there must be a form that posts the data to the url specified in the verification error response, with the HTML iframe as the target. How the data should be added to the form depends on the type.

### Method
If the verification error response field `response.content.details.data.type` is `"method"`, the following procedure should be performed.
``` JSON
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
        "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
        "messageVersion": "2.2.0"
      }
    }
  },
  "error": "verification required"
}

```
Example of a `verification required` error response with type `"method"`.


Create a JSON object including a `threeDSServerTransID` field and a `threeDSMethodNotificationURL` field. The `threeDSServerTransID` field should have the value from `response.details.data.threeDSServerTransID` and the `threeDSMethodNotificationURL` field should be a callback URL. The callback URL has to match the target field that you specify in the [verification creatable](./create.html#create).

``` JSON
{
  "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
  "threeDSMethodNotificationURL": "<callback-URL>"
}
```
Example of a Method request body.

The 3DS Method procedure is as follows:
1. Render a hidden HTML iframe in the browser as seen below.
2. Create a form with an input field named `threeDSMethodData`.
3. The `threeDSMethodData` field should contain the above JSON object, stringified, then base-64-URL encoded.
4. POST the form to the url received from the details in the response (`response.content.details.url`), with the HTML iframe as target.

```html
<iframe style="display: none;" name="threeDSMethodIframe" id="threeDSMethodIframe"></iframe>
```
Example of a hidden HTML iframe.

``` html
<form 
  name="autoPost" 
  id="threeDSMethodForm" 
  method="post" 
  action="https://acs.sandbox.3dsecure.io/3dsmethod" 
  target="threeDSMethodIframe">
  <input 
  type="hidden" 
  name="threeDSMethodData" 
  value="eyJ0aHJlZURTTWV0aG9kRGF0YSI6ImQ0NjFmMTA1LTE3OTItNDA3Zi05NWZmLTlhNDk2ZmQ5MThhOSIsInRocmVlRFNNZXRob2ROb3RpZmljYXRpb25VUkwiOiJodHRwczovL3lvdXIuY2FsbGJhY2sudXJsLyJ9"/>
</form>
<script type="text/javascript">
		document.autoPost.submit();
</script>
``` 
Example of the form associated with the iframe.

The POST body will contain the value threeDSMethodData, which can be used to identify the request.

``` JS
threeDSMethodData=eyJ0aHJlZURTTWV0aG9kRGF0YSI6ImQ0NjFmMTA1LTE3OTItNDA3Zi05NWZmLTlhNDk2ZmQ5MThhOSIsInRocmVlRFNNZXRob2ROb3RpZmljYXRpb25VUkwiOiJodHRwczovL3lvdXIuY2FsbGJhY2sudXJsLyJ9
```
Example of a Method response. 

For the next step in the  verification cycle, see section [Iframe response handling](./create.html#iframe-response-handling).

### Challenge
If the verification error response field `response.content.details.data.type` is `"challenge"`, the following procedure should be performed.

``` JSON
{
  "status": 400,
  "type": "malformed content",
  "content": {
    "property": "card",
    "type": "Card.Creatable | Card.Token",
    "description": "verification required",
    "details": {
      "visible": true,
      "method": "POST",
      "url": "https://acs.sandbox.3dsecure.io/browser/challenge/manual",
      "data": {
        "type": "challenge",
        "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
        "acsTransID": "13521d57-581c-44d0-b321-40c58a9cf74e",
        "messageVersion": "2.2.0",
        "messageType": "CReq",
        "challengeWindowSize": "01"
      }
    }
  },
  "error": "verification required"
}

```
Example of a `verification required` error response with type `"challenge"`.

Create a JSON object including everything from `response.details.data` except the type. 
``` JSON
{
  "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
  "acsTransID": "13521d57-581c-44d0-b321-40c58a9cf74e",
  "messageVersion": "2.1.0",
  "messageType": "CReq",
  "challengeWindowSize": "01"
}
```

The 3DS Challenge procedure is as follows:
1. Render a visible HTML iframe in the browser.
2. Create a form with an input field named `creq`.
3. The `creq` field should contain the above JSON object, stringified, then base-64-URL encoded.
4. POST the form to the url from the response body (`response.details.url`), with the HTML iframe as target.

```html
<iframe name="threeDSChallengeIframe" id="threeDSChallengeIframe"></iframe>
```
Example of a HTML iframe.

``` html
<form 
  name="autoPost" 
  id="threeDSChallengeForm" 
  method="post" 
  action="https://acs.sandbox.3dsecure.io/browser/challenge/manual" 
  target="threeDSChallengeIframe">
  <input 
  type="hidden" 
  name="creq" 
  value="eyJhY3NUcmFuc0lEIjoiODc3OTFjZWUtMjUxNC00MzZjLWJlZDgtYTYzYTg3YmJkZjAxIiwiY2hhbGxlbmdlQ29tcGxldGlvbkluZCI6IlkiLCJtZXNzYWdlVHlwZSI6IkNSZXMiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwidGhyZWVEU1NlcnZlclRyYW5zSUQiOiJkNDFmNjIwMC0wNDM1LTQ5ZWUtYWExMS1mMzY2ZjA2NjFjNmYiLCJ0cmFuc1N0YXR1cyI6IlkifQ"/>
</form>
<script type="text/javascript">
  document.autoPost.submit();
</script>
``` 
Example of the form associated with the iframe.

The iframe will post the challenge response to the URL specified in the verification creatable target field.

``` JS
cres=eyJhY3NUcmFuc0lEIjoiODc3OTFjZWUtMjUxNC00MzZjLWJlZDgtYTYzYTg3YmJkZjAxIiwiY2hhbGxlbmdlQ29tcGxldGlvbkluZCI6IlkiLCJtZXNzYWdlVHlwZSI6IkNSZXMiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwidGhyZWVEU1NlcnZlclRyYW5zSUQiOiJkNDFmNjIwMC0wNDM1LTQ5ZWUtYWExMS1mMzY2ZjA2NjFjNmYiLCJ0cmFuc1N0YXR1cyI6IlkifQ
```
Example of a Challenge response

For the next step in the  verification cycle, see section [Iframe response handling](./create.html#iframe-response-handling).

### Iframe response handling

Make a new verification creatable and include the response from the iframe into the `card.verification` field of the creatable. 
Post it to the verification endpoint.

``` JSON
{
  "number": "a_unique_identifier",
  "items": 3,
  "currency": "EUR",
  "card": {
    "pan": "4111111111111111",
    "expires": [2, 22],
    "csc": "987",
    "verification": {
      "type": "challenge" | "method",
      "data": "iframe_response_string"
    }
  },
  "target": "https://localhost:1337/target/for/iframe/post/"
}


```
Example of a response field in the verification creatable.
