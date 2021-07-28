# Verification

This section describes how to do 3D Secure using `<intergiro-card-input>`. If you wish to have full control you can build it yourself using the [Verification API](../../integrate/acquiring/api#verification).

## 3D Secure
Submit a [card token](./embed) together with a `verification required` error through the card input to initialize 3D Secure. Keep submitting the verification required errors until the process ends with an approval or a denial.

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
- First use card input to tokenize the card. Then place the card token in `order.payment.card` of the order creatable and `post` it to the order endpoint with the order creatable in the body as a stringified JSON. 
- The response from the order endpoint can either be a [order response](../reference/order#response) or a `verification required` error. In the case of a `verification required` error submit the card token together with the error to card input.
- The response will now either be a verification or `verification required` error, keep on submitting the card token and the verification required error to card input until 3D succeeds or fails.

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
			const element = document.querySelector("intergiro-card-input")
			card = await element.submit(card, error)
			let result
			if (typeof card == "string") {
				order.payment.card = card
				const response = await fetch("https://api.payfunc.com/order", {
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
					result = create(order, card, result)
				}
			} else {
				alert(JSON.stringify(card))
				result = card
			}
			return result
		}
	</script>
</head>
<body style="width: 100%; max-width: 20em; margin-left: auto; margin-right: auto;">
	<main>
		<intergiro-card-input class="input"
			api-key="<public.api.key>">
		</intergiro-card-input>
		<button type="submit" onclick="create(order)">Submit</button>
	</main>
</body>
</html>
```

## Customer
How to create a customer with a card token for recurring payments, using Intergiro Card Input.

- Tokenize the card by submitting to Intergiro Card Input.
- Put the card in `customer.method=[{type="token", card}]` (note that method is an array) post to [create customer](../customer/create) endpoint.
- If the response is a `verification required` error, please submit this error together with the card token to Intergiro Card Input.
- Post the new card token to the [create customer](../customer/create) endpoint.
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
			const element = document.querySelector("intergiro-card-input")
			card = await element.submit(card, error)
			let result
			if (typeof card == "string") {
				customer = customer ?? { method: [{ type: "token" }] }
				customer.method[0].card = card
				const response = await fetch("https://api.payfunc.com/customer", {
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
					result = create(customer, card, result)
				}
			} else {
				alert(JSON.stringify(card))
				result = card
			}
			return result
		}
	</script>
</head>

<body style="width: 100%; max-width: 20em; margin-left: auto; margin-right: auto;">
	<main>
		<intergiro-card-input class="input" api-key="<public.api.key>">
		</intergiro-card-input>
		<button type="submit" onclick="create()">Submit</button>
	</main>
</body>

</html>


```

<!-- ## Authorization -->
<!-- Create an authorization with 3D Secure trying step by step.-->
