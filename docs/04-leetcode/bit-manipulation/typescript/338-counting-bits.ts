function countBitsTs(n: number): number[] {
    var ans = [0];
    for (var i = 1; i<=n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
};