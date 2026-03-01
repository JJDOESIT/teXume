export async function add(name, token) {
  return await fetch("http://localhost:8080/api/template/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
    }),
  });
}

export async function getAll() {
  return await fetch("http://localhost:8080/api/template/get-all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function initialize(name) {
  return await fetch("http://localhost:8080/api/template/initialize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });
}

export async function compile(userInfoModel, session) {
  return await fetch("http://localhost:8080/api/template/compile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session: session,
      userInfoModel: userInfoModel,
    }),
  });
}

export async function hideSection(section, session) {
  return await fetch("http://localhost:8080/api/template/hide-section", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session: session,
      section: section,
    }),
  });
}

export async function unhideSection(section, session) {
  return await fetch("http://localhost:8080/api/template/unhide-section", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session: session,
      section: section,
    }),
  });
}

export async function swapMultipleSections(section, targets, session) {
  return await fetch(
    "http://localhost:8080/api/template/swap-multiple-sections",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: session,
        section: section,
        targets: targets,
      }),
    },
  );
}
