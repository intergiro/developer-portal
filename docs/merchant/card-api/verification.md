# Verification

If you have received a `verification requred` error, 3D Secure needs to be performed.

Based on the data in the verification error, an iframe has to be rendered in the cardholder browser. Whether the iframe should be rendered visible or not is determined by the `visible` property of the `details` in the verification error response. Inside the iframe there must be a form that posts the data to the url specified in the verification error response, with the HTML iframe as the target. How the data should be added to the form depends on the type.

During one authorization cycle, 3D secure may have to be done several times. They can either be without any user interaction and therefore hidden or they can involve some kind of user interaction.


### 3DS Method
If the verification error response field `response.content.details.data.type` is `"method"`, the following procedure should be performed.

Example of a `verification required` error response with type `method`:
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
Create a JSON object including a `threeDSServerTransID` field and a `threeDSMethodNotificationURL` field. The `threeDSServerTransID` field should have the value from `response.details.data.threeDSServerTransID` and the `threeDSMethodNotificationURL` field should be a callback URL. 

Example of a Method request body:
``` JSON
{
  "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
  "threeDSMethodNotificationURL": "http://your.example-url.com/"
}
```

The 3DS Method procedure is as follows:
1. Render a hidden HTML iframe in the browser as seen below.
2. Create a form with an input field named `threeDSMethodData`.
3. The `threeDSMethodData` field should contain the above JSON object, stringified, then base-64-URL encoded.
4. POST the form to the url received from the details in the response (`response.content.details.url`), with the HTML iframe as target.

Example of a hidden HTML iframe:
```html
<iframe style="display: none;" name="threeDSMethodIframe"></iframe>
```

Example of the form associated with the iframe:
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

The POST body will contain the value threeDSMethodData, which can be used to identify the request. Example of a Method response:

``` JS
threeDSMethodData=eyJ0aHJlZURTTWV0aG9kRGF0YSI6ImQ0NjFmMTA1LTE3OTItNDA3Zi05NWZmLTlhNDk2ZmQ5MThhOSIsInRocmVlRFNNZXRob2ROb3RpZmljYXRpb25VUkwiOiJodHRwczovL3lvdXIuY2FsbGJhY2sudXJsLyJ9
```

For the next step in the  verification cycle, see section [Iframe response handling](./controlled.html#iframe-response-handling).

### 3DS Challenge
If the verification error response field `response.content.details.data.type` is `"challenge"`, the following procedure should be performed.

Example of a `verification required` error response with type `challenge`:
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

Create a JSON object including everything from `response.details.data` except for the field `type`. 
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

The iframe will post the challenge response to the URL specified in the authorization creatable `target` field.

``` JS
cres=eyJhY3NUcmFuc0lEIjoiODc3OTFjZWUtMjUxNC00MzZjLWJlZDgtYTYzYTg3YmJkZjAxIiwiY2hhbGxlbmdlQ29tcGxldGlvbkluZCI6IlkiLCJtZXNzYWdlVHlwZSI6IkNSZXMiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwidGhyZWVEU1NlcnZlclRyYW5zSUQiOiJkNDFmNjIwMC0wNDM1LTQ5ZWUtYWExMS1mMzY2ZjA2NjFjNmYiLCJ0cmFuc1N0YXR1cyI6IlkifQ
```
Example of a Challenge response

For the next step in the verification cycle, see section [Iframe response handling](./controlled.html#iframe-response-handling).

### Iframe response handling

Update the card to include the response from the iframe into the `verification` field and post . 

``` JSON

{
  "pan": "4111111111111111",
  "expires": [2, 22],
  "csc": "987",
  "verification": {
      "type": "challenge" | "method",
      "data": "iframe_response_string"
  }
}

```

[Update](./update) the card token with the verification information.