"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

  return (
    <div>
      <h2 className="font-semibold">Users Card</h2>
      <input
        type="text"
        placeholder="Search by username or email"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded"
      />
      <ul className="grid grid-cols-1 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user._id} className="flex justify-between gap-x-6 py-5 border rounded-lg shadow-md">
              <div className="flex min-w-0 gap-x-4">
                <Image
                  className="size-12 flex-none rounded-full bg-gray-50"
                  src={user.avatar || "https://via.placeholder.com/50"}
                  alt={user.username}
                  width={50}
                  height={50}
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                  <p className="mt-1 truncate text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm text-gray-900">{user.walletAddress}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {user.isVerified ? (
                    <span className="text-green-500">Verified</span>
                  ) : (
                    <span className="text-gray-500">Unverified</span>
                  )}
                </p>
                <Link href={`/admin/users/${user._id}`}>
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