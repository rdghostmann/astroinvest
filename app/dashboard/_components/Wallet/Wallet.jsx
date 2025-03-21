import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { fetchWalletsByUser, fetchMarketPrices } from "@/lib/actions"; // Import the server actions
import { cryptoImages } from "@/components/Crypto/Crypto"; // Import the image paths
import Image from 'next/image';

const Wallet = async () => {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;

  // Fetch wallets made by the user
  const wallets = await fetchWalletsByUser(userID);

  // Fetch market prices
  const marketPrices = await fetchMarketPrices();

  return (
    <div>
      <h2 className="font-semibold">My Assets</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wallets.length > 0 ? (
          wallets.map((wallet) => (
            <div key={wallet._id} className="flex items-center gap-4 p-4 border rounded-lg shadow-md">
              <Image src={cryptoImages[wallet.name]} alt={wallet.name} width={50} height={50} />
              <div className="flex flex-col">
                <span className="font-semibold">{wallet.name}</span>
                <span>${wallet.balance}</span>
                <span className="text-sm text-gray-500">
                  Market Price: ${marketPrices[wallet.name.toLowerCase()]?.usd || 'N/A'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>No wallets found</div>
        )}
      </div>
    </div>
  );
};

export default Wallet;