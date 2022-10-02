

# Basic

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

Here is a React app used to display n last transactions occuring on the DAI smart contract in ethereum blockchain.

When opened, a fetch is made to get n last events of the DAI contract.

To get these events, I iterate on DAI past events while filtering by the last ethereum blocks (2 by 2). I check the transactions of the fetched blocks to see if it contains transactions related to the DAI contract. Found transactions are added to a list until the list size max is reached (100 in our context but it is configurable).

The list is formatted, and we grab the timestamp from the block of the transaction (It looks like there are no way to avoid this API call with current version of web3).

Then I start a websocket which is listening on the ethereum events. I filter events to get the transactions that are related to DAI.

Two input fields are available to filter the list by sender or recipient addresses. These filters are applied for the major load but also for the web sockets.

A sort mecanism is also in place, and controlable by the user.

N.B I named it "DAI DAI" as it is a french expression used to ask for speed like "go go !!"

## Technologies

I have made an intensive use of react hooks:
- **useState** and **useEffect** used in the whole application to store state data by default
- **useMemo** to save the providers and avoid multiple loads
- **useRef** to be able to pass the selected filters inside the socket callback.
- **custom hooks** in charge of isolating all the instructions related to getting some specific information (providers, blocks...etc) and provide an easy way to inject these data

I am using React material as style library. I was especially interested in the grid and card components that helps to create a responsive list by using cards.

I tried to use functional programming when possible. At some point I needed to add some if conditions to be able to limit the number of web3 calls. It would be interesting to review these "if"s in a second iteration to see if we can implement these controls in a better way.

The fetch to ethereum are done using web3 library. I create a DAI contract instance and call <code>getPastEvents</code> on it.

And finally, I am using typescript and ES6 when possible.

## High-level decisions

To get the 100 last transactions we could relay only on the listener and wait until we get 100 events. But it is not the best experience for the user. 
That is why I am doing initial load and websockets.

We have several services to call, and chained together like provider, contract, transactions. To be sure that these services are called only one time, I centralized everything in custom hooks and used useMemo to "cache" the results.

I have chosen to use a list of cards as it helps to create a responsive view, by varying the number of displayed elements depending on the device screen size.

Concerning the filters, there is a parent (main screen) and a child component (list of filters) which are bind together. When the user enter a value in sender or recipient field, I check the value entered. When it reaches the size of the eth addresses (42 bytes), I run the search. Doing it in this way is motivated by limiting the number of on-chain queries. In the real world we might display some information to help the user understanding how to use these filters.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The .env file contains my infura key. Feel free to change it if needed.