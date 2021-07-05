# node-red-contrib-checksum

A simple checksum utility for [Node-RED](https://nodered.org/), based on [crypto-js](https://www.npmjs.com/package/crypto-js).


### Prerequisites

Node-RED installed. Latest version should work.


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

The node must get as input a msg object, containing the 'payload' and 'checksum' properties.
If one of these is missing, the output will be a string telling so.

There are 2 options in the Properties tab of the node:
- Hash function: allows to choose the necessary function between those supported.
- The input payload is a file: specifies if 'payload' contains a string to be passed directly to the function or a file that has to be read first.

The node returns a boolean if everything works correctly: true if the checksum given matches the one obtained from the hash function, false otherwise. 


### Contribution

Feel free to add more options or whatever may be of use.