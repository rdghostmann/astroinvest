import React from 'react';
import Image from 'next/image';
import bitcoinImage from '../../public/crypto/btc.png';
import ethereumImage from '../../public/crypto/eth.png';
import solanaImage from '../../public/crypto/sol.png';
import xrpImage from '../../public/crypto/xrp.png';
import dogeImage from '../../public/crypto/doge.png';
import bnbImage from '../../public/crypto/bnb.png';

// Array of cryptocurrency objects
const cryptos = [
  { id: 1, name: 'Bitcoin', path: bitcoinImage },
  { id: 2, name: 'Ethereum', path: ethereumImage },
  { id: 3, name: 'Solana', path: solanaImage },
  { id: 4, name: 'XRP', path: xrpImage },
  { id: 5, name: 'DOGE', path: dogeImage },
  { id: 6, name: 'BNB', path: bnbImage },
];

// Export the image paths
export const cryptoImages = {
  Bitcoin: bitcoinImage,
  Ethereum: ethereumImage,
  Solana: solanaImage,
  XRP: xrpImage,
  Doge: dogeImage,
  BNB: bnbImage,
};

// Main Crypto component
const Crypto = () => (
  <div>
    <h1>Cryptocurrencies</h1>
    <div style={{ display: 'flex', gap: '20px' }}>
      {cryptos.map((crypto) => (
        <div key={crypto.id} className='border w-fit flex flex-col items-center justify-center text-center rounded-xl p-3'>
          <Image src={crypto.path} alt={crypto.name} width={50} height={50} />
          <p>{crypto.name}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Crypto;