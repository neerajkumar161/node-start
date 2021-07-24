const promise = new Promise((resolve, reject) => {
  const value = 'Promise Resolved/ Accepted';
  const rejectedValue = 'Promise reject';
  //   resolve(value);
  reject(rejectedValue);
});

promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

const users = [
  { firstName: 'Neeraj', lastName: 'Kumar', age: 26 },
  { firstName: 'Neeraj', lastName: 'Kumar', age: 72 },
  { firstName: 'Rohit', lastName: 'Kumar', age: 56 },
  { firstName: 'Anjali', lastName: 'Kumar', age: 26 },
];

//Output: { 26: 2, 72: 1, 56: 1}

// const res = users.reduce((acc, curr) => {
//   console.log(acc[curr.age], curr.age);
//   if (acc[curr.age]) acc[curr.age] += acc[curr.age];
//   else acc[curr.age] = 1;
//   return acc;
// }, {});

// const output = users.reduce((acc, curr) => {
//   console.log(acc, curr);
//   if (curr.age > 30) acc.push(curr.firstName);
//   return acc;
// }, []);

const output = users.filter((el) => el.age > 30).map((el) => el.firstName);
console.log(output);
