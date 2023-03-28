// import { Server, Socket } from 'socket.io'

// class SocketIO {
//     io: any
//     init (server: any) {
//         return this.io = new Server(server, {
//             cors: {
//                 origin: '*',
//                 methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
//             }
//         })
//     }

//     getIO () {
//         if (!this.io) {
//             throw new Error('Socket io not initialized')
//         }
//         return this.io
//     }
// }

// export default new SocketIO()
// // export const io = new Server(server, {
// //     cors: {
// //         origin: '*',
// //         methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
// //     }
// // })