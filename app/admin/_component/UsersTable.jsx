"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { updateUserRole } from '@/lib/actions'; // Import the function to update user role
import { useToast } from "@/hooks/use-toast";

const UsersTable = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const { toast } = useToast();
  

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

  const handleRoleChange = async (userId, newRole) => {
    await updateUserRole(userId, newRole);
    // Update the user's role in the local state
    setFilteredUsers(filteredUsers.map(user => 
      user._id === userId ? { ...user, role: newRole } : user
    ));
    toast({ title: `User role updated to ${newRole}` });

  };

  return (
    <div>
      <div className="grid grid-cols-2 mb-4">
        <h2 className="text-lg font-semibold">Users Listing</h2>

        <Input
          type="text"
          placeholder="Search by username, email, or phone"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div key={user._id} className="p-4 border rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900">User #{index + 1}</h3>
              </div>
              <p className="text-sm text-gray-600"><strong>Username:</strong> {user.username}</p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
              <p className="text-sm text-gray-600"><strong>Phone:</strong> {user.phone}</p>
              <p className="text-sm text-gray-600"><strong>Country:</strong> {user.country}</p>
              <p className="text-sm text-gray-600"><strong>State:</strong> {user.state}</p>
              <p className="text-sm text-gray-600"><strong>Role:</strong> 
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="ml-2 p-1 border rounded"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </p>
              <p className="text-sm text-gray-600"><strong>Email Verification:</strong> {user.isVerified ? 'Verified' : 'Not Verified'}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 p-4">No users found</div>
        )}
      </div>
    </div>
  );
};

export default UsersTable;