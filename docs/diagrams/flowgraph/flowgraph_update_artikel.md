# Flowgraph Update Artikel

```mermaid
flowchart TD
    1([1]) --> 2([2])
    2 --> 3([3])
    3 -->|Yes| 4([4])
    4 --> 5([5])
    5 --> 8([8])
    3 -->|No| 6([6])
    6 --> 7([7])
    7 --> 8
    
    style 1 fill:#90EE90
    style 8 fill:#FFB6C1
    style 3 fill:#FFD700
```
