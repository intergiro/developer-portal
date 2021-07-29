# PSP APIs

| Service                                                                  | UI                                     | API               |
|--------------------------------------------------------------------------|----------------------------------------|-------------------|
| Creating orders for one off relations with your users.                   | [Checkout](../checkout/embed)          | [Order](../order) |
| Registeringing payment options for ongoing relations with your users.    | [Onboard](../customer/registration-ui) | [Customer]()      |
| Tokenizing sensitive card information to minimize your PCI scope.        | Card Input                             | Card              |
| Verification for those who desire more control in the 3D Secure process. |                                        | Verification      |


## UI Components
The easiest integration is to use our embeddable UI components which can be used with a predefined theme or be customized to fit most themes.

### Checkout UI
Checkout is used for creating orders and verifying payments for one off relations. 
Take a look at [Checkout UI](../checkout/embed) for code examples and a more detailed description, where information about how to customize the component is available under [Checkout Cosmetics](../checkout/cosmetics).

### Onboard UI

### Card Input UI

## Minimize PCI scope
If you need a separate card tokenization because you want to minimize your PCI scope or because you want to create a custom UI with our card tokenization. Read more at [minimize PCI scope]()

## API
For a API only integration that includes
    - Order API
    - Card API
    - Verification API 


## Recurring Payments

If you have ongoing relations with your users that include one or both of:
- Subscriptions that lets your users enter their card details once and gets charged on a schedule.
- The option to register payment options for future purchases.

Then please follow [Customer Introduction](../customer/introduction) on how to integrate. 


##