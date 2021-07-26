# Verification

This section describes how to do 3D Secure using `<intergiro-card-input>`. If you wish to have full control you can build it yourself using the [Verification API].

Create an authorization with 3D Secure trying step by step.

Use card input to do 3d,

create customer with card token.

create normal order.

To initiate 3D secure from Intergiro Card Input submit a card token together with a "verification required" error.

``` html
<script>
		async function tokenize() {
			const element = document.querySelector("intergiro-card-input")
			card = await element.submit()
			error = 
            
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
