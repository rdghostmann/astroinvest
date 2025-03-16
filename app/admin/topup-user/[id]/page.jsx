"use client";
import React, { useState } from 'react';
import { getUserById, updateUserWallet } from '@/lib/actions'; // Import the server actions
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const UserWalletPage = async ({ params }) => {
  const { id } = params;
  const user = await getUserById(id); // Fetch user by ID

  const [wallets, setWallets] = useState(user.wallets);

  const handleUpdate = async (walletId, newBalance) => {
    await updateUserWallet(walletId, newBalance);
    const updatedWallets = wallets.map((wallet) =>
      wallet._id === walletId ? { ...wallet, balance: newBalance } : wallet
    );
    setWallets(updatedWallets);
  };

  return (
    <div>
      <h2 className="font-semibold">User Wallets</h2>
      <ul role="list" className="grid grid-cols-1 gap-4 divide-y divide-gray-100">
        {wallets.map((wallet) => (
          <li key={wallet._id} className="flex items-center gap-4 p-4 border rounded-lg shadow-md">
            <div className="flex justify-between gap-x-6 py-5">
              <span className="font-semibold">{wallet.name}</span>
              <span>Balance: ${wallet.balance}</span>
              <Input
                type="number"
                value={wallet.balance}
                onChange={(e) => handleUpdate(wallet._id, e.target.value)}
                className="mt-2 p-2 border rounded"
              />
              <Button
                onClick={() => handleUpdate(wallet._id, wallet.balance)}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Update Balance
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserWalletPage;