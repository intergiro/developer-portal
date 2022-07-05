# Application Programming Interface (API) key

An API key is a code used to identify and authenticate an application or a user. It may also act as a unique identifier and provide a secret token for authentication purposes.

The 2d API key can be attached to one or more roles. Roles available:
- `Get all transaction details`: A key with this role can retrieve all company transaction details
- `Get all accounts`: A key with this role can retrieve all company account details
- `Create payments`: A key with this role can initiate payment(s) with the status `pending approval`. To complete and send payment(s), an additional approve/reject step is required

# User permissions
2d API keys belong to the business. Thus, by having `View API key` permissions, a user can see all corporate 2d API keys without any restrictions. Moreover, if the user has `renew` and `delete` 2d API key permissions, they can renew and delete all the keys of the corporation. Therefore, it is very important to provide API key management permissions solely to those users who will manage all keys on behalf of the company.

# Create a new 2d API key
Only users with `create 2d API key` permission can create new keys.
To create a new API key, first navigate to the Intergiro [business account](https://business.intergiro.com/portal/api) page. If your user has `create api key` permissions, the button named `+Create new key` will show up on the top right corner of the page. If there is no `Create` button available on the API page, please contact your company administrator to check your user permissions.

If the user has this permission: To create a new API key, click on the `Create` button and follow the detailed instructions provided. You will be asked to select a set of roles to be assigned to the key.

After the key is successfully created, you will see the plaintext secret key on the screen. `NOTE` this is going to be the only time the API key will be presented. Make sure you copy the key and keep it in a very secure place. For security reasons, the key is not saved on the Intergiro platform either. Only the hash of the key is kept in the database. It's almost impossible to get or even guess the key having only the hash of it. However, it is very easy to calculate another hash with the provided key and use it to find the hash of the key in a system. Thus, when the user sends the key for authentication, the system can easily find all attached information of the key except the key itself.

# 2d API key time limitations
For security reasons, the key has a `90 day` functionality period before it is frozen and needs to be renewed. 2d API keys can be renewed from Intergiro Customer Portal after or even before the key is frozen.

In addition, the Customer Portal shows notifications for all keys that have 14 or fewer days left before being frozen.

To renew the key, click the `renew` button shown near each key. If the request is successful, the key will be updated and an additional 90 days will be granted to the key. To see the `renew button` the user needs to have the appropriate `renew api key` permissions.

# Delete 2d API key
2d API keys can be easily deleted. This will immediately revoke access and any connection to the key will cease to function. This gives an opportunity to delete the keys in case they have been stolen or are no longer needed.

To delete the API key, click on the `delete` button shown near each key. If the request is successful, the key will be removed from the list and access will be immediately revoked. To see the `delete button`, the user needs to have an appropriate `delete api key` permissions.

# Recommendations
- Do not give `create` 2d API key permissions to all users. Only limited users such as admins should be granted this powerful permission. Users with `Create API key` permissions can create a new key by assigning all possible roles, thus making all company data easily accessible via API key.