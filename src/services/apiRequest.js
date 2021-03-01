const url = process.env.NEXT_PUBLIC_API_URL;
export async function loadUsers() {
  console.log("aaa", process.env.DATABASE_URL);
  const response = await fetch(url + "/users/");
  let apiData = await response.json();
  return apiData;
}
export async function loadUsersById(userId) {
  const response = await fetch(url + "/user/" + userId);
  return await response.json();
}
export async function deleteUserById(userId) {
  const response = await fetch(`${url}/user/${userId}`, {
    method: "delete",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  });
}
export async function updateUserById(userId, userData) {
  const response = await fetch(`${url}/user/${userId}`, {
    method: "put",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(userData),
  });
}
export async function createUser(userData) {
  const response = await fetch(`${url}/users/`, {
    method: "post",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(userData),
  });
}
