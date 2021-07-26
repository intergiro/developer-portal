# Embedable Component

The Intergiro Checkout component tokenizes cards, handles 3d secure and creates orders.
``` html
<!DOCTYPE html>
<html>

<head>
	<script type="module" src="https://ui.payfunc.com/checkout/payfunc-checkout/payfunc-checkout.esm.js"></script>
	<script nomodule="" src="https://ui.payfunc.com/checkout/payfunc-checkout/payfunc-checkout.js"></script>
	<link href="https://theme.payfunc.com/intergiro/index.css" rel="stylesheet">
</head>

<body style="width: 100%; max-width: 20em; margin-left: auto; margin-right: auto;">
	<header>
		<h1>Checkout</h1>
	</header>
	<main>
		<form action="<url to done page>" method="get">
			<payfunc-checkout currency="EUR" api-key="<public.api.key>">
			</payfunc-checkout>
		</form>
	</main>
	<script>
		itemList = [
			{
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 20.00,
				vat: 5.00,
				quantity: 5,
			},
			{
				number: "ts001-w",
				name: "Basic T-shirt, white",
				price: 20.00,
				vat: 5.00,
				quantity: 10,
			},
		];
		const checkout = document.body.querySelector("body > main > form > payfunc-checkout");
		const items = JSON.stringify(itemList);
		checkout.setAttribute("items", items);
	</script>
</body>

</html>
```