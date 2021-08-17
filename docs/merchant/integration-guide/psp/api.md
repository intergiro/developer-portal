# PSP APIs

| Service                                                            | UI                                             | API                                    |
|--------------------------------------------------------------------|------------------------------------------------|----------------------------------------|
| Creating orders for one off relations with your users.             | [Checkout](../../checkout/embed.html)          | [Order](../../order.html)              |
| Registering payment options for ongoing relations with your users. | [Onboard](../../customer/registration-ui.html) | [Customer](../../customer/create.html) |
| Tokenizing sensitive card information to minimize your PCI scope.  | [Card Input](../../card-input/embed.html)      | [Card](../../card-api/create.html)     |

## [Creating orders UI](../../checkout/embed)
Checkout is used for creating orders and authorize payments associated with orders for one off relations. 
Take a look at [Checkout UI](../../checkout/embed.html) for code examples and a more detailed description, where information about how to customize the component is available under [Checkout Cosmetics](../../checkout/cosmetics.html) and [Checkout Features](../../checkout/features.html).

## [Registering Customers UI](../../customer/registration-ui) 
The [Intergiro Customer Registration UI](../../customer/registration-ui.html) component lets your users register contact and card information that gets authorized for future payments, such as subscriptions or other recurring payments.

## Minimize PCI scope
If you need a separate card tokenization there is an UI solution in addition to an API solution.

### [Card Input UI](../../card-input/embed.html)
Intergiro Card Input is an embeddable component for card tokenization that can be integrated as a normal html component, that can be customized if desired trough [styling](../../card-input/style.html). 

Card Input is also capable of doing 3D Secure, more information and code examples can be found at [Card Input Verification](../../card-input/verification.html). 

For more information and code example please read more at [Intergiro Card Input](../card-input/embed.html) 

### [Card API](../../card-api/create.html)
[Card API](../../card-api/create.html) can create card tokens and handle 3D Secure if desired. 


## API only (S2S)

### Card API 

- [Card tokenization](../../card-api/create.html)
- [3D Secure handling](../../card-api/verification.html)
### Order API

- [Creating orders](../../order/create.html)
- [Changing orders](../../order/change.html)

### Customer API

- [Creating customers](../../customer/create.html) 
- [Subscriptions](../../customer/subscriptions.html)
- [Recurring payments](../../customer/create-order.html)
