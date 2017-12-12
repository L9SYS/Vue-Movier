export default class Storage {
	static get(key) {
		const item = window.localStorage.getItem(key)
		return JSON.parse(item)
	}

	static set(key, value) {
		window.localStorage.setItem(key, JSON.stringify(value))
		return true
	}

	static remove(key) {
		window.localStorage.removeItem(key)
		return true
	}
}
