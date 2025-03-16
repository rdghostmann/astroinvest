"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const UsersCard = ({users}) => {

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
      <div className="grid grid-cols-1 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="flex items-center gap-4 p-4 border rounded-lg shadow-md">
              <div className="flex flex-col">
                <span className="font-semibold">Username: {user.username}</span>
                <span>Email: {user.email}</span>
                <span>Wallet Address: {user.walletAddress}</span>
                <span>Profit Total: ${user.profitTotal}</span>
                <span>Role: {user.role}</span>
                <span>Verified: {user.isVerified ? 'Yes' : 'No'}</span>
                <Link href={`/admin/users/${user._id}`}>
                  <a className="text-blue-500">View Wallet</a>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No users found</div>
        )}
      </div>
    </div>
  );
};

export default UsersCard;