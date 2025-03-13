import React from 'react';
import Image from 'next/image';
import bitcoinImage from '../../public/crypto/btc.png';
import ethereumImage from '../../public/crypto/eth.png';
import solanaImage from '../../public/crypto/sol.png';

// Functional component for Bitcoin image
const Bitcoin = () => (
  <div>
    <Image src={bitcoinImage} alt="Bitcoin" width={50} height={50} />
    <p>Bitcoin</p>
  </div>
);

// Functional component for Ethereum image
const Ethereum = () => (
  <div>
    <Image src={ethereumImage} alt="Ethereum" width={50} height={50} />
    <p>Ethereum</p>
  </div>
);

// Functional component for Solana image
const Solana = () => (
  <div>
    <Image src={solanaImage} alt="Solana" width={50} height={50} />
    <p>Solana</p>
  </div>
);

// Main Crypto component
const Crypto = () => (
  <div>
    <h1>Cryptocurrencies</h1>
    <div style={{ display: 'flex', gap: '20px' }}>
      <Bitcoin />
      <Ethereum />
      <Solana />
    </div>
  </div>
);

export default Crypto;