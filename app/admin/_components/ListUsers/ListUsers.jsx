"use client";

import { getAllUsers } from "@/lib/actions";
import { useState, useEffect } from "react";
import axios from "axios";

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
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">Userame</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Wallet Balance</th>
              <th className="py-2 px-4 text-left">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userID} className="border-b">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">${user.walletBalance}</td>
                  <td className="py-2 px-4">${user.totalPrice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
