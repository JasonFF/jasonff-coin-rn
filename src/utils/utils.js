import {Dimensions} from 'react-native'

export function getWindowSize () {
  return Dimensions.get('window')
}

export function parseParams(obj) {
  let result = '?'
  Object.keys(obj).forEach(it => {
    let str = `${it}=${JSON.stringify(obj[it])}&`
    result = result + str
  })
  return result.slice(0, -1)
}
