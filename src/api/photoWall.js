import service from '../utils/require'

export const login = data => {

  return service({
    method: 'post',
    url: '/login',
    data
  })
}
export const getValidateCode = data => {

  return service({
    method: 'post',
    url: '/active',
    data
  })
}

