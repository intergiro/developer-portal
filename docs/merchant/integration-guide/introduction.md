# Introduction
The Intergiro Merchant Services APIs can be used and integrated to support a wide range of different use cases. This guide aims to help you select the API subset which best suit your needs.

If you get stuck and do not know how or what to integrate against please contact our support for help.

Don't sweat it, you can start somewhere and change solution step by step.

- If you only ever require low level access to our card acquiring API because you aggregate other payment methods yourself and build all the order handling yourself, then consider using our [Acquiring APIs](../../integrate/acquiring/api).
- Otherwise, or when in doubt, use our [PSP APIs](./psp/api).


| API           | Subset                                                           | Acquiring    | Order                | Subscription         |
|---------------|------------------------------------------------------------------|--------------|----------------------|----------------------|
| Acquiring     | [Authorization API](../../integrate/acquiring/api#authorization) | yes          |                      |                      |
| Acquiring,PSP | [Verification API](../../integrate/acquiring/api#verification)   | yes          | Custom UI (optional) | Custom UI (optional) |
| PSP           | [Order API]                                                      |              | Custom UI            |                      |
| PSP           | [Customer API](../customer/introduction)                         |              |                      | yes                  |
| PSP           | [Customer Subscription API](../customer/introduction)            |              |                      | yes                  |
| Acquiring,PSP | [Card API]                                                       | optional     | optional             |                      |
| PSP           | [Registration UI](../customer/registration-ui)                   |              |                      | Standard UI          |
| PSP           | [Checkout UI](../checkout/embed)                                 |              | Standard UI          |                      |
| Acquiring,PSP | [Card Input UI](../card-input/embed)                             | Minimize PCI |                      | Custom UI            |




<!-- ### Recurring payments
To be able to create subsequent payments without the need to enter card details each time, recurring payments can be used.

- [Recurring](../../integrate/acquiring/reference.html#recurring) payments by using [Authorization Creatable](../../integrate/acquiring/reference.html#authorization) through the [Authorization API](../../integrate/acquiring/api#authorization). 

### Authorization
The [Authorization API](../../integrate/acquiring/api#authorization) can be used to authorize payment transactions with or without you handling sensitive card information.

### Authorization with handling of sensitive card information
Use the [Authorization API](../../integrate/acquiring/api#authorization) with a [Card Creatable](../../integrate/acquiring/reference#card).
### Authorization without handling sensetive card information
A signed JWT can be obtained through the use of the [Card Input](...) which is then placed on the [Authorization Creatable](../../integrate/acquiring/reference#authorization).
        </p>
      </div>
      <div class="merchant hideable">
         <p>
### Customer
This section describes how the users of your services can be registered with contact information and credit/debit cards for future payments. It is possible to integrate directly towards our Customer API or by using the enbedable compenents for an easy UI solution.
        </p>
    <form>
      <div class="choice">
        <input type="radio" id="customerUi" value="customerUi" onclick="apiSelector(customerUi, [customerApi, 'customerChoice'])" name="secondChoice">
        <label for="customerUi">UI Solution</label>
        <input type="radio" id="customerApi" value="customerApi" onclick="apiSelector(customerApi, [customerUi, 'customerChoice'])" name="secondChoice">
        <label for="customerApi">API Solution</label>
      </div>  
    </form>
    <div class="customerChoice">
        <p>
            Please choose a integration method if you want to use Customer.
        </p>
    </div>
    <div class="hideable customerUi">
    <p>
#### Use one of the following integrations to register [customers](../reference/customer).
- For a UI based integration follow the steps described in [Customer Registration](./customer-registration).
- To integrate directly towards our API use [Creating a Customer](./create-customer).

#### There are several ways to change the information of a registered [customer](../reference/customer).



### Card input
### Payment method 
### Customer
#### Listing Customers
To get an array of all registered customers use [List Customers](./list-customers).
### Customer Order
To create an order for a registered [customer](../reference/customer), integration according to [Creating a Customer Order](./create-customer-order) is needed.
### Customer Subscriptions
[Customer Subscriptions](./customer-subscriptions) is used to create scheduled payments for your registered customers.
### Customer Page
The [Customer Page](../customer-page) is a personal page that is provided to all your customers, to make it easy to update payment and contact information, and to provide easy access to all orders associated to the customer.
        </p>
    <div class="customerApi">
    </div>
    </div>
      <p>
### Order
The creation of payments for ordered items are done by 
- the use of embeddable [Checkout](./checkout) component.
- by using the [Order](./order) API directly.
- [Customer orders](#customer-order) can be created for registered [Customers](#customer)
#### Order Operations
Interactions with existing orders can be done through [Change Order](./order#change-order), such as capturing, refunding or cancelling an order.
### Non-purchase Order
A [non-purchase order](./topup) is an [Order](./order) without an associated purchase.
      </p>
    </div>
  </div>
</body>
Don't sweat it, you can start somewhere and change solution step by step.

- If you only ever require low level access to our card acquiring API because you aggregate other payment methods yourself and build all the order handling yourself, then consider using our Acquiring APIs.
- Otherwise, or when in doubt, use our PSP APIs. -->
