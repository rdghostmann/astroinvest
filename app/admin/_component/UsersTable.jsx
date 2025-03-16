"use client";
import React, { useState } from 'react';
import { getAllUsers } from '@/lib/actions'; // Import the server action

const UsersTable = async () => {
  const users = await getAllUsers(); // Fetch all users

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div>
      <h2 className="font-semibold">Users List</h2>
      <input
        type="text"
        placeholder="Search by username, email, or phone"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded"
      />
      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="rounded-t-lg overflow-x-auto border">
              <table className="min-w-full text-start text-sm font-light">
                <thead>
                  <tr className="border-b border-neutral-200 bg-blue-950/50 hover:bg-blue-900/50">
                    <th className="text-blue-100 px-6 py-4">#</th>
                    <th className="text-blue-100 px-6 py-4">Username</th>
                    <th className="text-blue-100 px-6 py-4">Email</th>
                    <th className="text-blue-100 px-6 py-4">Phone</th>
                    <th className="text-blue-100 px-6 py-4">Country</th>
                    <th className="text-blue-100 px-6 py-4">State</th>
                    <th className="text-blue-100 px-6 py-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr key={user._id} className="border-b border-neutral-200 hover:bg-blue-900/20">
                        <td className="text-gray-600 px-6 py-4">{index + 1}</td>
                        <td className="text-gray-600 px-6 py-4">{user.username}</td>
                        <td className="text-gray-600 px-6 py-4">{user.email}</td>
                        <td className="text-gray-600 px-6 py-4">{user.phone}</td>
                        <td className="text-gray-600 px-6 py-4">{user.country}</td>
                        <td className="text-gray-600 px-6 py-4">{user.state}</td>
                        <td className="text-gray-600 px-6 py-4">{user.role}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-gray-600 px-6 py-4">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;