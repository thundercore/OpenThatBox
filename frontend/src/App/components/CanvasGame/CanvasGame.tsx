import React, { useRef } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { GameService } from '../../service/GameService'
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

  function drawMap(ctx: CanvasRenderingContext2D) {
    service.map.forEach((row, rowIdx) => {
      row.forEach((tile, colIdx) => {
        ctx.fillStyle = 'red'
        // ctx.drawImage(
        //   image,
        //   colIdx * TileSize,
        //   rowIdx * TileSize,
        //   TileSize,
        //   TileSize
        // )
        ctx.fillRect(colIdx * TileSize, rowIdx * TileSize, TileSize, TileSize)
      })
    })
  }

  function drawUser(ctx: CanvasRenderingContext2D) {
    const { currentUser } = service
    const image = new Image()
    image.src = currentUser.image
    ctx.drawImage(
      image,
      currentUser.x * TileSize,
      currentUser.y * TileSize,
      TileSize,
      TileSize
    )
  }

  function drawGame() {
    if (!ref.current) {
      return
    }
    const ctx: CanvasRenderingContext2D = ref.current.getContext('2d')
    ctx.clearRect(0, 0, 800, 800)
    drawMap(ctx)
    drawUser(ctx)
    requestAnimationFrame(drawGame)
  }
  requestAnimationFrame(drawGame)

  return <canvas ref={ref} width={800} height={700} />
})
