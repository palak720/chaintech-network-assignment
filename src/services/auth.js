 // LocalStorage-based user auth — for demo only (no backend)

const USERS_KEY = "users";
const SESSION_KEY = "session";

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register(user) {
  const users = getUsers();
  if (users.find((u) => u.email === user.email))
    throw new Error("Email already exists");
  users.push(user);
  saveUsers(users);
}

export function login({ email, password }) {
  const users = getUsers();
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) throw new Error("Invalid email or password");
  localStorage.setItem(SESSION_KEY, email);
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  const users = getUsers();
  return users.find((u) => u.email === email) || null;
}

export function updateUser(updatedUser) {
  const users = getUsers();
  const index = users.findIndex((u) => u.email === updatedUser.email);
  if (index === -1) throw new Error("User not found");
  users[index] = updatedUser;
  saveUsers(users);
}
