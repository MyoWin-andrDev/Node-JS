let liveUser = async(socketId, user) => {

}

const initialize = async (io, socket) => {
    socket.emit("Greet", "Hello!");
    console.log("UserData:", socket.userData);
    console.log("Socket ID", socket.id);
}

module.exports = {
    liveUser,
    initialize,
}