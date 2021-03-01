export async function loadUsers() {
  const response = await fetch("http://localhost:3000/api/users/");
  let apiData = await response.json();
  return apiData;
}
export async function loadUsersById(userId) {
  const response = await fetch("http://localhost:3000/api/user/" + userId);
  return await response.json();
}
export async function deleteUserById(userId) {
  const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
    method: "delete",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  });
}
export async function updateUserById(userId, userData) {
  const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
    method: "put",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(userData),
  });
}
export async function createUser(userData) {
  const response = await fetch(`http://localhost:3000/api/users/`, {
    method: "post",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(userData),
  });
}
