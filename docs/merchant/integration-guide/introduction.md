# Get Started

Intergiro supports a wide range of solutions depending on your business model. 

### You are a Payment Service Provider (PSP) 

- you offer payment gateway or checkout services to multiple merchants
- you are in control of payment method and order management

The best fit for your needs is [Intergiro's Acquiring API](./acquiring/overview.html).

### You are a Merchant 

- you sell products or services to customers through your website
- you need a checkout solution to accept card payments from your customers    

The best fit for your needs is [Intergiro's Payment Gateway](./psp/overview.html)   
     
 <br>
      
For further questions, we are happy to support you at [acquiring@intergiro.com](mailto:acquiring@intergiro.com)

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