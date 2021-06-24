# Customer Page

Intergiro Customer is a personal page that is provided to all your customers, to make it easy to update payment and contact information, and to provide easy access to all orders associated to the customer.

## Website integration
 The customer page can be integrated into your website as an embedded page. The `<intergiro-customer>` component can be used to access the entire customer page, or to access individual components of the page, such as the payment methods, order history or subscriptions.
 
To integrate the customer page to your website, a unique [customer key](#customer-api-key) is needed for each customer. [Customer keys](#customer-api-key) are valid for three days until they expire and should thereafter be renewed.

Full customer page example implementation: 
```html
<intergiro-customer api-key="<your-customer-key>"></intergiro-customer>
```
Single component example implementation. Possible component identifiers are `"method"`, `"orders"` or `"subscription"`. 
```html
<intergiro-customer api-key="<your-customer-key>" component="<component-identifier>"></intergiro-customer>
```


## Customer API key
In order to create an Customer API key, an customer id and a private key is needed. Depending on the private key used to create the customer keys, certain features may be explicitly disabled or enabled. 

Example request:
``` {1}
POST /v1/customer/<customerId>

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <private.api.key>

```

A successful response will return an Customer API key.

## Customized theming
Customized theming can be set to the customer page by specifying specific styling attributes. This is done by entering a stringified JSON object into the `cosmetic` attribute. All available styling options are seen in the figure below.

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