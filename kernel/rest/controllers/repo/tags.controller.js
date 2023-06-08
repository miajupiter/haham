module.exports = (dbModel, session, req) => new Promise((resolve, reject) => {
	switch (req.method) {
		case 'GET':
			if (req.params.param1 != undefined) {
				if (req.params.param1.indexOf(',') > -1 || req.params.param1.indexOf(';') > -1) {
					getIdList(dbModel, session, req).then(resolve).catch(reject)
				} else {
					getOne(dbModel, session, req).then(resolve).catch(reject)
				}

			} else {
				getList(dbModel, session, req).then(resolve).catch(reject)
			}
			break
		case 'POST':
			post(dbModel, session, req).then(resolve).catch(reject)

			break
		// case 'PUT':
		// 	put(dbModel, session, req).then(resolve).catch(reject)
		// 	break
		case 'DELETE':
			deleteItem(dbModel, session, req).then(resolve).catch(reject)
			break
		default:
			restError.method(req, reject)
			break
	}

})

function getList(dbModel, session, req) {
	return new Promise((resolve, reject) => {
		let options = {
			page: (req.query.page || 1),
			// select:'-data.data'
		}

		if ((req.query.pageSize || req.query.limit))
			options['limit'] = req.query.pageSize || req.query.limit

		let filter = {}
		options.sort = {}

    let search=(req.query.search || req.query.tag || req.query.name || '').trim()

		if (search != '') {
			filter['$or'] = [
				{ 'tag': { $regex: '.*' + search + '.*', $options: 'i' } },
				{ 'tagName': { $regex: '.*' + search + '.*', $options: 'i' } }
			]
		}
    
		dbModel.tags.paginate(filter, options).then(resolve).catch(reject)
	})
}

function getIdList(dbModel, session, req) {
	return new Promise((resolve, reject) => {
		let filter = {}
		let idList = req.params.param1.replaceAll(';', ',').split(',')

		filter['_id'] = { $in: idList }

		dbModel.tags.find(filter)
			.then(resolve)
			.catch(reject)
	})
}


function getOne(dbModel, session, req) {
	return new Promise((resolve, reject) => {
		dbModel.tags.findOne({ _id: req.params.param1 })
			.then(doc => {
				if (dbnull(doc, reject)) {
					resolve(doc)
				}
			})
			.catch(reject)
	})
}

function post(dbModel, session, req) {
	return new Promise((resolve, reject) => {
		let data = req.body || {}
		data._id = undefined
    data.status='sent'
		let newDoc = new dbModel.tags(data)

		if (!epValidateSync(newDoc, reject))
			return
		newDoc.save().then(resolve).catch(reject)
	})
}

// function put(dbModel, session, req) {
// 	return new Promise((resolve, reject) => {
// 		if (req.params.param1 == undefined)
// 			return restError.param1(req, reject)
// 		let data = req.body || {}
// 		data._id = req.params.param1
// 		data.modifiedDate = new Date()

// 		dbModel.tags.findOne({ _id: data._id })
// 			.then(doc => {
// 				if (dbnull(doc, reject)) {
// 					let doc2 = Object.assign(doc, data)
// 					let newDoc = new dbModel.tags(doc2)

// 					if (!epValidateSync(newDoc, reject))
// 						return
// 					newDoc.save().then(resolve).catch(reject)
// 				}
// 			})
// 			.catch(reject)
// 	})
// }

function deleteItem(dbModel, session, req) {
	return new Promise((resolve, reject) => {
		if (req.params.param1 == undefined)
			return restError.param1(req, next)
		let data = req.body || {}
		data._id = req.params.param1
		dbModel.tags.removeOne(session, { _id: data._id }).then(resolve).catch(reject)
	})
}