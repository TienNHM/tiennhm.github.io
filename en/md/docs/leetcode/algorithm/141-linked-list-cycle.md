# 141. Linked List Cycle

> Nguồn: https://tiennhm.io.vn/en/docs/leetcode/algorithm/141-linked-list-cycle
> Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

## Giới thiệu bài toán

Chi tiết: https://leetcode.com/problems/linked-list-cycle/

> **Tip: Yêu cầu**
>
> Given `head`, the head of a linked list, determine if the linked list has a cycle in it.
>
> There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, `pos` is used to denote the index of the node that tail's next pointer is connected to. Note that `pos` is not passed as a parameter.
>
> Return `true` if there is a cycle in the linked list. Otherwise, return `false`.
**Example 1:**

- Input: `head` = [3,2,0,-4], `pos` = 1
- Output: `true`
- Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

```mermaid
graph LR;
    3   --> 2;
    2   --> 0;
    0   --> -4;
    -4  --> 2;
```

**Example 2:**

- Input: `head` = [1,2], `pos` = 0
- Output: `true`
- Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

```mermaid
graph LR;
    1   --> 2;
    2   --> 1;
```

**Example 3:**

- Input: `head` = [1], `pos` = -1
- Output: `false`
- Explanation: There is no cycle in the linked list.

```mermaid
graph LR;
    1
```

**Constraints:**

- The number of the nodes in the list is in the range `[0, 104]`.
- `-105 <= Node.val <= 105`
- `pos` is `-1` or a valid index in the linked-list.

**Follow up:** Can you solve it using `O(1)` (i.e. constant) memory?

## Giải quyết bài toán

        {LinkedListCycleCs}

        {LinkedListCycleTs}

**Tham khảo:**
- [C#](https://leetcode.com/submissions/detail/1040119073/)
- [TypeScript](https://leetcode.com/submissions/detail/1040132046/)
