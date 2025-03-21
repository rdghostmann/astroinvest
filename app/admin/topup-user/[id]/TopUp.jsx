'use client'
import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from '../../_component/AdminSidebar';
import { updateUserWallet } from '@/lib/actions';
import { Loader } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


const TopUp = ({ data }) => {
  const { user, wallets } = data;
  const [walletBalances, setWalletBalances] = useState(wallets.map(wallet => ({ ...wallet, newBalance: wallet.balance })));
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleBalanceChange = (walletId, newBalance) => {
    setWalletBalances(walletBalances.map(wallet => 
      wallet._id === walletId ? { ...wallet, newBalance: parseFloat(newBalance) } : wallet
    ));
  };

  const handleUpdateBalance = async (walletId) => {
    setLoading(true);
    const wallet = walletBalances.find(wallet => wallet._id === walletId);
    if (wallet) {
      await updateUserWallet(walletId, wallet.newBalance);
      toast({ title: `Balance updated for wallet: ${wallet.name}` });
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      {loading && (
        <div className="absolute w-full h-full z-[70] top-0 left-0 flex items-center justify-center bg-transparent backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <Loader className="animate-spin" size={28} color="#898080" strokeWidth={2.25} />
            <span className="mt-2 text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      )}
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    AstroInvest
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Top Up User's Wallet</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-1 p-4 pt-0">
          <h2 className="font-semibold">User Wallets</h2>
          <div className="mt-4 p-4 border rounded-lg shadow-md">
            <p className="text-lg font-semibold">Username: {user.username}</p>
            <p className="text-sm text-gray-500">Email: {user.email}</p>

            {/* Display all wallets */}
            <h3 className="mt-4 text-md font-semibold">Wallet Balances:</h3>
            <div className="mt-2 bg-gray-100 p-2 rounded-md">
              {wallets.length > 0 ? (
                <ul className="space-y-2">
                  {walletBalances.map((wallet) => (
                    <li key={wallet._id} className="p-2 border-b">
                      <p className="font-medium">{wallet.name}</p>
                      <p className="text-lg font-semibold">${wallet.balance.toLocaleString()}</p>
                      <input
                        type="number"
                        value={wallet.newBalance}
                        onChange={(e) => handleBalanceChange(wallet._id, e.target.value)}
                        className="mt-2 p-2 border rounded"
                      />
                      <button
                        className="mt-2 px-4 py-2 bg-indigo-900 text-white rounded-md"
                        onClick={() => handleUpdateBalance(wallet._id)}
                      >
                        Update Balance
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No wallets available.</p>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TopUp;

