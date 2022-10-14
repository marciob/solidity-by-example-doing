// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/*
this is the malicious contract that will be called from another contract
*/

contract Mal {
    event Log(string message);

    // Actually we can execute the same exploit even if this function does
    // not exist by using the fallback
    function log() public {
        emit Log("Mal was called");
    }

    // function () external {
    //     emit Log("Mal was called");
    // }
}
