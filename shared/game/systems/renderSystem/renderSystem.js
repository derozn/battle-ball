export default class RenderSystem {
  constructor ({ manager, game }) {
    this.manager = manager
    this.game = game
  }

  renderScene () {
    let tiles = this.manager.getComponentsData('tile')
  }

  update (delta) {
    // draw tiles
    this.renderScene()
  }
}
