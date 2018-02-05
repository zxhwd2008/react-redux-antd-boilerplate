export const createUrlQuery = (url) => (param = null) =>  {
  const key = param ? Object.keys(param)[0] : null,
        value = param ? param[key] : null
  return param ? createUrlQuery(url + (url.substr(url.length - 1) === '?' ? '' : '&') +
    key + '=' + encodeURIComponent(value)) : url
}
