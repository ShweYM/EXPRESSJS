user = { name: "Alex", age: 18, gender: "Male", password: 1234 };

person = { ...user, income: 1000 };
console.log(person);

function account({ name, password }) {
  return { name, password };
}

acc = account({...user});
console.log(acc);
