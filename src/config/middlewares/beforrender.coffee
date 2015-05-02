# ViewのRender直前に各Viewで共通的に利用するlocalsを追加する

derivePartials = (view) ->
  # 'welcome/top/index' -> '....'
  relativePath = view.split('').reduce(((memo, char) ->
    if char == '/' then memo + '..' else memo
  ), '')
  {
    header: relativePath + '/_partials/header'
    session: relativePath + '/_partials/session'
    footer: relativePath + '/_partials/footer'
  }

module.exports = (req, res, next) ->
  render = res.render

  res.render = (view, locals, cb) ->
    notice = req.flash('notice')
    module = view.replace(/\/.*$/, '')
    partials = derivePartials(view)
    if typeof locals == 'object'
      # 認証情報
      locals.auth = req.auth
      # 通知
      locals.notice = if notice.length > 0 then notice else ''
      # Viewが利用するassets
      # e.g. 'welcome/index' => 'welcome'
      locals.assets = module
      # Viewのlayouts
      locals.partials = partials
    render.call res, view, locals, cb

  next()
