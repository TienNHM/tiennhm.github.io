/**
 * Flattens an object to a single level object
 * @param {object} obj Object to flatten 
 * @returns An object with all keys and values flattened
 */
function FlattenObject(obj) {
    const flattened = {};

    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(flattened, flattenObject(obj[key]));
        } else {
            flattened[key] = obj[key];
        }
    });

    return flattened;
}