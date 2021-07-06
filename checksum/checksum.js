module.exports = function(RED) {
    function ChecksumNode(config) {
        RED.nodes.createNode(this,config);

        //options
        this.hashFunc = config.hashFunc;
        this.isFile = config.isFile;

        var node = this;
        node.on('input', function(msg) {

            if(!node.hashFunc){
                node.warn("Edit the configuration first!");
                return null;
            }

            var HASH = require("crypto-js/" + node.hashFunc);

            var hashInput;

            //if payload is a file
            if (node.isFile){

                var fs = require("fs");

                try {
                    hashInput = fs.readFileSync(msg.payload).toString();

                  } catch (err) {
                    if (err.code === 'ENOENT'){
                        node.warn("File not found! Check the path provided.");
                        return null;
                    } else{
                        throw err;
                    }
                  }

            //if payload is a string
            } else {

                hashInput = msg.payload;
            }

            //hashing
            cs = HASH(hashInput).toString();

            if (!msg.checksum || !msg.payload){
                node.warn("Missing parameters (payload or checksum)!");
                return null;

            }else{

                if (cs === msg.checksum) {
                    msg.payload = true;
                }
                else {
                    msg.payload = false;
                }
            }

            //remove 'checksum' property
            msg.checksum = null;

            node.send(msg);
        });
    }
    RED.nodes.registerType("checksum", ChecksumNode);
}