"use client";

import { getAllUsers } from "@/lib/actions";
import { useState, useEffect } from "react";
import axios from "axios";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      // const { data } = await axios.get("/api/FetchUserData");
      try {
        const users = await getAllUsers(); // Call server action
        console.log("FetchedUsers:", users)
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, [setUsers]);
  return !users ? <p>Loading users...</p> : (

    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <div className="overflow-x-auto">
        <div className="w-full min-w-xs mx-auto px-0 lg:px-10 ">
          <div className="rounded-t-lg overflow-x-auto border">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-700 hover:bg-gray-800/50">
                  <TableHead className="text-white">Username</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Wallet Balance</TableHead>
                  <TableHead className="text-white">Total Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.userID} className="hover:bg-blue-950/50">
                      <TableCell className="text-gray-600">{user.username}</TableCell>
                      <TableCell className="text-gray-600">{user.email}</TableCell>
                      <TableCell className="text-gray-600">${user.walletBalance}</TableCell>
                      <TableCell className="text-gray-600">${user.profitTotal}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="4" className="py-4 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

        </div>
      </div>
    </div>
  )
}
