const readline = require('readline');

const register = require('./register')
// const login = require('./login')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function print() {
      rl.question('> ', function(response) {
        if (response === 'register') {
          register.register(rl);
        } else if (response === 'exit') {
          rl.close();
        } else {
          console.log('Error: Invalid response.');
        }
      });
  }

module.exports = { print }