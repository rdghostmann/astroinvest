"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';
import { CircleCheck, CircleX } from 'lucide-react';

const UsersCard = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  console.log("Listing users:", users);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search by username or email"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded"
      />
      <ul className="grid grid-cols-1 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user._id} className="flex justify-between gap-x-6 py-5 border rounded-lg shadow-md px-6">
              <div className="flex min-w-0 gap-x-4">
                <Avatar className="h-12 w-12 rounded-full bg-gray-50">
                  <AvatarImage src={user.avatar || "https://via.placeholder.com/50"} alt={user.username} />
                  <AvatarFallback className="rounded-full">{user.username[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                  <p className="mt-1 truncate text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm text-gray-900">{user.walletAddress}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {user.isVerified ? (
                    <span className="text-green-500"><CircleCheck color="#0d8505" /></span>
                  ) : (
                    <span className="text-gray-500"><CircleX color="#b60c0c" /></span>
                  )}
                </p>
                <Link href={`/admin/topup-user/${user._id}`}>
                  <span className="mt-2 text-blue-500">View Wallet</span>
                </Link>
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