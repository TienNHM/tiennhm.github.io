public class Solution {
    public int SingleNumber(int[] nums) {
        int result = 0;
        foreach (var num in nums) {
            result = result ^ num;
        }
        return result;
    }
}