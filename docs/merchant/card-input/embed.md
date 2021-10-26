# Embeddable Widget
Intergiro Card Input is a component that can be used for tokenizing cards or handle [3D Secure verification](./verification.html). The tokenized cards can be used with 

- [Order API](../order/create.html)
- [Authorization API](../authorization/create.html)
- [Verification API](../verification/create.html)
- [Customer API](../customer/create.html)

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

## Extended Embeddable Widget
Intergiro Card Input Extended is a [Intergiro Card Input](./embed.html#embeddable-widget) component with more input fields and a different result format. It can be used for tokenizing cards while providing input fields for email and cardholder name. It contains optional properties for prefilled email and (cardholder) name. The returned tokenized card and contact information can be used with:

- [Order API](../order/create.html)
- [Authorization API](../authorization/create.html)
- [Verification API](../verification/create.html)
- [Customer API](../customer/create.html)

#### Result Format

``` JSON
{
  "card": "eyJabc.abcdefGHI.signatureXYZ",
  "email": "example@mail.com",
  "name": "Carl Person"
}
```

This is a simple example of how Intergiro Card Input Extended can be implemented, which will alert you the created card token, email and name. 

``` html + js
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://merchant.intergiro.com/ui/index.esm.js"></script>
  <script nomodule src="https://merchant.intergiro.com/ui/index.js"></script>
  <link href="https://merchant.intergiro.com/theme/intergiro/index.css" rel="stylesheet">
  <script defer>
		async function tokenize() {
			const element = document.querySelector("intergiro-card-input-extended")
			const result = await element.submit()
			alert("Email: " + result.email 
              + ", Cardholder Name: " + result.name 
              + ", Card Token: " + result.card)
		}
	</script>
</head>
<body>
  <main>
    <intergiro-card-input-extended
      email="username@mail.com"
      name="Carl Person"
      class="input"
      api-key="<public.api.key>">
    </intergiro-card-input-extended>
    <button type="submit" onclick="tokenize()">Tokenize</button>
  </main>
</body>
</html>
```

### How to use extra contact information with Order Api:

If it is an [Order](../order/reference.html#creatable) with a one time [Card Payment](../order/reference.html#card-payment) without associated [Customer](../customer/reference.html#customer):

``` {1} JSON
Append to order create request body:

"customer": {
  "email": "<from email property of result from intergiro-card-input-extended.submit()",
  "name": "<from name property of result from intergiro-card-input-extended.submit()"
}
```

If it is an [Order](../order/reference.html#creatable) with a [Customer Payment](../customer/reference.html#customer-payment) with a saved [Customer](../customer/reference.html#customer):

``` {1} JSON
Append to order create request body:

"customer": {
  "id": "<customer id>"
  "email": "<can be omitted if email is saved in customer referenced by id>",
  "name": "<can be omitted if name is saved in customer referenced by id>"
}
```
or

``` {1} JSON
Append to customer create request body:

"customer": "<customer id>"
```

### How to use extra contact information with Customer Api:

For [Customer](../customer/reference.html#creatable) creation:

``` {1} JSON
Append to customer create request body:

"contact": {
  "email": "<from email property of result from intergiro-card-input-extended.submit()>",
  "name": "<from name property of result from intergiro-card-input-extended.submit()>"
}
```

<!-- ## Error -->
