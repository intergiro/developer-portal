# Introduction
The Intergiro Merchant Services APIs can be used and integrated to support a wide range of different use cases. This guide aims to help you select the API subset which best suit your needs.

If you get stuck and do not know how or what to integrate against please contact our support for help.

Don't sweat it, you can start somewhere and change solution step by step.

- If you only ever require low level access to our card acquiring API because you aggregate other payment methods yourself and build all the order handling yourself, then consider using our [Acquiring APIs](../../integrate/acquiring/api).
- Otherwise, or when in doubt, use our [PSP APIs](./psp/api).


| API           | Subset                                                           | Acquiring          | Order                | Subscription         |
|---------------|------------------------------------------------------------------|--------------------|----------------------|----------------------|
| Acquiring     | [Authorization API](../../integrate/acquiring/api#authorization) | yes                |                      |                      |
| Acquiring,PSP | [Verification API](../../integrate/acquiring/api#verification)   | yes                | Custom UI (optional) | Custom UI (optional) |
| PSP           | [Order API](../order/create)                                     |                    | Custom UI (optional) |                      |
| PSP           | [Customer API](../customer/introduction)                         |                    |                      | yes                  |
| PSP           | [Customer Subscription API](../customer/introduction)            |                    |                      | yes                  |
| Acquiring,PSP | [Card API](../card-api/create)                                   | optional           |                      |                      |
| PSP           | [Registration UI](../customer/registration-ui)                   |                    |                      | Standard UI          |
| PSP           | [Checkout UI](../checkout/embed)                                 |                    | Standard UI          |                      |
| Acquiring,PSP | [Card Input UI](../card-input/embed)                             | Minimize PCI scope | Custom UI (optional) | Custom UI (optional) |

- Standard UI: a complete solution with our UI components.
- Custom UI: if you want to build your own UI, including some or none of our UI components.
- Minimize PCI scope: avoid handling card information.