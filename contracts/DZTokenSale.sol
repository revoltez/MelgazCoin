pragma solidity ^0.5.16;
import "./DZToken.sol";

contract DZTokenSale {
    DZToken public dzToken;
    uint256 public TokenPrice;
    uint256 public TokensSold;
    address payable admin;
    event Sell(address buyer, uint256 amount);

    constructor(DZToken _dzToken, uint256 _Price) public {
        admin = msg.sender;
        dzToken = _dzToken;
        TokenPrice = _Price;
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }

    function buyTokens(uint256 numberOfTokens) public payable {
        // keep track of number of tokens sold
        // require that a contract have enough tokens
        // require tha value sent is equal to token price
        // trigger sell event
        require(msg.value == mul(numberOfTokens, TokenPrice));
        require(dzToken.balanceOf(address(this)) >= numberOfTokens);
        require(dzToken.transfer(msg.sender, numberOfTokens));

        TokensSold += numberOfTokens;
        emit Sell(msg.sender, numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin);
        require(dzToken.transfer(admin, dzToken.balanceOf(address(this))));
        selfdestruct(admin);
    }
}
