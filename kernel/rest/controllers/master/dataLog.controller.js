module.exports = (member, dbModel, req) =>
  new Promise(async (resolve, reject) => {
    switch (req.method.toUpperCase()) {
      case 'GET':
        if (req.params.param1 != undefined) {
          getOne(member, dbModel, req).then(resolve).catch(reject)
        } else {
          getList(member, dbModel, req).then(resolve).catch(reject)
        }
        break
      case 'POST':
        post(member, dbModel, req).then(resolve).catch(reject)

        break
      case 'PUT':
        put(member, dbModel, req).then(resolve).catch(reject)
        break
      case 'DELETE':
        deleteItem(member, dbModel, req).then(resolve).catch(reject)
        break
      default:
        restError.method(req, reject)
        break
    }
  })

function getOne(member, dbModel, req) {
  return new Promise((resolve, reject) => {
    dbModel.dataLog
      .findOne({ _id: req.params.param1 })
      .then(resolve)
      .catch(reject)
  })
}

function getList(member, dbModel, req) {
  return new Promise((resolve, reject) => {
    let options = {
      page: req.query.page || (req.query.pageIndex || 0) + 1,
      populate: [
        {
          path: 'machine',
          select: '_id name',
        },
      ],
    }

    if (req.query.pageSize || req.query.limit)
      options.limit = req.query.pageSize || req.query.limit

    let filter = {}
    if ((req.query.transferred || '') != '') {
      filter.transferred = req.query.transferred
    }

    if ((req.query.machine || '') != '') {
      filter.machine = req.query.machine
    }

    dbModel.dataLog.paginate(filter, options).then(resolve).catch(reject)
  })
}

function post(member, dbModel, req) {
  return new Promise((resolve, reject) => {
    let data = req.body || {}
    data._id = undefined
    let newDoc = new dbModel.dataLog(data)

    if (!epValidateSync(newDoc, reject)) return
    newDoc.save().then(resolve).catch(reject)
  })
}

function put(member, dbModel, req) {
  return new Promise((resolve, reject) => {
    if (req.params.param1 == undefined) return restError.param1(req, reject)
    let data = req.body || {}
    delete data._id
    
    dbModel.dataLog
      .findOne({ _id: req.params.param1 })
      .then((doc) => {
        if (dbnull(doc, reject)) {
          let newDoc=Object.assign(doc,data)
          // let newDoc=new dbModel.dataLog(Object.assign({}, doc.toJSON(), data))
          if (!epValidateSync(newDoc, (err)=>{
            reject(err)
          })) return
          newDoc.save().then(resp=>{
            console.log('resp:',resp)
            resolve(resp)
          }).catch(err=>{
            console.log(err)
            reject(err)
          })
        }
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
  })
}

function deleteItem(member, dbModel, req) {
  return new Promise((resolve, reject) => {
    if (req.params.param1 == undefined) return restError.param1(req, next)
    let data = req.body || {}
    data._id = req.params.param1
    // dbModel.dataLog
    //   .deleteOne({ _id: req.params.param1 })
    //   .then(resolve)
    //   .catch(reject)
    dbModel.dataLog.removeOne(member, { _id: data._id }).then(resolve).catch(err=>{
      console.log(err)
      reject(err)
    })
  })
}
