"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/useUserStore";

export default function LogOutBtn() {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Prevent NextAuth default redirection
    clearUser(); // Clear the user data from the store
    router.push("/login"); // Manually redirect to login page
  };

  return (
    <button onClick={handleLogout} className="py-2 w-full text-left text-red-500 font-medium rounded">
      Logout
    </button>
  );
}
