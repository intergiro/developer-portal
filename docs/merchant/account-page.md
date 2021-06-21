# Account Page

Intergiro Account is a personal account page that is provided to all your customers, to make it easy to update payment and contact information, and to provide easy access to all orders associated to the account.

## Website integration
 The account page can be integrated into your website as an embedded page. The `<intergiro-account>` component can be used to access the entire account page, or to access individual components of the page, such as the payment methods, order history or subscriptions.
 
To integrate the account page to your website, a unique [account key](#account-api-key) is needed for each customer. [Account keys](#account-api-key) are valid for three days until they expire and should thereafter be renewed.

Full account page example implementation: 
```html
<intergiro-account api-key="<your-account-key>"></intergiro-account>
```
Single component example implementation. Possible component identifiers are `"method"`, `"orders"` or `"subscription"`. 
```html
<intergiro-account api-key="<your-account-key>" component="<component-identifier>"></intergiro-account>
```


## Account API key
In order to create an Account API key, an account id and a private key is needed. Depending on the private key used to create the account keys, certain features may be explicitly disabled or enabled. 

Example request:
``` {1}
POST /account/<accountId>

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <private.api.key>

```

A successful response will return an Account API key.

## Customized theming
Customized theming can be set to the account page by specifying specific styling attributes. This is done by entering a stringified JSON object into the `cosmetic` attribute. All available styling options are seen in the figure below.

```json
cosmetic = {
    "fontFamily":"Open Sans, sans-serif",
    "header":{"background":"86,86,86","color":"255,255,255"},
    "body":{"background":"227,227,227","color":"0,0,0"},
    "success":{"background":"81,196,115","color":"255,255,255"}
}
```

Note: Colors are specified using RGB comma separated string e.g. "0,0,255" for blue. 



Example implementation with a customized theme: 
```html
<intergiro-account api-key="<your-account-key>" cosmetic='{
    "fontFamily":"Open Sans, sans-serif",
    "header":{"background":"86,86,86","color":"255,255,255"},
    "body":{"background":"227,227,227","color":"0,0,0"},
    "success":{"background":"81,196,115","color":"255,255,255"}
}'></intergiro-account>
```
