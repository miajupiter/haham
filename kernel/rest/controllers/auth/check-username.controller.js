module.exports = (req) =>
	new Promise((resolve, reject) => {
		let username =req.getValue('username')

    if (username.trim() == '')
			return reject('Username required')

		if (!username.includes('@') && !username.startsWith('+'))
			username = `+${username}`

		checkUsername(username).then(resolve).catch(reject)
	})

function checkUsername(username) {
	return new Promise((resolve, reject) => {
		db.members
			.findOne({ username: username })
			.then((doc) => {
				if (doc == null) {
					reject(`User not found`)
				} else if (doc.passive) {
					reject(`User is not active`)
				} else {
					resolve()
				}
			})
			.catch(reject)
	})
}
