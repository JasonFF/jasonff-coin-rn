// import fetch from 'isomorphic-fetch'
import {parseParams} from './utils'

export default function action(config) {
  let {params, url, ...restConfig} = config
  if (params) {
    url = url + parseParams(params)
  }
  return fetch(url,{
    ...restConfig
  }).then(res => {
    return res.json()
  })
}
