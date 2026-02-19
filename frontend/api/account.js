export async function getUserInfo(token) {
  return await fetch("http://localhost:8080/api/account/get-user-info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateUserInfo(userInfo, token) {
  return await fetch("http://localhost:8080/api/account/update-user-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userInfo),
  });
}
