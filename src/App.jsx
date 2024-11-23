import { useState, useEffect } from 'react'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useTonConnect } from './hooks/useTonConnect'
import { usePresale } from './hooks/usePresale'
import LoadingScreen from './components/LoadingScreen'
import WebApp from '@twa-dev/sdk'
import './App.css'

function App() {
  const { connected } = useTonConnect()
  const { tonBalance, rapBalance, buy: buyTokens } = usePresale()
  const [amount, setAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Инициализация Telegram Web App
    WebApp.ready()
    WebApp.expand()
    
    // Установка темы и цветов
    WebApp.setHeaderColor('#000000')
    WebApp.setBackgroundColor('#000000')

    // Имитируем загрузку
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleAmountChange = (e) => {
    const value = e.target.value
    if (value === '' || (Number(value) >= 0.5 && Number(value) <= 1000)) {
      setAmount(value)
      setReceiveAmount(value) // 1 TON = 1 RAP
    }
  }

  const handleBuy = async () => {
    if (!amount) return
    try {
      await buyTokens(Number(amount))
      setAmount('')
      setReceiveAmount('')
      WebApp.showAlert('Transaction sent successfully!')
    } catch (error) {
      console.error('Error buying tokens:', error)
      WebApp.showAlert('Error: ' + error.message)
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="presale-text">
          <span>PRE-SALE</span>
          <div className="presale-background"></div>
        </div>
      </header>

      <div className="rate-container">
        <div className="rate">
          <div className="value">RAP/TON 1.00</div>
          <div className="change">+0.00%</div>
        </div>
      </div>

      <div className="card">
        <div className="title">
          <img 
            src="/$RAP(logo).svg" 
            alt="RAP Token Logo"
            className="token-logo"
          />
          <div>
            <h2>RAP Token</h2>
          </div>
        </div>

        <div className="balance">
          <p>Pay</p>
          <p>Balance: {connected ? `${tonBalance} TON` : '- TON'}</p>
        </div>

        <div className="input-group">
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.0"
          />
          <button>TON</button>
        </div>

        <div className="arrow">↓</div>

        <div className="balance">
          <p>Receive</p>
          <p>Balance: {connected ? `${rapBalance} RAP` : '- RAP'}</p>
        </div>

        <div className="input-group">
          <input
            type="text"
            value={receiveAmount}
            readOnly
            placeholder="0.0"
          />
          <button>RAP</button>
        </div>

        <div className="connect-button-container">
          {!connected ? (
            <TonConnectButton />
          ) : (
            <button 
              className="connect-wallet"
              onClick={handleBuy}
              disabled={!amount || Number(amount) < 0.5 || Number(amount) > 1000}
            >
              Buy RAP Tokens
            </button>
          )}
        </div>

        <div className="progress">
          <div className="progress-bar">
            <div style={{ width: `${(0 / 20000) * 100}%` }}></div>
          </div>
          <div className="progress-text">
            <p>0/20,000 RAP</p>
            <p>20,000 RAP left</p>
          </div>
        </div>

        <div className="purchase-info">
          <div>
            <p>Min. Purchase</p>
            <p>0.5 TON</p>
          </div>
          <div>
            <p>Max. Purchase</p>
            <p>1,000 TON</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
