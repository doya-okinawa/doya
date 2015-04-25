keys = 
  TWITTER_CLIENTID: '09PXVTiBT1uhx5RXxPR2t0IOj'
  TWITTER_SECRET: '7sgJzYXyN1S6moTzUqQdCyjpa1U8voDlultj78w8F4HAdKpzCa'
  GITHUB_CLIENTID: '8fd35743582aea1e332e'
  GITHUB_SECRET: 'fcfa4df6b7ebd2377d75df9922be54dcc772006c'
for key of keys
  if keys.hasOwnProperty(key)
    if !keys[key]
      message = '  Set ' + key + ' in config/env/keys.js'
      console.error '\n' + message
      console.error '  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n'
      throw new Error(message)
module.exports = keys
