import { useState, useEffect } from 'react';
import { useTonConnect } from './useTonConnect';
import { TonClient } from '@ton/ton';
import WebApp from '@twa-dev/sdk';

export function usePresale() {
  const { connector, connected } = useTonConnect();
  const [tonBalance, setTonBalance] = useState('0');
  const [rapBalance, setRapBalance] = useState('0');

  // Contract address
  const PRESALE_ADDRESS = 'EQDBziMwzxZBqZ0nvyuLdR0-6DUqcNTVCJAMjqQ-Y5dbGLAO';

  // Initialize TON Client
  const client = new TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
    apiKey: '0b5c9e1b4ba8c2d3f4e5a6b7c8d9e0f1', // Free API key for testing
  });

  // Validate purchase amount (0.5 - 1000 TON)
  const validatePurchaseAmount = (amount) => {
    return amount >= 0.5 && amount <= 1000;
  };

  // Calculate token amount (1 TON = 1 RAP)
  const calculateTokenAmount = (tonAmount) => {
    return tonAmount;
  };

  // Fetch balances
  const fetchBalances = async () => {
    if (!connected || !connector.account?.address) return;

    try {
      // Get TON balance
      const balance = await client.getBalance(connector.account.address);
      setTonBalance((Number(balance) / 1e9).toFixed(2));

      // Get RAP balance (mock for now)
      setRapBalance('0.00');
    } catch (error) {
      console.error('Error fetching balances:', error);
      // Set default values on error
      setTonBalance('0.00');
      setRapBalance('0.00');
    }
  };

  // Update balances when connection status changes
  useEffect(() => {
    if (connected) {
      fetchBalances();
      // Set up interval to update balances
      const interval = setInterval(fetchBalances, 10000);
      return () => clearInterval(interval);
    }
  }, [connected, connector.account?.address]);

  // Buy tokens
  const buy = async (tonAmount) => {
    if (!validatePurchaseAmount(tonAmount)) {
      throw new Error('Invalid purchase amount');
    }

    try {
      // Convert TON amount to nanotons
      const amountNano = tonAmount * 1e9;

      // Send transaction
      const result = await connector.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes
        messages: [
          {
            address: PRESALE_ADDRESS,
            amount: amountNano.toString(),
          },
        ],
      });

      // Update balances after transaction
      await fetchBalances();

      return {
        tokenAmount: calculateTokenAmount(tonAmount),
        transaction: result,
      };
    } catch (error) {
      console.error('Error buying tokens:', error);
      throw error;
    }
  };

  return {
    tonBalance,
    rapBalance,
    buy,
    fetchBalances,
  };
}
