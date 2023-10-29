

    export const setUserId = (userId) => {
  localStorage.setItem('userId', userId);
};

// Get the user ID from local storage
export const getUserId = () => {
  return localStorage.getItem('userId');
};

// Remove the user ID from local storage
export const removeUserId = () => {
  localStorage.removeItem('userId');
};
