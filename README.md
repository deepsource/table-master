# table-master

[![deepsource crafted](http://cdn.deepsource.de/svg/deepsource-crafted.svg)](http://deepsource.de)

Brings extended log.table functionality to command line interfaces. This module supports *alignment*, *colours*, 
and *pre processors*.

## The basic console.table 

After requiring the module, the extended `console.table` functionality will be available. `console.table` will 
accept the following paramters: `console.table(array, alignment, preProcessors)`:

 - `array`, the array containing the JSON objects to be printed out
 - `alignment`, the string, indication the alignment of each row
 - `preProcessors`, an array of pre processor functions

```javascript
var tab = require('table-master');

var employees = [
    { "first name": "John", "last name": "Doe", "id": "2843650281034552", value: true },
    { "first name": "Anna", "last name": "Smith", "id": "0948736125247932", value: true },
    { "first name": "Peter", "last name": "Jones", "id": "7524535987721431", value: true }
];

console.table(employees);
```

![Example 1](https://raw.githubusercontent.com/deepsource/table-master/master/samples/ex1.png)

## Colour support

table-master supports colour modules like `chalk`.

```javascript
var tab = require('table-master');

var employees = [
    { "first name": chalk.red("John"), "last name": "Doe", "id": "2843650281034552", value: true },
    { "first name": "Anna", "last name": "Smith", "id": "0948736125247932", value: true },
    { "first name": "Peter", "last name": "Jones", "id": "7524535987721431", value: true }
];

console.table(employees);
```

![Example 2](https://raw.githubusercontent.com/deepsource/table-master/master/samples/ex2.png)

## Alignment

You can align the values of the table. Available options are *(r)ight*, *(l)eft* or *(c)enter*.

```javascript
var tab = require('table-master');

var employees = [
    { "first name": chalk.red("John"), "last name": "Doe", "id": "2843650281034552", value: true },
    { "first name": "Anna", "last name": "Smith", "id": "0948736125247932", value: true },
    { "first name": "Peter", "last name": "Jones", "id": "7524535987721431", value: true }
];

console.table(employees, "lclr"); // Yes, I'm a LaTeX guy :)
```

![Example 3](https://raw.githubusercontent.com/deepsource/table-master/master/samples/ex3.png)

## Pre processors

You can use powerful pre processors to modify the result/look of your table output.

```javascript
var tab   = require('table-master');
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
```

![Example 4](https://raw.githubusercontent.com/deepsource/table-master/master/samples/ex4.png)

## Default settings 

You can modify the spacing of the output by overriding the default settings:

 - `indent`, indentation at the begin of each line
 - `rowSpace`, spacing between the columns
 
 ```javascript
 var tab   = require('table-master');
 
 tab.setDefaults({
    indent  : 3, // indentation at the begin of each line
    rowSpace: 1  // spacing between the columns
 }); 
 ```
