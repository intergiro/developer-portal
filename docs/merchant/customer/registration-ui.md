# Registration UI
Customer Registration guides your users through the process of registration. It handles the full process of entering the card information as well as performing the full 3D Secure authentication procedure. Once everything is done you will receive a customer number that you then can use to perform payments towards the user’s card without the need for any interaction with the user.


## Registration
The Customer Registration user interface is web based. 
It can either be integrated in an existing web application or be used in native application via webview.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Customer Registration</title>
	<script src="https://merchant.intergiro.com/ui/onboard/intergiro-onboard.js"></script>
	<link href="https:/cdn.merchant.intergiro.com/themes/light/index.css" rel="stylesheet">
</head>
<body>
    <header><h1>Customer Registration</h1></header>
    <main>
        <form action="done" method="get">
            <intergiro-customer-registration 
              api-key="<public-api-key>">
            </intergiro-customer-registration>
	    </form>
    </main>
</body>
</html>
```
A fully working example is available on [GitHub](https://github.com/payfunc/onboard-example).

<img :src="$withBase('/assets/img/merchant/customer-registration.png')" alt="Customer Registration">

Inside the form text-input field can also be used with the property `name` set to `"name"`, `"email"` and `"phone"` to set contact information.
```html
<form action="done" method="get"> to Existing Customer
    <input type="text" name="name" placeholder="Name"/>
    <input type="email" name="email" placeholder="Email"/>
    <input type="tel" name="phone" placeholder="Phone"/>
    <intergiro-customer-registration number="<your-customer-number>" api-key="<public-api-key>">
    </intergiro-customer-registration>
</form>
```

<img :src="$withBase('/assets/img/merchant/customer-registration-w-contact.png')" alt="Customer Registration">

Once the user has entered their card information and successfully performed the 3D Secure authentication the form will be submitted with the following data in the `customer` field.

```json
{
  "id": "YXcOX1qYLFPSDLpi",
  "number": "JoaOrAnJDwnlWEuE",
  "method": [
    {
      "type": "card",
      "created": "2020-03-09T20:53:12.776Z",
      "scheme": "visa",
      "iin": "411111",
      "last4": "1111",
      "expires": [2, 22]
    }
  ]
}
```

## Adding Payment Methods
To implement onboarding for an already existing Customer, implement the onboarding dialog in the same way as the registration dialog for creating a customer.
Only change the `<intergiro-customer-registration>` html to specify the customer as a stringified [`Customer`](../reference/customer.html#customer) object instead of specifying the number field.

```html
<intergiro-customer-registration
  customer="<stringified-customer-object>"
  api-key="<public-api-key>"
></intergiro-customer-registration>
```