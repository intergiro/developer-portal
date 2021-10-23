# Automated 
 The Automated 3DS method provides an endpoint that returns html that when you render performes the whole 3D flow. This method is suitable for those who <em>do not</em> need control in the 3DS process and want an easy integration. 
<img style="width: 40%; display: block; margin: auto" :src="$withBase('/assets/img/merchant/verification/redirect-flow.jpg')" alt="GET flow">

POST an [authorization creatable](../authorization/reference.html#authorization-creatable) to the [authorization redirect](../authorization/redirect.html) endpoint. The `items` field must be populated and the `amount` must be undefined.

There are two ways the authorization can be sent back to you. This is decided by either specifying the `target` field or the `browser.parent` field in the authorization creatable. 
1. Sent using a HTTP POST request, with form data as the payload, to the url you specify in the `target` field. This can be received through an endpoint.
2. Sent using the `window.postMessage()` method to the window you specify in the `browser.parent` field. This can be received through an event listener.

``` JSON {1}
POST /authorization/redirect

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

The response will be html code that when rendered performs the whole 3D flow. 

If the `target` field is specified in the authorization creatable, the result will be POSTed to the specified url. The payload is sent as form data with `authorization` as key and a signed jwt containing an authorization or an error as value. 

``` {1}
authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFOQk9xaWNzZUhZTmhhQk4iLCJtZXJjaGFudCI6InRlc3R0ZXN0IiwibnVtYmVyIjoiVW5pcXVlLW51bWJlciIsInJlZmVyZW5jZSI6Ik1DQTA5NDQ0NzEwMjIiLCJjcmVhdGVkIjoiMjAyMS0xMC0yMlQwNzo0NDo0OS4wNDlaIiwiYW1vdW50IjoyNTAsImN1cnJlbmN5IjoiRVVSIiwiY2FyZCI6eyJzY2hlbWUiOiJ2aXNhIiwiaWluIjoiNDExMTExIiwibGFzdDQiOiIxMTExIiwiZXhwaXJlcyI6WzEyLDIyXSwiY3NjIjoicHJlc2VudCJ9LCJkZXNjcmlwdG9yIjoidGVzdCB0cmFuc2FjdGlvbiIsImhpc3RvcnkiOlt7Im1lcmNoYW50IjoidGVzdHRlc3QiLCJudW1iZXIiOiJVbmlxdWUtbnVtYmVyIiwiZGF0ZSI6IjIwMjEtMTAtMjJUMDc6NDQ6NDkuMDQ5WiIsInR5cGUiOiJjcmVhdGUiLCJzdGF0dXMiOiJzdWNjZXNzIiwidmVyaWZpY2F0aW9uIjoidmVyaWZpZWQifV0sImNhcHR1cmUiOltdLCJyZWZ1bmQiOltdLCJzdGF0dXMiOnsiYXV0aG9yaXplZCI6MjUwfX0.kVHWv6aa0g97rtnAu17TUMSrPg1KOqgsadq15vSqC48
``` 

If the `browser.parent` field is specified in the authorization creatable, a signed jwt containing an authorization or an error will be sent using the `window.postMessage()` method to the specified window. To receive the result, add an event lister as below:

``` js
window.addEventListener("message", async e => {
    if (e.data.destination == "parent" && e.data.content.name == "authorization") {
      result = e.data.content.value
    }
})
``` 

## Example

A full example can be accessed from the <a target="_blank" href="https://github.com/intergiro/verification-example">github repository</a> or downloaded as a <a target="_blank" :href="$withBase('/assets/scripts/verification/redirect.html')" download="index.html">html file</a>. To test the code, a public api key is required to be added to the const `key` in the code. 
