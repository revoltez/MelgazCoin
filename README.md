# MelgazCoin
initial Coin offering template of DZToken 

![melgaz](https://user-images.githubusercontent.com/24751547/115444644-bbdc0d00-a20c-11eb-8a44-d074bdfe6a7e.png)

# Test
- you need to have truffle and ganache installed in you system to test locally.
- there should be manuall transfer from the DZToken to the DZToken sale contract 
- open truffle console in your terminal and run the following (after you ```truffle migrate```)
```
truffle console
const DZTokenInstance = await DZToken.deployed()
const DZTokenSaleInstance = await DZTokenSale.deployed()
const admin = accounts[0]
DZTokenInstance.transfer(DZTokenSaleInstance.address, amoun_of_Tokens, {from : admin})
```
- run the following command to start
```
npm run dev
```
- if you modify app.js file, it needs to be bundled using browserify with the following command 
```
npm run bundle 
```

