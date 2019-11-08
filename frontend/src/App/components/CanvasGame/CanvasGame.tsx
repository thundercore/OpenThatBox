import React, { useEffect, useRef } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import {
  Direction,
  GameService,
  ICharacter,
  Tile,
} from '../../service/GameService'
import BoxClosed from '../../assets/box-closed.png'

const useStyles = makeStyles<Theme, ICanvasGameProps>((theme: Theme) =>
  createStyles({})
)

interface ICanvasGameProps {
  service: GameService
  stop: boolean
}

const TileSize = 32

export default React.memo(function CanvasGame(props: ICanvasGameProps) {
  const classes = useStyles(props)
  const { service } = props
  const ref = useRef<any>()
  const BoxImage = new Image()
  BoxImage.src = BoxClosed

  const viewPortX = 29
  const viewPortY = 19

  function drawMap(
    ctx: CanvasRenderingContext2D,
    bounds: any,
    currentUser: ICharacter
  ) {
    for (let x = bounds.boundsXLow; x <= bounds.boundsXHigh; x++) {
      for (let y = bounds.boundsYLow; y <= bounds.boundsYHigh; y++) {
        const dx = (x - currentUser.x + viewPortX / 2) * TileSize
        const dy = (y - currentUser.y + viewPortY / 2) * TileSize
        ctx.lineWidth = 2
        ctx.strokeStyle = 'black'
        ctx.strokeRect(dx, dy, TileSize, TileSize)
        if (service.map[x][y] === Tile.Unmined) {
          ctx.drawImage(BoxImage, dx + 5, dy + 5, 20, 20)
        }
      }
    }
  }

  function drawCharacters(
    ctx: CanvasRenderingContext2D,
    bounds: any,
    currentUser: ICharacter
  ) {
    const { characters } = service
    Object.values(characters).forEach((user) => {
      if (
        user.x >= bounds.boundsXLow &&
        user.x <= bounds.boundsXHigh &&
        user.y >= bounds.boundsYLow &&
        user.y <= bounds.boundsYHigh
      ) {
        drawUser(ctx, user, currentUser)
      }
    })
  }

  function drawUser(
    ctx: CanvasRenderingContext2D,
    user: ICharacter,
    currentUser: ICharacter
  ) {
    const image = new Image()
    image.src = user.image
    ctx.drawImage(
      image,
      (user.x - currentUser.x + viewPortX / 2) * TileSize + 6,
      (user.y - currentUser.y + viewPortY / 2) * TileSize + 6,
      20,
      20
    )
  }

  function drawCurrentUser(ctx: CanvasRenderingContext2D, user: ICharacter) {
    const image = new Image()
    image.src = user.image
    // always in the center
    ctx.drawImage(
      image,
      (viewPortX * TileSize) / 2 + 6,
      (viewPortY * TileSize) / 2 + 6,
      20,
      20
    )
  }

  function drawGame() {
    if (!ref.current) {
      return
    }
    const ctx: CanvasRenderingContext2D = ref.current.getContext('2d')
    ctx.clearRect(0, 0, viewPortX * TileSize, viewPortY * TileSize)
    const { currentUser } = service
    // always in the middle
    let boundsXLow =
      Math.round(currentUser.x) - 15 < 0 ? 0 : Math.round(currentUser.x) - 15
    let boundsXHigh =
      Math.round(currentUser.x) + 14 > service.size - 1
        ? service.size - 1
        : Math.round(currentUser.x) + 14
    let boundsYLow =
      Math.round(currentUser.y) - 10 < 0 ? 0 : Math.round(currentUser.y) - 10
    let boundsYHigh =
      Math.round(currentUser.y) + 10 > service.size - 1
        ? service.size - 1
        : Math.round(currentUser.y) + 10

    boundsXHigh =
      boundsXHigh > service.size - 1 ? service.size - 1 : boundsXHigh
    boundsXLow = boundsXLow < 0 ? 0 : boundsXLow
    boundsYHigh =
      boundsYHigh > service.size - 1 ? service.size - 1 : boundsYHigh
    boundsYLow = boundsYLow < 0 ? 0 : boundsYLow
    const bounds = { boundsXHigh, boundsXLow, boundsYHigh, boundsYLow }

    drawMap(ctx, bounds, service.currentUser)

    drawCharacters(ctx, bounds, service.currentUser)
    drawCurrentUser(ctx, service.currentUser)

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
