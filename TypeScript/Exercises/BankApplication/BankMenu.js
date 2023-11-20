"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bank_1 = __importDefault(require("./Bank"));
const input_1 = require("../input");
let bank = new Bank_1.default();
function displayMenu() {
    console.log();
    console.log("-------------------------------------------------------------------------------------------------------------");
    console.log("1. Create Account");
    console.log("2. Show Balance");
    console.log("3. Deposit Money");
    console.log("4. Withdraw Money");
    console.log("5. Account Information");
    console.log("6. Exit Application");
    input_1.r.question("Enter your choice :- ", (options) => {
        if (options == "1") {
            console.log("1. Saving");
            console.log("2. current");
            input_1.r.question("Which type of account you want open (1 or 2)", (accountType) => {
                if (accountType == "1") {
                    bank.createAccount("Saving");
                }
                else if (accountType = "2") {
                    bank.createAccount("Current");
                }
                else {
                    console.log("Enter the Valid Choice");
                }
            });
        }
        if (options == "2") {
            bank.showBalance();
        }
        else if (options == "3") {
            bank.depositMoney();
        }
        else if (options == "4") {
            bank.withdrawMoney();
        }
        else if (options == "5") {
            bank.accountDetails();
        }
        else if (options == "6") {
            input_1.r.close();
        }
    });
}
exports.default = displayMenu;
