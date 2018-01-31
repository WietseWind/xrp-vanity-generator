# XRP Vanity address (wallet) generator

A vanity address is a wallet address containing a few characters you like at the beginning or the end of the wallet address. Of course we can't just generate the address: the address is a derivative from a secret key. So: this tool generates several secret keys per second. The script will test the derived wallet address against one or more keywords you can supply.

## How to use this tool

1. Make sure you have **nodejs** installed on your computer:
[https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm).
(nodejs allowes you to run Javascript code on your computer from the commandline).
2. Download the source of this repository (using `git clone` or by downloading the zip)
3. Start your commandline and go to the folder containing the source of this repository
4. Install the dependency (ripple-lib) by running `npm install`
5. Fire up the tool and **append the keywords you are looking for**:
```
node xrpwallet.js hello pepper johndoe
```

The example command above will search for wallet addresses containing either _hello_, _pepper_ or _johndoe_.

![Demo of install and wallet generation](https://gtasb9v.dlvr.cloud/4.gif)

## Notes

- This script will look for your keywords at the beginning or at the end of wallet addresses.
- This script will look for matches case insensitive.
- The longer the keyword you are looking for, the longer it takes to find a match.
- If you want to be make sure the generated wallets + keys are safe, generate offline.

### Security / randomness

> Serious question. How do we know these addresses are random and not some sort of sequence? [@ Reddit](https://www.reddit.com/r/Ripple/comments/7u9wmc/create_your_own_fancy_wallet_address_open_source/dtinlkd/)

Good question indeed. The only way to be sure is to check the code;

My code [is over here](https://github.com/WietseWind/xrp-vanity-generator/blob/master/xrpwallet.js) and as you can see is invoke the method "api.generateAddress()" - and as you can see on line 1 and 2:

    const rippleLib  = require('ripple-lib').RippleAPI
    const api        = new rippleLib()

... I use **ripple-lib** to do this. [ripple-lib](https://github.com/ripple/ripple-lib) is from Ripple (the company) - this code is open source as well.

[This](https://github.com/ripple/ripple-lib/blob/develop/src/offline/generate-address.ts) is how they generate a keypair. They use their own lib [ripple-keypairs](https://github.com/ripple/ripple-keypairs) to do this. The function is on [line 17 over here](https://github.com/ripple/ripple-keypairs/blob/master/src/index.js) and at line 19 you can see they use the **brorand** lib. to [generate the randomness](https://github.com/indutny/brorand/blob/master/index.js). This lib. uses the **crypto** object, a native NodeJS object, by invoking:

    crypto.randomBytes()

More info about this method [over here](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback).

### Feeling generous?

Tips are highly appreciated at XRP address `rPdvC6ccq8hCdPKSPJkPmyZ4Mi1oG2FFkT` or using
the [XRP TipBot](https://xrptipbot.com) at Twitter: [@WietseWind](https://twitter.com/WietseWind) 😇
