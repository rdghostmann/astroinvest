import React from 'react';
import Image from 'next/image';
import client01 from '@/public/images/client-01.png';

const Partners = () => {
  const partners = [
    { id: 1, src: client01, title: '1', alt: 'Partner 1' },
    { id: 2, src: client01, title: '2', alt: 'Partner 2' },
    { id: 3, src: client01, title: '3', alt: 'Partner 3' },
    { id: 4, src: client01, title: '4', alt: 'Partner 4' },
    { id: 5, src: client01, title: '5', alt: 'Partner 5' },
  ];

  return (
    <div className="partners border w-full py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {partners.map((partner) => (
            <div key={partner.id} className="partner-item flex justify-center">
              <Image
                src={partner.src}
                alt={partner.alt}
                title={partner.title}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;