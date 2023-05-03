// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract IdentityVerifier {
    mapping(address => bool) public verifiedAddresses;

    function verify(address _address) public {
        verifiedAddresses[_address] = true;
    }

    function isVerified(address _address) public view returns (bool) {
        return verifiedAddresses[_address];
    }
}