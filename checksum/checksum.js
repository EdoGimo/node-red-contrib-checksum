module.exports = function(RED) {
    function ChecksumNode(config) {
        RED.nodes.createNode(this,config);

        //options
        this.hashFunc = config.hashFunc;
        this.isFile = config.isFile;
        this.isFileChecksum = config.isFileChecksum;

        var node = this;
        node.on('input', function(msg) {

            //close if configuration was not set
            if(!node.hashFunc){
                node.warn("Edit the configuration first!");
                return null;
            }

            //close if parameters are missing
            if (!msg.checksum || !msg.payload){
                node.warn("Missing parameters (payload or checksum)!");
                return null;

            
            //regular execution
            }else{

                var HASH = require("crypto-js/" + node.hashFunc);

                var hashInput;
                var hashChecksum;

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

                //if checksum is a file
                if (node.isFileChecksum){

                    var fs = require("fs");

                    try {
                        hashChecksum = fs.readFileSync(msg.checksum).toString();

                    } catch (err) {
                        if (err.code === 'ENOENT'){
                            node.warn("Checksum file not found! Check the path provided.");
                            return null;
                        } else{
                            throw err;
                        }
                    }

                //if checksum is a string
                } else {

                    hashChecksum = msg.checksum;
                }

                if (cs === hashChecksum) {
                    msg.payload = true;
                }
                else {
                    msg.payload = false;
                }
            }

            //remove 'checksum' property from msg
            msg.checksum = null;

            node.send(msg);
        });
    }
    RED.nodes.registerType("checksum", ChecksumNode);
}