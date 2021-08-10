# PSP APIs

| Service                                                            | UI                                        | API                               |
|--------------------------------------------------------------------|-------------------------------------------|-----------------------------------|
| Creating orders for one off relations with your users.             | [Checkout](../../checkout/embed)          | [Order](../../order)              |
| Registering payment options for ongoing relations with your users. | [Onboard](../../customer/registration-ui) | [Customer](../../customer/create) |
| Tokenizing sensitive card information to minimize your PCI scope.  | [Card Input](../../card-input/embed)      | [Card](../../card-api/create)     |

## [Creating orders UI](../../checkout/embed)
Checkout is used for creating orders and authorize payments associated with orders for one off relations. 
Take a look at [Checkout UI](../../checkout/embed) for code examples and a more detailed description, where information about how to customize the component is available under [Checkout Cosmetics](../../checkout/cosmetics) and [Checkout Features](../../checkout/features).

## [Registering Customers UI](../../customer/registration-ui) 
The [Intergiro Customer Registration UI](../../customer/registration-ui) component lets your users register contact and card information that gets authorized for future payments, such as subscriptions or other recurring payments.

## Minimize PCI scope
If you need a separate card tokenization there is an UI solution in addition to an API solution.

### [Card Input UI](../../card-input/embed)
Intergiro Card Input is an embeddable component for card tokenization that can be integrated as a normal html component, that can be customized if desired trough [styling](../../card-input/style). 

Card Input is also capable of doing 3D Secure, more information and code examples can be found at [Card Input Verification](../../card-input/verification). 

For more information and code example please read more at [Intergiro Card Input](../card-input/embed) 

### [Card API](../../card-api/create)
[Card API](../../card-api/create) can create card tokens and handle 3D Secure if desired. 


## API only (S2S)

### Card API 

- [Card tokenization](../../card-api/create)
- [3D Secure handling](../../card-api/verification)
### Order API

- [Creating orders](../../order/create)
- [Changing orders](../../order/change)

### Customer API

- [Creating customers](../../customer/create) 
- [Subscriptions](../../customer/subscriptions)
- [Recurring payments](../../customer/create-order)
