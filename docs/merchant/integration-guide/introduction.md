# Introduction
The Intergiro Merchant Services APIs can be used and integrated to support a wide range of different use cases. 
This guide aims to help you select the API subset which best suit your needs.

If you need assistance with choosing the integration option that best suits your business case, feel free to contact us at acquiring@intergiro.com

Don't sweat it, you can start somewhere and change solution step by step.

- If you only ever require low level access to our card acquiring API because you aggregate other payment methods yourself and build all the order handling yourself, then consider using our [Acquiring APIs](./acquiring/api.html).
- Otherwise, or when in doubt, use our [PSP APIs](./psp/api.html).


| API           | Subset                                                      | Acquiring          | Order                | Subscription         |
|---------------|-------------------------------------------------------------|--------------------|----------------------|----------------------|
| Acquiring     | [Authorization API](../authorization/create.html)           | yes                |                      |                      |
| Acquiring,PSP | [3D Secure API](../3d-secure/introduction.html)             | yes                | Custom UI (optional) | Custom UI (optional) |
| PSP           | [Order API](../order/create.html)                           |                    | Custom UI (optional) |                      |
| PSP           | [Customer API](../customer/create.html)                     |                    |                      | yes                  |
| PSP           | [Customer Subscription API](../customer/subscriptions.html) |                    |                      | yes                  |
| Acquiring,PSP | [Card API](../card-api/create.html)                         | optional           |                      |                      |
| PSP           | [Registration UI](../customer/registration-ui.html)         |                    |                      | Standard UI          |
| PSP           | [Checkout UI](../checkout/embed.html)                       |                    | Standard UI          |                      |
| Acquiring,PSP | [Card Input UI](../card-input/embed.html)                   | Minimize PCI scope | Custom UI (optional) | Custom UI (optional) |

- Standard UI: A complete solution with our UI components.
- Custom UI: If you want to build your own UI, including some or none of our UI components.
- Minimize PCI scope: avoid handling card information.

All endpoints uses JWT tokens for authentication ([Read more here](./authentication.html)).
