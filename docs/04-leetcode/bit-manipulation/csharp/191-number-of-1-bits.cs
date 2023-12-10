public class Solution {
    public int HammingWeight(uint n) {
        uint result = 0;
        while (n > 0) {
            result += n & 1;
            n = n >> 1;
        }
        return (int)result;
    }
}