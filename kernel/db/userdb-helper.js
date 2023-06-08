const { ObjectId } = require('mongodb')


exports.getOne = (dbId, memberId) =>
	new Promise((resolve, reject) => {
		let filter = { deleted: false }
		filter._id = dbId
		if (memberId) {
			filter.owner = memberId
		}
		db.dbDefines.findOne(filter).then((doc) => {
			if (dbnull(doc, reject)) {
				resolve(doc)
			}
		})
	})

exports.newUserDb = function (
	member,
	isNewMember = true,
	displayName = 'default'
) {
	return new Promise((resolve, reject) => {
		const maxDatabaseLimit = Number(process.env.MEMBER_MAX_DATABASE || 5)

		db.dbDefines
			.find({ owner: member._id, deleted: false })
			.then((dbList) => {
				if (dbList.length > 0 && isNewMember) {
					return resolve(dbList.slice(-1)[0])
				}
				if (dbList.length >= maxDatabaseLimit) {
					reject({
						name: 'MAX_DATABASE',
						message: `Max database limit is ${maxDatabaseLimit}`,
					})
				} else {
					if (dbList.findIndex(e => e.dbDisplayName === displayName) > -1)
						return reject({
							name: 'DBNAME',
							message: 'Database name already exists',
						})

					const newDatabaseId = new ObjectId()

					let newDatabase = new db.dbDefines({
						_id: newDatabaseId,
						ownerId: member._id,
						dbDisplayName: displayName,
						dbName: `${
							process.env.MONGODB_MEMBERDB_PREFIX
						}${newDatabaseId.toString()}`,
						dbHost: process.env.MONGODB_ACTIVE_SERVER,
					})

					newDatabase
						.save()
						.then((newDoc) => {
							console.log(`newUserDb newDoc`, newDoc)
							resolve(newDoc)
						})
						.catch(reject)
				}
			})
			.catch(reject)
	})
}

// exports.newUserDb = function (member, newMember = true, displayName = '') {
// 	return new Promise((resolve, reject) => {
// 		const maxDatabaseLimit = Number(process.env.MEMBER_MAX_DATABASE || 5)
// 		let username = fixUsername(member.username)
// 		// let dbName = `${process.env.MONGODB_MEMBERDB_PREFIX}${username}`
// 		let dbName = `mia#${username}`
// 		console.log(`dbName`, dbName)

// 		db.dbDefines
// 			.find({ dbName: { $regex: new RegExp(dbName), $options: 'i' } })
// 			.sort({ dbName: 1 })
// 			.then((dbList) => {
// 				console.log(`dbList`, dbList)
// 				if (dbList.length > 0) {
// 					if (newMember) {
// 						return resolve(dbList.slice(-1)[0])
// 					}
// 					dbName += `#${dbList.length}`
// 				}
// 				if (dbList.length > maxDatabaseLimit)
// 					return reject({
// 						name: 'MAX_DATABASE',
// 						message: `Max database limit is ${maxDatabaseLimit}`,
// 					})

// 				let newDatabase = new db.dbDefines({
// 					memberId: member._id,
// 					dbDisplayName: displayName,
// 					dbName: dbName,
// 					dbHost: process.env.MONGODB_ACTIVE_SERVER,
// 				})

// 				newDatabase
// 					.save()
// 					.then((newDoc) => {
// 						console.log(`newUserDb newDoc`, newDoc)
// 						resolve(newDoc)
// 					})
// 					.catch(reject)
// 			})
// 			.catch(reject)
// 	})
// }
// function fixUsername(username) {
// 	let s = username.replaceAll('.', '-').replaceAll(' ', '-')
// 	if (s.includes('@')) {
// 		s = `${s.split('@')[1]}@${s.split('@')[0]}`
// 	}

// 	return s
// }

// function fixDisplayName(displayName) {
// 	let s = displayName

// 	return displayName
// }

// setTimeout(() => {
// 	db.conn.db
// 		.admin()
// 		.listDatabases({ filter: { name: { $regex: '^mia@905' } } })
// 		.then(console.log)
// 		.catch(console.log)
// }, 2000)
