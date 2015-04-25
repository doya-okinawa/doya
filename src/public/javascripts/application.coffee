(->
  # サンプルなので消してOK
  setTimeout (->
    $('#header_notice').fadeOut 900
    return
  ), 3100
  return
).call this
