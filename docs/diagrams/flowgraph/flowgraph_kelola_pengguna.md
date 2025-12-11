# Flowgraph Kelola Pengguna (Admin)

```mermaid
flowchart TD
    1([1]) --> 2([2])
    2 --> 3([3])
    3 --> 4([4])
    4 -->|Yes| 5([5])
    5 --> 9([9])
    9 --> 10([10])
    10 --> 11([11])
    11 --> 12([12])
    4 -->|No| 6([6])
    6 --> 7([7])
    7 --> 8([8])
    8 --> 12
    
    style 1 fill:#90EE90
    style 12 fill:#FFB6C1
    style 4 fill:#FFD700
```
