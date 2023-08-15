
export const hasLoggedIn10DaysBack = (lastLogin) => {

  const currentLogin = Date.now();

  const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  // Calculate the difference in milliseconds between the two epochs
  const timeDifference = Math.abs(currentLogin - lastLogin);

  // Calculate the number of days by dividing the time difference by the number of milliseconds in a day
  const daysDifference = Math.floor(timeDifference / millisecondsPerDay);
  return daysDifference > 10;
};
