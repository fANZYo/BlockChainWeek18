pragma solidity ^0.4.18;

contract Bank {
	mapping(address => uint) accounts;

	event TransferEvent(address indexed _from, address indexed _to, uint256 _value);

	function Bank() {
		accounts[0xEeE6D50b733Dad509A05c27c9292eB7940FF6968] = 100;
		accounts[0xA306084A0eD9Cdfa1D54F9dB0009BdA0f35aBDFF] = 100;
		accounts[0x82688F89698761788B998B063181E77f18D57c87] = 100;
		accounts[0x0e0feF6354D438e7e348071A4399258505B3C005] = 100;
	}

	function NewAccount(){

	}

	function Deposit() public payable {
		accounts[msg.sender] += msg.value;
	}

	function Withdraw() public payable {
		accounts[msg.sender] -= msg.value;
	}

	function Balance() public returns (uint){
		return msg.sender.balance;
	}

	function Transfer(address to) public payable {
		if (accounts[msg.sender] >= msg.value) {
			accounts[to] += msg.value;
			accounts[msg.sender] -= msg.value;
			TransferEvent(msg.sender, to, msg.value);
		}
	}
}
