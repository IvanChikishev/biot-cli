const biot = require('biot-core');
const program = require('commander');

const stateSequence = [
    { 'address': biot.getMyDeviceWallets, onlycli: false, 'description': 'test description' },
    { 'address': socket_rpc, onlycli: true, 'description': 'init rpc service' },
    { 'address': biot.getWallets },
    { 'address': socket_ws, onlycli: true }
];

const socketStateSequence = (() => {
    let socketStateSequence = [];

    for (let eventIndex in stateSequence)
        if (!stateSequence[eventIndex].onlycli)
            socketStateSequence.push(stateSequence[eventIndex].address);

    return socketStateSequence;
})();

function socket_ws(host, port) {
    const socket = require('biot-networking');
    const server = socket.init(socket.bind(socketStateSequence), {
        host: '127.0.0.1', port: 3303
    });
}

function socket_rpc(host, port) {

    const server = require('biot-rpc').createServer(socketStateSequence);
    server.http().listen(4303);

    return `Server is running ${host}:${port}`;
}

async function Start() {
    await biot.init('test');

    program.setMaxListeners(stateSequence.length);

    for (let eventIndex in stateSequence) {
        let eventState = stateSequence[eventIndex];

        program
            .command(`${eventState.name || eventState.address.name} [args...]`)
            .description(`${eventState.description || 'descriptior not found'}`)
            .action(async function (args) {
                await eventState.address(...args);
            });
    }


    program.parse(process.argv);
    return 'Ok';
}

Start().then(console.log).catch(console.error);