import { isEof, isNotEof } from './helpers'

const INFERENCE = {
  ARRAY: (lz) => {
    const result = []
    let value = null

    do {
      value = lz()

      if (isEof(value)) break

      result.push(value)
    } while (isNotEof(value))

    return result
  },
  OBJECT: (lz) => {
    const shape = {}
    let value = null

    do {
      value = lz()

      if (isEof(value)) break

      Object.assign(shape, value)
    } while (isNotEof(value))

    return shape
  },
  ANY: (lz) => {
    let value = null

    do {
      const bufferValue = lz()
      if (isEof(bufferValue)) break
      value = bufferValue
    } while (isNotEof(value))

    return value
  },
}

const infer = type => fn => {
  fn.__infer__ = type
  return Object.freeze(fn)
}

export const inferArray = infer(INFERENCE.ARRAY)
export const inferObject = infer(INFERENCE.OBJECT)
export const inferAny = infer(INFERENCE.ANY)
export const applyInference = func => func.__infer__(func)