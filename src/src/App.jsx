import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { getFlashUsdtBalance } from './utils/flashusdt'

const App = () => {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState('')

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])
    } else {
      alert('Please install MetaMask')
    }
  }

  useEffect(() => {
    const fetchBalance = async () => {
      if (account) {
        const bal = await getFlashUsdtBalance(account)
        setBalance(bal)
      }
    }
    fetchBalance()
  }, [account])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">FlashUSDT DApp</h1>
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
        >
          Connect MetaMask
        </button>
      ) : (
        <>
          <p className="mb-4">Connected: {account}</p>
          <p className="text-xl">FlashUSDT Balance: {balance}</p>
        </>
      )}
    </div>
  )
}

export default App
