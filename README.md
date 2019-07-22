# XRP Vanity address (wallet) generator

A vanity address is a wallet address containing a few characters you like at the beginning or the end of the wallet address. Of course we can't just generate the address: the address is a derivative from a secret key. So: this tool generates several secret keys per second. The script will test the derived wallet address against one or more keywords you can supply.

#### This tool now generates the new [X-address formatted accounts](http://xrpaddress.info). If you are looking for the previous `r...` addresses, check [this branch](https://github.com/WietseWind/xrp-vanity-generator/tree/r-address).

This tool now supports multiple threads. To use this feature, don't call `node xrpwallet.js` but `node index.js` and prepend the amount of threads. The default amount of threads is `2`. If you have more cores available, you can run with more threads, allowing you to find your vanity address faster. 

#### Single thread, looking for `Wietse` or `Pepper`:

```
node xrpwallet.js wietse pepper
```

#### `4` threads, looking for `Arwen` or `Dino`:

```
node index.js 4 arwen dino
```

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

If you use Windows and you don't have NodeJS running: [here's a screencap of the steps above (1-5)](https://fxtduw7.dlvr.cloud/4.gif).

## Notes

- This script will look for your keywords at the beginning or at the end of wallet addresses.
- This script will look for matches case insensitive.
- The longer the keyword you are looking for, the longer it takes to find a match.
- If you want to be make sure the generated wallets + keys are safe, generate offline.

### Security / randomness

> Serious question. How do we know these addresses are random and not some sort of sequence? [@ Reddit](https://www.reddit.com/r/Ripple/comments/7u9wmc/create_your_own_fancy_wallet_address_open_source/dtinlkd/)

Good question indeed. The only way to be sure is to check the code;

My code [is over here](https://github.com/WietseWind/xrp-vanity-generator/blob/master/xrpwallet.js) and as you can see is invoke the method "keypairs.generateSeed()".

... I use **ripple-keypairs** to do this. [ripple-keypairs](https://github.com/ripple/ripple-keypairs) is from Ripple (the company) - this code is open source as well.

The function is on [line 17 over here](https://github.com/ripple/ripple-keypairs/blob/master/src/index.js) and at line 19 you can see they use the **brorand** lib. to [generate the randomness](https://github.com/indutny/brorand/blob/master/index.js). This lib. uses the **crypto** object, a native NodeJS object, by invoking:

    crypto.randomBytes()

More info about this method [over here](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback).

### Feeling generous?

Tips are highly appreciated at XRP address `XVjKs2ae5EgCyKL4oPoNo7RoeBKFCbndk8gq6W6n93WeYZG` / `rPdvC6ccq8hCdPKSPJkPmyZ4Mi1oG2FFkT` or using
the [XRP TipBot](https://xrptipbot.com) at Twitter: [@WietseWind](https://twitter.com/WietseWind) 😇
