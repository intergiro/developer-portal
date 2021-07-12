# Introduction


| Customer type                                                          | What to integrate against                                                                                                          | Components                      | API       |
|------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|-----------|
| [Merchant](#merchant)                                                  | Order, Payment                                                                                                                     | Checkout                        | Merchant  |
| [Merchant with subscriptions](#merchant-with-subscriptions)            | Customer, Order, Payment                                                                                                           | Customer Registration, Checkout | Merchant  |
| Payment System Provider (PSP) for external merchants without pci-scope | [Authorization](../../integrate/acquiring/api.html#authorization), [Verification](../../integrate/acquiring/api.html#verification) | Card input                      | Acquiring |
| PSP                                                                    | [Authorization](../../integrate/acquiring/api.html#authorization), [Verification](../../integrate/acquiring/api.html#verification) |                                 | Acquiring |
|                                                                        |                                                                                                                                    |                                 |           |
|                                                                        |                                                                                                                                    |                                 |           |
|                                                                        |                                                                                                                                    |                                 |           |


## Merchant
A merchant uses direct payments. 

### Merchant with subscriptions
If you are a merchant with subscriptions the customer registration and other stuff is needed.

## PSP
You are a Payment system provider. Use the Authorization and verification endpoints. 


### PSP without pci-scope
You are a PSP wihtout pci scope. 
