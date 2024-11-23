import { useState, useEffect } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { usePresale } from './hooks/usePresale';
import WebApp from '@twa-dev/sdk';
import './App.css';

function App() {
  const { connected, wallet } = useTonConnect();
  const { buy, calculateTokenAmount, validatePurchaseAmount } = usePresale();
  const [tonBalance, setTonBalance] = useState('0.00');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
  }, []);

  // Update balance when wallet connects
  useEffect(() => {
    if (wallet) {
      updateBalance();
    }
  }, [wallet]);

  // Update balance
  const updateBalance = async () => {
    try {
      const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${wallet.account.address}`);
      const data = await response.json();
      if (data.ok) {
        const balance = data.result / 1e9;
        setTonBalance(balance.toFixed(2));
      }
    } catch (error) {
      console.error('Error updating balance:', error);
      WebApp.showAlert('Error updating balance. Please try again.');
    }
  };

  // Handle amount input
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || validatePurchaseAmount(Number(value))) {
      setAmount(value);
    }
  };

  // Handle buy button click
  const handleBuyClick = async () => {
    if (!connected || !amount) return;

    setIsLoading(true);
    try {
      const result = await buy(Number(amount));
      WebApp.showAlert(`Success! You will receive ${result.tokenAmount} RAP tokens.`);
      setAmount('');
      updateBalance();
    } catch (error) {
      console.error('Error buying tokens:', error);
      WebApp.showAlert('Error buying tokens. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const expectedTokens = amount ? calculateTokenAmount(Number(amount)) : 0;

  return (
    <div className="container">
      <img src="/$RAPc(logo).png" alt="RAP Token" className="logo" />
      <div className="card">
        <div className="card-header">
          <h1>RAP Token Presale</h1>
          <p className="balance">Balance: {tonBalance} TON</p>
        </div>

        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount (0.5 - 1000 TON)"
            min="0.5"
            max="1000"
            step="0.1"
            disabled={isLoading}
          />
          <span className="currency">TON</span>
        </div>

        <div className="info">
          <p>You will receive: {expectedTokens} RAP</p>
          <p>Rate: 1 TON = 1 RAP</p>
        </div>

        <div className="buttons">
          {!connected ? (
            <TonConnectButton />
          ) : (
            <button
              className="buy-button"
              onClick={handleBuyClick}
              disabled={!amount || !validatePurchaseAmount(Number(amount)) || isLoading}
            >
              {isLoading ? 'Processing...' : 'Buy RAP'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
