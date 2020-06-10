const socketio= require("socket.io")
const Filter= require("bad-words")
const {addUser,removeUser,getUser,getUsersInRoom}= require("./../utils/users")
const utils=require("./../utils/messages.js")
const generateMessage=utils.generateMessage
const Channel= require("./../models/channel.js")
const Room=require("../models/room.js")
const allowedToEnterRoom=require("../utils/allowedToEnterRoom.js")
const User= require("../models/user.js")
const Message= require("../models/message.js")

module.exports= function(io){

io.on("connection",(socket)=>{
	console.log("A new Connection is created ")
	
	socket.on('join', async ({ username, room, token },callback) => {
		
		//user token verified, check if any such room is present 
		// and is user member of that room
		try{	
			await allowedToEnterRoom(token,room,socket)
		}
		catch(error){
			console.log(error.messsage)
			return callback(error,null)
		}

		//joining user o all channels present in room
        var channels=await Room.getAllChannels(room)
		// this room is used just for sending room specific data like user going offline
		socket.join(room)

		//user added to online users loist
		socket.room.online.push({
			socketId:socket.id,
			user:socket.user._id
		})
		await socket.room.save()

		// get all online user documents 
		var onlineUsers= await Room.getAllOnlineUsers(room)

		//extracting only usernames from user documents to be sent back
		var onlineUsernames= onlineUsers.map((connection)=>{
			return connection.user.username
		})
	   
		//sending all current online users back
        io.to(room).emit("roomData",{
			type:"Online Users",
			onlineUsers:onlineUsernames
		})

		//sending some data back to user
        callback(null,{
			channels,
			onlineUsers:onlineUsernames
		})
        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit
    })
	
	socket.on('send',async (packet,callback)=>{
		//user token verified, check if any such room is present 
		// and is user member of that room
		try{	
			await allowedToEnterRoom(packet.token,packet.room,socket)
		}
		catch(error){
			console.log(error.messsage)
			return callback(error,null)
		}
		//saving the message to db
		await Message.saveMessage(socket.user._id,packet.channel,packet.msg,packet.type)
		packet.username=socket.user.username
		delete packet.token
		const filter = new Filter()
		if(filter.isProfane(packet.msg))
			return callback({
				message:"Profanity not allowed"
			})
		console.log(packet)
		io.to(packet.room).emit("recieve",generateMessage(packet))
		callback()
	})
	//update last seen of user
	//update online users list
	//get latest room of online users
	//emit event regarding online users
	socket.on('disconnect',async () => {
		
		//finding a room which user left
		var room = await Room.findOne({
			'online.socketId':socket.id
		})
		
		//updating user last senn to current time
		var userId= room.online.filter((val)=>{
			console.log(val.socketId==socket.id)
			return val.socketId==socket.id
		})[0].user
		
		var user =await User.findOne({
			_id:userId
		})
		user.lastSeen=Date.now()

		await user.save()
		//removing the user from online users list
		room.online=room.online.filter((val)=>{
			return val.socketId!=socket.id
		})
		await room.save() 
	
		//again getting back all online users
		var onlineUsers= await Room.getAllOnlineUsers(room.title)
		//extracting only usernames from user documents
		var onlineUsernames= onlineUsers.map((connection)=>{
			return connection.user.username
		})

		//sending room data about online users back
		io.to(room.title).emit("roomData",{
			type:"Online Users",
			onlineUsers:onlineUsernames
		})

  	});
})

}