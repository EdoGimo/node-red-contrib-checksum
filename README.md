# node-red-contrib-checksum

A simple checksum utility for [Node-RED](https://nodered.org/), based on [crypto-js](https://www.npmjs.com/package/crypto-js).


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

The node must get as input a *msg* object, containing both the 'payload' (string, or path to the file, to be hashed) and 'checksum' (the checksum as a string) properties.

There are 2 options in the Properties tab of the node:
- Hash function: allows to choose the necessary function between those supported.
- The input payload is a file: specifies if 'payload' contains a string to be passed directly to the function or a file that has to be read first.

The node returns a boolean if everything works correctly: true if the checksum given matches the one obtained from the hash function, false otherwise. 


### Examples

As an implementation example, see [this flow](https://flows.nodered.org/flow/33b68d640eac3e9a4a29441285a6f4ea).


### Security note

Path traversal is not taken into consideration here, since the node only elaborates the checksum and returns a boolean for result.


### Contribution

Feel free to add more options or whatever may be of use.