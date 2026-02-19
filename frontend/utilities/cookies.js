"use server";

import { cookies } from "next/headers";

// Create a cookie
export async function setCookie(name, value) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: name,
    value: value,
    httpOnly: true,
  });
}

// Get a cookie
export async function getCookie(name) {
  const cookieStore = await cookies();
  return cookieStore.get(name);
}

// Delete a cookie
export async function deleteCookie(name) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
