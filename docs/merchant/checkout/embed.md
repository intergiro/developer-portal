# Embeddable Component

The Intergiro Checkout component can tokenize cards, handle 3d Secure and create orders.

The attributes to Intergiro Checkout.
| Field       | Type                                                                                           | Description                       |
|-------------|------------------------------------------------------------------------------------------------|-----------------------------------|
| `currency`  | [`Currency`](../common/reference.html#currency)                                                | Currency of the order             |
| `items`     | `number`, [`Item`](../common/reference.html#item) or [`Item[]`](../common/reference.html#item) | Amount or items ordered           |
| `api-key`   | `<public.api.key>`                                                                             |                                   |
| `features`  | `"contact" | "transfer" | "contact transfer"`                                                  | See [`features`](./features.html) |
| `cosmetics` | [`Cosmetics`](./cosmetic.html)                                                                 |                                   |
| `number`    | `string`                                                                                       | order number                      |

 Below is a simple example of how to implement and how it will display.

``` html
<!DOCTYPE html>
<html>

<head>
  <script type="module" src="https://merchant.intergiro.com/intergiro-ui.esm.js"></script>
  <script nomodule src="https://merchant.intergiro.com/intergiro-ui.js"></script>
  <link href="https://theme.payfunc.com/intergiro/index.css" rel="stylesheet">
</head>
​
<body style="width: 100%; max-width: 20em; margin-left: auto; margin-right: auto;">
	<main>
		<form action="<url-to-done-page>" method="get">
			<intergiro-checkout items=150 currency="EUR" api-key="<public.api.key>">
			</intergiro-checkout>
		</form>
	</main>
</body>

</html>
```

<img :src="$withBase('/assets/img/merchant/checkout/standardCheckout.png')" alt="Row">