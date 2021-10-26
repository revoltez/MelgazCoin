const DZToken = artifacts.require("DZToken");

contract("DZToken", (accounts) => {
  it("Name should return DZToken", async () => {
    const DZInstance = await DZToken.deployed();
    const symbol = await DZInstance.symbol();
    assert.equal(symbol, "DZT");
  });

  it("Testing the transfer function", async () => {
    const DZInstance = await DZToken.deployed();
    const receipt = await DZInstance.transfer(accounts[1], 100, {
      from: accounts[0],
    });
    assert.equal(receipt.logs.length, 1, "should be 1");
  });

  it("testing the approve function", async () => {
    const DZInstance = await DZToken.deployed();
    const receipt = await DZInstance.approve(accounts[1], 50, {
      from: accounts[0],
    });
    const value = await DZInstance.allowance(accounts[0], accounts[1]);
    assert.equal(value, 50, "should equal to 50");
    assert.equal(receipt.logs.length, 1);
  });

  it("testing the TransferFrom function", async () => {
    const DZInstance = await DZToken.deployed();
    const receipt = await DZInstance.transferFrom(
      accounts[0],
      accounts[2],
      30,
      {
        from: accounts[1],
      }
    );
    assert.equal(receipt.logs.length, 1);

    const AC2Balance = await DZInstance.balanceOf(accounts[2]);
    const AC0Balance = await DZInstance.balanceOf(accounts[0]);
    assert.equal(AC2Balance, 30);
    assert.equal(AC0Balance, 9999870);
  });

  /*  it("should be equal to 1000", async () => {
    const DZInstance = await DZToken.deployed();
    const result = await DZInstance.totalSupply();
    const adminBalance = await DZInstance.balanceOf(accounts[0]);
    console.log(adminBalance);
    assert.equal(adminBalance.toNumber(), 1000);
  });*/
});
