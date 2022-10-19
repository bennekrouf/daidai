# DAI token tracker app

Here is a React app used to display n last transactions occuring on the DAI smart contract in ethereum blockchain.

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

Clone, then in .env file enter an infura key

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

