// Set the token and user from the local storage
export const setUserSession = (token, idInstance) => {
  sessionStorage.setItem('token', JSON.stringify(token));
  sessionStorage.setItem('idInstance', JSON.stringify(idInstance));
}

// Get the user data from the local storage
export const getIdInstance = () => {
  const idStr = sessionStorage.getItem('idInstance');
  if (idStr) return JSON.parse(idStr);
  else return null;
}

// Get the token from the local storage
export const getToken = () => {
  const tokenStr = sessionStorage.getItem('token');
  if (tokenStr) return JSON.parse(tokenStr);
  else return null;
}

// Set the array of contacts
export const setContacts = (contacts) => {
  sessionStorage.setItem('contacts', JSON.stringify(contacts));
}

// Get the array of contacts
export const getContacts = () => {
  return JSON.parse(sessionStorage.getItem('contacts') || '{}');
}

// Remove the token, the user and the array of contacts from the local storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('idInstance');
  sessionStorage.removeItem('contacts');
}

// Remove the contact in order to add another one
export const removeContact = () => {
  sessionStorage.removeItem('contacts');
}
