export function createCustomId(date, name) {
  let dateParts = date.toString().split(' ');

  let dayOfWeek = dateParts[0];
  let month = dateParts[1];
  let dayOfMonth = parseInt(dateParts[2]);
  let year = parseInt(dateParts[3]);
  let seconds = dateParts[4].split(':')[2];
  let first3letters = name.split('').slice(0, 3).join('');

  // Perform the required operations
  let dayTimesTwo = dayOfMonth * 2;

  let id = `${seconds}${first3letters}${dayOfMonth}${dayOfWeek}${dayTimesTwo}${month}${year}`;
  return id;
}
