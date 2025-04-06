import React from 'react';
import Image from 'next/image';
import bitcoinImage from '../../public/crypto/bitcoin.png';
import ethereumImage from '../../public/crypto/eth.png';
import solanaImage from '../../public/crypto/sol.png';
import xrpImage from '../../public/crypto/xrp.png';
import dogeImage from '../../public/crypto/doge.png';
import bnbImage from '../../public/crypto/bnb.png';

const Fiat = () => {

  const cryptos = [
    { id: 1, name: 'Bitcoin', path: bitcoinImage },
    { id: 2, name: 'Ethereum', path: ethereumImage },
    { id: 3, name: 'Solana', path: solanaImage },
    { id: 4, name: 'XRP', path: xrpImage },
    { id: 5, name: 'Dogecoin', path: dogeImage },
    { id: 6, name: 'BNB', path: bnbImage },
  ];

  return (
    
    <div className='py-7 px-4'>
      <h3 className='capitalize text-indigo-900 text-center text-lg md:text-3xl font-semibold mb-5'>We accept payment methods</h3>
      <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 items-center justify-center gap-5'>
        {cryptos.map((crypto) => (
          <div key={crypto.id} className='border w-20 lg:w-24  flex flex-col items-center justify-center text-center rounded-xl p-3 lg:p2'>
            <Image className='' src={crypto.path} alt={crypto.name} width={50} height={50} priority/>
            <p className='block text-xs sm:text-sm lg:hidden'>{crypto.name}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Fiat




 