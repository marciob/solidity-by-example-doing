// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/*
The exploit works pretending that a function within a contract is calling a function from another contract from the same file
but actually it's called another contract because at the time of the deployment it instantiate another contract address
*/

contract Foo {
    Bar bar;

    constructor(address _bar) {
        bar = Bar(_bar);
    }

    function callBar() public {
        bar.log(); // it's pretending to call a function from another contract
    }
}

contract Bar {
    event Log(string message);

    function log() public {
        emit Log("Bar was called");
    }
}
