# Embeddable Widget
Intergiro Card Input is a component that is used for tokenizing cards that can be used with 

- [Order API](../order/create)
- [Authorization API](../../integrate/acquiring/api#authorization)
- [Verification API](../../integrate/acquiring/api#verification)
- [Customer API](../customer/create)

This is a simple example of how Intergiro Card Input can be implemented, which will alert you the created card token. 

``` html + js
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://merchant.intergiro.com/ui/index.esm.js"></script>
  <script nomodule src="https://merchant.intergiro.com/ui/index.js"></script>
  <link href="https://merchant.intergiro.com/theme/intergiro/index.css" rel="stylesheet">
  <script defer>
		async function tokenize() {
			const element = document.querySelector("intergiro-card-input")
			const card = await element.submit()
			alert("Your token is: " + card)
		}
	</script>
</head>
<body>
  <main>
    <intergiro-card-input class="input" api-key="<public.api.key>"></intergiro-card-input>
    <button type="submit" onclick="tokenize()">Tokenize</button>
  </main>
</body>
</html>
```

<!-- ## Error -->
