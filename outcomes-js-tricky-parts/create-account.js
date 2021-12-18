function createAccount (pin, amount = 0) {
	return {
		checkBalance (inputPin) {
			if (pin === inputPin) {
				return `$${amount}`;
			} else {
				return 'Invalid PIN.';
			}
		},
		deposit (inputPin, value) {
			if (pin === inputPin) {
				amount += value;
				return `Succesfully deposited $${value}. Current balance: $${amount}.`;
			} else {
				return 'Invalid PIN.';
			}
		},
		withdraw (inputPin, value) {
			if (pin === inputPin) {
				if (value < amount) {
					amount -= value;
					return `Succesfully withdrew $${value}. Current balance: $${amount}.`;
				} else {
					return 'Withdrawal amount exceeds account balance. Transaction cancelled.';
				}
			} else {
				return 'Invalid PIN.';
			}
		},
		changePin (oldPin, newPin) {
			if (pin === oldPin) {
				pin = newPin.toString();
				return 'PIN successfully changed!';
			} else {
				return 'Invalid PIN.';
			}
		},
	};
}

module.exports = { createAccount };
