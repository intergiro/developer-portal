# Get Started

Intergiro supports wide range of solutions depending on your business needs.

- If you are a Payment Service Provider (PSP) and are in control of payment method and order management, recommended integration is to our [Acquiring API](./acquiring/overview.html).

- If you are a Merchant and want to use Intergiro order and customer management solutions, recommended way is to integrate  [Intergiro Payment Gateway](./psp/overview.html)

If you need assistance with choosing the solution that best fits your business needs, we are happy to support you at [acquiring@intergiro.com](mailto:acquiring@intergiro.com)

<!--- 
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
-->