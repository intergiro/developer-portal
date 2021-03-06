# Error
Errors have the following structure.
## Error
| Property      | Type                         | Description                                       | Optional |
|---------------|------------------------------|---------------------------------------------------|----------|
| `status`      | `number`                     | Status code of the Error.                         |          |
| `type`        | `string`                     | Type of the Error.                                |          |
| `error`       | [`Error code`](#error-codes) | Switchable string defining the type of the error. | Yes      |
| `description` | `string`                     |                                                   | Yes      |
| `content`     | `any`                        |                                                   | Yes      |
## Error codes
<dl>
<dt>3ds problem</dt>
<dd>  3-D Secure problem.</dd>
<dt>3ds authentication failure</dt>
<dd>  3-D Secure failure.</dd>
<dt>acquirer error</dt>
<dd>  An unknown Card Network (Acquirer) error occured, possibly due to connection issues.</dd>
<dt>amount limit</dt>
<dd>  The amount limit is exceeded.</dd>
<dt>authentication required</dt>
<dd>  Additional authentication required. The Card Network (Acquirer) configuration might be incorrect.</dd>
<dt>authorization not found</dt>
<dd>  The authorization could not be found in the database.</dd>
<dt>backend problem</dt>
<dd>  A Card Network (Acquirer) problem occured.</dd>
<dt>blocked merchant</dt>
<dd>  The cardholder has blocked this merchant from using the card.</dd>
<dt>card declined</dt>
<dd>  Your card was declined by issuer or card scheme.</dd>
<dt>card lost or stolen</dt>
<dd>  Your card has been reported lost or stolen.</dd>
<dt>card restricted</dt>
<dd>  Your card is restricted.</dd>
<dt>card expired</dt>
<dd>  Your card has expired.</dd>
<dt>insufficient funds</dt>
<dd>  There is insufficient funds on the card.</dd>
<dt>invalid card number</dt>
<dd>  The card number is invalid. Please enter a valid number.</dd>
<dt>invalid csc</dt>
<dd>  Invalid CVC code.</dd>
<dt>invalid currency</dt>
<dd>  Invalid currency.</dd>
<dt>invalid descriptor</dt>
<dd>  The transaction contains incorrect statement text and could not be completed.</dd>
<dt>invalid expire date</dt>
<dd>  Invalid Expire date.</dd>
<dt>invalid input</dt>
<dd>  The card details are incorrect. Please enter valid card details and try again.</dd>
<dt>invalid transaction</dt>
<dd>  The transaction contains incorrect information.</dd>
<dt>merchant not found</dt>
<dd>  Merchant could not be found.</dd>
<dt>rule violation</dt>
<dd>  The Card Network (Acquirer) rules are not met.</dd>
<dt>suspected fraud</dt>
<dd>  Your card was declined due to suspected fraud.</dd>
<dt>unauthorized</dt>
<dd>  No further information due to security.</dd>
<dt>unknown error</dt>
<dd>  An unknown error occured. Ensure that your card details are correct and try again.</dd>
<dt>unsupported card</dt>
<dd>  Your card is not supported. Please try another card.</dd>
<dd>  Your card doesn't support required 3D secure verification. Please try another card.</dd>
<dt>verification required</dt>
<dd>  If you receive a verification required error, <a href=../3d-secure/introduction.html>3D secure</a> needs to be performed.</dd>
</dl>

## Error responses

To test potential error responses, use a pan from the table:
| pan                | scheme     | 3D version |
|--------------------|------------|------------|
| `2221000000000009` | mastercard | 3DSv2      |
| `4200000000000000` | visa       | 3DSv1      |
| `5555550000004444` | mastercard | 3DSv1      |

The amount will determine which error response to test.
| Amount | Error code                 | Description                        | Response status |
|--------|----------------------------|------------------------------------|-----------------|
| 13.11  | invalid card number        | Invalid card number.               | 400             |
| 400.00 | invalid input              | General input error.               | 400             |
| 401.11 | unsupported card           | Unsupported card scheme.           | 400             |
| 401.40 | invalid currency           | Invalid currency.                  | 400             |
| 401.50 | invalid descriptor         | Invalid text on statement.         | 400             |
| 401.90 | invalid transaction        | Invalid transaction.               | 400             |
| 402.00 | rule violation             | Acquirer rule violation.           | 400             |
| 403.00 | 3ds problem                | 3-D Secure problem.                | 400             |
| 403.10 | 3ds authentication failure | 3-D Secure authentication failure. | 400             |
| 404.10 | card declined              | Declined by issuer or card scheme. | 400             |
| 404.13 | insufficient funds         | Insufficient funds.                | 400             |
| 404.14 | suspected fraud            | Suspected fraud.                   | 400             |
| 404.15 | amount limit               | Amount limit exceeded.             | 400             |
| 404.20 | blocked merchant           | Merchant blocked by cardholder.    | 400             |