import { Socket } from 'socket.io';
import { PlayerStatus } from 'src/gameengine/example/socket-server-game';
import { Engine } from 'src/gameengine/engine';
import { SocketPlayer } from './soketPlayer';

export class RoomGateway {
    private players: SocketPlayer[] = [];

    roomId: string | undefined;

    expectedPlayers: number | undefined;

    constructor(
        roomId: string,
        expectedPlayers: number,
    ) {
        this.roomId = roomId;
        this.expectedPlayers = expectedPlayers;
    }

    clientConnected(socket: Socket) {
        const player = new SocketPlayer(socket, this.roomId);
        if (!this.players.includes(player)) {
            this.players.push(player);
            console.log('roonId:', this.roomId);
            console.log('expectedPlayers:', this.expectedPlayers);
            socket.emit('status', { status: PlayerStatus.REGISTERED, index: this.players.length - 1 });
            if (this.players.length === this.expectedPlayers) {
                this.startGame();
            }
        }
    }

    clienDisconnected() {

    }

    async startGame() {
        for (const player of this.players) {
            player.socket.emit('status', { status: PlayerStatus.STARTED });
        }
        const engine = new Engine(this.players);
        const winner = await engine.start();
        const winnerIndex = this.players.findIndex((player) => player === winner);
        for (const player of this.players) {
            player.socket.emit('status', { status: PlayerStatus.FINISHED, winnerIndex });
            player.socket.disconnect();
        }
    }
}
