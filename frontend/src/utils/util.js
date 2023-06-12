// Date.prototype.lastThisMonth = function () {
// 	let dat = new Date(this.valueOf());
// 	dat = new Date((new Date(dat.setMonth(dat.getMonth() + 1))).setDate(0))
// 	return dat
// }


// String.prototype.padding = function (n, c) {
// 	var val = this.valueOf()
// 	if (Math.abs(n) <= val.length) {
// 		return val
// 	}
// 	var m = Math.max((Math.abs(n) - this.length) || 0, 0)
// 	var pad = Array(m + 1).join(String(c || ' ').charAt(0))
// 	return (n < 0) ? pad + val : val + pad
// }

exports.incString = function (text) {
	if (!text) return '1'
	var sbuf = ''
	for (let i = text.length - 1; i >= 0; i--) {
		if (!isNaN(text[i])) {
			sbuf = text[i] + sbuf
		} else {
			break
		}
	}
	if (sbuf === '') return text + '1'

	//A04950;  sbuf='04950'
	var numara = Number(sbuf)
	var numaraString = ''
	numara++
	if (numara.toString().length < sbuf.length) {
		numaraString = numara.toString()
		for (let i = 0; i < (sbuf.length - numara.toString().length); i++) {
			numaraString = '0' + numaraString
		}
	} else {
		numaraString = numara.toString()
	}
	if (numaraString.length >= text.length) {
		return numaraString
	} else {
		return text.substr(0, (text.length - numaraString.length)) + numaraString
	}
}



//function enterNext(bu) {

	// if (bu == undefined)
	// 	bu = this
	// var self = $(bu),
	// 	form = self.parents('form:eq(0)'),
	// 	focusable, next
	// focusable = form.find('input,a,select,button,textarea').filter(':visible')
	// next = focusable.eq(focusable.index(bu) + 1)
	// if (next.length) {

	// 	var readonly = next.prop('readonly') || false
	// 	var disabled = next.prop('disabled') || false
	// 	var cl = next.prop('class') || ''

	// 	if (cl.indexOf('btn-collapse') > -1 || cl.indexOf('skip-enter-next') > -1 || cl.indexOf('no-enter-next') > -1)
	// 		return enterNext(next)

	// 	if (readonly || disabled)
	// 		return enterNext(next)



	// 	next.focus()
	// 	if (typeof next.select === 'function')
	// 		next.select()
	// } else {
	// 	//form.submit()
	// }
	// return false
//}

// Date.prototype.hhmm = function () {

// 	let HH = this.getHours().toString()
// 	let min = this.getMinutes().toString()
// 	let sec = this.getSeconds().toString()
// 	return (HH[1] ? HH : "0" + HH[0]) + ':' + (min[1] ? min : "0" + min[0])
// }

// Date.prototype.addDays = function (days) {
// 	let dat = new Date(this.valueOf())
// 	dat.setDate(dat.getDate() + days)
// 	return dat
// }

// Date.prototype.lastThisMonth = function () {
// 	let dat = new Date(this.valueOf())
// 	dat = new Date(dat.getFullYear(), dat.getMonth() + 1, 0)
// 	return dat
// }


// Number.prototype.formatDecimal = function () {
// 	let c = 0;
// 	let d = whatDecimalPointer()
// 	let t = d == ',' ? '.' : ',';

// 	let s = _formatNumber(this, c, d, t)

// 	return s;
// }

// Number.prototype.formatMoney = function (c1) {
// 	let c = c1 || 2;
// 	let d = whatDecimalPointer()
// 	let t = d == ',' ? '.' : ','

// 	let s = _formatNumber(this, c, d, t)

// 	return s;
// }



// function _formatNumber(value, c, d, t) {
// 	var n = value
// 	c = isNaN(c) ? 2 : c
// 	d = d == undefined ? whatDecimalPointer() : d
// 	t = t == undefined ? (d == ',' ? '.' : ',') : t
// 	var s = n < 0 ? '-' : ''
// 	var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + ''
// 	var j = (j = i.length) > 3 ? j % 3 : 0
// 	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "")
// }

// Number.prototype.n2 = function () {
// 	let sbuf = this.toString()
// 	if (sbuf.length == 1) {
// 		sbuf = '0' + sbuf
// 	}

// 	return sbuf
// }


// Number.prototype.round = function (precision) {
// 	var t = this
// 	var rakam = 1
// 	if (precision <= 0)
// 		return Math.round(t)
// 	for (var i = 0; i < precision; i++) {
// 		rakam = rakam * 10
// 	}
// 	var sonuc = Math.round(rakam * t) / rakam

// 	return sonuc

// }

// Number.prototype.toDigit = function (digit) {
// 	var t = this
// 	var s = t.toString()
// 	if (s.length < digit) {
// 		s = '0'.repeat(digit - s.length) + s
// 	}
// 	return s
// }

// Number.prototype.formatQuantity = function (c) {
// 	c = isNaN(c) ? 1 : c
// 	let d = whatDecimalPointer()
// 	let t = d == ',' ? '.' : ','

// 	let s = _formatNumber(this, c, d, t)

// 	return s
// }

// function convertNumber(text) {
// 	if (typeof text == 'number')
// 		return text

// 	text = text || ''
// 	let replace = '[^-\\d' + whatDecimalPointer() + ']'

// 	let reg = new RegExp(replace, "g")

// 	text = text.replace(reg, '')
// 	text = text.replace(',', '.')
// 	if (text == '')
// 		text = '0'
// 	return Number(text)

// }

// function whatDecimalPointer() {
// 	let n = 1.1;
// 	n = n.toLocaleString().substring(1, 2)
// 	return n;
// }



// function listObjectToObject(listObj,seperator='.') {
// 	if (typeof listObj != 'object' || listObj == null)
// 		return listObj
// 	let obj = {}

// 	function calistir(anaObj, keys, parentKey = '') {
// 		if (anaObj[keys[0]] == undefined) {
// 			anaObj[keys[0]] = {}
// 			if (keys.length > 1) {
// 				if (!isNaN(keys[1])) {
// 					anaObj[keys[0]] = []
// 				}
// 			}
// 		}
// 		if (keys.length == 1) {
// 			anaObj[keys[0]] = listObj[`${(parentKey ? parentKey + seperator : '')}${keys[0]}`]

// 		} else {
// 			let key = keys[0]
// 			parentKey += (parentKey ? seperator : '') + key
// 			keys.splice(0, 1)
// 			calistir(anaObj[key], keys, parentKey)
// 		}
// 	}

// 	Object.keys(listObj).forEach((mainKey) => {
// 		let a = calistir(obj, mainKey.split(seperator))
// 		obj = Object.assign({}, obj, a)
// 	})

// 	return obj
// }


// function objectToListObject(objOrj,seperator='.', exceptArrays = false) {
// 	let listObj = {}
// 	if (objOrj == undefined || objOrj == null)
// 		return listObj

// 	function calistir(obj, parentKey) {
// 		if (Array.isArray(obj) && exceptArrays) {
// 			if (parentKey != '') {
// 				listObj[parentKey] = obj
// 			}
// 		} else if (typeof obj == 'object') {
// 			Object.keys(obj || {}).forEach((key) => {
// 				let key2 = (parentKey ? parentKey + seperator : '') + key
// 				calistir(obj[key], key2)
// 			})
// 		} else {
// 			if (parentKey != '') {
// 				listObj[parentKey] = obj
// 			}
// 		}
// 	}

// 	calistir(objOrj)

// 	return listObj
// }


// function objectArrayControl(obj) {
// 	if (obj) {
// 		if (obj == null)
// 			return []
// 		if (Array.isArray(obj))
// 			return obj

// 		if (typeof obj == 'object') {
// 			let bFound = false
// 			let dizi = []
// 			Object.keys(obj).forEach((key) => {
// 				if (isNaN(key)) {
// 					bFound = true
// 				} else {
// 					dizi.push(obj[key])
// 				}
// 			})
// 			if (bFound == false) {
// 				return dizi
// 			} else {
// 				return obj
// 			}
// 		}
// 	} else {
// 		return []
// 	}
// }

// function getDivData(divId, prefix = '', eskiBirIndex = true) {
// 	let obj = {}
// 	if (!document)
// 		return obj
// 	let elements = document.querySelector(`${divId}`).querySelectorAll(`input, select`)
// 	let index = 0
// 	while (index < elements.length) {
// 		if (elements[index].name != '' && (elements[index].name.indexOf('[-1]') < 0 || eskiBirIndex)) {
// 			let key = elements[index].name.replaceAll('[', '.').replaceAll(']', '')
// 			let value = elements[index].value
// 			if (elements[index].type == 'text' && elements[index].classList.contains('formatted-number')) {
// 				value = convertNumber(elements[index].value)
// 			}
// 			if (elements[index].type == 'checkbox') {
// 				value = elements[index].checked
// 			}

// 			if (prefix != '') {
// 				if (key.substr(0, prefix.length) == prefix) {
// 					key = key.substr(prefix.length)
// 					if (key.substr(0, 1) == '.') {
// 						key = key.substr(1)
// 					}
// 				}
// 			}

// 			obj[key] = value
// 		}

// 		index++
// 	}
// 	return listObjectToObject(obj)
// }


// var colors = {
// 	reset: '\x1b[0m',
// 	black: '\x1b[30m',
// 	red: '\x1b[31m',
// 	green: '\x1b[32m',
// 	yellow: '\x1b[33m',
// 	blue: '\x1b[34m',
// 	magenta: '\x1b[35m',
// 	cyan: '\x1b[36m',
// 	white: '\x1b[37m',

// 	bgBlack: '\x1b[40m',
// 	bgRed: '\x1b[41m',
// 	bgGreen: '\x1b[42m',
// 	bgYellow: '\x1b[43m',
// 	bgBlue: '\x1b[44m',
// 	bgMagenta: '\x1b[45m',
// 	bgCyan: '\x1b[46m',
// 	bgWhite: '\x1b[47m'
// }
// Object.keys(colors).forEach((key) => {
// 	String.prototype.__defineGetter__(key, function () { return colors[key] + this + '\x1b[39m' })
// })




// function generateFieldName(name) {
// 	let s = name.replaceAll('][', '.').replaceAll('[', '.').replaceAll(']', '')

// 	return s
// }

// function getUrlInfo(href = window.location.href) {
// 	let match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
// 	return match && {
// 		href: href,
// 		protocol: match[1],
// 		host: match[2],
// 		hostname: match[3],
// 		port: match[4],
// 		pathname: match[5],
// 		search: match[6],
// 		hash: match[7]
// 	}
// }

// function calculate(formula, values) {
// 	if ((formula || '') == '')
// 		return 0
// 	formula = formula.replaceAll('${', '{').replaceAll('{', '${')
// 	let code = `(function(){
// 	`
// 	Object.keys(values).forEach((key) => {
// 		code += `let ${key}=${JSON.stringify(values[key])}\n`
// 	})

// 	code += `return eval(\`${formula}\`)
// 	})()`

// 	return eval(code)
// }


// function getPropertyByKeyPath(targetObj, keyPath, defaultValue) {
// 	if (targetObj == undefined || targetObj == null || !keyPath)
// 		return defaultPropertyValue(targetObj, defaultValue)

// 	if (keyPath.substr(0, 1) == '/')
// 		keyPath = keyPath.substr(1)

// 	if (keyPath.substr(0, 2) == './')
// 		keyPath = keyPath.substr(2)
	
// 	keyPath = keyPath.replaceAll('/', '.')

// 	let keys = keyPath.split('.')
// 	if (keys.length == 0)
// 		return defaultPropertyValue(undefined, defaultValue)
// 	keys = keys.reverse()
// 	let subObject = targetObj
// 	while (keys.length) {
// 		let k = keys.pop()
// 		if (typeof subObject[k] == 'undefined' || subObject[k] == null) {
// 			return defaultPropertyValue(undefined, defaultValue)
// 		} else {
// 			subObject = subObject[k]
// 		}
// 	}




// 	return defaultPropertyValue(subObject, defaultValue)
// }

// function defaultPropertyValue(subObject, defaultValue) {
// 	if (!subObject && defaultValue != undefined) {
// 		if (typeof defaultValue == 'string') {
// 			let s1 = defaultValue.indexOf('${')
// 			let s2 = defaultValue.indexOf('}', s1)
// 			if (s1 > -1 && s2 > -1) {
// 				let s = eval('`' + defaultValue + '`')
// 				subObject = s
// 			} else {
// 				subObject = defaultValue
// 			}
// 		} else {
// 			subObject = defaultValue
// 		}
// 	}
// 	return subObject
// }

// function getFormData(divId) {
// 	let liste = document.querySelectorAll(`${divId} input, select, div`)
// 	let obj = {}
// 	let i = 0
// 	while (i < liste.length) {
// 		let e = liste[i]
// 		if (e.getAttribute('data-field')) {
// 			let key = e.getAttribute('data-field')
// 			let dataType = e.getAttribute('data-type') || ''
// 			if (key) {
// 				if (key.indexOf('.-1.') < 0) {
// 					if (['number', 'money', 'total', 'quantity', 'amount', 'price'].includes(dataType)) {
// 						obj[key] = Number(e.value)
// 					} else if (dataType === 'code') {
// 						obj[key] = e.editor.getValue()
// 					} else if (dataType === 'codeFiles') {
// 						obj[key] = e.item.value
// 					} else if (dataType === 'boolean') {
// 						if (e.type === 'checkbox') {
// 							obj[key] = e.checked
// 						} else {
// 							obj[key] = Boolean(e.value)
// 						}
// 					} else {
// 						obj[key] = e.value
// 					}
// 				}
// 			}
// 		}
// 		i++
// 	}
// 	return listObjectToObject(obj)
// }


exports.isValidFileName=function(fileName){
	return /^(?!\.)(?!com[0-9]$)(?!con$)(?!lpt[0-9]$)(?!nul$)(?!prn$)[^\\:<>/$"]*[^\\:<>/$"]+$/.test(fileName)
}

exports.isValidEmail = function (s) {
	return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(s)
}

exports.isValidTelephone = function (tel) {
	if (tel.trim() === '') return false
	for (var i = 0; i < tel.length; i++) {
		if (!((tel[i] >= '0' && tel[i] <= '9') || tel[i] === '+')) {
			return false
		}
	}
	return true
}

exports.screen=function(width) {
  return (width < 700) ? 'sm' : 'lg'
}