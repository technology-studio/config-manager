/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-04-05T14:04:21+02:00
 * @Copyright: Technology Studio
**/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidValue = Record<string, any> | null | undefined

export function shallowEqualObjects (objA: ValidValue, objB: ValidValue): boolean {
  if (objA === objB) {
    return true
  }

  if ((objA == null) || (objB == null)) {
    return false
  }

  const aKeys = Object.keys(objA)
  const bKeys = Object.keys(objB)
  const len = aKeys.length

  if (bKeys.length !== len) {
    return false
  }

  for (let i = 0; i < len; i++) {
    const key = aKeys[i]

    if (objA[key] !== objB[key] || !Object.prototype.hasOwnProperty.call(objB, key)) {
      return false
    }
  }

  return true
}
