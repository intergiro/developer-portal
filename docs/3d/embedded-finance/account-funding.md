
# Account Funding

Enabling customers to fund their account has never been easier with our payment methods API and embeddable UI components.

Everything in this section revolves around the payment methods concept. It allows the set-up of recurring payments; of onboarding and charging cards; and making one-off anonymous payments.

Our prebuilt checkout pages and embeddable UI components are built so you don't have to worry about PCI compliance. We take care of everything in a transparent and secure manner by leveraging strong and open internet security standards like signed JWTs and iframe.

## Listing payment methods

Saved cards will appear as payment methods that you can easily pull via the API. Depending on whether a payment method belongs to an individual or anonymous user (Guest), two API endpoints are available:

- `GET /individuals/:id/payment_methods`
- `GET /guests/:id/payment_methods`

Example payment methods listing request:

```{1}
GET /v3/guests/9a792adc-f4a2-4089-8e53-f3b0c140fc12/payment_methods

Content-Type: application/json
Authorization: Bearer <access_token>
```

Response:

```{1}
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

This section describes the common set of steps needed in order to:

- Save a card as a payment method
- Accept a one-off card payment
- Create a recurring payment

The flow begins on the backend by initiating a payment method consent to get a secret token. After that, the token needs to be passed to the front-end into Intergiro's 3D SDK to complete the process.

### Generate charge consent

Here one needs to decide whether there's the need to make a one-off charge or set up a recurring payment. If so, make sure to include `charge` details specifing the destination account ID the money should land to.

In cases where you only need to save the card, the `charge` section can be skipped.

```{1,9-11}
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

```{1,5}
HTTP 200 OK

{
  "consent": {
    "id": "e30b2da8-879d-4d9d-b9f9-7c461500245f",
    "status": "pending"
  }
}
```

Once the charge consent is created, it needs to be explicitly requested for it to be used in the next confirmation step.

Use the following API endpoint with the `consent.id` from the previous response:

```{1}
POST /v3/consents/e30b2da8-879d-4d9d-b9f9-7c461500245f

Content-Type: application/json
Authorization: Bearer <access_token>
```

Response:

```{1,5-6}
HTTP 200 OK

{
  "method": {
    "redirect_url": "https://3d.staging.intergiro.tech/...",
    "token": "YW55IGNhcm5hbCBwbGVhc3Vy",
    "expires_at": "2021-07-27T12:00:33+02:00"
  }
}
```

Depending on your preferences, two different payment confirmation methods exist. For example `redirect_url` can be used for the prebuilt checkout experience and `token` is something that is needed as part of the custom payment flow.

### Custom payment flow

For those interested in providing a seamless user experience, there's a way to embed Intergiro's custom UI components into your app.

::: tip
Currently the components are web-based, but you can still use them on the mobile in a WebView.
:::

#### Step 1: Include 3D SDK

The first steps require adding the Intergiro 3D SDK library to your website.

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

::: tip
Only one payment method can be saved for each individual or guest.

If you wish to add another payment method, you must first delete the previous one.
:::

## Customization

Prebuilt 3D experience as well as 3D SDK elements can be customized to better match your brand.

Use [3D Theme builder app](https://3d.staging.intergiro.tech/sca/theme) that we've built for you to play around with customization parameters and share the link with the results with your account manager to have the settings applied to all your end-user prebuilt experience.

3D SDK embeddable elements can also be customized. See example usage below:

```js{1,3,22}
const components = intergiro.components()

const theme = {
  layout: 'standard',
  fontImport: 'Poppins:wght@400',
  style: {
    gap: '1rem',
    fontFamily: 'Poppins, Menlo',
    fontWeight: '400',
    text: {
      background: '#E0E7ED',
      color: '#070808',
    },
    border: {
      color: 'black',
      width: '2px',
      radius: '5px',
    },
  },
}

const card = components.get('card-input', theme)
```

`theme` parameter gets passed as a second argument to the components factory.

Below you can find element-specific customization parameters available:

#### `card-input`

<br/>
<img :src="$withBase('/assets/img/integrate/payment-gateway/sdk-cardholder-input.png')" alt="Card input component">

| Property                | Type                                  | Description           |
| ----------------------- | ------------------------------------- | --------------------- |
| `layout`                | `row`, `column` or `standard`         |                       |
| `fontImport`            | `string`                              | Google font           |
| `style.text.background` | css color                             | Text background color |
| `style.text.color`      | css color                             | Text color            |
| `style.border.color`    | css color                             | Border color          |
| `style.border.width`    | css distance in px or relative units  | Border width          |
| `style.border.style`    | css `border-style`, ex. `solid`       | Border style          |
| `style.border.radius`   | css `border-radius` in px, ex. `25px` | Border radius         |
| `style.fontFamily`      | `string`                              | Font family           |
| `style.dangerColor`     | css color                             | Danger color          |
| `style.gap`             | css distance in px or relative units  | Gap width             |
| `style.background`      | css color                             | Background color      |

## Optimizations

Loading components from our 3D SDK might take a moment.
Luckily, **there are optimizations that we enabled**, so that the component is displayed right away when user should see it.

Before your user reaches page where our card components should be displayed, you can prepare a container where our component will be mounted.

Later you can use `mount()` as in the example below to quickly display previously prepared components.

```js{3,7}
const components = intergiro.components();
const container = document.getElementById("card-input-container");
const cardInput = components.get("card-input", {}, container);

...

cardInput.mount();
```

This will significantly improve loading time for your users.
