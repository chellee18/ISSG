const crypto = require('crypto');
const https = require('https');

// URL of the password list from GitHub
const passwordListURL = 'https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/500-worst-passwords.txt';

// Target MD5 hash to match
const targetMD5Hash = '578ed5a4eecf5a15803abdc49f6152d6';

// Function to generate an MD5 hash from a given text
const generateMD5 = (text) => crypto.createHash('md5').update(text).digest('hex');

// Function to fetch the password list from the URL
const fetchPasswordList = (url, onSuccess) => {
  https.get(url, (res) => {
    let content = '';
    
    res.on('data', (chunk) => content += chunk);
    res.on('end', () => onSuccess(content.trim().split('\n')));

  }).on('error', (error) => console.error(`Error fetching the list: ${error.message}`));
};

// Function to perform the dictionary attack
const performDictionaryAttack = (passwordList) => {
  for (const password of passwordList) {
    if (generateMD5(password.trim()) === targetMD5Hash) {
      return password;
    }
  }
  return null;
};

// Execution process
fetchPasswordList(passwordListURL, (passwordArray) => {
  const foundPassword = performDictionaryAttack(passwordArray);
  if (foundPassword) {
    console.log(`Bob's password is: ${foundPassword}`);
  } else {
    console.log('Password not found in the list.');
  }
});
