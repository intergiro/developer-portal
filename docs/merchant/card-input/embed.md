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
  <script type="module" src="https://merchant.intergiro.com/intergiro-ui.esm.js"></script>
  <script nomodule src="https://merchant.intergiro.com/intergiro-ui.js"></script>
  <link href="https://theme.payfunc.com/intergiro/index.css" rel="stylesheet">
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
    <intergiro-card-input class="input"
      api-key="<public.api.key>">
    </intergiro-card-input>
    <button type="submit" onclick="tokenize()">Tokenize</button>
  </main>
</body>
</html>
```
