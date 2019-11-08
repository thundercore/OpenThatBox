import React, { useEffect, useRef } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { Direction, GameService, ICharacter } from '../../service/GameService'
import RockTiles from '../../assets/RockTile.png'

const useStyles = makeStyles<Theme, ICanvasGameProps>((theme: Theme) =>
  createStyles({})
)

interface ICanvasGameProps {
  service: GameService
  stop: boolean
}

const TileSize = 24

export default React.memo(function CanvasGame(props: ICanvasGameProps) {
  const classes = useStyles(props)
  const { service } = props
  const ref = useRef<any>()
  const image = new Image()
  image.src = RockTiles

  const viewPortX = 30
  const viewPortY = 20

  function drawMap(ctx: CanvasRenderingContext2D, bounds: any) {
    for (let x = bounds.boundsXLow; x < bounds.boundsXHigh; x++) {}
    service.map.forEach((row, rowIdx) => {
      row.forEach((tile, colIdx) => {
        ctx.fillStyle = 'red'
        ctx.fillRect(colIdx * TileSize, rowIdx * TileSize, TileSize, TileSize)
      })
    })
  }

  function drawCharacter(ctx: CanvasRenderingContext2D, bounds: any) {
    const { characters } = service
    Object.values(characters).forEach((user) => {
      drawUser(ctx, user)
    })
  }

  function drawUser(ctx: CanvasRenderingContext2D, user: ICharacter) {
    const image = new Image()
    image.src = user.image
    ctx.drawImage(
      image,
      user.x * TileSize,
      user.y * TileSize,
      TileSize,
      TileSize
    )
  }

  function drawGame() {
    if (!ref.current) {
      return
    }
    const ctx: CanvasRenderingContext2D = ref.current.getContext('2d')
    ctx.clearRect(0, 0, viewPortX * TileSize, viewPortY * TileSize)
    const { currentUser } = service
    let boundsXLow = currentUser.x - 15
    let boundsXHigh = currentUser.x + 15
    let boundsYLow = currentUser.y - 15
    let boundsYHigh = currentUser.y + 15
    boundsXHigh = boundsXHigh > service.size ? service.size : boundsXHigh
    boundsXLow = boundsXLow < 0 ? 0 : boundsXLow
    boundsYHigh = boundsYHigh > service.size ? service.size : boundsYHigh
    boundsYLow = boundsYLow < 0 ? 0 : boundsYLow
    const bounds = { boundsXHigh, boundsXLow, boundsYHigh, boundsYLow }
    drawMap(ctx, bounds)
    drawCharacter(ctx, bounds)
    drawUser(ctx, service.currentUser)
    requestAnimationFrame(drawGame)
  }
  requestAnimationFrame(drawGame)

  const keyPressHandler = React.useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowDown' || evt.key === 's') {
        service.move(Direction.Down)
      } else if (evt.key === 'ArrowUp' || evt.key === 'w') {
        service.move(Direction.Up)
      } else if (evt.key === 'ArrowLeft' || evt.key === 'a') {
        service.move(Direction.Left)
      } else if (evt.key === 'ArrowRight' || evt.key === 'd') {
        service.move(Direction.Right)
      }
    },
    [service]
  )

  useEffect(
    () => {
      window.addEventListener('keydown', keyPressHandler)
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', keyPressHandler)
      }
    },
    [keyPressHandler]
  )

  return (
    <canvas
      ref={ref}
      width={viewPortX * TileSize}
      height={viewPortY * TileSize}
    />
  )
})
