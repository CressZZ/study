var spawn = require('child_process').spawn;
var ls = spawn('ls', ['-a']);

var exec =  require('child_process').exec;
exec('ls -a', function(err, stdout, stderr){
	console.log('exec :',stdout);
})
 
ls.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});
 
ls.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
});
 
ls.on('exit', function(code) {
    console.log('exit: ' + code);
});

