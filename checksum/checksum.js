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

            //if payload is a file
            if (node.isFile){

                var fs = require("fs");

                var data = fs.readFileSync(msg.payload).toString();

                cs = HASH(data).toString();

            //if payload is a string
            } else {

                cs = HASH(msg.payload).toString();
            }

            if (!msg.checksum || !msg.payload){
                msg.payload = "Missing parameters (payload or checksum)!";

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