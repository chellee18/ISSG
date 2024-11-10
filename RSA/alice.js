const crypto = require("crypto");

// Kunci Privat Alice
const alicePrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCXp94b85Oo2tfP
cq9p8AFdyIn2zHe4l6pOyL2g76iZsk1hGcv2KHxw4xToFcZ84WojujVNbVjhbdOf
HD5FjQ9vgQcKau2E1a6HcoIsZWW4FLq53H29sfn9e4UsunbGYKPQKuM/s2lWAPht
kQw3wymAeDMrSfsLlMPGqZH3/qJUpNqCYj4TCNTj0GRlWjupFOT2ffNYn70rpR40
5TCwceXXEfzoTECTcT2+yiT6rovcQjIjg+TlxWFBFSX/SThwMtHc49BHLF47YskU
QU++9KHzBSWpEYlzkxWu7754KWQSpsdL4G4kSHTGg+ZoQMl68oj7Ewvf2tJAvyfe
/RKmjUhXAgMBAAECgf9cae7vGX7hZnob78b0x0wN2iY4PmC2G7WsTKdBaslS31RH
13BykDlEkRwsURijALmtC8tvYzLGLCbIzm0j9NFzIS0pK/+Q8qVn5F9urltN0VP3
7mSxM8MitCJzHy1BtaIdOAVCzBFkVzMLkVfgowynPJfxySMx63VhmfNZK9G/wcU5
b1k57/eCtSQ43V6+KgqEqa3yACfxfMXiL0rksnnJf2MVWSiNswxzV9m3PqVi8GhW
+cVysCS8e8rve5++8BtPWVBEb0OS3xtkZWSnv3y9LvnbTxBvDXUuffn4GS0a5wT0
w7/YyGvA5p07GJk0kGsTOwAUDoGTrWSATPjX4oECgYEAyFY3LoqUnfZae80VxDhZ
QCQU+PLRjiewBkfJnG95OdXfZvsELqxX6EmTBQZVtPYOIrRqjUI3sEjHNBPODkoL
o0KitJGbT5XHHXhX6VBivznGM4tNCN0zkrTcuQRvgGMvIRpmZaR9t0lBv5iaU22B
Yq80MoAnEcX2tN9NmxWD/BECgYEAwcsCvGWF8ukSYIFIavTHfFFBROMMYFaYBUQm
xv9Y4wE9yXx8L5o0PjzHCoY9/T9/4qswIm5JcEYLb5dWJNm+Zf2b+4S/xm2XRW7H
SnNC4eyocGjJjiNPR4QAte0KD6jGNtXvB37rHxIQUUL/W00s2B5/i70lqhtNbCRK
loKAhecCgYEAgxPmBw2lL7WAfoAxPbGgs9bn4fr+IYTWJ0XRJAnLx4uoIDkdA2zA
F7wL9b2vVjeoCA0DqmkpBq6Xp/tNVwwbkTaIPp0GgYv+O8oBuyZddcDXbeI3BRW2
KMcto+DDE73RmFctqFN37fSAkFvInc2IWolIHcK7zWU5hh6VKGNreAECgYEAkL+I
6J1QIrLyFgEazUDOK84pWUHZwa+MVwqjiCm8A7quouuHeqrMcNxGs1a3wIwIgo7p
Ih6MXf8DlbNNFbNKIrX+JyztbVH4FlV7J+HVyBhTa7rpKXC4S6uOOFS4GiAvBVBf
/JJRHmEIrRnE0DZh039cN0ztcBR6jNbCm48YXmsCgYBx5J2uZRnxPfdhAYiFdOQG
ozISfxrwONexvar0jtiO8zU2ui7LD1eTCYqW0U9vF3osnyU26XNOFGYf13FDaNiR
7Mbexy7Nu9QlQttmcOBqspcsAWlIfABx4z4yjBXenxPUHXVQdIdvlrQIszjQG1yN
dAfo/44gGhQowQKF710leQ==
-----END PRIVATE KEY-----`;

const alicePrivateKey = crypto.createPrivateKey(alicePrivateKeyPem);

// Pesan yang ingin dikirim kepada Bob
const textMessage = "I want some apples";

// Tanda tangan dibuat dengan kunci privat Alice
const messageBuffer = Buffer.from(textMessage);
const signedMessage = crypto.sign("sha256", messageBuffer, alicePrivateKey);

// Tampilkan signature dan pesan dalam format heksadesimal
console.log("Signature:", signedMessage.toString("hex"));
console.log("Message:", messageBuffer.toString("hex"));
