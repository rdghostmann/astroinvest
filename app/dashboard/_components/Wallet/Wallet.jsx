import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { fetchWalletsByUser } from "@/lib/actions"; // Import the server action
import { cryptoImages } from "@/components/Crypto/Crypto"; // Import the image paths
import Image from 'next/image';

const Wallet = async () => {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;

  // Fetch wallets made by the user
  const wallets = await fetchWalletsByUser(userID);

  return (
    <div>
      <h2>My Assets</h2>
      <ul>
        {wallets.length > 0 ? (
          wallets.map((wallet) => (
            <li key={wallet._id} className='flex items-center gap-4'>
              <Image src={cryptoImages[wallet.name]} alt={wallet.name} width={50} height={50} />
              {wallet.name}: ${wallet.balance}
            </li>
          ))
        ) : (
          <li>No wallets found</li>
        )}
      </ul>
    </div>
  );
};

export default Wallet;