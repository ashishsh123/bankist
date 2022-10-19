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

/////////////////////////////////////////////////////////////////////////////////////////////////////////

//Bankist Application starts From here//

///////////////////////////////////////////Adding Movements///////////////b/////////////////////////////////////////

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  <div class="movements__value">${mov}€</div>
</div>`;
    // const containerMovements = document.querySelector('.movements'); from here containerMovement has arrived
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const updateUI = function (acc) {
  //Display movement
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);

  //Display Summary
  calcDisplaySummary(acc);
  //
};
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

/////////////////////////////////Calculating Balance//////////////////////////////////////////////////////////////

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const createUserNames = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

////////////////////////////////////////Calculating Summary///////////////////////////////////////////////////////
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposite => (deposite * acc.interestRate) / 100)
    .filter((int, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

///////////////////////////////////////////Implementing Login//////////////////////////////////////////////////////

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display message

    labelWelcome.textContent = `welcome back , ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    //clearing input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Update UI

    updateUI(currentAccount);
  }
});
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

//////////////////////////////////Implementing Transfer/////////////////////////////////////////////////////////////////

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.userName !== currentAccount.userName
  ) {
    //doing the transfer

    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    //Update UI

    updateUI(currentAccount);
  }
});

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

///////////////////////////////////////////Amount Loan//////////////////////////////////////////////////////////

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    //update UI

    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

///////////////////////////////////////////Close Account//////////////////////////////////////////////////////////

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    //delete account
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';

  labelWelcome.textContent = `Log in to get started`;
});

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// 1. -----------------forEach() Array method----------------------------
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach((movement, i, arr) => {
//   if (movement > 0) {
//     console.log(`Movements ${i + 1} : You deposite ${movement}`);
//   } else {
//     console.log(`Movements ${i + 1} : You withdrew ${Math.abs(movement)}`);
//   }
// });
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const convertToUSD = 1.1;
// const movementsUSD = movements.map(mov => mov * convertToUSD);
// console.log(movements);
// console.log(movementsUSD);

// const mapping = movements.map(
//   (mov, i) =>
//     `Movements ${i + 1} : You ${mov > 0 ? 'deposite' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(mapping);
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const reduce = movements.reduce((acc, curr, i, arr) => acc + curr, 0);
// console.log(reduce);
