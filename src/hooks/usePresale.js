import { useTonConnect } from './useTonConnect';
import WebApp from '@twa-dev/sdk';

export function usePresale() {
  const { connector } = useTonConnect();

  // Contract address
  const PRESALE_ADDRESS = 'EQDBziMwzxZBqZ0nvyuLdR0-6DUqcNTVCJAMjqQ-Y5dbGLAO';

  // Validate purchase amount (0.5 - 1000 TON)
  const validatePurchaseAmount = (amount) => {
    return amount >= 0.5 && amount <= 1000;
  };

  // Calculate token amount (1 TON = 1 RAP)
  const calculateTokenAmount = (tonAmount) => {
    return tonAmount;
  };

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
    buy,
    calculateTokenAmount,
    validatePurchaseAmount,
  };
}
