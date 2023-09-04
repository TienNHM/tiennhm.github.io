/**
 * Flattens a javascript object with the keys as the path
 * @param {object} obj A javascript object to flatten
 * @param {string} prefix A prefix to add to keys
 * @returns An object with all keys and values flattened
 */
function FlattenObjectWithKey(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? `${prefix}.` : '';
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            Object.assign(acc, FlattenObjectWithKey(obj[k], pre + k));
        } else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
}