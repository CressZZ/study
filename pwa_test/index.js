let registration = navigator.serviceWorker.register('/service-worker.js');


console.log('a')

let deferredPrompt;

window.addEventListener('beforeinstallprompt', function(event) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
});

function test(){
	
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
	.then((choiceResult) => {
	  if (choiceResult.outcome === 'accepted') {
		console.log('User accepted the A2HS prompt');
	  } else {
		console.log('User dismissed the A2HS prompt');
	  }
	  deferredPrompt = null;
	});

}

