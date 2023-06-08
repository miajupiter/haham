module.exports = (sessionDoc, req) =>
	new Promise((resolve, reject) => {
		if (req.method === 'POST') {
			sessionDoc.closed = true
			sessionDoc.save().then(resolve('Session closed successfully'))
		} else {
			restError.method(req, reject)
		}
	})
