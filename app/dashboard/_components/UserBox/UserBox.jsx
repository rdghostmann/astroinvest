"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, LogOut, Sparkles, BadgeCheck, Bell } from "lucide-react";
import { useFetchUser } from "@/hooks/useFetchUser";
import { useUserStore } from "@/store/userStore";
import LogOutBtn from "@/components/LogOut/LogOutBtn";

const UserBox = ({ userId }) => {
  // Trigger fetching and updating the store on mount or when userId changes.
  useFetchUser(userId);
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <div className="text-xs italic">Loading user profile…</div>;
  }

  // Extract user details for display.
  const userName = user?.username || "Guest";
  const userEmail = user?.email || "No Email";
  const userRole = user?.role || "User"; // Ensure role is available in session
  const userAvatar = user?.avatar || ""; // Fallback avatar

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="rounded-lg">{userEmail[0]}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{userName}</span>
            <span className="truncate text-xs">{userEmail}</span>
            <span className="truncate text-xs font-medium text-gray-400">
              {userRole}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="right"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="rounded-lg">{userEmail[0]}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{userName}</span>
              <span className="truncate text-xs">{userEmail}</span>
              <span className="truncate text-xs font-medium text-gray-400">
                {userRole}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <LogOutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBox;