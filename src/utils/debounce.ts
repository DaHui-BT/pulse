function useDebounce() {
  let timer: number | null = null

  function _debounce(callback: Function, duration: number = 1000, 
                     controller: AbortController | null = null, ...args: any[]) {

    if (timer) {
      clearTimeout(timer)
      // controller && controller.abort()
    }

    timer = setTimeout(async () => {
      callback(args)
    }, duration) as unknown as number
  }

  return _debounce
}

export {
  useDebounce
}
