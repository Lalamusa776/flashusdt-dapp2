import { ethers } from 'ethers'

const tokenAddress = '0xC1b9ED4F637F888163023a3eac771370662Fd586'
const tokenABI = [
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount) returns (bool)',
]

export const getFlashUsdtBalance = async (walletAddress) => {
  if (!window.ethereum) return 'MetaMask not installed'

  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(tokenAddress, tokenABI, provider)
  const balance = await contract.balanceOf(walletAddress)
  return ethers.formatUnits(balance, 18)
}
