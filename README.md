

# Basic

## Fastest sort


## Code optimization

In the following code, getting the settings is useless. And I don't see an obvious reason to notify the user and the admin sequentially and not in parallel.

```javascript
connectToDatabase()
.then((database)  => {
    return getUser(database, 'email@email.com')
    .then(user => {
        return getUserSettings(database, user.id)
        .then(settings => {
            return setRole(database, user.id, "ADMIN")
            .then(success => {
                return notifyUser(user.id, "USER_ROLE_UPDATED")
                .then(success => {
                    return notifyAdmins("USER_ROLE_UPDATED")
                })
            })
        })
    })
})
```

We can remove it without impacting any behaviour, and parallelize the notifications:

```javascript
connectToDatabase()
.then((database)  => {
    return getUser(database, 'email@email.com')
    .then(user => {
        return setRole(database, user.id, "ADMIN")
            .then(success => (
                Promise.all([
                    notifyUser(user.id, "USER_ROLE_UPDATED"),
                    notifyAdmins("USER_ROLE_UPDATED")
                ])
            ))
    })
})
```

Another optimization would be to send the notifications in an "eventual consistency" way. Some assumptions would drive the use of this approach:
 - high throughput is needed
 - backend infrastructure is reliable
 - a failure in the admin role change statement do not compromises the security of the whole system 

```javascript
connectToDatabase()
.then((database)  => {
    return getUser(database, 'email@email.com')
    .then(user => (
        Promise.all([
                setRole(database, user.id, "ADMIN"),
                notifyUser(user.id, "USER_ROLE_UPDATED"),
                notifyAdmins("USER_ROLE_UPDATED")
            ])
    ))
})
```

And finally using _async/await_ syntax it becomes:

```javascript
const database = await connectToDatabase()
const user = await getUser(database, 'email@email.com')
return Promise.all([
                setRole(database, user.id, "ADMIN"),
                notifyUser(user.id, "USER_ROLE_UPDATED"),
                notifyAdmins("USER_ROLE_UPDATED")
            ])
```


# DAI token tracker app

## How it works

## Components
## Development steps

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Please also make sure that the repository is private and that you give the following users access

- TRCSamurai
- jjfractional
- Cvetlicnifractional