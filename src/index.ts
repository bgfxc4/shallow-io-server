import * as ws from "ws"
import express from "express"
import * as fs from "fs"

const config = JSON.parse(fs.readFileSync("./configs/config.json", "utf8"));

const wss = new ws.Server({ port: config.ws_port });

interface player {
	id: number,
	position: {
		x: number,
		y:number
	},
	team: number | undefined,
	health: number,
	velocity: {
		x: number,
		y: number
	}
	rotation: number,
	ingame: boolean,
	ws: any 
}

interface entity {
	id: number,
	type: number,
	velocity: {
		x: number,
		y: number
	},
	position: {
		x: number,
		y: number
	},
	health: number,
	team: number | undefined
}

var players: Array<player>
var playerCount = 0

var entities: Array<entity>

const app = express()

app.use("/", express.static("./client"))

app.listen(config.express_port, () => {
	console.log(`[express] webserver listening on port ${config.express_port}`)
})

wss.on("connection", ws => {
	console.log(`[ws] new websocket connection`)
	var player = createNewPlayer(ws)
	players.push(player)
	ws.on("message", message => {
		handlePacket(message, player);
	})
})

function createNewPlayer(ws: any) {
	var id = playerCount;
	playerCount ++;
	var player: player = {
		id: id,
		position: {
			x: 0,
			y: 0
		},
		team: undefined,
		health: 100,
		velocity: {
			x: 0,
			y: 0
		},
		rotation: 0,
		ingame: false,
		ws: ws
	}
	return player
}

function handlePacket(message: ws.Data, player: player) {
	var data = JSON.parse(message.toString());
	console.log(`[ws] new websocket message: ${data}`);

	if (data.packet == "spawn-request") {
		
	} else if (data.packet == "control") {

	} else {

	}
}

function gameTick() {
	
}
