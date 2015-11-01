/**
 * Created by sullrich on 01.11.15.
 */

var tab = require('./index');
var chalk = require('chalk');

var employees = [
    { "first name": "John", "last name": "Doe", active: true },
    { "first name": "Anna", "last name": "Smith", active: false },
    { "first name": "Peter", "last name": "Jones", active: true }
];

console.table(employees, "llr", [
    chalk.gray, // make first names gray
    chalk.bold, // make last names bold
    function (value) {
        // Print Yes/No if employee is active
        return value ? "Yes" : "No"
    }
]);
