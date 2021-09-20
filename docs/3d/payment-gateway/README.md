---
sidebarDepth: 2
---

# Payment gateway

<img :src="$withBase('/assets/img/integrate/payment-gateway/payment-gateway-splash.jpg')" alt="Payment gateway">

Accepting payments online has never been easier with Integrate Payment methods API and embeddable UI components.

Everything in this section revolves around Payment methods concept. It allows setting up recurring payments, onboarding and charging cards or making one-off anonymous payments.

Our Prebuilt checkout pages and Embeddable UI components are built so you don't have to worry about PCI compliance. We take care of everything in a transparent and secure manner by leveraging strong and open internet security standards like signed JWTs and iframe.


## Listing payment methods

Saved cards will appear as Payment methods that you can easily pull via the API. Depending whether a payment method belongs to an individual or anonymous user (Guest) two API endpoints are available:

- `GET /individuals/:id/payment_methods`
- `GET /guests/:id/payment_methods`

Example payment methods listing request:

``` {1}
GET /v3/guests/9a792adc-f4a2-4089-8e53-f3b0c140fc12/payment_methods

Host: 3d.staging.intergiro.tech
Content-Type: application/json
Authorization: Bearer <access_token>
```

Response:
``` {1}
HTTP 200 OK

{
  "data": [
    {
      "id": "c405c5b0-bd49-4472-9b12-e36b04283358",
      "type": "card",
      "details": {
        "brand": "visa",
        "exp_month": "12",
        "exp_year": "25",
        "last4": "0337"
      },
      "created_at": "2021-07-27T10:39:14+02:00"
    }
  ],
  has_more: false,
}
```


## Charging a card

Accepting online payments takes two steps:
 1. Generating consent with charge details
 2. Confirming payment


### Generate charge consent

This part begins on the back end side by sending amount, currency and identifier of the individual bank account to be credited after the payment is made.

Example create new charge request:

``` {1,9-11}
POST /v3/individuals/b3c8b592-daff-45cc-95ba-1741a4105b23/payment_methods

Host: 3d.staging.intergiro.tech
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "charge": {
    "amount": 1000,
    "currency": "EUR",
    "account_id": "34df9d62-8f66-4b78-b107-41dd3fb36e11"
  },
  "type": "card"
}
```

Response:

``` {1,5}
HTTP 200 OK

{
  "consent": {
    "id": "e30b2da8-879d-4d9d-b9f9-7c461500245f",
    "status": "pending"
  }
}
```

Once the charge consent is created, for it to be used in the next Confirmation step, it needs to be explicitly requested.

Use the following API endpoint with the `consent.id` from the previous response:

``` {1}
POST /v3/consents/e30b2da8-879d-4d9d-b9f9-7c461500245f

Host: 3d.staging.intergiro.tech
Content-Type: application/json
Authorization: Bearer <access_token>
```

Response: 

``` {1,5-6}
HTTP 200 OK

{
  "method": {
    "redirect_url": "https://3d.staging.intergiro.tech/...",
    "token": "YW55IGNhcm5hbCBwbGVhc3Vy",
    "expires_at": "2021-07-27T12:00:33+02:00"
  }
}
```

Depending on your preferences, two different payment confirmation methods exist. For example `redirect_url` can be used for the Prebuilt checkout experience and `token` is something that is needed as part of the Custom payment flow.


### Prebuilt checkout page

Prebuilt checkout experience is great if you want to get going quickly without the need to do any changes on the front end.

It works by sending the end user to the `redirect_url` where we take care of the payment and redirect the user back once it's done.

<img :src="$withBase('/assets/img/integrate/payment-gateway/prebuilt-checkout-page.png')" alt="Prebuilt checkout page">


### Custom payment flow

For those interested in providing seamless user experience there's a way to embed Intergiro custom UI components into your app.

::: tip
Currently the components are web-based, but you can still use them on the mobile in a WebView.
:::

#### Step 1: Include 3D SDK

First steps requires adding Intergiro 3D SDK library onto your website.

```html{6,8}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My checkout</title>
  <script src="https://3d-sdk.staging.intergiro.tech/v1/"></script>
  <script type="text/javascript">
    const intergiro = Intergiro3D('<public key>')

    fetch('/create-charge-consent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 15
      })
    })
      .then(result => result.json())
      .then(({ token }) => {

      })
  </script>
</head>
<body>
</body>
</html>
```

#### Step 2: Initialize UI components

```html{21-22,24}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My checkout</title>
  <script src="https://3d-sdk.staging.intergiro.tech/v1/"></script>
  <script type="text/javascript">
    const intergiro = Intergiro3D('<public key>')

    fetch('/create-charge-consent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 15
      })
    })
      .then(result => result.json())
      .then(({ token }) => {
        const components = intergiro.components()     // initialize components library
        const card = components.get('card-input')     // create card input component
        const container = document.getElementById('card-input')
        card.mount(container)                         // mount card component onto the page

      })
  </script>
</head>
<body>
  <form>
    <div id="card-input">
    </div>
    <button type="submit">Make payment</button>
  </form>
</body>
</html>
```

#### Step 3: Submit payment

```html{20,29-41}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My checkout</title>
  <script src="https://3d-sdk.staging.intergiro.tech/v1/"></script>
  <script type="text/javascript">
    const intergiro = Intergiro3D('<public key>')

    fetch('/create-charge-consent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 15
      })
    })
      .then(result => result.json())
      .then(({ token }) => {
        const components = intergiro.components()
        const card = components.get('card-input')
        const container = document.getElementById('card-input')
        card.mount(container)

        const button = document.getElementsByTagName('button')[0]
        button.onclick = function(e) {
          e.preventDefault()
          intergiro
            .confirmPaymentMethod(token, {
              payment_method: {
                card: card,
              }
            })
            .then(result => {
              if (result.error) {
                console.error(result.error)
              } else {
                console.log(result.data)
              }
            })
        }
      })
  </script>
</head>
<body>
  <form>
    <div id="card-input">
    </div>
    <button type="submit">Make payment</button>
  </form>
</body>
</html>
```




## Add new payment method

Registering a new payment method for later use requires two steps:
 1. Generating consent
 2. Confirming new payment method


### Generate consent

It is very similar as creating consent for making a payment, but this time if you skip the `charge` 

Example create new charge request:

``` {1,9-11}
POST /v3/individuals/b3c8b592-daff-45cc-95ba-1741a4105b23/payment_methods

Host: 3d.staging.intergiro.tech
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "type": "card"
}
```

Response:

``` {1,5}
HTTP 200 OK

{
  "consent": {
    "id": "e30b2da8-879d-4d9d-b9f9-7c461500245f",
    "status": "pending"
  }
}
```

Once the charge consent is created, for it to be used in the next Confirmation step, it needs to be explicitly requested.

Use the following API endpoint with the `consent.id` from the previous response:

``` {1}
POST /v3/consents/e30b2da8-879d-4d9d-b9f9-7c461500245f

Host: 3d.staging.intergiro.tech
Content-Type: application/json
Authorization: Bearer <access_token>
```

Response: 

``` {1,5-6}
HTTP 200 OK

{
  "method": {
    "redirect_url": "https://3d.staging.intergiro.tech/...",
    "token": "YW55IGNhcm5hbCBwbGVhc3Vy",
    "expires_at": "2021-07-27T12:00:33+02:00"
  }
}
```

Depending on your preferences, two different payment confirmation methods exist. For example `redirect_url` can be used for the Prebuilt checkout experience and `token` is something that is needed as part of the Custom payment flow.


### Prebuilt checkout page

Prebuilt checkout experience is great if you want to get going quickly without the need to do any changes on the front end.

It works by sending the end user to the `redirect_url` where we take care of the payment and redirect the user back once it's done.

<img :src="$withBase('/assets/img/integrate/payment-gateway/prebuilt-checkout-page.png')" alt="Prebuilt checkout page">


### Custom payment flow

For those interested in providing seamless user experience there's a way to embed Intergiro custom UI components into your app.

::: tip
Currently the components are web-based, but you can still use them on the mobile in a WebView.
:::

#### Step 1: Include 3D SDK

First steps requires adding Intergiro 3D SDK library onto your website.

```html{6,8}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My checkout</title>
  <script src="https://3d-sdk.staging.intergiro.tech/v1/"></script>
  <script type="text/javascript">
    const intergiro = Intergiro3D('<public key>')

    fetch('/create-charge-consent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 15
      })
    })
      .then(result => result.json())
      .then(({ token }) => {

      })
  </script>
</head>
<body>
</body>
</html>
```

#### Step 2: Initialize UI components

```html{21-22,24}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My checkout</title>
  <script src="https://3d-sdk.staging.intergiro.tech/v1/"></script>
  <script type="text/javascript">
    const intergiro = Intergiro3D('<public key>')

    fetch('/create-charge-consent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 15
      })
    })
      .then(result => result.json())
      .then(({ token }) => {
        const components = intergiro.components()     // initialize components library
        const card = components.get('card-input')     // create card input component
        const container = document.getElementById('card-input')
        card.mount(container)                         // mount card component onto the page

      })
  </script>
</head>
<body>
  <form>
    <div id="card-input">
    </div>
    <button type="submit">Make payment</button>
  </form>
</body>
</html>
```

#### Step 3: Submit payment

```html{20,29-41}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My checkout</title>
  <script src="https://3d-sdk.staging.intergiro.tech/v1/"></script>
  <script type="text/javascript">
    const intergiro = Intergiro3D('<public key>')

    fetch('/create-charge-consent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 15
      })
    })
      .then(result => result.json())
      .then(({ token }) => {
        const components = intergiro.components()
        const card = components.get('card-input')
        const container = document.getElementById('card-input')
        card.mount(container)

        const button = document.getElementsByTagName('button')[0]
        button.onclick = function(e) {
          e.preventDefault()
          intergiro
            .confirmPaymentMethod(token, {
              payment_method: {
                card: card,
              }
            })
            .then(result => {
              if (result.error) {
                console.error(result.error)
              } else {
                console.log(result.data)
              }
            })
        }
      })
  </script>
</head>
<body>
  <form>
    <div id="card-input">
    </div>
    <button type="submit">Make payment</button>
  </form>
</body>
</html>
```
