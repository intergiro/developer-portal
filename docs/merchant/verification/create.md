# Create

<img :src="$withBase('/assets/img/merchant/verification/verification-flowchart.png')" alt="verification-flowchart">

The black boxes are endpoints, the orange squares are switches, purple is the iframe, red and green are the endstate result.



## 3D Secure

To perform 3D Secure an Iframe must be rendered in the cardholder browser for the purpose of authentication.

Include an iframe in the html body. (in our example we use the class hidden to set `display: none;` through css.)

``` html
<iframe id="verification" class="hidden"></iframe>
```
### Authorization

The first step in the verification cycle is to post an [Authorization creatable](../authorization/reference.html) to the [Authorization create endpoint](../authorization/create.html#create).
The response can lead to three cases:
- Success Status 201: succesful authorization
- Fail Status 400 and verification required: follow the steps in [Verification](./create.html#verification) 
- Fail Status 400 or other Status: failed authorization

``` js 
async function authorize() {
  const [status, body] = await post(baseUrl + "/authorization", key, authorization)
  switch (status) {
    case 200:
      alert("success: " + JSON.stringify(body, undefined, 2))
      break
    case 400:
      if (body.error == "verification required")
        verify(authorization)
      else
        alert("failed: " + JSON.stringify(body))
      break
    default:
      alert("failed: " + JSON.stringify(body))
      break
  }
}
```

In this example the function post is defined as:

``` js
async function post(url, key, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: new Headers(
      {
        Authorization: key,
        "Content-Type": "application/json"
      }),
    body: JSON.stringify(body),
  }
  )
  return [response.status, response.headers.get("Content-Type")?.startsWith("application/json") ? await response.json() : await response.text()]
}
```
### Verification

Post a verification creatable to the verification endpoint. 

The response can lead to three cases:
- Success Status 201: succesful verification, close iframe by setting class to hidden and put the response body in the property authorization.card.verification and post to the authorization endpoint.
- Fail Status 400 and verification required: Follow the steps in [iframe](./create.html#iframe) 
- Fail Status 400 or other Status: failed verification

``` js
async function verify() {
  const [status, body] = await post(baseUrl + "/verification", key, {
    items: authorization.amount,
    number: authorization.number,
    currency: authorization.currency,
    card: authorization.card,
    browser: { parent: window.location.origin }
  })
  const iframe = document.getElementById("verification")
  switch (status) {
    case 201:
      authorization.card.verification = body
      iframe.classList.remove("visible")
      iframe.classList.add("hidden")
      await authorize()
      break
    case 400:
      if (body.error == "verification required" && body.content.details.method == "GET") {
        iframe.classList.replace("hidden", body.content.details.visible ? "visible" : "hidden")
        iframe.src = body.content.details.url + "&parent=" + encodeURIComponent(window.location.origin)
      } else
        alert("failed: " + JSON.stringify(body))
      break
    default:
      alert("failed: " + JSON.stringify(body))
      break
  }
}
```


### Iframe

Check body.content.details.visible of the response body from the verification endpoint response. Make the iframe visible if true and invisible if false.
Set the `src` of the iframe to `body.content.details.url + "&parent=" + encodeURIComponent(window.location.origin)`.

``` JS
const iframe = document.getElementById("verification")
iframe.classList.replace("hidden", body.content.details.visible ? "visible" : "hidden")
iframe.src = body.content.details.url + "&parent=" + encodeURIComponent(window.location.origin)
```

Create an event listener that will listen to a message sent by the `verification` iframe.
Put the data from the event as the response property on the verification creatable and continue with the [Verification](./create.html#verification) steps above.

``` js
window.addEventListener("message", async e => {
  if (e.data.destination == "parent" && e.data.content.name == "card") {
    const iframe = document.getElementById("verification")
    iframe.class = "hidden"
    authorization.card.verification = JSON.parse(e.data.content.value)
    await verify()
  }
})
```

For a full example <a target="_blank" :href="$withBase('/assets/scripts/verification/index.html')" download="index.html">click here</a> and add your public api key to the const `key` in the code. To access the github repository with the full example, <a target="_blank" href="https://github.com/intergiro/verification-example">click here</a>.
