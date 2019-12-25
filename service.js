const bleno = require('bleno');
const CustomCharactetistic = require('./characteristic');
const BlenoPrimaryService = bleno.PrimaryService;

bleno.on('stateChange', function(state){
		console.log(`on => stateChange ${state}`);
		if(state === 'poweredOn') {
				console.log('request start');
				bleno.startAdvertising('CustomService', ['092c2f68-87d6-41f5-87c8-4edef16e6d32']);
			} else {
				console.log('request stop');
				bleno.stopAdvertising();
			}
});

bleno.on('advertisingStart', function(error){
	console.log('advertisingStart: ' + (error? 'error '+error : 'success'));
	if(!error){
		bleno.setServices([
			new BlenoPrimaryService({
				uuid: '092c2f68-87d6-41f5-87c8-4edef16e6d32',
				characteristics: [new CustomCharactetistic()]
			})
		])
	}
});
