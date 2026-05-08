export async function getUserInfo(token) {
  return await fetch("/api/gateway/api/account/get-user-info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getUserAccount(token) {
  return await fetch("/api/gateway/api/account/get-user-account", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateUserInfo(userInfo, token) {
  return await fetch("/api/gateway/api/account/update-user-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userInfo),
  });
}

export async function updateUserAccount(userAccount, token) {
  return await fetch("/api/gateway/api/account/update-user-account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userAccount),
  });
}
