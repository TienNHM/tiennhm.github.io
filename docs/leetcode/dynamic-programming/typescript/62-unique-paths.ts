function uniquePaths(m: number, n: number): number {
    var A : number[][] = Array.from(Array(m), _ => Array(n).fill(0));

    for (var i = 0; i < m; i++) {
            A[i][0] = 1;
        }
    for (var j = 0; j < n; j++) {
        A[0][j] = 1;
    }
    for (var i = 1; i < m; i++) {
        for (var j = 1; j < n; j++) {
            A[i][j] = A[i-1][j] + A[i][j-1];
        }
    }
    return A[m-1][n-1];
};