module.exports = (sessionDoc, req) =>
	new Promise(async (resolve, reject) => {
		if (req.method === 'POST') {
			let language = req.getValue('language')
			let dbId = req.getValue('dbId')
			console.log(`dbId`, dbId)
			if (language) sessionDoc.language = language
			if (dbId) {
				try {
					let dbDocs = await db.dbDefines.find({
						_id: dbId,
						deleted: false,
						$or: [
							{ owner: sessionDoc.member },
							{ 'authorizedMembers.memberId': sessionDoc.member },
						],
					})
					if (dbDocs.length > 0) {
						sessionDoc.dbId = dbDocs[0]._id
					} else {
						return reject(`Not found`)
					}
				} catch(err) {
          return reject(err.message)
        }
			}
			sessionDoc.save().then(resolve('Session changed successfully'))
		} else {
			restError.method(req, reject)
		}
	})
