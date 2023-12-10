function singleNumber(nums: number[]): number {
    var result = 0;
    nums.forEach(x => result = result ^ x)
    return result;
};