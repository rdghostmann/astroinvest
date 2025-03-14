import React from 'react';
import Image from 'next/image';
import bitcoinImage from '../../public/crypto/btc.png';
import ethereumImage from '../../public/crypto/eth.png';
import solanaImage from '../../public/crypto/sol.png';
import xrpImage from '../../public/crypto/xrp.png';
import bnbImage from '../../public/crypto/bnb.png';

// Array of cryptocurrency objects
const cryptos = [
  { id: 1, name: 'Bitcoin', path: bitcoinImage },
  { id: 2, name: 'Ethereum', path: ethereumImage },
  { id: 3, name: 'Solana', path: solanaImage },
  { id: 4, name: 'XRP', path: xrpImage },
  { id: 5, name: 'BNB', path: bnbImage },
];

// Dynamically create functional components for each cryptocurrency
const CryptoComponents = cryptos.reduce((components, crypto) => {
  const CryptoComponent = () => (
    <div key={crypto.id} className='border w-fit flex flex-col items-center justify-center text-center rounded-xl p-3'>
      <Image src={crypto.path} alt={crypto.name} width={50} height={50} />
      <p>{crypto.name}</p>
    </div>
  );
  components[crypto.name] = CryptoComponent;
  return components;
}, {});

// Main Crypto component
const Crypto = () => (
  <div>
    <h1>Cryptocurrencies</h1>
    <div style={{ display: 'flex', gap: '20px' }}>
      {cryptos.map((crypto) => {
        const CryptoComponent = CryptoComponents[crypto.name];
        return <CryptoComponent key={crypto.id} />;
      })}
    </div>
  </div>
);

// Export each functional component individually
export const { Bitcoin, Ethereum, Solana, XRP, BNB } = CryptoComponents;

// Export the main Crypto component
export default Crypto;