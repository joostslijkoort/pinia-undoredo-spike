import structuredClone from '@ungap/structured-clone'
import createStack from './stack'
import { toRaw } from 'vue'

function removeOmittedKeys(options, store) {
  const clone = structuredClone(toRaw(store.$state))
  if (options.undo && options.undo.omit) {
    options.undo.omit.forEach((key) => {
      delete clone[key]
    })
    return clone
  }
  return clone
}

export function piniaUndo({ store, options }) {
  if (options.undo && options.undo.disable)
    return

  const stack = createStack(removeOmittedKeys(options, store))
  let preventUpdateOnSubscribe = false
  
  store.undo = () => {
    preventUpdateOnSubscribe = true
    store.$patch({...stack.undo()})
  }

  store.redo = () => {
    preventUpdateOnSubscribe = true
    store.$patch(stack.redo())
  }

  store.hasUndo = () => {
    return stack.hasUndo()
  }

  store.hasRedo = () => {
    return stack.hasRedo()
  }

  store.$subscribe(() => {
    if (preventUpdateOnSubscribe) {
      preventUpdateOnSubscribe = false
      return
    }
    stack.push(removeOmittedKeys(options, store))
  }, {
    flush: 'sync',
  })
}