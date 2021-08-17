# App

Intergiro Customer is a personal app that is provided to all your customers, to make it easy to update payment and contact information, and to provide easy access to all orders associated to the customer.

## Website integration
 The customer app can be integrated into your website as an embedded component. The `<intergiro-customer>` component can be used to access the entire customer app, or to access individual components of the app, such as the payment methods, order history or subscriptions.
 
To integrate the customer app to your website, a unique [customer key](#customer-api-key) is needed for each customer. [Customer keys](#customer-api-key) are valid for three days until they expire and should thereafter be renewed.

Full customer app example implementation: 
```html
<!DOCTYPE html>
<html dir="ltr">
<head>
	<script type="module" src="https://customer.merchant.intergiro.com/intergiro-customer.esm.js"></script>
	<script nomodule src="https://customer.merchant.intergiro.com/intergiro-customer.js"></script>
	<link href="https://merchant.intergiro.com/intergiro/index.css" rel="stylesheet" />
</head>
<body>
    <intergiro-customer api-key="<your-customer-key>"></intergiro-customer>
</body>
</html>
```
Single component example implementation. Possible component identifiers are `"method"`, `"orders"` or `"subscription"`. 
```html
<intergiro-customer api-key="<your-customer-key>" component="<component-identifier>"></intergiro-customer>
```


## Customer API key
In order to create a Customer API key, a customer id and a private key is needed. Depending on the private key used to create the customer keys, certain features may be explicitly disabled or enabled. 

Example request:
``` {1}
POST /v1/customer/<customer_id>

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <private.api.key>

```

A successful response will return a Customer API key.

## Customized theming
Customized theming can be set to the customer app by specifying specific styling attributes. This is done by entering a stringified JSON object into the `cosmetic` attribute. All available styling options are seen in the figure below.

```json
cosmetic = {
    "font_family":"Open Sans, sans-serif",
    "header":{"background":"86,86,86","color":"255,255,255"},
    "body":{"background":"227,227,227","color":"0,0,0"},
    "success":{"background":"81,196,115","color":"255,255,255"}
}
```

Note: Colors are specified using RGB comma separated string e.g. "0,0,255" for blue. 



Example implementation with a customized theme: 
```html
<intergiro-customer api-key="<your-customer-key>" cosmetic='{
    "font_family":"Open Sans, sans-serif",
    "header":{"background":"86,86,86","color":"255,255,255"},
    "body":{"background":"227,227,227","color":"0,0,0"},
    "success":{"background":"81,196,115","color":"255,255,255"}
}'></intergiro-customer>
```
