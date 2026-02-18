export interface TechnicalPrompt {
    id: string;
    question: string;
    category: 'System Design' | 'Operating Systems' | 'DBMS' | 'OOPs' | 'Networking' | 'DSA' | 'Security' | 'Cloud & DevOps' | 'Web';
}

export const technicalPrompts: TechnicalPrompt[] = [
    // Operating Systems
    { id: "tech-1", question: "Explain the difference between a Process and a Thread.", category: "Operating Systems" },
    { id: "tech-2", question: "What is a Deadlock? Mention the four necessary conditions for deadlock to occur.", category: "Operating Systems" },
    { id: "tech-3", question: "Explain the concept of Virtual Memory and its benefits.", category: "Operating Systems" },
    { id: "tech-4", question: "Explain Paging and Segmentation in memory management.", category: "Operating Systems" },
    { id: "tech-5", question: "What is a Semaphore? Difference between Binary and Counting Semaphores.", category: "Operating Systems" },
    { id: "tech-6", question: "What is Context Switching? What are its costs?", category: "Operating Systems" },
    { id: "tech-7", question: "Explain different CPU scheduling algorithms: FCFS, SJF, Round Robin, Priority.", category: "Operating Systems" },
    { id: "tech-8", question: "What is a Race Condition? How do you prevent it?", category: "Operating Systems" },
    { id: "tech-9", question: "Explain the difference between Mutex and Semaphore.", category: "Operating Systems" },
    { id: "tech-10", question: "What is Thrashing in an operating system?", category: "Operating Systems" },
    { id: "tech-11", question: "Explain the concept of Demand Paging and Page Fault.", category: "Operating Systems" },
    { id: "tech-12", question: "What is the difference between a monolithic kernel and a microkernel?", category: "Operating Systems" },

    // DBMS
    { id: "tech-13", question: "What are the ACID properties in a Database Management System?", category: "DBMS" },
    { id: "tech-14", question: "Difference between SQL and NoSQL databases. When would you use each?", category: "DBMS" },
    { id: "tech-15", question: "Explain the concept of Database Normalization (1NF, 2NF, 3NF).", category: "DBMS" },
    { id: "tech-16", question: "What is an Index in a database? How does it speed up queries?", category: "DBMS" },
    { id: "tech-17", question: "What is a Transaction? Explain COMMIT and ROLLBACK.", category: "DBMS" },
    { id: "tech-18", question: "Explain the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.", category: "DBMS" },
    { id: "tech-19", question: "What is a stored procedure? How does it differ from a function?", category: "DBMS" },
    { id: "tech-20", question: "What is database sharding and when would you use it?", category: "DBMS" },
    { id: "tech-21", question: "Explain the difference between clustered and non-clustered indexes.", category: "DBMS" },
    { id: "tech-22", question: "What is a View in SQL? What are its advantages and limitations?", category: "DBMS" },
    { id: "tech-23", question: "Explain the concept of database replication and its types.", category: "DBMS" },
    { id: "tech-24", question: "What is the N+1 query problem and how do you solve it?", category: "DBMS" },

    // OOPs
    { id: "tech-25", question: "Explain the four pillars of Object-Oriented Programming (Abstraction, Encapsulation, Inheritance, Polymorphism).", category: "OOPs" },
    { id: "tech-26", question: "What is the difference between an Interface and an Abstract Class?", category: "OOPs" },
    { id: "tech-27", question: "Explain the concept of Method Overloading vs Method Overriding.", category: "OOPs" },
    { id: "tech-28", question: "What is a Constructor? Can we have a private constructor?", category: "OOPs" },
    { id: "tech-29", question: "Explain the SOLID principles with examples.", category: "OOPs" },
    { id: "tech-30", question: "What is the Singleton design pattern? When would you use it?", category: "OOPs" },
    { id: "tech-31", question: "Explain the Factory and Abstract Factory design patterns.", category: "OOPs" },
    { id: "tech-32", question: "What is the Observer design pattern? Give a real-world example.", category: "OOPs" },
    { id: "tech-33", question: "What is the difference between composition and inheritance? Which do you prefer and why?", category: "OOPs" },
    { id: "tech-34", question: "Explain the concept of Dependency Injection.", category: "OOPs" },
    { id: "tech-35", question: "What is the difference between deep copy and shallow copy?", category: "OOPs" },
    { id: "tech-36", question: "Explain the Strategy design pattern with an example.", category: "OOPs" },

    // System Design
    { id: "tech-37", question: "How would you design a URL Shortener like Bitly?", category: "System Design" },
    { id: "tech-38", question: "Explain the concept of Load Balancing and different algorithms used (e.g., Round Robin).", category: "System Design" },
    { id: "tech-39", question: "What is Caching? Explain different cache eviction policies like LRU.", category: "System Design" },
    { id: "tech-40", question: "Explain the CAP theorem. Can a system be CP and AP simultaneously?", category: "System Design" },
    { id: "tech-41", question: "How would you design a notification system that sends millions of push notifications per day?", category: "System Design" },
    { id: "tech-42", question: "What is a Message Queue? When would you use Kafka vs RabbitMQ?", category: "System Design" },
    { id: "tech-43", question: "How would you design a rate limiter?", category: "System Design" },
    { id: "tech-44", question: "Explain the difference between horizontal and vertical scaling.", category: "System Design" },
    { id: "tech-45", question: "How would you design a distributed cache like Redis?", category: "System Design" },
    { id: "tech-46", question: "What is a CDN (Content Delivery Network) and how does it work?", category: "System Design" },
    { id: "tech-47", question: "How would you design a real-time chat application like WhatsApp?", category: "System Design" },
    { id: "tech-48", question: "Explain the concept of eventual consistency in distributed systems.", category: "System Design" },

    // Networking
    { id: "tech-49", question: "What is the difference between TCP and UDP? Use cases for each.", category: "Networking" },
    { id: "tech-50", question: "How does HTTPS work? Explain the TLS/SSL handshake.", category: "Networking" },
    { id: "tech-51", question: "What is DNS? Explain the hierarchy of DNS resolution.", category: "Networking" },
    { id: "tech-52", question: "Explain the OSI model and the function of each layer.", category: "Networking" },
    { id: "tech-53", question: "What is the difference between HTTP/1.1, HTTP/2, and HTTP/3?", category: "Networking" },
    { id: "tech-54", question: "What is a REST API? Explain its constraints and principles.", category: "Networking" },
    { id: "tech-55", question: "What is a WebSocket? How does it differ from HTTP?", category: "Networking" },
    { id: "tech-56", question: "Explain the concept of NAT (Network Address Translation).", category: "Networking" },
    { id: "tech-57", question: "What is a firewall and how does it work?", category: "Networking" },
    { id: "tech-58", question: "Explain the difference between IPv4 and IPv6.", category: "Networking" },

    // DSA
    { id: "tech-59", question: "Explain Time and Space Complexity. What is Big O notation?", category: "DSA" },
    { id: "tech-60", question: "How does a Hash Map work internally? How are collisions handled?", category: "DSA" },
    { id: "tech-61", question: "Difference between BFS and DFS. When would you use one over the other?", category: "DSA" },
    { id: "tech-62", question: "Explain the difference between a Stack and a Queue. Give real-world use cases.", category: "DSA" },
    { id: "tech-63", question: "What is a Binary Search Tree? What are its time complexities for search, insert, delete?", category: "DSA" },
    { id: "tech-64", question: "Explain Dynamic Programming. What is memoization vs tabulation?", category: "DSA" },
    { id: "tech-65", question: "What is a Heap data structure? Explain min-heap and max-heap.", category: "DSA" },
    { id: "tech-66", question: "Explain the difference between Merge Sort and Quick Sort.", category: "DSA" },
    { id: "tech-67", question: "What is a Trie? When would you use it?", category: "DSA" },
    { id: "tech-68", question: "Explain Dijkstra's algorithm and its time complexity.", category: "DSA" },
    { id: "tech-69", question: "What is a Linked List? Compare singly, doubly, and circular linked lists.", category: "DSA" },
    { id: "tech-70", question: "Explain the concept of a Graph. What are adjacency matrix and adjacency list?", category: "DSA" },

    // Security
    { id: "tech-71", question: "What is SQL Injection? How do you prevent it?", category: "Security" },
    { id: "tech-72", question: "Explain Cross-Site Scripting (XSS) and how to mitigate it.", category: "Security" },
    { id: "tech-73", question: "What is Cross-Site Request Forgery (CSRF)? How do you prevent it?", category: "Security" },
    { id: "tech-74", question: "Explain the difference between Authentication and Authorization.", category: "Security" },
    { id: "tech-75", question: "What is JWT (JSON Web Token)? How does it work?", category: "Security" },
    { id: "tech-76", question: "Explain OAuth 2.0 and its grant types.", category: "Security" },
    { id: "tech-77", question: "What is the difference between symmetric and asymmetric encryption?", category: "Security" },
    { id: "tech-78", question: "What is a Man-in-the-Middle attack? How do you prevent it?", category: "Security" },
    { id: "tech-79", question: "Explain the concept of hashing. What makes a good hash function?", category: "Security" },
    { id: "tech-80", question: "What is the OWASP Top 10? Name at least 5 vulnerabilities.", category: "Security" },

    // Cloud & DevOps
    { id: "tech-81", question: "What is the difference between IaaS, PaaS, and SaaS?", category: "Cloud & DevOps" },
    { id: "tech-82", question: "Explain the concept of containerization. How does Docker work?", category: "Cloud & DevOps" },
    { id: "tech-83", question: "What is Kubernetes? What problems does it solve?", category: "Cloud & DevOps" },
    { id: "tech-84", question: "Explain CI/CD pipelines. What are the key stages?", category: "Cloud & DevOps" },
    { id: "tech-85", question: "What is Infrastructure as Code (IaC)? Name some tools.", category: "Cloud & DevOps" },
    { id: "tech-86", question: "Explain the concept of microservices. What are their advantages and disadvantages?", category: "Cloud & DevOps" },
    { id: "tech-87", question: "What is serverless computing? When would you use it?", category: "Cloud & DevOps" },
    { id: "tech-88", question: "Explain the concept of blue-green deployment.", category: "Cloud & DevOps" },
    { id: "tech-89", question: "What is a Service Mesh? Explain Istio.", category: "Cloud & DevOps" },
    { id: "tech-90", question: "How does auto-scaling work in cloud environments?", category: "Cloud & DevOps" },

    // Web
    { id: "tech-91", question: "Explain the difference between server-side rendering (SSR) and client-side rendering (CSR).", category: "Web" },
    { id: "tech-92", question: "What is the Virtual DOM? How does React use it?", category: "Web" },
    { id: "tech-93", question: "Explain the concept of event loop in JavaScript.", category: "Web" },
    { id: "tech-94", question: "What is the difference between localStorage, sessionStorage, and cookies?", category: "Web" },
    { id: "tech-95", question: "Explain the concept of CORS (Cross-Origin Resource Sharing).", category: "Web" },
    { id: "tech-96", question: "What are Web Workers? When would you use them?", category: "Web" },
    { id: "tech-97", question: "Explain the difference between synchronous and asynchronous programming in JavaScript.", category: "Web" },
    { id: "tech-98", question: "What is GraphQL? How does it differ from REST?", category: "Web" },
    { id: "tech-99", question: "Explain the concept of Progressive Web Apps (PWAs).", category: "Web" },
    { id: "tech-100", question: "What is the critical rendering path in a browser? How do you optimize it?", category: "Web" },
];
