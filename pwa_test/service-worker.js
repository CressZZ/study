self.addEventListener('install', async () => {
	// console.log('skip waiting');
	await self.skipWaiting();
  });
  
  
  self.addEventListener('fetch', function () {
	// it can be empty if you just want to get rid of that error
  });
  