export function getUserRole() {
    return sessionStorage.getItem("userRole") || null;
  }