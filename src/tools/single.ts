function singleton<T extends new (...args: any[]) => InstanceType<T>>(className: T) {
  let ins: InstanceType<T> | null = null;

  return new Proxy<T>(className, {
    construct(target: T, args: ConstructorParameters<T>) {
      if (!ins) {
        ins = new target(...args)
      }
      return ins as unknown as object
    },
  })
}

export default singleton
