/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Sebastian Ullrich
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var _     = require('lodash');
var chalk = require('chalk');

/**
 * Default (white)space constant.
 *
 * @type {string}
 */
var SPACE = "\u0020";

/**
 * The default settings.
 *
 * @type {{indent: number, rowSpace: number}}
 */
var defaultSettings = {
    indent  : 3,
    rowSpace: 1
};

/**
 * Function to overload the default settings.
 *
 * @param newDefaults The new default settings.
 */
var setDefaults = function (newDefaults) {
    defaultSettings = newDefaults;
};

/**
 * Creates an empty string with the specified length.
 *
 * @param {number} length The length of the string.
 * @returns {string} The string with the specified length.
 */
function emptyString (length) {
    return Array(++length).join(SPACE);
}

/**
 * Removes all colour commands from a given string.
 *
 * @param str The string to be cleaned.
 * @returns {string} The cleaned string.
 */
function cleanString (str) {
    return chalk.stripColor(str.toString());
}

/**
 * Returns all keys for a given object.
 *
 * @param objArray Object to get the keys of.
 * @returns {*} Array, containing all keys as string values.
 */
function getAllKeys (objArray) {
    var keys = [];
    _.forEach(objArray, function (row) {
        keys = keys.concat(Object.keys(row))
    });
    return _.union(keys);
}

/**
 * Determines the longest value for each key.
 *
 * @param keys The keys of the objects within the array.
 * @param objArray The object array.
 * @returns {Object} JSON object containing the max length for each key.
 */
function getMaxLength (keys, objArray) {
    var maxRowLength = {};
    _.forEach(keys, function (key) {
        maxRowLength[key] = cleanString(key).length;
    });

    _.forEach(objArray, function (objRow) {
        _.forEach(objRow, function (val, key) {
            var rowLength = cleanString(val).length;
            if (maxRowLength[key] < rowLength) {
                maxRowLength[key] = rowLength;
            }
        });
    });

    return maxRowLength;
}

/**
 * Trims/extends a given string to the specified length.
 * If string is too long it will be trimmed with elepsies.
 *
 * @param str The string to be trimmed/extended
 * @param length The desired length of the string
 * @param format The align of the string, whether (l)eft, (r)ight or (c)enter aligned.
 * @returns {string} The trimmed/extended and aligned string.
 */
function toLength (str, length, format) {
    if (!str) {
        return emptyString(length);
    }
    var newStr = str.toString();
    var diff   = cleanString(str).length - length;
    if (diff < 0) {
        diff *= -1;
    }
    if (!format || format === "l") {
        newStr = newStr + emptyString(diff);
    }
    else if (format === "r") {
        newStr = emptyString(diff) + newStr;
    }
    else { // (format === "c")
        var s  = diff / 2;
        newStr = emptyString(Math.ceil(s)) + newStr + emptyString(Math.floor(s));
    }
    return newStr;
}

/**
 * Prints a given array of json objects.
 * @param printArray The array of json objects to be printed.
 */
var printTable = function (printArray, format, preProcessor) {
    format        = format || "";
    preProcessor = preProcessor || [];

    var INDENT     = emptyString(defaultSettings.indent);
    var ROW_SPACER = emptyString(defaultSettings.rowSpace);

    var headings  = getAllKeys(printArray);
    var maxLength = getMaxLength(headings, printArray);

    // print headine
    var headline  = [];
    var seperator = [];

    _.forEach(headings, function (header, i) {
        headline.push(toLength(header, maxLength[header], format.substr(i, 1)));
        seperator.push(Array(maxLength[header] + 1).join('-'));
    });

    console.log(INDENT + headline.join(ROW_SPACER));
    console.log(INDENT + seperator.join(ROW_SPACER));

    // print rows
    _.forEach(printArray, function (row) {
        var line = [];
        _.forEach(headings, function (header, i) {
            var str = row[header] || "";

            if (_.isFunction(preProcessor[i])) {
                str = preProcessor[i](str) || str;
            }

            line.push(toLength(str, maxLength[header], format.substr(i, 1)));
        });
        console.log(INDENT + line.join(ROW_SPACER));
    });
};

/**
 * Exports the printTable function via module export.
 * @type {Function} The printTable function.
 */
exports.printTable = printTable;

/**
 * Exports the setDefaults function via module export.
 * @type {Function} The setDefaults function.
 */
exports.setDefaults = setDefaults;

/**
 * Append table function to console.
 *
 * @type {Function}
 */
console.table = printTable;