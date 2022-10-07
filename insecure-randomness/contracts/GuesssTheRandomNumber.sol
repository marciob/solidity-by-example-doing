// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract GuessTheRandomNumber {
    constructor() payable {}

    function guess(uint _guess) public {
        // it uses the blockhash of the previous hash + timestamp
        // and converts into uint
        // it uses the previous block because the current block isn't available at that time
        uint answer = uint(
            keccak256(
                abi.encodePacked(blockhash(block.number - 1), block.timestamp)
            )
        );

        // it rewards if the guessing is correct
        if (_guess == answer) {
            (bool sent, ) = msg.sender.call{value: 1 ether}("");
            require(sent, "Failed to send Ether");
        }
    }
}
