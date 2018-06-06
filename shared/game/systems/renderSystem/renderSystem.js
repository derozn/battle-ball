import { mapToIsoCoord } from '../../helpers'
import isDev from 'isdev'

export default class RenderSystem {
  constructor ({ manager, game, camera }) {
    this.manager = manager
    this.game = game
    this.camera = camera
  }

  update (delta) {
    const players = this.manager.getComponentsData('Player')
    const { x: cameraX, y: cameraY } = this.manager.getComponentDataForEntity('Position', this.camera)

    for (const playerId in players) {
      const player = players[playerId].entityId
      const { x, y, z } = this.manager.getComponentDataForEntity('Position', player)
      const { width, name, height } = this.manager.getComponentDataForEntity('Sprite', player)

      const { x: pX, y: pY } = mapToIsoCoord(x, y)

      const { img } = this.game.assetManager.getAsset(name)

      if (img) {
        this.game.ctx.drawImage(img, pX + cameraX, (pY - z) + cameraY, width, height)
      }

      if (isDev) {
        this.game.ctx.strokeRect(pX + cameraX, (pY - z) + cameraY, width, height)
      }
    }
  }
}
