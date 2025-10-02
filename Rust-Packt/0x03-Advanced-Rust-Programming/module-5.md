# Blockchain Theory

## Introduction

* *Hashes* form the basic building blocks of the blockchain
* Hashes are like fingerprints of data. They are unique, they are smaller than the data, and they accurately represent the data in its entirety. The hashes would have a definite string length. Eg for `sha256` is 64 character length.
* For every data using a certain hash algorithm, the length output would always be the same. We cannot recover the data from the hash but inputing the same data into the same hash algorithm would give the same hash.


## Block & Hashes
 We can represent data on the chain using a combination of three field:
* Block: An arbitrary number. Could be anything from one, etc 
* Nonce: another arbitrary number.
* Data: The data we want to store/hash

Now the hash would be considered as valid/signed when it begins with 4 zeros ie `0000aef4.....`. The problem is that a slight data change would immediately generate a new hash that isn't starting with 4 zeros. The nonce is the arbitrary number in the combination that makes up for this imbalance. The nonce is always a number that would correct the expected hash to have 4 zeroes. the act of *mining* is simply looking for a valid nonce for a particular block of data
* The blockchain is literally a chain of such blocks. More or less, it is like a linked list. It includes in addition of the three fields, there is a `prev` field. The prev field would contain the hash of the previous data block of data on the chain.

* The fact that the hash of the prev is copied to the next item on the chain means, that any change at any point on the chain would cause a corresponding change/invalidate every other block after it. The more we 
change further down, the more difficult it becomes to handle the fallout of the change. This makes it difficult to mutate data on the chain. as other cells would resist your changing data due to the difficulty in getting the blocks back up to a valid state.

* In realistic scenarios, the number of zeros are more that requires a lot of work to figure out a valid Nonce value.
* Moreover, the blockchain works in distributed environment where multiple users are involved. So by the time you figure out a valid Nonce, the chain is going to have more blocks coming in, which are being added by others and are being linked together with the existing chain, and the whole chain is going to essentially race you, and you are never going to succeed, because this mining takes so much compute power, that no one individual will be able to beat everybody else.
* To add a Block to the Blockchain, we will also put a restriction that a Block can only be added to the Blockchain if someone mines announce for it that results in a valid Hash.
* The distributed nature of the Blockchain makes it even more secure and more difficult to tamper with. 



## Blockchain Implementation


