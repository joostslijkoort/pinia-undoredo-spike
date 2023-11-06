export default function createStack(current) {
    const stack = [current]
  
    let index = stack.length
  
    function update() {
      current = stack[index - 1]
  
      return current
    }
  
    return {
      push: (value) => {
        stack.length = index
        stack[index++] = typeof value === 'function' ? (value)(current) : value
  
        return update()
      },
      undo: () => {
        if (index > 1)
          index -= 1
        return update()
      },
      redo: () => {
        if (index < stack.length)
          index += 1
        return update()
      },
      hasUndo: () => index > 1,
      hasRedo: () => stack.length !== index
    }
  }
  