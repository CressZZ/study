// import querystring from 'querystring';
document.addEventListener('DOMContentLoaded', ()=>{
	var originalString = location.search;

	var a = new URLSearchParams(originalString)
	a.set("test3", "test3")
	// document.body.html(a.toString());
	console.log(a.toString());
})
