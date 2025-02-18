"use client"

import { useState } from "react"
import { CryptoCard } from "../CryptoCard/CryptoCard"
import { Input } from "../ui/input"
import cryptocurrencies from "@/lib/cryptocurrencies"

const CryptoList = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCryptos = cryptocurrencies.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Cryptocurrency List</h1>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCryptos.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
      {filteredCryptos.length === 0 && <p className="text-center text-gray-500 mt-8">No cryptocurrencies found.</p>}
    </div>
  )
}

export default CryptoList;

