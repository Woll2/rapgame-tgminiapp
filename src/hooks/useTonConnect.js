import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

export function useTonConnect() {
  const connector = useTonConnectUI();
  const wallet = useTonWallet();

  return {
    connected: !!wallet?.account.address,
    wallet,
    connector,
  };
}
