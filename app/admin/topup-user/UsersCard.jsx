"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';
import { CircleCheck, CircleX, Loader } from 'lucide-react';

const UsersCard = ({ users, kycRecords }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
  }, [kycRecords]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const getKycStatus = (userId) => {
    const kycRecord = kycRecords.find(record => record.user_id === userId);
    return kycRecord ? kycRecord.status : false;
  };

  const handleViewWallet = (userId) => {
    setLoading(true);
    router.push(`/admin/topup-user/${userId}`);
  };

  return (
    <div>
      {loading && (
        <div className="absolute w-full h-full z-[70] top-0 left-0 flex items-center justify-center bg-transparent backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <Loader className="animate-spin" size={28} color="#898080" strokeWidth={2.25} />
            <span className="mt-2 text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 mb-4">
        <h2 className="text-lg font-semibold">Users Listing</h2>

        <Input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-2 border rounded"
        />
      </div>

      <ul className="grid grid-cols-1 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user._id} className="flex flex-col sm:flex-row justify-between gap-x-6 py-5 border rounded-lg shadow-md px-6">
              <div className="flex min-w-0 gap-x-4">
                <Avatar className="h-12 w-12 rounded-full bg-gray-50">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="rounded-full">{user.username[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                  <p className="mt-1 truncate text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-end mt-4 sm:mt-0">
                <div className="sm:mr-4">
                  <p className="text-sm text-gray-900">{user.walletAddress}</p>
                  <p className="mt-1 text-xs text-gray-500 flex items-center">
                    {getKycStatus(user._id) ? (
                      <span className="text-green-500 flex items-center"><CircleCheck className="mr-1" color="#0d8505" />Verified</span>
                    ) : (
                      <span className="text-gray-500 flex items-center"><CircleX className="mr-1" color="#b60c0c" />Unverified</span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => handleViewWallet(user._id)}
                  className='border border-blue-500 rounded text-xs/3 p-1 mt-2 sm:mt-0 sm:ml-4 sm:self-end'
                >
                  <span className="text-blue-500">View Wallet</span>
                </button>
              </div>
            </li>
          ))
        ) : (
          <div>No users found</div>
        )}
      </ul>
    </div>
  );
};

export default UsersCard;