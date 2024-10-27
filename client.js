const io = require("socket.io-client");
const readline = require("readline");
const crypto = require("crypto"); 

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});

let username = "";

// Membuat hash dari pesan yang dikirim oleh client
const generateHash = (message) => {
    return crypto.createHash('sha256').update(message).digest('hex');
}; // menggunakan sha2 karena jenis hash ini menghasilkan hash yang unik dan berkualitas
// update untuk menerima pesan dari client dan membuat hash-nya
// hex mengubah hasil hash ke dalam format heksadesimal untuk mempermudah pembacaan

// koneksi
socket.on("connect", () => {
    console.log("Terhubung ke server");

    rl.question("Masukkan nama pengguna Anda: ", (input) => {
        username = input;
        console.log(`Selamat datang, ${username} di ruang obrolan`);
        rl.prompt();

        rl.on("line", (message) => {
            if (message.trim()) {
                // membuat hash, lalu menyimpannya dalam variabel hash
                const hashclient = generateHash(message);
                // hash yang sudah dibuat dikirim ke server bersama username dan pesan menggunakan .emit
                socket.emit("message", { username, message, hashclient });
            }
            rl.prompt();
        });
    });
});

socket.on("message", (data) => {
    const { username: senderUsername, message: senderMessage, hashclient: originalHash } = data;

    // memeriksa apakah pesan telah dimodifikasi atau tidak
    const receiveHash = generateHash(senderMessage.replace("(modified by server)", ""));
    const isTrue = receiveHash !== originalHash; // pemeriksaan apakah hash yang dikirim sama dengan hash yang diterima
    // jika hash berbeda, maka isTrue bernilai true
    if (senderUsername != username) {
        console.log(`${senderUsername}: ${senderMessage}`);
        // jika isTrue bernilai true, akan muncul peringatan
        if (isTrue) {
            console.log("Peringatan: Pesan ini telah dimodifikasi oleh server!");
        }
        rl.prompt();
    }
});

socket.on("disconnect", () => {
    console.log("Server terputus, Keluar...");
    rl.close();
    process.exit(0);
});

rl.on("SIGINT", () => {
    console.log("\nKeluar...");
    socket.disconnect();
    rl.close();
    process.exit(0);
});
