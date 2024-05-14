const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const accounts = {};

app.get('/balance', (req, res) => {
  const { account_id } = req.query;
  if (!accounts[account_id]) {
    return res.status(404).json(0);
  }
  return res.json(accounts[account_id].balance);
});

app.post('/event', (req, res) => {
  const { type, origin, destination, amount } = req.body;

  if (type === 'deposit') {
    if (!accounts[destination]) {
      accounts[destination] = {
        id: destination,
        balance: amount
      };
      return res.status(201).json({ destination: accounts[destination] });
    } else {
      accounts[destination].balance += amount;
      return res.status(201).json({ destination: accounts[destination] });
    }
  } else if (type === 'withdraw') {
    if (!accounts[origin]) {
      return res.status(404).json(0);
    } else {
      if (accounts[origin].balance >= amount) {
        accounts[origin].balance -= amount;
        return res.status(201).json({ origin: accounts[origin] });
      } else {
        return res.status(400).send('Sem saldo');
      }
    }
  } else {
    return res.status(400).send('Evento invalido');
  }
});



const PORT = 3000;
app.listen(PORT, () => {
 
});
