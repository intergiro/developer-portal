# Verification

This section describes how to do 3D Secure using `<intergiro-card-holder-input>`. If you wish to have full control over the 3D Secure process you can build it yourself using the [Verification API](../verification/create.html#create).

## 3D Secure
Submit a [card token](./embed.html) together with a `verification required` error through the card input to initialize the 3D Secure cycle. This can render an invisible iframe for frictionless flow or a visible ifram that requires user interaction. The 3D Secure process may require several steps in order to succeed. The response will contain a new verification required error which is to be submitted to card input together with the card token.

``` json
{
  "status": 400,
  "type": "malformed content",
  "error": "verification required",
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
        "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9"
      }
    }
  }
}
```
Example of a verification required error.
## Order
How to use card input to create an order and verifying the payment with 3D Secure. 
- Tokenize the card by submitting to Intergiro Card Holder Input.
- Put the card in `order.payment.card` and contact information in `order.customer` in the [order creatable](../order/reference.html#order), post to [create order](../order/create.html#create) endpoint.
- If the response is a `verification required` error, please submit this error together with the card token to Intergiro Card Holder Input, this will initialize 3D Secure cycle.
- Post the new card token to the [create order](../order/create.html) endpoint.
- The last two steps might have to be done multiple times until the response is either an `order` or any error other than `verification required`.

``` html
<!DOCTYPE html>
<html>

<head>
  <script type="module" src="https://merchant.intergiro.com/ui/index.esm.js"></script>
  <script nomodule src="https://merchant.intergiro.com/ui/index.js"></script>
  <link href="https://merchant.intergiro.com/theme/intergiro/index.css" rel="stylesheet">

	<script defer>
		const order = {
			number: "Card-Input-Example" + (Math.random() * 10000).toString(),
			payment: { type: "card" },
			items: 150,
			currency: "EUR",
		}
		async function create(order, card, error) {
			const element = document.querySelector("intergiro-card-holder-input")
			const cardholder = await element.submit(card, error)
			let result
			if (
        typeof cardholder == "object" &&
        cardholder != null &&
        typeof cardholder.card == "string" &&
        typeof cardholder.email == "string" &&
        typeof cardholder.name == "string"
      ) {
        order.payment.card = cardholder.card
        order.customer = {
          ...(order.customer ?? {}),
          email: cardholder.email,
          name: cardholder.name,
        }
				const response = await fetch("https://merchant.intergiro.com/order", {
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						Authorization:
							"Bearer <customer.api.key> | Bearer <private.api.key>",
					},
					method: "POST",
					body: JSON.stringify(order),
				})
				result = response.headers.get("content-type").startsWith("application/json")
					? await response.json()
					: await response.text()
				if (response.ok == true) {
					alert(JSON.stringify(result));
				} else {
					result = create(order, cardholder.card, result)
				}
			} else {
				alert(JSON.stringify(cardholder))
				result = cardholder
			}
			return result
		}
	</script>
</head>
<body style="width: 100%; max-width: 20em; margin-left: auto; margin-right: auto;">
	<main>
		<intergiro-card-holder-input class="input"
			api-key="<public.api.key>">
		</intergiro-card-holder-input>
		<button type="submit" onclick="create(order)">Submit</button>
	</main>
</body>
</html>
```

## Customer
How to create a customer with a card token for recurring payments, using Intergiro Card Holder Input.

- Tokenize the card by submitting to Intergiro Card Holder Input.
- Put the card in `customer.method=[{type="token", card}]` (note that method is an array) and contact information in `customer.contact` and post to [create customer](../customer/create.html) endpoint.
- If the response is a `verification required` error, please submit this error together with the card token to Intergiro Card Holder Input, this will initialize the 3D Secure cycle.
- Post the new card token to the [create customer](../customer/create.html) endpoint.
- Continue with the last two steps until either `response.ok = true` or any error other than `verification required` is returned.
``` html
<!DOCTYPE html>
<html>

<head>
  <script type="module" src="https://merchant.intergiro.com/ui/index.esm.js"></script>
  <script nomodule src="https://merchant.intergiro.com/ui/index.js"></script>
  <link href="https://merchant.intergiro.com/theme/intergiro/index.css" rel="stylesheet">
	<script defer>
		async function create(customer, card, error) {
			const element = document.querySelector("intergiro-card-holder-input")
			const cardholder = await element.submit(card, error)
			let result
			if (
        typeof cardholder == "object" &&
        cardholder != null &&
        typeof cardholder.card == "string" &&
        typeof cardholder.email == "string" &&
        typeof cardholder.name == "string"
      ) {
				customer = customer ?? { method: [{ type: "token" }] }
				customer.method[0].card = cardholder.card
        customer.contact = {
          ...(customer.contact ?? {}),
          email: cardholder.email,
          name: cardholder.name,
        }
				const response = await fetch("https://merchant.intergiro.com/customer", {
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						Authorization:
							"Bearer <private.api.key>",
					},
					method: "POST",
					body: JSON.stringify(customer),
				})
				result = response.headers.get("content-type").startsWith("application/json")
					? await response.json()
					: await response.text()
				if (response.ok == true) {
					alert(Json.stringify(result))
				} else {
					result = create(customer, cardholder.card, result)
				}
			} else {
				alert(JSON.stringify(cardholder))
				result = cardholder
			}
			return result
		}
	</script>
</head>

<body style="width: 100%; max-width: 20em; margin-left: auto; margin-right: auto;">
	<main>
		<intergiro-card-holder-input class="input" api-key="<public.api.key>">
		</intergiro-card-holder-input>
		<button type="submit" onclick="create()">Submit</button>
	</main>
</body>

</html>


```

<!-- ## Authorization -->
<!-- Create an authorization with 3D Secure trying step by step.-->
