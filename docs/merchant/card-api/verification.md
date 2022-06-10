# Verification

If you have received a `verification requred` error, 3D Secure needs to be performed.

Based on the data in the verification error, an iframe has to be rendered in the cardholder browser. Whether the iframe should be rendered visible or not is determined by the `visible` property of the `details` in the verification error response. Inside the iframe there must be a form that posts the data to the url specified in the verification error response, with the HTML iframe as the target. How the data should be added to the form depends on the type.

During one authorization cycle, 3D secure may have to be done several times. They can either be without any user interaction and therefore hidden or they can involve some kind of user interaction.

## 3D Secure version 2
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
  "error": "verification required",
  "id": "g44QVj3iQXiElrUa",
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

For the next step in the  verification cycle, see section [Iframe response handling](#iframe-response-handling).

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

Create a JSON object including everything from `content.details.data` except for the field `type`. 
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
4. POST the form to the url from the response body (`content.details.url`), with the HTML iframe as target.

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

The iframe will post the challenge response to the URL specified in `client.callback` field of the request body.

``` JS
cres=eyJhY3NUcmFuc0lEIjoiODc3OTFjZWUtMjUxNC00MzZjLWJlZDgtYTYzYTg3YmJkZjAxIiwiY2hhbGxlbmdlQ29tcGxldGlvbkluZCI6IlkiLCJtZXNzYWdlVHlwZSI6IkNSZXMiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwidGhyZWVEU1NlcnZlclRyYW5zSUQiOiJkNDFmNjIwMC0wNDM1LTQ5ZWUtYWExMS1mMzY2ZjA2NjFjNmYiLCJ0cmFuc1N0YXR1cyI6IlkifQ
```
Example of a Challenge response

For the next step in the verification cycle, see section [Iframe response handling](#iframe-response-handling).

## 3D Secure version 1

If the card number is not enrolled for `3DSv2`, but for `3Dsv1`, the following procedure should be performed.

Example of a `verification required` error response for `3Dsv1`:
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
            "url": "https://merchant.intergiro.com/v1/ch3d1sim/acs",
            "data": {
                "PaReq": "eyJ2ZXJzaW9uIjoiMS4wIiwiY2FyZFR5cGUiOiIxIiwiUEFOIjoiNTU1NTU1MDAwMDAwNDQ0NCIsImV4cGlyeSI6IjI0MDEiLCJkZXZpY2VDYXRlZ29yeSI6IjAiLCJwdXJjaEFtb3VudCI6IjQwNDIwIiwiZXhwb25lbnQiOiJmYWxzZSIsImN1cnJlbmN5IjoiRVVSIiwibWVyY2hhbnRJRCI6IjAwMDAwODEwMzAwMDExMSIsInhpZCI6Ik1EQXdNREF3TURBd01EQXdNREF3T0RVNE5UWT0iLCJva1VybCI6Ind3dy5leGFtcGxlLmNvbSIsImZhaWxVcmwiOiJ3d3cuZXhhbXBsZS5jb20ifQ",
                "TermUrl": "http://your.example-url.com/",
                "MD": "MD"
            }
        }
    },
    "error": "verification required",
    "id": "_8Pqg0ILqC5Sd2cf"
}

```

The 3DSv1 procedure is as follows:
1. Render a visible HTML iframe in the browser.
2. Create a form with 3 input fields named `PaReq`, `MD` and `TermUrl`.
3. Populate the input values with their respective data values returned from the error response (`content.details.data`).
4. POST the form to the url from the response body (`content.details.url`), with the HTML iframe as target.

```html
<iframe name="threeDSv1Iframe" id="threeDSv1Iframe"></iframe>
```
Example of a HTML iframe.

``` html
<form 
  name="autoPost" 
  method="post" 
  action="https://merchant.intergiro.com/v1/ch3d1sim/acs" 
  target="threeDSv1Iframe">
  <input 
  name="PaReq" 
  value="eyJ2ZXJzaW9uIjoiMS4wIiwiY2FyZFR5cGUiOiIxIiwiUEFOIjoiNTU1NTU1MDAwMDAwNDQ0NCIsImV4cGlyeSI6IjI0MDEiLCJkZXZpY2VDYXRlZ29yeSI6IjAiLCJwdXJjaEFtb3VudCI6IjQwNDIwIiwiZXhwb25lbnQiOiJmYWxzZSIsImN1cnJlbmN5IjoiRVVSIiwibWVyY2hhbnRJRCI6IjAwMDAwODEwMzAwMDExMSIsInhpZCI6Ik1EQXdNREF3TURBd01EQXdNREF3T0RVNE5UWT0iLCJva1VybCI6Ind3dy5leGFtcGxlLmNvbSIsImZhaWxVcmwiOiJ3d3cuZXhhbXBsZS5jb20ifQ"/>
  <input name="TermUrl" value="http://your.example-url.com/"/>
  <input name="MD" value="MD"/>
</form>
<script type="text/javascript">
  document.autoPost.submit();
</script>
``` 
Example of the form associated with the iframe.

The iframe will post the challenge response to the URL specified in client.callback field of the request body.

``` JS
PaRes=eyJhbW91bnQiOiIyMDAwMCIsImN1cnJlbmN5IjoiRVVSIiwibWVyY2hhbnRfaWQiOiIwMDAwMDgxMDMwMDAxMTEiLCJsYXN0NCI6IjExMTEiLCJlY2kiOiIyIiwiY2F2diI6IiIsImNhdnZfYWxnb3JpdGhtIjoidGVzdCIsInhpZCI6Ik1EQXdNREF3TURBd01EQXdNREF3T0RVNE5UWT0iLCJzdGF0dXMiOiJZIn0
```
Example of a Pares response

For the next step in the verification cycle, see section [Iframe response handling](#iframe-response-handling).

## Antifraud verification
If the `details` in the verification error response has the `method` field set to `"GET"` and includes a `url`, antifraud verification needs to be performed.

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

A GET call to the url specified in `content.details.url` returns html that will perform the verification. This call can be done by either redirecting to the url or by setting the url as the source of an Iframe.

The verification response will be posted to the URL specified in [`client.callback`](../order/reference.html#client) field of the request body. The payload is sent as form data with `card` as key and a tokenized card as value. 

    ``` JS
    card=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXJkIiwiaWF0IjoxNjU0ODQxNzgxLCJhdWQiOiJwcm9kdWN0aW9uIiwiZW5jIjoiMTYuSFJFcm5PZVpKT2FULXVqMzc0dTA4Zy5UZWdwZW9lcUFqcXZuRmlmSG53a0xPT19NMVdCQjFhLVJoaEgzaWdQQURpMnBlRy0iLCJ4cHIiOlsxMiwzMF0sInZlciI6eyJ0eXBlIjoiZ3VhcmQiLCJkYXRhIjp7ImJyb3dzZXIiOnsiY29sb3JEZXB0aCI6MjQsInJlc29sdXRpb24iOlsxOTIwLDEyMDBdLCJqYXZhIjpmYWxzZSwiamF2YXNjcmlwdCI6dHJ1ZSwibG9jYWxlIjoiZW4tR0IiLCJ0aW1lem9uZSI6LTEyMCwiaXAiOiI5Mi4zMi43Ny4yMDEifSwiY291bnRyeSI6IlNFIn19fQ.izpDY--GowynMFMQwTH5Ez8HfOWfYdPW8dHsjND-ZVW8JiEzK6BVbUKuMJPTs60z5uTrKewro2EIWLsobuaHAI5UAzbvC34AAfVjeYOkETzw0uoWFX7CU0YBsdk-lMb9vRVA7YiJ7l4j_kH8q1-vjkd2kNSgsct6bD2hhuWUlX5mMtFOzcMqgv70baTkpA1ymUomV8jRucl6WlEoolgs2zjZVSoBpTUHjUKePjQ59uzxZVeEYm8Qj0l8QbJtGWC_7wtj7SekyaouiCXKTanammRbzac-1JAGY7Au5baGT4XP3uQKURcDnbmwNVDL6moqtDf-u4lLIqlZ2TDAQYhqWg
    ``` 

   For the next step in the verification cycle, see section [Iframe response handling](#iframe-response-handling).

## Iframe response handling

Update the previous request body with the following:
- Add an `id` property on the top level, populated with the id returned from the verification required error. The id field should never be populated with any id other than the id received from the error response.
- Update the `card` field of the request body with the response from the iframe. To update a card token, see [Card update](./update.html).

POST to the same endpoint again.

``` JSON
{
    "id": "g44QVj3iQXiElrUa",
    ...
    "card": {
      "pan": "4111111111111111",
      "expires": [2, 22],
      "csc": "987",
      "verification": {
          "type": "challenge" | "method",
          "data": "iframe_response_string"
      }
    }
}

```
