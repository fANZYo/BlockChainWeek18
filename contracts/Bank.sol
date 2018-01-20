pragma solidity ^0.4.18;

contract Bank {
	mapping(address => uint) accounts;

	function Bank() {
		
	}

	function NewAccount(){

	}

	function Deposit(uint amount) public payable returns (uint){
		accounts[msg.sender] += amount;

		return accounts[msg.sender];
	}

	function Withdraw(uint amount) public payable returns (uint){
		accounts[msg.sender] -= amount;

		return accounts[msg.sender];
	}

	function Balance() public returns (uint){
		return accounts[msg.sender];
	}

	function Transfer(address to, uint amount) public payable returns (uint) {
		if (accounts[msg.sender] >= amount) {
			accounts[to] += amount;
			accounts[msg.sender] -= amount;
		} else {
			return 1;
		}

		return accounts[msg.sender];
	}
}
