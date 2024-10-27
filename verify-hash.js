const crypto = require("crypto");

/**
 * First of all, the RECIPIENT obtains MESSAGE and HASH
 * (can be MD5, SHA1, or SHA256) from the SENDER
 */
const message = "this is a fake secret";  // Change to new message
const senderHash = "ad6aaf9436af95ee9163f1da58b8b7af1018e3faa853209e5151c048bb058479";  // SHA-1 hash

// Use SHA-1 for generating the recipient's hash
const recipientHash = crypto.createHash("sha256").update(message).digest("hex");
const isValid = (senderHash == recipientHash);
console.log("SHA-256 verification result is:", isValid);
