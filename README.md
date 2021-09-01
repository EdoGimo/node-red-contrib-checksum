# node-red-contrib-checksum

A simple checksum utility for [Node-RED](https://nodered.org/), based on [crypto-js](https://www.npmjs.com/package/crypto-js). Supports sha256, sha1, MD5, SHA-512, SHA-224, SHA-384, SHA-3 (at 512, 384, 256 or 224 bits, although autor of the module says it is actually 'Keccak\[c=2d\]') and RIPEMD-160.


### Prerequisites

Node-RED installed. Latest version should work fine.


### Installation
 
Install via Node-RED Manage Palette

```
node-red-contrib-checksum
```

Install via npm

```shell
$ cd ~/.node-red
$ npm install node-red-contrib-checksum
```

If necessary, restart Node-RED.


### How to use

There are 5 options in the Properties tab of the node:
- File/String: string, or path to the file, to be hashed;
- Checksum: hash string, or path to the file with it, to compare with the hashing result;
- Hash function: allows to choose the necessary function between those supported;
- The input payload is a file: specifies if 'File/String' contains a string to be passed directly to the function or a path to a file that has to be read first;
- The input checksum is a file: specifies if 'Checksum' contains a string to be passed directly to the function or a path to a file containing the hash.

The first 2 fields can be specified using strings or specific msg attributes.

The node returns a boolean if everything works correctly: true if the checksum given matches the one obtained from the hash function, false otherwise. 


### Examples

As an implementation example with files, see [this flow](https://flows.nodered.org/flow/33b68d640eac3e9a4a29441285a6f4ea).


### Contribution

Feel free to add more options or whatever may be of use.