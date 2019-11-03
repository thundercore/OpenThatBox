pragma solidity ^0.5.11;

contract Miner {
    event GameStarted(uint256 endBlock);
    event GameEnded();
    event PlayerMoved(address playerAddress, uint256 positionX, uint256 positionY, uint256 value);

    uint256[][] map;
    mapping (address => Position) playerPositions;

    struct Position {
        uint256 total;
        uint256 x;
        uint256 y;
    }

    enum Direction {
        Left,
        Right,
        Down,
        Up
    }

    enum GameState {
        Constructed,
        Started,
        Ended
    }

    address owner;
    uint256 endBlock;
    GameState state;

    constructor() public {
        owner = msg.sender;
        state = GameState.Constructed;
    }

    function startGame(uint256 blocksUntilEnd) external payable {
        require(state == GameState.Constructed);
        require(msg.sender == owner);
        endBlock = block.number + blocksUntilEnd;
        emit GameStarted(endBlock);
    }

    function checkGameEnd() internal {
        if(block.number > endBlock) {
            state = GameState.Ended;
            emit GameEnded();
        }
    }

    function move(Direction direction) external {
        require(state == GameState.Started);
        Position storage playerPosition = playerPositions[msg.sender];
        if(direction == Direction.Left) {
            playerPosition.x--;
        }else if(direction == Direction.Right) {
            playerPosition.x++;
        }else if(direction == Direction.Up){
            playerPosition.y++;
        } else if(direction == Direction.Down) {
            playerPosition.y--;
        }
        getRewards(playerPosition);
    }

    function getRewards(Position storage playerPosition) internal {
        playerPosition.total += map[playerPosition.x][playerPosition.y];
        map[playerPosition.x][playerPosition.y] = 0;
    }
}
