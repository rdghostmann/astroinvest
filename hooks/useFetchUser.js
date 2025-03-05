// app/hooks/useFetchUser.js
"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import fetchUser from "@/controllers/FetchUserData";

export function useFetchUser() {
  const { toast } = useToast();
  const setUser = useUserStore((state) => state.setUser);

  // useEffect(() => {
  //   async function getUser() {
  //     try {
  //       const user = await fetchUser(); // Call the Server Action directly
  //       if (user) {
  //         setUser(user);
  //       } else {
  //         toast({ title: "User unauthorized" });
  //       }
  //     } catch (error) {
  //       toast({ title: "Oops error occured" });
  //     } 
  //   }
  //   getUser();

  // }, [setUser, toast]);

  useEffect(() => {
    async function fetchUser() {
      try {
        // Adjust the URL below if your API route path is different.
        const { data } = await axios.get("/api/FetchUserData");
        setUser(data);
      } catch (error) {
        toast({ title: "Check Internet Connection!" });
      }
    }
    fetchUser();
  }, [setUser, toast]);
}
