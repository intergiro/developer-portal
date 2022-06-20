# Application programming interface (API) key

API key is a code used to identify and authenticate an application or a user. It may also act as a unique identifier and provide a secret token for authentication purposes.

In scope of 2D API project an `API key` is a secret attached to one or more roles.
Roles available:
- `Get all transaction details`: The key with such role can retrieve all company transactions details.
- `Get all accounts`: The key with such role can retrieve all company account details.
- `Create payments`: The key with such role can only create a list of new payments with status `pending approval`. To complete and send payment(s) an additional approve/reject step is required together with SCA.
The roles can only attached to the key on creation time. It can not be changed after the key is created.

# View 2D API key. 
2D API keys belongs to the corporation. Thus, having view API key permissions user can see all corporate 2D API keys without any restrictions. Moreover, if the user has `renew` and `delete` 2D API key permissions he/she can renew and delete `all` the keys of the corporation. Thus, it is very important to give any of API key manage permissions only users who should manage all keys on behalf of the whole corporation.

# Create a new 2D API key
Only users with create 2D API key permission can create a new key.
To create a new API key first, navigate to [Intergiro business account](https://business.intergiro.com/portal/api) page. If your user has create api key permission, the button named `+Create new key` will show up on the top right corner of the page. In case there is no create button is displayed on api page please, contact your company administrator to check your user permissions. 
- To create a new API key please, click on create button and follow the detailed instructions provided. You will be asked to select a set of roles to be assigned to the key. After the key is successfully created you will see the plain key secret on the screen. `NOTE` this is going to be the only time the api key will be presented. Make sure you copy the key and keep it in a very secure place. For security reasons the key is not saved on Intergiro platform as well. Only the hash of the key is kept in the database. It's almost impossible to get or even guess the key, having only the hash of it. However, it is very easy to calculate another hash with provided key and use it to find the hash of the key in a system. Thus, when the user sends the key for authentication, the system can easily find all attached information of the key except the key itself.

# Extend already existing 2D API key expiration time. 
For security reasons the key has `90 days` of expiration period. 2D API keys can be renewed from Intergiro Portal after or even before the key expires. In addition, portal shows notifications for all the keys (having less then 2 weeks)/(already have been) expired.
To renew the key click renew button shown near each key. If the request is successful the key will successfully be updated. New expiration date will be assigned to the key for additional 90 days. To see the `renew button` user needs to have an appropriate `renew api key` permissions.

# Delete 2D API key. 
2D API keys can be easily deleted. This will trigger immediate session invocation action. This gives an opportunity to delete the keys in case it was stolen or no longer needed. To delete the api key click on delete button shown near each key. If the request is successful the key will successfully be removed from the list. To see the `delete button` user needs to have an appropriate `delete api key` permissions.

# Recommendations 
- It is highly recommended to create a new corporation for automation purposes.
- Do not give `create` 2D API key permissions to all users. Only limited users such as admins should be granted such powerful privilege. The user having `create` API key permission can create a new key by assigning all possible roles. Thus, making the whole company data to be easily accessible via API key. For now we limit the number of api key roles as view accounts and transactions. In addition to create payments. In the future new roles can be added and the sensitive data from other users might be exposed to the key. 

###TODO add more info if needed  