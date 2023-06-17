/**
 * Get all values of specific key in object
 * @param {object} obj A javascript object to get values
 * @param {string} key A key of object
 * @returns 
 */
function GetValuesByKey(obj, key) {
    let values = [];
    for (let i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            values = values.concat(GetValuesByKey(obj[i], key));
        } else if (i == key) {
            values.push(obj[i]);
        }
    }
    return values;
}