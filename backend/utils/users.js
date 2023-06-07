const users = [];
// add user to list
const addUser = ({name,userId,roomId,host,presenter,socketId}) => {
    const user = {name,userId,roomId,host,presenter,socketId};
    users.push(user);
    return users.filter((user)=>user.roomId===roomId);
};

// remove user to list
const removeUser = (id) => {
    const index = users.findIndex((user)=>user.socketId ===id);
    if(index!=-1){
        return users.splice(index,1)[0];
    }
};

// get user from list
const getUser = (id) => {
    return users.find((user)=>user.socketId===id);
};

// get all user from list
const getUserInRoom = (roomId) => {
    return users.filter((user)=>user.roomId===roomId);
};

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom,
};