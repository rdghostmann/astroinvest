import React from 'react'
import UsersTable from '../_component/UsersTable';
import { getAllUsers } from '@/lib/actions';

export default async function page() {
  const users = await getAllUsers();

  console.log("List of users", users);
  return (
    <div>
      <UsersTable users={users} />
    </div>
  )
}
