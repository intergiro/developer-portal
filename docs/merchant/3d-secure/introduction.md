# Introduction

## Acquiring API

There are three different methods to perform 3D Secure.
### [Automated](./automated.html)
 If you want to perform 3D Secure in one automated flow, follow the steps in the [Automated](./automated.html) section. This method provides an endpoint that returns html that when you render performs the whole 3D flow. This method is suitable for those who <em>do not</em> need control in the 3DS process and want an easy integration. 
### [Interactive](./interactive.html)
 If you want control of what happens between the steps in the 3D cycle, follow the steps in the [Interactive](./interactive.html) section. This method is suitable for those who need <em>some</em> control in the 3DS process and want an easy integration. 
### [Controlled](./controlled.html)
 If you want full control of the 3D flow, follow the steps in the [Controlled](./controlled.html) section. 
### [External](./external.html)
 If you want perform 3Ds using an external 3Ds service, follow the steps in the [External](./external.html) section. 

## PSP API
There are two ways to perform 3D Secure when using the PSP API.

### [Checkout](../checkout/embed.html)
3D Secure is built into the [Intergiro Checkout UI](../checkout/embed.html) and will trigger 3D Secure authentication when authentication is needed.

### [Verification](../card-api/verification.html)
When using the [Order API](../order/create.html) or the [Customer API](../customer/create.html), follow the [Verification guide](../card-api/verification.html) to perform 3D Secure.