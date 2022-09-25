var should = require("should");
var helper = require("node-red-node-test-helper");

var requiredNodes = [
    require("../checksum/checksum.js")
];


describe('Checksum node', function () {

    before(() => {
        helper.init(require.resolve('node-red'));
    });

    beforeEach(function (done) {
        helper.startServer(done);
    });

    afterEach(function(done) {
        helper.unload().then(function () {
            helper.stopServer(done);
        });
    });


    //check correct loading
    it('should be loaded', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");

            try {
                n1.should.have.property('name', 'checksum');
                
                done();

            } catch (err) {
                done(err);
            }
        });
    });

    //MD5
    it('should provide the correct md5 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "0a5cb2b60d20b9c9458e0fabc0cb66f0",
                hashFunctionType: "select", hashFunction: "md5", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("payload");
                    msg.payload.toString().should.equal("true");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });

    //MD5 based on msg.calcChecksum
    it('should return the correct md5 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "wrongChecksum",
                hashFunctionType: "select", hashFunction: "md5", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("calcChecksum");
                    msg.calcChecksum.toString().should.equal("0a5cb2b60d20b9c9458e0fabc0cb66f0");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });

    //SHA1
    it('should provide the correct SHA-1 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "3f1ef5e9b3d411323ceb96a7a2809d87d3b30925",
                hashFunctionType: "select", hashFunction: "sha1", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("payload");
                    msg.payload.toString().should.equal("true");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });

    //sha512
    it('should provide the correct SHA-512 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "537eb32701012329cf44dfe3dbd27954cd1e081980e68a91beb00be8ddbae936a8c468bd8188ff47e32a3658a4b37d9031f06e19028a2c61c27e1a54b141fee4",
                hashFunctionType: "select", hashFunction: "sha512", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("payload");
                    msg.payload.toString().should.equal("true");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });

    //sha384
    it('should provide the correct SHA-384 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "3be1fa761227c5e99a684d551b88e56a0ca5b7ae9afeeb19d1628c2e5197aea84406c4dfdc110acdac852e5c234130ad",
                hashFunctionType: "select", hashFunction: "sha384", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("payload");
                    msg.payload.toString().should.equal("true");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });

    //SHA256
    it('should provide the correct SHA-256 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "4e8c29fa7c652062640981bb2d115669c4244d0b56e89e2f977147d2321bb6e7",
                hashFunctionType: "select", hashFunction: "sha256", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("payload");
                    msg.payload.toString().should.equal("true");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });

    //sha224
    it('should provide the correct SHA-224 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "70f420e1e0e90ac10118e96fec8d032042829549e05ed0942b419cd4",
                hashFunctionType: "select", hashFunction: "sha224", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("payload");
                    msg.payload.toString().should.equal("true");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });

    //Keccak_512
    it('should provide the correct Keccak-512 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "fc2f4a86e010128ec2707098c5f7411f089faeb15a4db8882af1c2d626e946afb639b7ca3beacbb490d1633c0ac4adb429201e496ccd421bed88e5039a54d8bc",
                hashFunctionType: "select", hashFunction: "sha3_512", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("payload");
                    msg.payload.toString().should.equal("true");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });

    //Keccak_384
    it('should provide the correct Keccak-384 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "ce3048f188f290997744b5caed4c1ad846ed6577f4457d5afd45df1c3e57a53beee99cc94b36ff95b1885626f1b9134c",
                hashFunctionType: "select", hashFunction: "sha3_384", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("payload");
                    msg.payload.toString().should.equal("true");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });

    //Keccak_256
    it('should provide the correct Keccak-256 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "6d4ae7c6df9a159e68839e7731fb0478b5bc607a2fed1833b38a01db6fee91dc",
                hashFunctionType: "select", hashFunction: "sha3_256", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("payload");
                    msg.payload.toString().should.equal("true");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });
    
    //Keccak_224
    it('should provide the correct Keccak-224 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "8b25b702a47b6ffb816a08ed81c74b37f37ffd2784a6859bf93d6b8d",
                hashFunctionType: "select", hashFunction: "sha3_224", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("payload");
                    msg.payload.toString().should.equal("true");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });
    
    //ripemd160
    it('should provide the correct RIPEMD-160 checksum', function (done) {
        var flow = [
            { id: "n1", type: "checksum", name: "checksum", 
                fileType: "string", file: "string to test",
                checksumType: "string", checksum: "db74981d94309d9aec7f35b7561bf1cce9fd08a4",
                hashFunctionType: "select", hashFunction: "ripemd160", 
                isFile: false, isFileChecksum: false,
                wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(requiredNodes, flow, function () {

            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");

            n2.on("input", function (msg) {
                try {
                    msg.should.have.a.property("payload");
                    msg.payload.toString().should.equal("true");
                    done();
                } catch (err) {
                    done(err);
                }
            });

            n1.receive({});
        });
    });
});