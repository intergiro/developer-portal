# Getting started with Acquiring

## Getting access

### 1. Test our API

You are able to obtain test access to Intergiro Acquiring API, prior to providing a PCI AoC or signing an agreement with Intergiro. To enable you to test, we will create a unique test merchant and provide you with private and public keys.


To obtain test access, contact us at [acquiring@intergiro.com](mailto:acquiring@intergiro.com) with your company and contact information.


### 2. Process live transactions

In order to process live transactions, you must provide your valid PCI AoC and must sign a PSP agreement with us.
After a merchant you submitted to us has been approved by our underwriting team, we will provide you with a live public and private key for that merchant (each merchant will be issued their own unique keys).
<br><br>
## PCI scope

When integrating with Intergiro Acquiring API, you as the PSP are by default expected to provide us with a valid PCI AoC, indicating you are allowed to store, process and manage card data. 

If you as the PSP do not have the required AoC (and are thus not allowed to store, process or manage card data) we can offer you the ability to rely on [Intergiro Card Input UI](../../card-input/embed.html#embeddable-component), with 3DS support included.
<br><br>
## Authentication

Access to our Acquiring API is authenticated with public and private API-keys (JWT).

### Public API-keys

Public API-keys are used to create new authorization or get details of an authorization.
The public API-key is safe to use in the end customer browser.

### Private API-keys

Private API-keys should be protected and only be used on systems you trust. 
Private API-keys can among other things be used to capture, cancel or refund authorizations.
