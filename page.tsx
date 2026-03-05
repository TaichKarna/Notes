import { useState } from "react";

type Method = { sig: string; note: string };
type Pattern = { title: string; code: string };
type Data = {
  color: string;
  icon: string;
  desc: string;
  init: string;
  methods: Method[];
  patterns: Pattern[];
};

const dsData: Record<string, Data> = {
  "Array / ArrayList": {
    color: "#00d4ff",
    icon: "▦",
    desc: "Ordered, index-based. ArrayList is dynamic.",
    init: `int[] arr = new int[n];
int[] arr = {1, 2, 3};
ArrayList<Integer> list = new ArrayList<>();
ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1,2,3));`,
    methods: [
      { sig: "list.add(val)", note: "Append to end — O(1) amortized" },
      { sig: "list.add(i, val)", note: "Insert at index — O(n)" },
      { sig: "list.get(i)", note: "Get by index — O(1)" },
      { sig: "list.set(i, val)", note: "Update by index — O(1)" },
      { sig: "list.remove(i)", note: "Remove by index — O(n)" },
      { sig: "list.remove(Integer.valueOf(x))", note: "Remove by value — O(n)" },
      { sig: "list.size()", note: "Length — O(1)" },
      { sig: "list.contains(val)", note: "Check existence — O(n)" },
      { sig: "list.indexOf(val)", note: "First occurrence index — O(n)" },
      { sig: "list.isEmpty()", note: "Check empty — O(1)" },
      { sig: "list.clear()", note: "Remove all — O(n)" },
      { sig: "Collections.sort(list)", note: "Sort ascending — O(n log n)" },
      { sig: "Collections.sort(list, Collections.reverseOrder())", note: "Sort descending" },
      { sig: "Collections.reverse(list)", note: "Reverse list — O(n)" },
      { sig: "Collections.max(list) / .min(list)", note: "Max / Min — O(n)" },
      { sig: "Arrays.sort(arr)", note: "Sort primitive array" },
      { sig: "Arrays.sort(arr, l, r)", note: "Sort subarray [l, r)" },
      { sig: "Arrays.fill(arr, val)", note: "Fill all with value" },
      { sig: "Arrays.copyOfRange(arr, l, r)", note: "Subarray copy [l, r)" },
    ],
    patterns: [
      { title: "Two Pointers", code: `int l = 0, r = arr.length - 1;
while (l < r) {
    // process arr[l] and arr[r]
    l++; r--;
}` },
      { title: "Sliding Window", code: `int sum = 0, max = 0;
for (int r = 0; r < n; r++) {
    sum += arr[r];
    if (r >= k) sum -= arr[r - k];
    if (r >= k - 1) max = Math.max(max, sum);
}` },
      { title: "Prefix Sum", code: `int[] pre = new int[n + 1];
for (int i = 0; i < n; i++)
    pre[i+1] = pre[i] + arr[i];
// Range sum [l, r] = pre[r+1] - pre[l]` },
      { title: "Kadane's (Max Subarray)", code: `int cur = arr[0], best = arr[0];
for (int i = 1; i < n; i++) {
    cur = Math.max(arr[i], cur + arr[i]);
    best = Math.max(best, cur);
}` },
    ]
  },
  "HashMap / HashSet": {
    color: "#ff6b6b",
    icon: "#",
    desc: "Key-value store / unique elements. O(1) avg lookup.",
    init: `HashMap<String, Integer> map = new HashMap<>();
HashSet<Integer> set = new HashSet<>();
HashSet<Integer> set = new HashSet<>(Arrays.asList(1,2,3));`,
    methods: [
      { sig: "map.put(key, val)", note: "Insert/update — O(1)" },
      { sig: "map.get(key)", note: "Get value — O(1), null if missing" },
      { sig: "map.getOrDefault(key, def)", note: "Get or return default — O(1)" },
      { sig: "map.containsKey(key)", note: "Check key exists — O(1)" },
      { sig: "map.containsValue(val)", note: "Check value exists — O(n)" },
      { sig: "map.remove(key)", note: "Delete by key — O(1)" },
      { sig: "map.size()", note: "Number of entries — O(1)" },
      { sig: "map.isEmpty()", note: "Check empty — O(1)" },
      { sig: "map.keySet()", note: "Set of all keys" },
      { sig: "map.values()", note: "Collection of all values" },
      { sig: "map.entrySet()", note: "Set of Map.Entry pairs" },
      { sig: "map.putIfAbsent(key, val)", note: "Only insert if key missing" },
      { sig: "map.merge(key, 1, Integer::sum)", note: "Frequency count shorthand" },
      { sig: "map.getOrDefault(k,0)+1", note: "Classic frequency increment" },
      { sig: "set.add(val)", note: "Add element — O(1)" },
      { sig: "set.contains(val)", note: "Check exists — O(1) ← KEY for DSA" },
      { sig: "set.remove(val)", note: "Delete — O(1)" },
      { sig: "set.size()", note: "Count — O(1)" },
    ],
    patterns: [
      { title: "Frequency Count", code: `Map<Integer, Integer> freq = new HashMap<>();
for (int x : arr)
    freq.merge(x, 1, Integer::sum);
// or: freq.put(x, freq.getOrDefault(x,0)+1);` },
      { title: "Two Sum (classic)", code: `Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < n; i++) {
    int need = target - arr[i];
    if (seen.containsKey(need))
        return new int[]{seen.get(need), i};
    seen.put(arr[i], i);
}` },
      { title: "Anagram Check / Grouping", code: `Map<String, List<String>> map = new HashMap<>();
for (String s : strs) {
    char[] c = s.toCharArray();
    Arrays.sort(c);
    String key = new String(c);
    map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
}` },
      { title: "Iterate Map", code: `for (Map.Entry<String, Integer> e : map.entrySet())
    System.out.println(e.getKey() + " -> " + e.getValue());

// Iterate just keys:
for (String key : map.keySet()) { }` },
    ]
  },
  "Stack": {
    color: "#ffd93d",
    icon: "⬆",
    desc: "LIFO. Use Deque<> as Stack in Java (ArrayDeque is faster).",
    init: `Deque<Integer> stack = new ArrayDeque<>();
// Legacy (avoid): Stack<Integer> s = new Stack<>();`,
    methods: [
      { sig: "stack.push(val)", note: "Push on top — O(1)" },
      { sig: "stack.pop()", note: "Remove & return top — O(1)" },
      { sig: "stack.peek()", note: "View top WITHOUT removing — O(1)" },
      { sig: "stack.isEmpty()", note: "Check empty — O(1) ← always check before pop/peek" },
      { sig: "stack.size()", note: "Number of elements — O(1)" },
      { sig: "stack.contains(val)", note: "Check existence — O(n)" },
    ],
    patterns: [
      { title: "Valid Parentheses", code: `Deque<Character> stack = new ArrayDeque<>();
for (char c : s.toCharArray()) {
    if (c=='(' || c=='{' || c=='[') stack.push(c);
    else {
        if (stack.isEmpty()) return false;
        char t = stack.pop();
        if (c==')' && t!='(' ) return false;
        if (c=='}' && t!='{' ) return false;
        if (c==']' && t!='[' ) return false;
    }
}
return stack.isEmpty();` },
      { title: "Monotonic Stack (Next Greater)", code: `int[] res = new int[n];
Deque<Integer> stack = new ArrayDeque<>(); // stores indices
for (int i = 0; i < n; i++) {
    while (!stack.isEmpty() && arr[stack.peek()] < arr[i])
        res[stack.pop()] = arr[i];
    stack.push(i);
}` },
      { title: "DFS Iterative", code: `Deque<Integer> stack = new ArrayDeque<>();
stack.push(start);
while (!stack.isEmpty()) {
    int node = stack.pop();
    if (visited[node]) continue;
    visited[node] = true;
    for (int nb : graph.get(node))
        stack.push(nb);
}` },
    ]
  },
  "Queue / Deque": {
    color: "#6bcb77",
    icon: "→",
    desc: "FIFO Queue for BFS. Deque supports both ends.",
    init: `Queue<Integer> q = new LinkedList<>();
Deque<Integer> dq = new ArrayDeque<>();`,
    methods: [
      { sig: "q.offer(val)", note: "Enqueue — O(1) ← prefer over add()" },
      { sig: "q.poll()", note: "Dequeue front — O(1), null if empty" },
      { sig: "q.peek()", note: "View front WITHOUT removing — O(1)" },
      { sig: "q.isEmpty()", note: "Check empty — O(1)" },
      { sig: "q.size()", note: "Queue size — O(1)" },
      { sig: "dq.offerFirst(val)", note: "Add to front — O(1)" },
      { sig: "dq.offerLast(val)", note: "Add to back — O(1)" },
      { sig: "dq.pollFirst()", note: "Remove front — O(1)" },
      { sig: "dq.pollLast()", note: "Remove back — O(1)" },
      { sig: "dq.peekFirst()", note: "View front — O(1)" },
      { sig: "dq.peekLast()", note: "View back — O(1)" },
    ],
    patterns: [
      { title: "BFS (Graph / Grid)", code: `Queue<int[]> q = new LinkedList<>();
q.offer(new int[]{startR, startC});
boolean[][] visited = new boolean[m][n];
visited[startR][startC] = true;
int dist = 0;
while (!q.isEmpty()) {
    int sz = q.size();
    for (int i = 0; i < sz; i++) {
        int[] cur = q.poll();
        // process cur
        for (int[] dir : dirs) {
            int nr = cur[0]+dir[0], nc = cur[1]+dir[1];
            if (inBounds && !visited[nr][nc]) {
                visited[nr][nc] = true;
                q.offer(new int[]{nr, nc});
            }
        }
    }
    dist++;
}` },
      { title: "Sliding Window Max (Monotonic Deque)", code: `Deque<Integer> dq = new ArrayDeque<>(); // indices
int[] res = new int[n - k + 1];
for (int i = 0; i < n; i++) {
    while (!dq.isEmpty() && dq.peekFirst() < i-k+1)
        dq.pollFirst(); // remove out-of-window
    while (!dq.isEmpty() && arr[dq.peekLast()] < arr[i])
        dq.pollLast(); // maintain decreasing
    dq.offerLast(i);
    if (i >= k-1) res[i-k+1] = arr[dq.peekFirst()];
}` },
    ]
  },
  "PriorityQueue (Heap)": {
    color: "#c77dff",
    icon: "△",
    desc: "Min-heap by default. Use comparator for max-heap.",
    init: `PriorityQueue<Integer> minPQ = new PriorityQueue<>();
PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Collections.reverseOrder());
// Custom comparator (e.g. by second element of int[]):
PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[1] - b[1]);`,
    methods: [
      { sig: "pq.offer(val)", note: "Insert — O(log n)" },
      { sig: "pq.poll()", note: "Remove & return min — O(log n)" },
      { sig: "pq.peek()", note: "View min WITHOUT removing — O(1)" },
      { sig: "pq.isEmpty()", note: "Check empty — O(1)" },
      { sig: "pq.size()", note: "Count — O(1)" },
      { sig: "pq.contains(val)", note: "Check existence — O(n)" },
      { sig: "pq.remove(val)", note: "Remove specific value — O(n)" },
    ],
    patterns: [
      { title: "K Largest Elements", code: `// Min-heap of size k → keeps k largest
PriorityQueue<Integer> pq = new PriorityQueue<>();
for (int x : arr) {
    pq.offer(x);
    if (pq.size() > k) pq.poll(); // remove smallest
}
// pq now contains k largest; pq.peek() = kth largest` },
      { title: "Dijkstra's Shortest Path", code: `PriorityQueue<int[]> pq = new PriorityQueue<>((a,b)->a[1]-b[1]);
int[] dist = new int[n]; Arrays.fill(dist, Integer.MAX_VALUE);
dist[src] = 0; pq.offer(new int[]{src, 0});
while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    int node = cur[0], d = cur[1];
    if (d > dist[node]) continue;
    for (int[] nb : graph.get(node))
        if (dist[node] + nb[1] < dist[nb[0]]) {
            dist[nb[0]] = dist[node] + nb[1];
            pq.offer(new int[]{nb[0], dist[nb[0]]});
        }
}` },
      { title: "Merge K Sorted Lists", code: `PriorityQueue<int[]> pq = new PriorityQueue<>((a,b)->a[0]-b[0]);
// offer: {value, listIndex, elementIndex}
while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    result.add(cur[0]);
    // advance pointer in that list and offer next
}` },
    ]
  },
  "TreeMap / TreeSet": {
    color: "#ff9a3c",
    icon: "🌲",
    desc: "Sorted order. O(log n) ops. TreeSet = sorted unique set.",
    init: `TreeMap<Integer, Integer> tm = new TreeMap<>();
TreeSet<Integer> ts = new TreeSet<>();`,
    methods: [
      { sig: "tm.put(key, val)", note: "Insert — O(log n)" },
      { sig: "tm.get(key)", note: "Get — O(log n)" },
      { sig: "tm.firstKey() / lastKey()", note: "Smallest / Largest key" },
      { sig: "tm.floorKey(x)", note: "Largest key ≤ x — O(log n)" },
      { sig: "tm.ceilingKey(x)", note: "Smallest key ≥ x — O(log n)" },
      { sig: "tm.lowerKey(x)", note: "Largest key < x — O(log n)" },
      { sig: "tm.higherKey(x)", note: "Smallest key > x — O(log n)" },
      { sig: "tm.headMap(x)", note: "All keys < x" },
      { sig: "tm.tailMap(x)", note: "All keys ≥ x" },
      { sig: "ts.first() / last()", note: "Min / Max — O(log n)" },
      { sig: "ts.floor(x) / ceiling(x)", note: "Closest values — O(log n)" },
      { sig: "ts.lower(x) / higher(x)", note: "Strictly less/greater — O(log n)" },
      { sig: "ts.headSet(x) / tailSet(x)", note: "Sub-views" },
    ],
    patterns: [
      { title: "Find Closest Value", code: `TreeSet<Integer> ts = new TreeSet<>(arr);
Integer floor = ts.floor(target);   // ≤ target
Integer ceil  = ts.ceiling(target); // ≥ target
// Both may be null — always null-check!` },
      { title: "Count in Range", code: `TreeMap<Integer, Integer> map = new TreeMap<>();
// After populating:
NavigableMap<Integer,Integer> sub = map.subMap(lo, true, hi, true);
int count = sub.values().stream().mapToInt(i->i).sum();` },
    ]
  },
  "LinkedList": {
    color: "#ff6b9d",
    icon: "⬡",
    desc: "Used as Deque/Queue. Also classic DSA node-pointer problems.",
    init: `// As Deque/Queue:
Deque<Integer> ll = new LinkedList<>();

// Classic node definition:
class ListNode {
    int val;
    ListNode next;
    ListNode(int v) { val = v; }
}`,
    methods: [
      { sig: "ll.addFirst(val) / addLast(val)", note: "Add at front/back — O(1)" },
      { sig: "ll.removeFirst() / removeLast()", note: "Remove front/back — O(1)" },
      { sig: "ll.peekFirst() / peekLast()", note: "View front/back — O(1)" },
      { sig: "ll.size()", note: "Length — O(1)" },
      { sig: "ll.isEmpty()", note: "Check empty — O(1)" },
    ],
    patterns: [
      { title: "Reverse Linked List", code: `ListNode prev = null, cur = head;
while (cur != null) {
    ListNode next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
}
return prev; // new head` },
      { title: "Fast & Slow Pointer (Cycle / Middle)", code: `ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}
// slow = middle node
// If slow == fast at some point → cycle exists` },
      { title: "Merge Two Sorted Lists", code: `ListNode dummy = new ListNode(0), cur = dummy;
while (l1 != null && l2 != null) {
    if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
    else                  { cur.next = l2; l2 = l2.next; }
    cur = cur.next;
}
cur.next = (l1 != null) ? l1 : l2;
return dummy.next;` },
    ]
  },
  "String / StringBuilder": {
    color: "#4ecdc4",
    icon: "Aa",
    desc: "Strings are immutable. Use StringBuilder for building.",
    init: `String s = "hello";
StringBuilder sb = new StringBuilder();
StringBuilder sb = new StringBuilder("hello");
char[] chars = s.toCharArray();`,
    methods: [
      { sig: "s.length()", note: "Length — O(1)" },
      { sig: "s.charAt(i)", note: "Char at index — O(1)" },
      { sig: "s.substring(l, r)", note: "Substring [l, r) — O(n)" },
      { sig: "s.indexOf(str)", note: "First occurrence index — O(n)" },
      { sig: "s.contains(str)", note: "Check substring — O(n)" },
      { sig: "s.startsWith(str) / endsWith(str)", note: "Prefix/suffix check" },
      { sig: "s.toLowerCase() / toUpperCase()", note: "Case convert" },
      { sig: "s.trim()", note: "Strip leading/trailing whitespace" },
      { sig: "s.split(regex)", note: "Split into String[]" },
      { sig: "s.replace(old, new)", note: "Replace all occurrences" },
      { sig: "s.toCharArray()", note: "Convert to char[]" },
      { sig: "String.valueOf(x)", note: "Convert int/char to String" },
      { sig: "Integer.parseInt(s)", note: "String → int" },
      { sig: "s.equals(t)", note: "Content equality ← never use ==" },
      { sig: "s.compareTo(t)", note: "Lexicographic compare" },
      { sig: "sb.append(val)", note: "Append — O(1) amortized" },
      { sig: "sb.insert(i, val)", note: "Insert at index — O(n)" },
      { sig: "sb.deleteCharAt(i)", note: "Delete char at index — O(n)" },
      { sig: "sb.reverse()", note: "Reverse in place — O(n)" },
      { sig: "sb.toString()", note: "Convert to String — O(n)" },
      { sig: "sb.length()", note: "Current length — O(1)" },
      { sig: "sb.charAt(i) / sb.setCharAt(i,c)", note: "Read/write by index" },
    ],
    patterns: [
      { title: "Check Palindrome", code: `// Two pointers on string
int l = 0, r = s.length() - 1;
while (l < r) {
    if (s.charAt(l) != s.charAt(r)) return false;
    l++; r--;
}
return true;` },
      { title: "Sliding Window on String", code: `// e.g. longest substring without repeat
Map<Character, Integer> map = new HashMap<>();
int max = 0, l = 0;
for (int r = 0; r < s.length(); r++) {
    char c = s.charAt(r);
    map.put(c, map.getOrDefault(c, 0) + 1);
    while (map.get(c) > 1) {
        char lc = s.charAt(l++);
        map.put(lc, map.get(lc) - 1);
    }
    max = Math.max(max, r - l + 1);
}` },
      { title: "Character Frequency Array", code: `int[] freq = new int[26];
for (char c : s.toCharArray())
    freq[c - 'a']++;
// Access: freq['z'-'a']` },
    ]
  },
  "Graph (Adj List)": {
    color: "#a8dadc",
    icon: "◎",
    desc: "Build adjacency list. Use BFS/DFS for traversal.",
    init: `// Build from edges:
Map<Integer, List<Integer>> graph = new HashMap<>();
for (int[] e : edges) {
    graph.computeIfAbsent(e[0], k->new ArrayList<>()).add(e[1]);
    graph.computeIfAbsent(e[1], k->new ArrayList<>()).add(e[0]);
}
// Fixed size:
List<List<Integer>> g = new ArrayList<>();
for(int i=0;i<n;i++) g.add(new ArrayList<>());`,
    methods: [
      { sig: "graph.get(node)", note: "Get neighbors list" },
      { sig: "graph.containsKey(node)", note: "Node exists?" },
      { sig: "graph.getOrDefault(node, new ArrayList<>())", note: "Safe neighbor access" },
    ],
    patterns: [
      { title: "DFS (Recursive)", code: `boolean[] visited = new boolean[n];
void dfs(int node) {
    visited[node] = true;
    for (int nb : graph.get(node))
        if (!visited[nb]) dfs(nb);
}` },
      { title: "Topological Sort (Kahn's BFS)", code: `int[] indegree = new int[n];
for (int[] e : edges) indegree[e[1]]++;
Queue<Integer> q = new LinkedList<>();
for (int i = 0; i < n; i++)
    if (indegree[i] == 0) q.offer(i);
List<Integer> order = new ArrayList<>();
while (!q.isEmpty()) {
    int cur = q.poll();
    order.add(cur);
    for (int nb : graph.get(cur))
        if (--indegree[nb] == 0) q.offer(nb);
}` },
      { title: "Union-Find (DSU)", code: `int[] parent = new int[n], rank = new int[n];
Arrays.fill(parent, -1);
int find(int x) {
    if (parent[x] < 0) return x;
    return parent[x] = find(parent[x]); // path compress
}
void union(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return;
    if (rank[a] < rank[b]) { int t=a; a=b; b=t; }
    parent[b] = a;
    if (rank[a] == rank[b]) rank[a]++;
}` },
    ]
  },
  "Binary Search": {
    color: "#f9c74f",
    icon: "⟨⟩",
    desc: "On sorted arrays. O(log n). Template-based approach.",
    init: `// Standard — find exact target
int lo = 0, hi = arr.length - 1;
// Lower bound — first index ≥ target  
int lo = 0, hi = arr.length;`,
    methods: [
      { sig: "Arrays.binarySearch(arr, val)", note: "Built-in — returns index or -(insertion point)-1" },
      { sig: "Collections.binarySearch(list, val)", note: "For ArrayList — same contract" },
    ],
    patterns: [
      { title: "Find Exact Target", code: `int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2; // avoids overflow
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}
return -1; // not found` },
      { title: "Lower Bound (first ≥ target)", code: `int lo = 0, hi = n; // hi = n, not n-1
while (lo < hi) {   // strict <
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
}
return lo; // first index where arr[lo] >= target` },
      { title: "Upper Bound (first > target)", code: `int lo = 0, hi = n;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] <= target) lo = mid + 1;
    else hi = mid;
}
return lo; // count of elements <= target` },
      { title: "Binary Search on Answer", code: `// e.g. "minimum capacity that works"
int lo = minVal, hi = maxVal;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (canAchieve(mid)) hi = mid; // mid works, try smaller
    else lo = mid + 1;             // doesn't work, go larger
}
return lo;` },
    ]
  },
  "DP Patterns": {
    color: "#ff8fab",
    icon: "◈",
    desc: "Common DP setups. Initialize → fill → return.",
    init: `int[] dp = new int[n + 1];
int[][] dp = new int[m + 1][n + 1];
Arrays.fill(dp, Integer.MAX_VALUE); // or 0, -1, etc.`,
    methods: [
      { sig: "Math.max(a, b) / Math.min(a, b)", note: "Core DP transition helper" },
      { sig: "Arrays.fill(dp, val)", note: "Initialize 1D array" },
      { sig: "Integer.MAX_VALUE / MIN_VALUE", note: "Sentinel infinity values" },
    ],
    patterns: [
      { title: "0/1 Knapsack", code: `// dp[i][w] = max value using items[0..i] with cap w
int[][] dp = new int[n+1][W+1];
for (int i = 1; i <= n; i++)
    for (int w = 0; w <= W; w++) {
        dp[i][w] = dp[i-1][w]; // skip item i
        if (weights[i-1] <= w)
            dp[i][w] = Math.max(dp[i][w],
                dp[i-1][w-weights[i-1]] + values[i-1]);
    }` },
      { title: "Longest Common Subsequence", code: `int[][] dp = new int[m+1][n+1];
for (int i = 1; i <= m; i++)
    for (int j = 1; j <= n; j++) {
        if (s.charAt(i-1) == t.charAt(j-1))
            dp[i][j] = dp[i-1][j-1] + 1;
        else
            dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
return dp[m][n];` },
      { title: "Coin Change (Min Coins)", code: `int[] dp = new int[amount + 1];
Arrays.fill(dp, amount + 1); // "infinity"
dp[0] = 0;
for (int coin : coins)
    for (int i = coin; i <= amount; i++)
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
return dp[amount] > amount ? -1 : dp[amount];` },
      { title: "Longest Increasing Subsequence", code: `int[] dp = new int[n]; Arrays.fill(dp, 1);
for (int i = 1; i < n; i++)
    for (int j = 0; j < i; j++)
        if (arr[j] < arr[i])
            dp[i] = Math.max(dp[i], dp[j] + 1);
// O(n log n) version uses patience sorting with TreeSet` },
    ]
  },
};

const categories = Object.keys(dsData);

export default function JavaDSAGuide() {
  const [active, setActive] = useState(categories[0]);
  const [tab, setTab] = useState("methods");
  const ds = dsData[active];

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      background: "#0a0a0f",
      color: "#e2e8f0",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d0d1a 0%, #12121f 100%)",
        borderBottom: "1px solid #1e1e3a",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <div style={{
          width: 36, height: 36,
          background: "linear-gradient(135deg, #00d4ff, #c77dff)",
          borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 900,
        }}>J</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.5px", color: "#fff" }}>
            Java DSA Quick Reference
          </div>
          <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.5px" }}>
            Methods · Patterns · Cheatsheet
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{
          width: 210,
          background: "#0d0d1a",
          borderRight: "1px solid #1a1a2e",
          overflowY: "auto",
          flexShrink: 0,
          padding: "8px 0",
        }}>
          {categories.map(cat => {
            const d = dsData[cat];
            const isActive = active === cat;
            return (
              <div
                key={cat}
                onClick={() => { setActive(cat); setTab("methods"); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  cursor: "pointer",
                  background: isActive ? `${d.color}18` : "transparent",
                  borderLeft: isActive ? `3px solid ${d.color}` : "3px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                <span style={{
                  fontSize: 16,
                  width: 24, textAlign: "center",
                  color: isActive ? d.color : "#4a5568",
                }}>{d.icon}</span>
                <span style={{
                  fontSize: 12,
                  color: isActive ? "#e2e8f0" : "#6b7280",
                  fontWeight: isActive ? 600 : 400,
                  lineHeight: 1.3,
                }}>{cat}</span>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {/* DS Header */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 28, color: ds.color }}>{ds.icon}</span>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#fff" }}>{active}</h2>
            </div>
            <p style={{ margin: "0 0 16px", color: "#9ca3af", fontSize: 13 }}>{ds.desc}</p>

            {/* Init block */}
            <div style={{
              background: "#111122",
              border: `1px solid ${ds.color}33`,
              borderRadius: 8,
              padding: "12px 16px",
              marginBottom: 0,
            }}>
              <div style={{ fontSize: 10, color: ds.color, fontWeight: 700, marginBottom: 6, letterSpacing: "1px" }}>
                INITIALIZATION
              </div>
              <pre style={{ margin: 0, fontSize: 12, color: "#a5b4fc", whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                {ds.init}
              </pre>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: "1px solid #1e1e3a" }}>
            {["methods", "patterns"].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px 20px",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: tab === t ? 700 : 400,
                  color: tab === t ? ds.color : "#6b7280",
                  borderBottom: tab === t ? `2px solid ${ds.color}` : "2px solid transparent",
                  marginBottom: -1,
                  fontFamily: "inherit",
                  textTransform: "capitalize",
                  letterSpacing: "0.3px",
                }}
              >{t === "methods" ? "⚙ Methods" : "🔷 DSA Patterns"}</button>
            ))}
          </div>

          {/* Methods Tab */}
          {tab === "methods" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {ds.methods.map((m, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "10px 14px",
                  background: i % 2 === 0 ? "#0d0d1a" : "#0a0a14",
                  borderRadius: 6,
                  borderLeft: `2px solid ${ds.color}33`,
                }}>
                  <code style={{
                    color: "#7dd3fc",
                    fontSize: 12.5,
                    minWidth: 0,
                    flex: "0 0 auto",
                    maxWidth: "55%",
                    background: "#111827",
                    padding: "2px 8px",
                    borderRadius: 4,
                    border: "1px solid #1f2937",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}>{m.sig}</code>
                  <span style={{
                    color: "#9ca3af",
                    fontSize: 12,
                    flex: 1,
                    paddingTop: 3,
                    lineHeight: 1.5,
                  }}>{m.note}</span>
                </div>
              ))}
            </div>
          )}

          {/* Patterns Tab */}
          {tab === "patterns" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {ds.patterns.map((p, i) => (
                <div key={i} style={{
                  background: "#0d0d1a",
                  border: `1px solid ${ds.color}22`,
                  borderRadius: 8,
                  overflow: "hidden",
                }}>
                  <div style={{
                    background: `${ds.color}15`,
                    padding: "8px 16px",
                    borderBottom: `1px solid ${ds.color}22`,
                    fontSize: 13,
                    fontWeight: 700,
                    color: ds.color,
                    letterSpacing: "0.3px",
                  }}>◆ {p.title}</div>
                  <pre style={{
                    margin: 0,
                    padding: "14px 16px",
                    fontSize: 12.5,
                    color: "#e2e8f0",
                    lineHeight: 1.8,
                    overflowX: "auto",
                    whiteSpace: "pre",
                  }}>{p.code}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
