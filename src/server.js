import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(() => {
    // console.log('store changed: emit state');
    io.emit('state', store.getState().toJS());
  });

  io.on('connection', (socket) => {
    // console.log('connection: emit state');
    socket.emit('state', store.getState().toJS());
    socket.on('action', function() {
      console.log('receive action', arguments[0].type);
      store.dispatch.apply(store, arguments);
    });
  });
}
