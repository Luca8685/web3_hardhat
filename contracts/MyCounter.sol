//SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract MyCounter {
    uint counter;
    
    function count() public{
        counter++;
    }

    function getCount() public view returns (uint){
        return counter;
    }
    
}