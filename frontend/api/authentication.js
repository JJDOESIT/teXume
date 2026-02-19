export async function login(username, password) {
  return await fetch("http://localhost:8080/api/authentication/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
}

export async function signUp(username, password, firstName, lastName) {
  return await fetch("http://localhost:8080/api/authentication/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    }),
  });
}

export async function signUpGuest(userInfo) {
  return await fetch("http://localhost:8080/api/authentication/sign-up-guest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userInfoModel: userInfo,
    }),
  });
}

export async function isLoggedIn(token) {
  return await fetch("http://localhost:8080/api/authentication/is-logged-in", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
