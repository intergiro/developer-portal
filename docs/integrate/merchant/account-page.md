# Account Page

Intergiro Account helps you to manage payments for customers with which you have an ongoing relationship. A personal account page is provided to all your customers, to make it easy to update payment and contact information, and to provide easy access to all orders associated to the account.

## Website integration
 The account page can be integrated into your website as an embedded page. The `<intergiro-account>` component can be used to access the entire account page, or to access the single components of the page, such as the payment methods, order history or subscriptions.
 
To integrate the account page to your website, a unique [account key](#account-api-key) is needed for each customer. Account keys are valid for three days until they expire and should thereafter be renewed.

Full account page example implementation: 
```html
<intergiro-account api-key="<your-account-key>"></intergiro-account>
```
Single component example implementation. Possible component identifiers are `"method"`, `"orders"` or `"subscription"`. 
```html
<intergiro-account api-key="<your-account-key>" component="<component-identifier>"></intergiro-account>
```


## Account API key
In order to create an Account API key, an account id is needed together with a private key for authorization. 

Example request:
``` {1}
POST /account/<accountId>

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <private.api.key>

```

A successful response will return an Account API key.

## Customized theming
Customized theming can be set to the account page by specifying specific styling attributes. This is done by entering a stringified JSON object into the `cosmetic` attribute. All available styling options are seen in the figure below.

```json
 cosmetic={
    "fontFamily": "Arial, Verdana, Helvetica",
    "header": {"background": "#fff", "color": "black"},
    "body":{"background":"227,227,227","color":"0,0,0"},
    "success":{"background":"81,196,115","color":"255,255,255"}}
  }
```

The color attributes can be set using rgb, hsl, hex codes (both #rgb and #rrggbb) and color names. Colors can also be specified using RGB comma seperated string e.g. "0,0,255" for blue. 
Note: Colors specified with alpha value will not work.



Example implementation with a customized theme: 
```html
<intergiro-account api-key="<your-account-key>" cosmetic='{
    "fontFamily": "Arial, Verdana, Helvetica",
    "header": {"background": "#fff", "color": "black"},
    "body":{"background":"227,227,227","color":"0,0,0"},
    "success":{"background":"81,196,115","color":"255,255,255"}}
  }'></intergiro-account>
```
