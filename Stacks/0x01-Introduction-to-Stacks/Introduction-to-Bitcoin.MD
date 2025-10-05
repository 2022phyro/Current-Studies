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
The peer-to-peer review works as a buffer for network security.
* The BTC they get from mining a honest work incentivizes them to try to create solutions everyone will agree with; honest solutions
* If they try a fradulent solution, because they can't get ~50% of the nodes to agree, they lose the computational resources (heavy expenses) spent on trying to create that "solution", so not only do they not gain anything, they also lose something.

### Sybil Resistance.
PoW is a sybil resistance mechanism, and a block producer selector.
* Sybil resistance measures how well a protocol can withstand sybil attacks. A sybil attack is when one entity pretends to be many different entities. This could cause these pretenders to gain undue rewards on the chain as they mine. PoW solves this by rewarding the most computational power, not necessarily the most nodes.

### Chain Selection.
* When the chain diverges, Bitcoin follows the Longest Chain Rule to presrve the fork with the more nodes agreeing to it's variant of the solution. the other block called the **uncle block** will be discarded.
* PoW and Longest Chain Rule make up the **Nakamoto Consensus**
* Uncle blocks still get rewards because they created a valid solution, not just to the same amount as the one selected to be the canonical block.

### Finality
A transactin is considered to have finality when it's impossible for the block to become an uncle block. As the Chain selection process indicates that uncle blocks are wiped out which may cause transactions to be "reversed", finality ensures that the chances of that happening to your transaction approaches 0 as the blockchain grows
* At around 5 blocks, that probability of wipe-out reduces to 0.0001% and the longer the blocks, the lower the threat.

### Future of Bitcoin.
Bitcoin created a decentralized currency system. But the concept of blockchain is being adapted to create decentralized computing systems, taking control and ownership of data, and ensuring anonymity.