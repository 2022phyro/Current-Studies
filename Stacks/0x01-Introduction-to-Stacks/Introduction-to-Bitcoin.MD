# Introduction to Bitcoin
Bitcoin
* decentralized money system
* Uses cryptography to secure assets into a decentralized ledger without the need of an intermediary
* A counter to fiat money. It is resistant to censorship, corruption and interference

## Precusors
Several technology and tools used in the creation of Bitcoin was invented prior to Bitcoin.  We have
* **eCash** by `David Chaum` in _1983_
    * anonymouse digital currency that provided untraceability using blind signatures.
* **b-Money** proposal by `Wei Dai` in _1998_
    * outlined concepts of a distributed electronic cash system secured by a **proof of work** mechanism to defer cyber attacks and counterfeits
    * introduced ideas like 
        * decentralized blockchain ledger
        * creating economic incentives for entites to participate in the network

## Creation
This is traceable to October 31st 2008- when **Satoshi Nakamoto** published a paper titled "Bitcoin: A peer to peer electronic cash system"
* combined existing ideas, from Wei Dai's paper to David Chaum's eCash anonymous system.
* Was able to solve the double-spending problem: this is the issue where a malicious actor spends money they own twice. 
    * Solved it using the Proof of Work algorithm.
* Satoshi mined the first Bitcoin block on January 3, 2009.

## Blockchain Concepts...

### Proof of Work
It's a consensus protocol where all the networks agree on the current state of the blockchain. (who owns what.) In consensus, all nodes, in the network has to agree on the state of the network. The protocols also incentivize good behavior and punish bad behaviour. 
Theoretically I can compromize this by controlling the majority of nodes, but to do so is economically unfeasible.

### Block production
The blockchain is a chain of blocks (A block is a group of transactions..). the blockchain is linear, hence, one block comes after the other, much like a linked list.
#### How are blocks made?
* When a user makes a transaction, this must be part of a block. and a new bolck produced.
* Miners compete on mining nodes to produce new blocks. The winner (the one who ends up producing the block), gets a new BTC. The competiton restarts when it's time to mine the next block.
* Producing a block is an BP problem. (computationally intensive to solve, but easy to verify solution). Miners race to present their own "version". Once one has found a soultion, it is shared with everyone else. if it's correctt, they win and earn BTC, else, the race continues

### Network Security
