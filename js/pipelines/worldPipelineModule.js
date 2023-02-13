import Layout from '../classes/Layout'
import Immersal from '../classes/Immersal'
import Model from '../classes/Model'
import Lights from '../classes/Lights'

export const initWorldPipelineModule = () => {
  const init = () => {
    Layout.init()
    Immersal.init()
    Model.init()
    Lights.init()
  }

  const render = () => {
    Model?.update()
  }

  return {
    name: 'world-content',

    onStart: () => init(),

    onRender: () => render(),
  }
}
