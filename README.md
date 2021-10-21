# sample-auth-system

> To run on Localhost

## Prerequisites

 * Nodejs and npm installed
 * Mongodb installed
 * Postman(desktop agent) for testing
 
## Steps

 * Copy `env.txt` into `.env`
 * Run `npm install`
 * Run `node server`
 * Launch postman and test all 3 apis.
 
## Screenshots

View the screenshots <a href="/screenshots">here</a>

## Testing on Heroku

Make sure that `Content-type` is set to `application/json` in `headers`

> Testing `/signup`

 `POST` https://etark12.herokuapp.com/signup
 
 `body-->raw` 
 ```js
 {
    "data":{
        "email":"ab01c@gmail.com",
        "password":"password",
         "name":"kanhaiya"
    }
}
 
 ```
 Expected result: You should receive a jwt token and user details.Note this token.
 
 
> Testing `/login`

`POST` https://etark12.herokuapp.com/login

 `body-->raw` 
 ```js
 {
    "data":{
        "email":"ab01c@gmail.com",
        "password":"password",
         "name":"kanhaiya"
    }
}
 
 ```
Expected result: You should receive a jwt token and user details.Note this token.


> Testing `/home`

`GET` https://etark12.herokuapp.com/home

headers should contain `Authorization` set to `Bearer TOKEN_VALUE`

Expected-result : 
```js
{success: true}
```
 
