'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/// Implementing all the Tasks
///Task -1 
const  display = function(arr){
  containerMovements.innerHTML = '';// Clearing all the initial values
  let  msg = 'deposit';
  for(let i=0;i<arr.length;i++){
    if(arr[i]<0){
      msg = 'withdrawal';
    }
    else{
      msg = 'deposit';
    }
    const html = `<div class="movements__row">
                  <div class="movements__type movements__type--${msg}">${i+1} ${msg}</div>
                  <div class="movements__value">${arr[i]}💲</div>
                  </div>`
    containerMovements.insertAdjacentHTML("afterbegin",html);// At every iteration adding new row into the DOM tree at specified position.
  }
  
}


//// Task -2 
//Computing Username
const userName = function(user){
  const tempName = user.toLowerCase().split(' ').map(function(name){
    return name[0];
  }).join('');
  return tempName;
}
accounts.forEach(function(account){
  account.username = userName(account.owner);
});


///Task-3
///Display Balance( using reduce method)

const displayBalance = function(acc){
  acc.balance = acc.movements.reduce(function(acc, value){
    return  acc+value;
  },0);
  labelBalance.textContent = `${acc.balance}💲`;
  //return balance;
}
const updateUI = function(acc){
  //Display movements
  display(acc.movements);

  //Display Balance
  displayBalance(acc);

  //Display Summary
  displaySummary(acc.movements);
}
///Task-3
//Display Deposits & Withdrawals

const displaySummary = function(accArr){
  const depositsArr = accArr.filter(function(val){
    return (val>0);
  });
  //Deposit
  const totalDeposits = depositsArr.reduce(function(acc,val){
    return acc+val;
  },0);
  labelSumIn.textContent = `${totalDeposits}💲`;
  const withdrawalArr = accArr.filter(function(val){
    return (val<0);
  });
  //Withdrawal
  const totalWithdrawals = withdrawalArr.reduce(function(acc,val){
    return (acc+val);
  },0);
  labelSumOut.textContent = `${Math.abs(totalWithdrawals)}💲`;
  //Interest
  const interestArr = depositsArr.map(function(val){
    return ((val*currentAccount.interestRate)/100);
  });
  const totalInterest = interestArr.reduce(function(acc,val){
    return acc+val;
  },0);
  labelSumInterest.textContent = `${totalInterest}💲`;
}

let currentAccount;
///Adding Event Handlers
btnLogin.addEventListener('click', function(e){
  e.preventDefault(); //prevent from submitting
  currentAccount = accounts.find(function(acc){
    return acc.username===inputLoginUsername.value;
  });
  if(currentAccount&&currentAccount.pin===Number(inputLoginPin.value)){

      //Display UI and message
      labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
      containerApp.style.opacity = 100;

      //Clearing input fields ( i.e. user and pin )
      inputLoginUsername.value = '';
      inputLoginPin.value = '';
      inputLoginUsername.blur();
      inputLoginPin.blur();

      //Update UI
      updateUI(currentAccount);

  }
});
//console.log(accounts);
//Implementing Transfer

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  let receiveracc = accounts.find(function(acc){
    return acc.username===inputTransferTo.value;
  });
  let amount = Number(inputTransferAmount.value);
  //console.log(receiveracc, amount);
  if(amount>0&&
    receiveracc&&
    currentAccount.balance>=amount&&receiveracc.username!==currentAccount.username){
      currentAccount.movements.push(-amount);
      receiveracc.movements.push(amount);
      updateUI(currentAccount);
      inputTransferTo.value = inputTransferAmount.value = '';
  }
});

//Closing user Account 

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  let userToDelete = accounts.find(function(acc){
    return acc.username === inputCloseUsername.value;
  });
  let userPin = accounts.find(function(acc){
    return acc.pin === Number(inputClosePin.value);
  });
  if(userToDelete&&userPin){
    let index = accounts.findIndex(function(acc){
      return acc.username===userToDelete.username;
    });
    accounts.splice(index,1);
    labelWelcome.textContent = `Log in to get started`;
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
  } 
});














































































































































///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

//Answer to Coding Challenge-1 
// const dogsAge = function(dogsJulia, dogsKate){
//   const dogsJuliaCorrected = dogsJulia.slice(0);
//   dogsJuliaCorrected.splice(0,1);
//   dogsJuliaCorrected.splice(-2,2)
//   //console.log(dogsJuliaCorrected);
//   dogsJuliaCorrected.forEach(function(dog,i){
//     if(dog>=3){
//       console.log(`Dog number ${i+1} is an adult, and is ${dog} years old`);
//     }
//     else{
//       console.log(`Dog number ${i+1} is still a puppy 🐶`);
//     }
    
//   });
//   dogsKate.forEach(function(dog,i){
//     if(dog>=3){
//       console.log(`Dog number ${i+1} is an adult, and is ${dog} years old`);
//     }
//     else{
//       console.log(`Dog number ${i+1} is still a puppy 🐶`);
//     }
    
//   });

// }
// const juliaData = [3, 5, 2, 12, 7];
// const kateData =  [4, 1, 15, 8, 3];
//dogsAge(juliaData,kateData);
////////////////////////////////////////////////////////

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
///Answer to Coding Challenge --2
// const calcAverageHumanAge = function(dog_age){
//   const new_DogAge = dog_age.map(function(age){
//     if(age<=2){
//       return 2*age;
//     }
//     return (16+(age*4));
//   });
//   console.log(new_DogAge);
//   const temp1 = new_DogAge.filter(function(age){
//     return (age>18);
//   });
//   const len = temp1.length;
//   const avgAge  = temp1.reduce(function(acc,age){
//     return acc+age;
//   },0);
//   return (avgAge/len);
// }
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

//Iteration on accounts array
//console.log(account1)
// accounts.forEach(function(acc){
//   if(acc.owner=='Jessica Davis'){
//     console.log(acc);
//   }
// });
