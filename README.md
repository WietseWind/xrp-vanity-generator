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

### Feeling generous?

Tips are highly appreciated at XRP address `rPdvC6ccq8hCdPKSPJkPmyZ4Mi1oG2FFkT` or using
the [XRP TipBot](https://xrptipbot.com) at Twitter: [@WietseWind](https://twitter.com/WietseWind) 😇