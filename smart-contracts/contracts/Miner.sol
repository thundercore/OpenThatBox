pragma solidity ^0.5.11;

contract Miner {
    event GameStarted(uint256 endBlock);
    event GameEnded();
    event PlayerMoved(address playerAddress, uint256 positionX, uint256 positionY, uint256 value, uint256 total);
    event PlayerJoined(address playerAddress, uint256 positionX, uint256 positionY, uint256 value, uint256 total);

    mapping (address => Position) public playerPositions;
    mapping (uint => bool) tileRevealed;

    struct Position {
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
    }

    function() external payable {}

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

    function joinGame() external {
        Position storage playerPosition = playerPositions[msg.sender];
        require(!playerPosition.initialized);

        playerPosition.initialized = true;
        playerPosition.x = uint256(keccak256(abi.encodePacked(blockhash(block.number -1), msg.sender))) % size;
        playerPosition.y = uint256(keccak256(abi.encodePacked(blockhash(block.number -2), msg.sender))) % size;
        tileRevealed[playerPosition.x + (playerPosition.y * size)] = true;

        emit PlayerJoined(msg.sender, playerPosition.x,playerPosition.y, 0, address(msg.sender).balance);
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
        uint256 value = tileRevealed[playerPosition.x + (playerPosition.y * size)] ? 0 : 2 ether;
        tileRevealed[playerPosition.x + (playerPosition.y * size)] = true;
        address(msg.sender).transfer(value);
        emit PlayerMoved(msg.sender, playerPosition.x, playerPosition.y,value, address(msg.sender).balance);
    }
}
