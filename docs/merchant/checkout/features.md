# Features

The feature property is used to change how checkout is used.

## Contact
The feature contact is used to generate a form to tie contact information to an order.

``` html
<intergiro-checkout features="contact" currency="EUR" api-key="<public.api.key>">
</intergiro-checkout>
```

<img :src="$withBase('/assets/img/merchant/checkout/formInput.png')" alt="Row">

## Transfer

The feature transfer changes the text on the submit button to "Send" and the header text to "Transfer".
