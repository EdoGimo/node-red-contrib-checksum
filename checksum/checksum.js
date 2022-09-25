module.exports = function(RED) {
    function ChecksumNode(config) {
        RED.nodes.createNode(this,config);

        //options
        this.file = config.file;
        this.fileType = config.fileType;
        this.checksum = config.checksum;
        this.checksumType = config.checksumType;
        this.hashFunction = config.hashFunction;
        this.hashFunctionType = config.hashFunctionType;
        this.isFile = config.isFile;
        this.isFileChecksum = config.isFileChecksum;

        var node = this;
        node.on('input', function(msg, send, done) {

            var fileField;
            var checksumField;
            var hashFunctionField;

            //get the actual value of FILE and CHECKSUM if msg was selected
            if(node.fileType == "msg"){
                fileField = RED.util.getMessageProperty(msg,node.file);
            }else{
                fileField = node.file;
            }
            if(node.checksumType == "msg"){
                checksumField = RED.util.getMessageProperty(msg,node.checksum);
            }else{
                checksumField = node.checksum;
            }

            try{

                var functions = ['md5', 'sha1', 'sha512', 'sha384', 'sha256', 'sha224', 'sha3_512', 'sha3_384', 'sha3_256', 'sha3_224', 'ripemd160'];
                if(node.hashFunctionType == "msg"){
                    hashFunctionField = RED.util.getMessageProperty(msg, node.hashFunction);

                    //control if hash function exists
                    if(typeof(hashFunctionField) != "string" || !(functions.includes(hashFunctionField)) ){
                        throw new Error("Something wrong with the hash function in the msg field (not supported or not a string)!");
                    }
                }else{
                    hashFunctionField = node.hashFunction;
                }

                //close if parameters are missing
                if (!fileField){
                    throw new Error("Message/File field has not been specified, or the msg is empty!");
                }

                if (!checksumField){
                    throw new Error("Checksum field has not been specified, or the msg is empty!");
                }


                //MAIN code
                var HASH;
                var sha3 = hashFunctionField.startsWith("sha3_");   //SHA-3 is actually Keccak in the module!!!

                if(sha3){
                    HASH = require("crypto-js/sha3");
                } else {
                    HASH = require("crypto-js/" + hashFunctionField);
                }

                var hashInput;

                //if payload is a file
                if (node.isFile){
    
                    var fs = require("fs");

                    try{
                        hashInput = fs.readFileSync(fileField).toString();
                    
                    } catch (err) {
                        if (err.code === 'ENOENT'){
                            throw new Error("File to hash not found! Check the path provided.");
                        } else{
                            throw err;
                        }
                    }

                //if payload is a string
                } else {
    
                    hashInput = fileField;
                }

                //hashing (outputLength specified in case of sha3)
                var cs;
                var bits;

                if(sha3){
                    bits = parseInt( ((hashFunctionField).split("_"))[1] );

                    cs = HASH(hashInput, { outputLength: bits }).toString();

                } else {
                    cs = HASH(hashInput).toString();
                }


                var hashChecksum;
            
                //if checksum is a file
                if (node.isFileChecksum){
    
                    var fs = require("fs");
    
                    try {
                        hashChecksum = fs.readFileSync(checksumField).toString();
    
                    } catch (err) {
                        if (err.code === 'ENOENT'){
                            throw new Error("Checksum file not found! Check the path provided.");
                        } else{
                            throw err;
                        }
                    }

                //if checksum is a string
                } else {
                    hashChecksum = checksumField;
                }
    
                if (cs === hashChecksum) {
                    msg.payload = true;
                }
                else {
                    msg.payload = false;
                }

                //return the calculated checksum
                msg.calcChecksum = cs;

                send(msg);
                done();

            } catch (e) {

                node.error(e.message, msg);
                return null;
            }
        });
    }
    RED.nodes.registerType("checksum", ChecksumNode);
}