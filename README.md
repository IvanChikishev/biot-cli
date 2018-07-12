# biot-cli

## Cli manager, a tool for  access to api [biot-core](https://github.com/BIoTws/biot-core), the initialization of the websocket server, as rpc server.
</br></br>


## how to install
```
> sudo npm install -g https://github.com/remmelgas/biot-cli
```
</br>

## Commands

### get commands list write to terminal
```
> biot-cli --help
```
</br></br>

## Examples

### run WebSocket server listener
```
> biot-cli initSocketWs 127.0.0.1 3303
```
</br>

### run RPC server listener
```
> biot-cli initSocketRpc 127.0.0.1 3303
```