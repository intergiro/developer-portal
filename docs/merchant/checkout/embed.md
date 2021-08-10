# Embedable Component

The Intergiro Checkout component can tokenize cards, handle 3d Secure and create orders.

The attributes to Intergiro Checkout.
| Field       | Type                                                                                                                       | Description                  |
|-------------|----------------------------------------------------------------------------------------------------------------------------|------------------------------|
| `currency`  | [Currency](../../integrate/acquiring/reference.html#currency)                                                              | Currency of the order        |
| `items`     | `number`, [Item](../../integrate/acquiring/reference.html#item) or [Item](../../integrate/acquiring/reference.html#item)[] | Amount or items ordered      |
| `api-key`   | `<public.api.key>`                                                                                                         |                              |
| `features`  | `"contact" | "transfer" | "contact transfer"`                                                                              | See [`features`](./features) |
| `cosmetics` | [`Cosmetics`](./cosmetic)                                                                                                  |                              |
| `number`    | `string`                                                                                                                   | order number                 |

 Below is a simple example of how to implement and how it will display.

``` html
<!DOCTYPE html>
<html>

<head>
  <script type="module" src="https://merchant.intergiro.com/ui/index.esm.js"></script>
  <script nomodule src="https://merchant.intergiro.com/ui/index.js"></script>
  <link href="https://merchant.intergiro.com/theme/intergiro/index.css" rel="stylesheet">
</head>

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