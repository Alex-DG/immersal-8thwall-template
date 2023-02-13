import Layout from '../classes/Layout'
import Immersal from '../classes/Immersal'

export const initWorldPipelineModule = () => {
  const init = () => {
    Layout.init()
    Immersal.init()
  }

  const render = () => {}

  return {
    name: 'world-content',

    onStart: () => init(),

    onRender: () => render(),
  }
}
