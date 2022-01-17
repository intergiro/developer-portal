---
sidebarDepth: 2
---

# Payments as a Service

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


## Payment method flow

This section describe common set of steps one needs to take in order to:
- Save card as a payment method
- Accept one-off card payment
- Create a recurring payment

The flow begins on the backend by initiating a payment method consent to get secret token. After that the token needs to be passed to the front-end into Intergiro 3D SDK to complete the process.

### Generate charge consent

Here one needs to decide whether there's the need to make a one-off charge or set up a recurring payment. If so, make sure to include `charge` details specifing the destination account id the money should land to.

In case when you only need to save the card `charge` section can be skipped.

``` {1,9-11}
POST /v3/individuals/b3c8b592-daff-45cc-95ba-1741a4105b23/payment_methods

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

Once the charge consent is created, for it to be used in the next confirmation step, it needs to be explicitly requested.

Use the following API endpoint with the `consent.id` from the previous response:

``` {1}
POST /v3/consents/e30b2da8-879d-4d9d-b9f9-7c461500245f

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

#### Step 3: Confirm payment method

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


## Save card as a payment method

You can give user the ability to save card for later use by specifying a `save` flag when confirming:

```js{5}
intergiro.confirmPaymentMethod(token, {
  payment_method: {
    card: card,
  },
  save: true,
})
.then(result => {
  if (result.error) {
    console.error(result.error)
  } else {
    console.log(result.data)
  }
})
```

This will make this card available in payment methods listing API.


## Setup a recurring payment

Scheduling a repeated payment is quite easy.

You can create a monthly recurring payment when saving a card by passing a `schedule` parameter during confirmation:

```js{5}
intergiro.confirmPaymentMethod(token, {
  payment_method: {
    card: card,
  },
  schedule: 'monthly',
})
.then(result => {
  if (result.error) {
    console.error(result.error)
  } else {
    console.log(result.data)
  }
})
```

Another way to do it in case the card has already been added is by using the API. See example below:

```{1}
POST /v3/guests/9a792adc-.../payment_methods/ca75cd0c-.../schedule

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "charge": {
    "amount": 1000,
    "currency": "EUR",
    "account_id": "34df9d62-8f66-4b78-b107-41dd3fb36e11"
  },
  "schedule": "monthly"
}
```

### Schedule

`schedule` parameter has two forms:
- simple one with time periods predefined: `daily`, `weekly`, `monthly`, `quarterly`, `yearly`
- complex one, that allows to specify more advance payment patterns:

| Property    | Type                                      | Description                            | Optional |
|-------------|-------------------------------------------|----------------------------------------|----------|
| `frequency` | `Frequency` | Frequency of the payment               |          |
| `divisor`   | `number` or `[number,number]`             | How often to apply the payment         | Yes      |
| `offset`    | `number` or `[number,number]`             | Specifying offset inside the frequency | Yes      |

#### Frequency

Defined as string that is either `"daily"`,`"weekly"`,`"monthly"`, `"quarterly"` or`"yearly"`

#### Divisor 

The divisor defines how often to apply the payment. Thus, a payment on every even (Iso)week would specify `frequency: "weekly"` and `divisor: 2`.

If the billing is supposed to happen at a specific time inside of the payment period, this can be done using a more complex divisor.
For example to bill every 10 days, but always on the third day of the period, specify `frequency: "daily"` and `divisor: [3, 10]`.

All numbers in the divisor have to be positive and in case of a tuple, the second number of the tuple has to be larger than the first number. 
It should also be considered that divisors use the modulo division and divisors that are not dividends of the timeframe that they divide can lead to much larger effective payment intervals. 

For example, with `frequency: "monthly"` and `divisor:7` there will only be a single payment a year, which will happen in August (month is specified with number `0`-`11`). When using the divisor with `"weekly"` frequencies also consider that an ISO year has either 53 or 52 weeks. The "daily" frequency uses the day of the month for the divisor.

#### Examples

Every month
```json
{
  "frequency": "monthly"
}
```

The first day of every other month (February, April, ..., December):
```json
{
  "frequency": "monthly",
  "divisor": 2,
  "offset": 1
}
```

The last day of every quarter:
```json
{
  "frequency": "quarterly",
  "offset": [2, -1]
}
```

Payment period of every third (Iso)week of the year, paying on wednesday in the middle week:
```json
{
  "frequency": "weekly",
  "divisor": [1, 3],
  "offset": 3
}
```

Every other year on the 13th of december:
```json
{
  "frequency": "yearly",
  "divisor": 2,
  "offset": [11, 13]
}
```

## Customization

Prebuilt 3D experience as well as 3D SDK elements can be customized to better match your brand.

Use [3D Theme builder app](https://3d.staging.intergiro.tech/sca/theme) that we've built for you to play around with customization parameters and share the link with the results with your account manager to have the settings applied to all your end-user prebuilt experience.

3D SDK embeddable elements can also be customized. See example usage below.

```js{12}
const components = intergiro.components()

const theme = {
  layout: 'row',
  style: {
    text: {
      background: '#000',
    }
  }
}

const card = components.get('card-input', theme)
```
`theme` parameter gets passed as a second argument to the components factory.

Below you can find element-specific customization parameters available:

#### `card-input`

<img :src="$withBase('/assets/img/integrate/payment-gateway/sdk-card-input.png')" alt="Card input component">

| Property    | Type                                      | Description                            |
|-------------|-------------------------------------------|----------------------------------------|
| `layout` | `row`, `column` or `standard`              |          |
| `style.text.background`   | css color            | Text background color        |
| `style.text.color`   | css color            | Text color       |
| `style.border.color`   | css color            | Border color       |
| `style.border.width`   | css distance in px or relative units            | Border width       |
| `style.border.style`   | css `border-style`, ex. `solid`            | Border style       |
| `style.border.radius`   | css `border-radius` in px, ex. `25px`            | Border radius       |
| `stylefontFamily`   | `string`            | Font family       |
| `style.dangerColor`   | css color            | Danger color       |
| `style.gap`   | css distance in px or relative units            | Gap width       |
| `style.background`   | css color           | Background color       |
