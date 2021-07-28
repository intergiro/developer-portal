# Introduction
The Intergiro Merchant Services APIs can be used and integrated to support a wide range of different use cases. This document aims to help you select the API subset which best suit your needs.

Get help from us.

Don't sweat it, you can start somewhere and change solution step by step.

- If you only ever require low level access to our card acquiring API because you aggregate other payment methods yourself and build all the order handling yourself, then consider using our Acquiring APIs.
- Otherwise, or when in doubt, use our PSP APIs.

Our services handles different users and to give you the right API to integrate againt please follow the guide below.

Get help from us.


|     | Subset                    | Acquiring    | Order                | Subscription         |
|-----|---------------------------|--------------|----------------------|----------------------|
| A   | Authorization API         | yes          |                      |                      |
| A,P | Verification API          | yes          | Custom UI (optional) | Custom UI (optional) |
| P   | Order API                 |              | Custom UI            |                      |
| P   | Customer API              |              |                      | yes                  |
| P   | Customer Subscription API |              |                      | yes                  |
| A,P | Card API                  | optional     | optional             |                      |
| P   | Registration UI           |              |                      | Standard UI          |
| P   | Checkout UI               |              | Standard UI          |                      |
| A,P | Card Input UI             | Minimize PCI |                      | Custom UI            |
