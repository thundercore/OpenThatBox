pragma solidity ^0.5.11;

contract Miner {
    event GameStarted(uint256 endBlock);
    event GameEnded();
    event PlayerMoved(address playerAddress, uint256 positionX, uint256 positionY, uint256 value, uint256 total);
    event PlayerJoined(address playerAddress, uint256 positionX, uint256 positionY);

    uint256[][] map;
    mapping (address => Position) public playerPositions;

    struct Position {
        uint256 total;
        uint256 x;
        uint256 y;
        bool initialized;
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
    uint256 public size;
    GameState public state;


    constructor(uint _size) public {
        owner = msg.sender;
        state = GameState.Constructed;
        size = _size;
        initMap();
    }

    function initMap() internal {
        map = new uint[][](size);
        for (uint y=0 ; y < size; y++) {
            uint[] memory temp = new uint[](size);
            for(uint x = 0; x < size; x++){
                if(x==0 || x == size-1 || y ==0 || y ==size-1){
                    temp[x]= 0;
                }else {
                    temp[x] = 1;
                }
            }
            map[y] = temp;
        }
    }

    function startGame(uint256 _blocksUntilEnd) external payable {
        require(state == GameState.Constructed);
        require(msg.sender == owner);
        endBlock = block.number + _blocksUntilEnd;
        emit GameStarted(endBlock);
    }

    function checkGameEnd() internal {
        if(block.number > endBlock) {
            state = GameState.Ended;
            emit GameEnded();
        }
    }

    function setPosition(uint _x, uint _y) external {
        Position storage playerPosition = playerPositions[msg.sender];
        require(!playerPosition.initialized);
        require(_x == 0 || _y == 0 || _x==size-1 || _y==size-1);
        playerPosition.initialized = true;
        playerPosition.x = _x;
        playerPosition.y = _y;
        emit PlayerJoined(msg.sender, _x,_y);
    }

    function move(Direction _direction) external {
//        require(state == GameState.Started);
        Position storage playerPosition = playerPositions[msg.sender];
        if(_direction == Direction.Left) {
            playerPosition.x--;
        }else if(_direction == Direction.Right) {
            playerPosition.x++;
        }else if(_direction == Direction.Up){
            playerPosition.y--;
        } else if(_direction == Direction.Down) {
            playerPosition.y++;
        }
        getRewards(playerPosition);
    }

    function getRewards(Position storage playerPosition) internal {
        uint256 value = map[playerPosition.x][playerPosition.y];
        playerPosition.total += value;
        map[playerPosition.x][playerPosition.y] = 0;
        emit PlayerMoved(msg.sender, playerPosition.x, playerPosition.y,value,playerPosition.total);
    }
}
