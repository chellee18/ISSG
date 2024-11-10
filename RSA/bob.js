const crypto = require("crypto");

// First, the RECEIVER gets the SENDER'S PUBLIC KEY
const senderPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl6feG/OTqNrXz3KvafAB
XciJ9sx3uJeqTsi9oO+ombJNYRnL9ih8cOMU6BXGfOFqI7o1TW1Y4W3Tnxw+RY0P
b4EHCmrthNWuh3KCLGVluBS6udx9vbH5/XuFLLp2xmCj0CrjP7NpVgD4bZEMN8Mp
gHgzK0n7C5TDxqmR9/6iVKTagmI+EwjU49BkZVo7qRTk9n3zWJ+9K6UeNOUwsHHl
1xH86ExAk3E9vsok+q6L3EIyI4Pk5cVhQRUl/0k4cDLR3OPQRyxeO2LJFEFPvvSh
8wUlqRGJc5MVru++eClkEqbHS+BuJEh0xoPmaEDJevKI+xML39rSQL8n3v0Spo1I
VwIDAQAB
-----END PUBLIC KEY-----`;
const senderPublicKey = crypto.createPublicKey(senderPublicKeyPem);

// Next, the RECEIVER obtains the MESSAGE and SIGNATURE from the SENDER
const signatureHex = "2c98733a00ab564dee0ad4455d95b0f5425b9009961b94f196cd88bf699a5e15c29d29bab943ae700ae22a1b9e20d1104c43dec81fcb70820feed518a34f322581631386ead4c8f5a75de8f7390014fc5ef679eb3a8d856495635788f24d3e68a59a43eb5e3d68690352d3a5d4cfee6ef33959151d81e23701b8f39b199160b03dd5a3264ee0f093fc9dc89f00f52b3e691a2533274aff36f24100c3048071af5b13c884414cbcec14c1efc829968e3ab205fee685fa9f4e43d2ea14042e43e05668ee4cded717137e7dac49817f49e48e8e4c4a2413b1993aa8773beb6e869cf640d36f61ab60107a99ade449960c6a406a4e9ba06dffc9835c50d6a4fc277a";
const signature = Buffer.from(signatureHex, "hex");

// The message to be verified (in hexadecimal format)
const messageHex = "492077616e7420736f6d65206170706c6573"; // Hexadecimal representation of the message
const data = Buffer.from(messageHex, "hex");  // Convert hex to buffer

// The RECEIVER verifies the SIGNATURE
const isValid = crypto.verify("sha256", data, senderPublicKey, signature);

console.log("Signature Verification:", isValid ? "true" : "false");
console.log("Message:", data.toString("utf-8"));  // Convert buffer to string for output
