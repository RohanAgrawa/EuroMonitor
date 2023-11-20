"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BankMenu_1 = __importDefault(require("./BankMenu"));
const input_1 = require("../input");
const BankUser_1 = __importDefault(require("./BankUser"));
let accountInformation = new Map();
class Bank {
    createAccount(accountMode) {
        function saveUserDetail(modeOfAccount, email, location, name, state, country, age) {
            const genrateAccNo = Math.random() * 10000000000000;
            if (modeOfAccount == "Saving") {
                const genrateAccNoSaving = "Sav" + Math.round(genrateAccNo);
                input_1.r.question("Enter Inital Amount to deposit in Saving Account :- ", (amt) => {
                    if (parseInt(amt) < 500) {
                        input_1.r.question("Enter minimum 500 balance for Account open :-", (depositAmount) => {
                            if (parseInt(depositAmount) < 500) {
                                console.log("Account cannot be open because amount is less than 500");
                                (0, BankMenu_1.default)();
                            }
                            else {
                                let customer = new BankUser_1.default(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(depositAmount), age);
                                console.log(customer);
                                accountInformation.set(genrateAccNoSaving.toLowerCase(), customer);
                                (0, BankMenu_1.default)();
                            }
                        });
                    }
                    else {
                        let customer = new BankUser_1.default(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(amt), age);
                        console.log(customer);
                        accountInformation.set(genrateAccNoSaving.toLowerCase(), customer);
                        (0, BankMenu_1.default)();
                    }
                });
            }
            else {
                const genrateAccNoSaving = "Curr" + Math.round(genrateAccNo);
                input_1.r.question("Enter Inital Amount to deposit in Current Account :- ", (amt) => {
                    if (parseInt(amt) < 500) {
                        input_1.r.question("Enter minimum 1000 balance for Account open :-", (depositAmount) => {
                            if (parseInt(depositAmount) < 500) {
                                console.log("Account cannot be open because amount is less than 500");
                                (0, BankMenu_1.default)();
                            }
                            else {
                                let customer = new BankUser_1.default(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(depositAmount), age);
                                console.log(customer);
                                accountInformation.set(genrateAccNoSaving.toLowerCase(), customer);
                                (0, BankMenu_1.default)();
                            }
                        });
                    }
                    else {
                        let customer = new BankUser_1.default(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(amt), age);
                        console.log(customer);
                        accountInformation.set(genrateAccNoSaving.toLowerCase(), customer);
                        (0, BankMenu_1.default)();
                    }
                });
            }
        }
        function userInfo(name, age, modeOfAccount) {
            input_1.r.question("Enter your location :-", (location) => {
                input_1.r.question("Enter your state :-", (state) => {
                    input_1.r.question("Enter your country :-", (country) => {
                        input_1.r.question("Enter your email :-", (email) => {
                            let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                            if (!mailFormat.test(email)) {
                                input_1.r.question("Enter valid email : - ", (newEmail) => {
                                    if (!mailFormat.test(newEmail)) {
                                        console.log("Entered Worng email again ... process again");
                                        (0, BankMenu_1.default)();
                                    }
                                    else {
                                        saveUserDetail(modeOfAccount, newEmail, location, name, state, country, age);
                                    }
                                });
                            }
                            else {
                                saveUserDetail(modeOfAccount, email, location, name, state, country, age);
                            }
                        });
                    });
                });
            });
        }
        input_1.r.question("Enter your name :-", (name) => {
            input_1.r.question("Enter your age :-", (age) => {
                if (parseInt(age) > 68 || parseInt(age) < 18) {
                    input_1.r.question("Enter correct age between 18 to 68 :- ", (newAge) => {
                        if (parseInt(newAge) > 68 || parseInt(newAge) < 18) {
                            console.log("Wrong age entered ... process again");
                            (0, BankMenu_1.default)();
                        }
                        else {
                            userInfo(name, parseInt(newAge), accountMode);
                        }
                    });
                }
                else {
                    userInfo(name, parseInt(age), accountMode);
                }
            });
        });
    }
    depositMoney() {
        input_1.r.question("Enter account number for money Deposit :- ", (accNumber) => {
            const accountNumber = accNumber.toLowerCase();
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                (0, BankMenu_1.default)();
            }
            else {
                input_1.r.question("Enter Amount to Deposit :- ", (amount) => {
                    if (parseInt(amount) >= 1) {
                        accountInformation.get(accountNumber).balance = accountInformation.get(accountNumber).balance + (parseInt(amount));
                        console.log("update Amount in Account " + accountNumber + " : - $" + accountInformation.get(accountNumber).balance);
                        (0, BankMenu_1.default)();
                    }
                    else {
                        console.log("Enter valid Amount to Deposit");
                        (0, BankMenu_1.default)();
                    }
                });
            }
        });
    }
    withdrawMoney() {
        input_1.r.question("Enter account number for money withdraw :- ", (accNumber) => {
            const accountNumber = accNumber.toLowerCase();
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                (0, BankMenu_1.default)();
            }
            else {
                input_1.r.question("Enter Amount to Withdraw :- ", (amountWithdraw) => {
                    if (parseInt(amountWithdraw) >= 1) {
                        const balanceInAccount = accountInformation.get(accountNumber).balance;
                        const typeofAccount = accountInformation.get(accountNumber).accountType;
                        const remainingBalance = balanceInAccount - parseInt(amountWithdraw);
                        if (typeofAccount == "Saving") {
                            if (remainingBalance < 500) {
                                console.log("Enter valid amount to withdraw from saving account minimum balance should be 500");
                            }
                            else {
                                accountInformation.get(accountNumber).balance = remainingBalance;
                                console.log("After Withdraw money reamining blance in account :- " + accountNumber + " $" + accountInformation.get(accountNumber).balance);
                            }
                        }
                        else {
                            if (remainingBalance < 1000) {
                                console.log("Enter valid amount to withdraw from current account minimum balance should be 1000");
                            }
                            else {
                                accountInformation.get(accountNumber).balance = remainingBalance;
                                console.log("After Withdraw money reamining blance in account :- " + accountNumber + " $" + accountInformation.get(accountNumber).balance);
                            }
                        }
                        (0, BankMenu_1.default)();
                    }
                });
            }
        });
    }
    showBalance() {
        input_1.r.question("Enter account number for balance check :- ", (accNumber) => {
            const accountNumber = accNumber.toLowerCase();
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                (0, BankMenu_1.default)();
            }
            else {
                console.log(accountInformation.get(accountNumber).balance);
                (0, BankMenu_1.default)();
            }
        });
    }
    accountDetails() {
        input_1.r.question("Enter Account Number for Details :- ", (accNumber) => {
            const accountNumber = accNumber.toLowerCase();
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                (0, BankMenu_1.default)();
            }
            else {
                let accountDetails = accountInformation.get(accountNumber);
                console.log("Customer Name :- " + accountDetails.name);
                console.log("Customer Name :- " + accountDetails.email);
                console.log("Customer Account Type :- " + accountDetails.accountType);
                console.log("Balance in Account :- " + accountDetails.balance);
                (0, BankMenu_1.default)();
            }
        });
    }
}
exports.default = Bank;
