const DZTokenSale = artifacts.require("DZTokenSale");
const DZToken = artifacts.require("DZToken");

contract("DZTokenSale", (accounts) => {
  const buyer = accounts[1];

  it("Testing the Deployment of TokenSALE smart contract", async () => {
    const TokenInstance = await DZTokenSale.deployed();
    const tokenPrice = await TokenInstance.TokenPrice();
    assert.equal(tokenPrice, 1000000000000000, "testing the token price value");
  });

  it("tesint the buyTokens function", async () => {
    const TokenInstance = await DZTokenSale.deployed();
    const DZInstance = await DZToken.deployed();
    const receipt = await DZInstance.transfer(TokenInstance.address, 500, {
      from: accounts[0],
    });

    const DZTokenSaleBalance = await DZInstance.balanceOf(
      TokenInstance.address
    );
    assert.equal(DZTokenSaleBalance, 500, "should be 500");
    const numberofTokens = 50;
    const receipt2 = await TokenInstance.buyTokens(numberofTokens, {
      from: buyer,
      value: 1000000000000000 * 50,
    });
    const TokensSold = await TokenInstance.TokensSold();
    assert.equal(TokensSold.toNumber(), 50, "testing value of tokens sold");
  });
});
