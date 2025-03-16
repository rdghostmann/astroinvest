"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

const UsersTable = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

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
      <div className="grid grid-col-2 mb-4">
        <h2 className="text-lg font-semibold">Users Lisiting</h2>

        <Input
          type="text"
          placeholder="Search by username, email, or phone"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-2 border rounded"
        />
      </div>
      <div className="grid grid-col-1">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="rounded-t-lg overflow-x-auto border">
                <Table className="min-w-full text-start text-sm font-light">
                  <TableHeader>
                    <TableRow className="border-b border-neutral-200 bg-blue-950/50 hover:bg-blue-900/50">
                      <TableHead className="text-blue-100 px-6 py-4">#</TableHead>
                      <TableHead className="text-blue-100 px-6 py-4">Username</TableHead>
                      <TableHead className="text-blue-100 px-6 py-4">Email</TableHead>
                      <TableHead className="text-blue-100 px-6 py-4">Phone</TableHead>
                      <TableHead className="text-blue-100 px-6 py-4">Country</TableHead>
                      <TableHead className="text-blue-100 px-6 py-4">State</TableHead>
                      <TableHead className="text-blue-100 px-6 py-4">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <TableRow key={user._id} className="border-b border-neutral-200 hover:bg-blue-900/20">
                          <TableCell className="text-gray-600 px-6 py-4">{index + 1}</TableCell>
                          <TableCell className="text-gray-600 px-6 py-4">{user.username}</TableCell>
                          <TableCell className="text-gray-600 px-6 py-4">{user.email}</TableCell>
                          <TableCell className="text-gray-600 px-6 py-4">{user.phone}</TableCell>
                          <TableCell className="text-gray-600 px-6 py-4">{user.country}</TableCell>
                          <TableCell className="text-gray-600 px-6 py-4">{user.state}</TableCell>
                          <TableCell className="text-gray-600 px-6 py-4">{user.role}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="7" className="text-center text-gray-600 px-6 py-4">No users found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;