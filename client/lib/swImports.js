self.addEventListener('message', function(event) {
    if(event.data.action === 'skipWaiting') {
        console.log('self.skipWaiting();', self);
        self.skipWaiting();
    }
});