# Introduction


| Customer type                                                          | What to integrate against                                                                                                          | Components                      | API       |
|------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|-----------|
| [Merchant](#merchant)                                                  | Order, Payment                                                                                                                     | Checkout                        | Merchant  |
| [Merchant with subscriptions](#merchant-with-subscriptions)            | Customer, Order, Payment                                                                                                           | Customer Registration, Checkout | Merchant  |
| Payment System Provider (PSP) for external merchants without pci-scope | [Authorization](../../integrate/acquiring/api.html#authorization), [Verification](../../integrate/acquiring/api.html#verification) | Card input                      | Acquiring |
| PSP                                                                    | [Authorization](../../integrate/acquiring/api.html#authorization), [Verification](../../integrate/acquiring/api.html#verification) |                                 | Acquiring |


## Recurring payments
To be able to create subsequent payments without the need to enter card details each time, recurring payments can be used.

- [Recurring](../../integrate/acquiring/reference.html#recurring) payments through the [Authorization](../../integrate/acquiring/api#authorization) API. 
- Recurring payments by the use of [Customer](#customer).

## Customer
This section describes how the users of your services can be registered with contact information and credit/debit cards for future payments.

#### Use one of the following integrations to register [customers](../reference/customer).
- For a ui based integration follow the steps described in [Customer Registration](./customer-registration).
- To integrate directly towards our API use [Creating a Customer](./create-customer).

#### There are several ways to change the  information of a registered [customer](../reference/customer).

- To add payment methods, use [Customer Method](./customer-methods).
- Changing the customers currency, credit limit or schedule (if Customer Subriptions are used) is done according to [Patch Customer](./patch-customer).
- [Change Contact Information](./change-contact-information), e.g. email, name and/or phone-number.

#### Listing Customers
To get an array of all registered customers use [List Customers](./list-customers).
### Customer Order
To create an order for a registered [customer](../reference/customer), integration according to [Creating a Customer Order](./create-customer-order) is needed.
### Customer Subscriptions
[Customer Subscriptions](./customer-subscriptions) is used to create subscriptions for your registered customers.
### Customer Page
The [Customer Page](../customer-page) is a personal page that is provided to all your customers, to make it easy to update payment and contact information, and to provide easy access to all orders associated to the customer.

## Order
For the creation of single payments 
## Auhtorization


## Non-payment Transactions