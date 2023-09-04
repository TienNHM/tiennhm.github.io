public class Solution {
    public int UniquePaths(int m, int n) {
        var A = new int[m, n];
        for (int i = 0; i < m; i++) {
            A[i, 0] = 1;
        }
        for (int j = 0; j < n; j++) {
            A[0, j] = 1;
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                A[i, j] = A[i - 1, j] + A[i, j - 1];
            }
        }
        return A[m - 1, n - 1];
    }
}