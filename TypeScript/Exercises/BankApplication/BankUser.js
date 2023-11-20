"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerDetail {
    constructor(accountType, email, accountNo, name, location, state, country, balance, age) {
        this.accountNo = accountNo,
            this.name = name,
            this.location = location,
            this.state = state,
            this.country = country,
            this.balance = balance;
        this.age = age;
        this.email = email;
        this.accountType = accountType;
    }
}
exports.default = CustomerDetail;
