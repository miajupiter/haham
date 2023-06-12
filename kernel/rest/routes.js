const protectedFields = require('./protected-fields.json')
const packageJson = require('../package.json')
const auth = require('../lib/auth')
const spamCheck = require('../lib/spam-detector')
// global.activeSessions={}  qwerty

module.exports = (app) => {
  app.all('/*', (req, res, next) => {
    req.IP =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''
    req.getValue = (key) => {
      return req.headers[key] || req.body[key] || req.query[key] || ''
    }

    next()
  })

  let apiWelcomeMessage = {
    message: `Welcome to ${packageJson.name} API V1. Usage: /api/v1/:func/[:param1]/[:param2]/[:param3] . Methods: GET, POST, PUT, DELETE `,
    status: process.env.NODE_ENV || '',
  }
  app.all('/api', function (req, res) {
    res.status(200).json({ success: true, data: apiWelcomeMessage })
  })

  app.all('/api/v1', function (req, res) {
    res.status(200).json({ success: true, data: apiWelcomeMessage })
  })

  authControllers(app, '/api/v1/auth/:func/:param1/:param2/:param3', 'auth')
  sessionControllers(
    app,
    '/api/v1/session/:func/:param1/:param2/:param3',
    'session'
  )
  repoControllers(app, '/api/v1/db/:func/:param1/:param2/:param3', 'repo')
  masterControllers(app, '/api/v1/:func/:param1/:param2/:param3', 'master')

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      error: { name: '404', message: 'function not found' },
    })
  })

  app.use((err, req, res, next) => {
    sendError(err, req, res)
  })
}

function sessionControllers(app, route, folder) {
  setRoutes(app, route, (req, res, next) => {
    console.log('params11', req.params)
    let ctl = getController(folder, req.params.func)
    if (!ctl) return next()
    passport(req)
      .then((sessionDoc) => {
        ctl(sessionDoc, req)
          .then((data) => {
            if (data == undefined) res.json({ success: true })
            else if (data == null) res.json({ success: true })
            else {
              res.status(200).json({ success: true, data: data })
            }
          })
          .catch(next)
      })
      .catch(next)
  })
}

function repoControllers(app, route, folder) {
  setRoutes(app, route, (req, res, next) => {
    let ctl = getController(folder, req.params.func)
    if (!ctl) return next()
    passport(req)
      .then((sessionDoc) => {
        global
          .getRepoDbModel(sessionDoc._id, sessionDoc.db, sessionDoc.dbHost)
          .then((dbModel) => {
            ctl(dbModel, sessionDoc, req)
              .then((data) => {
                if (data == undefined) res.json({ success: true })
                else if (data == null) res.json({ success: true })
                else {
                  res.status(200).json({ success: true, data: manipulateResponse(data) })
                }
              })
              .catch(next)
          })
          .catch(next)
      })
      .catch(next)
  })
}

function masterControllers(app, route, folder) {
	setRoutes(app, route, (req, res, next) => {
		const ctl = getController(folder, req.params.func)
		if (!ctl) return next()
		let dbModel = db

		passport(req)
			.then((member) => {
				ctl(member, dbModel, req)
					.then((data) => {
						if (data == undefined) res.json({ success: true })
						else if (data == null) res.json({ success: true })
						else {
							res.status(200).json({
								success: true,
								data: manipulateResponse(data),
							})
              // res.status(200).json(manipulateResponse(data))
						}
					})
					.catch(next)
			})
			.catch(err=>{
        res.status(401).json({success:false,error:err})
      })
	})
}

function authControllers(app, route, folder) {
  setRoutes(app, route, (req, res, next) => {
    let spam = spamCheck(req.IP)
    if (!spam) {
      let ctl = getController(folder, req.params.func)
      if (!ctl) return next()
      ctl(req)
        .then((data) => {
          if (data == undefined) res.json({ success: true })
          else if (data == null) res.json({ success: true })
          else {
            res.status(200).json({
              success: true,
              data: manipulateResponse(data),
            })
          }
        })
        .catch(next)
    } else {
      next({
        name: 'AUTH_FAILED',
        message: `Suspicious login attempts detected. Try again after ${spam} seconds.`,
      })
    }
  })
}

function getController(folder, funcName) {
  let controllerName = path.join(
    __dirname,
    '/controllers',
    folder,
    `${funcName}.controller.js`
  )
  if (fs.existsSync(controllerName) == false) {
    return null
  } else {
    return require(controllerName)
  }
}

function sendError(err, req, res) {
  let errorMessage = 'Error'
  let statusCode = 400
  if (typeof err == 'string') {
    errorMessage = err
  } else {
    if (err.message) errorMessage = err.message
  }

  let response = { success: false, error: errorMessage }

  if (errorMessage.toLowerCase().includes('not found')) {
    statusCode = 404
  } else {
    let baseUrl = req.route.path.split('/:func')[0]
    let ctl = baseUrl.substring('/api/v1'.length + 1)
    let func = req.url
      .substring(baseUrl.length + 1)
      .split('?')[0]
      .split('/')[0]
    response.docUrl = `${process.env.ERROR_DOCUMENTATION_URI}?ctl=${ctl}&func=${func}`
  }

  res.status(statusCode).json(response)
}



function setRoutes(app, route, cb1, cb2) {
  let dizi = route.split('/:')
  let yol = ''
  dizi.forEach((e, index) => {
    if (index > 0) {
      yol += `/:${e}`
      if (cb1 != undefined && cb2 == undefined) {
        app.all(yol, cb1)
      } else if (cb1 != undefined && cb2 != undefined) {
        app.all(yol, cb1, cb2)
      }
    } else {
      yol += e
    }
  })
}

function passport(req) {
  return new Promise((resolve, reject) => {
    let token = req.getValue('token')
    if (token) {
      auth
        .verify(token)
        .then((decoded) => {
          db.sessions
            .findOne({ _id: decoded.sessionId })
            .then((sessionDoc) => {
              if (sessionDoc) {
                if (sessionDoc.closed) {
                  reject('The session has already been closed')
                } else {
                  sessionDoc.lastOnline = new Date()
                  sessionDoc.lastIP = req.IP
                  sessionDoc.save().then(resolve).catch(reject)
                }
              } else {
                reject('Session not found')
              }
            })
            .catch(reject)
        })
        .catch(reject)
    } else {
      reject('Token required')
    }
  })
}

function manipulateResponse(obj) {
	if (obj != undefined) {
		if (obj.pagingCounter != undefined) delete obj.pagingCounter

		if (obj.limit != undefined) {
			obj.pageSize = obj.limit
			delete obj.limit
		}
		if (obj.totalDocs != undefined) {
			obj.recordCount = obj.totalDocs
			// obj.totalCount = obj.totalDocs
			delete obj.totalDocs
		}
		if (obj.totalPages != undefined) {
			obj.pageCount = obj.totalPages
			delete obj.totalPages
		}
    
	}
	return obj
}

global.restError = {
  param1: function (req, next) {
    next(`function:[/${req.params.func}] [/:param1] is required`)
  },
  param2: function (req, next) {
    next(
      `function:[/${req.params.func}/${req.params.param1}] [/:param2] is required`
    )
  },
  method: function (req, next) {
    next(`function:${req.params.func} WRONG METHOD: ${req.method}`)
  },
  auth: function (req, next) {
    next(`Authentication failed`)
  },
  data: function (req, next, field) {
    if (field) {
      next(`'${field}' Incorrect or missing data`)
    } else {
      next(`Incorrect or missing data`)
    }
  },
}
