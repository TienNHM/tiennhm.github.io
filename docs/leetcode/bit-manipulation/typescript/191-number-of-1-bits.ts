function hammingWeight(n: number): number {
    var result = 0;
    while (n > 0) {
        result += n & 1;
        n = n >>> 1;
    }
    return result;
};