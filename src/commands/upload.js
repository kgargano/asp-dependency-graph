import * as neo from '../neo'

neo.init('http://localhost:7474')

export default function(files, log) {
	var complete = 0
	var promise = neo.deleteAll()

	promise.then(()=>{complete = 0})
	promise = files.reduce(addFile, promise)

	promise.then(()=>{
		log()
		complete = 0
	})
	promise = files.reduce(addASPCalls, promise)

	return promise

	function addFile(promise, file) {
		return promise
			.then(() => neo.createFile(file))
			.then(()=>log(`Load files: ${++complete}/${files.length} files`))
	}

	function addASPCalls(promise, file) {
		return promise
			.then(()=> neo.addASPCalls(file))
			.then(()=>log(`Load calls: ${++complete}/${files.length} files`))
	}
}
