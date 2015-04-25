keys = 
  TWITTER_CLIENTID: ''
  TWITTER_SECRET: ''
  GITHUB_CLIENTID: ''
  GITHUB_SECRET: ''
for key of keys
  if keys.hasOwnProperty(key)
    if !keys[key]
      message = '  Set ' + key + ' in config/env/keys.js'
      console.error '\n' + message
      console.error '  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n'
      throw new Error(message)
module.exports = keys
