const crypto = require('crypto');

// Target hash (Alice's PIN in MD5 format)
const targetHash = '5531a5834816222280f20d1ef9e95f69';

// Function to brute-force the 4-digit PIN
function bruteForcePIN() {
  for (let pin = 0; pin <= 9999; pin++) {
    // Format the PIN as a 4-digit string (e.g., "0001")
    const pinString = pin.toString().padStart(4, '0');

    // Generate MD5 hash of the current PIN
    const hash = crypto.createHash('md5').update(pinString).digest('hex');

    // Check if the hash matches the target
    if (hash === targetHash) {
      console.log(`Alice's PIN is: ${pinString}`);
      return;
    }
  }
  console.log('PIN not found.');
}

// Start the brute-force attack
bruteForcePIN();
