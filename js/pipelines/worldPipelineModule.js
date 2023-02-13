import Box from '../classes/Box'

export const initWorldPipelineModule = () => {
  const init = () => {
    Box.init()
  }

  const render = () => {
    Box?.update()
  }

  return {
    name: 'world-content',

    onStart: () => init(),

    onRender: () => render(),
  }
}
