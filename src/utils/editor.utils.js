export const count_occur = (str) => {
  // checking string is valid or not
  if (str.length == 0) {
    console.log("Invalid string");
    return;
  }
  //cor loop to iterate over string
  let response = [];
  for (let i = 0; i < str.length; i++) {
    //variable counting occurrence
    let count = 0;

    for (let j = 0; j < str.length; j++) {
      if (str[i] == str[j] && i > j) {
        break;
      }
      if (str[i] == str[j]) {
        count++;
      }
    }
    if (count > 0 && str[i] !== "\n") {
      response.push({
        str: str[i],
        count,
      });
    }
  }
  return response;
};
