const util = require('util');
const bleno = require('bleno');
const BlenoCharacteristic = bleno.Characteristic;

const CustomCharactetistic = function() {
	CustomCharactetistic.super_.call(this, {
			uuid: '031a785c-a742-4d2f-9bcb-3a81437336a5',
			properties: ['read', 'write', 'notify'],
		});

		this._value = new Buffer(0);
		this._updateValueCallback = null;
};

CustomCharactetistic.prototype.onReadRequest = function(offset, callback) {
	console.log('onReadRequst');
	const data = new Buffer(1);
	data.writeUInt8(42, 0);
	callback(this.RESULT_SUCCESS, data);
};

CustomCharactetistic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
	this._value = data
	console.log('onWriteRequst', this._value.toString('hex'));
	callback(this.RESULT_SUCCESS);
};

let isSubscribed = false;
const notifyInterval = 5;

function str2ab(str) {
		const buf = new ArrayBuffer(str.length*2);
		const bufView = new Uint16Array(buf);
		for(let i = 0, strLen = str.length; i<strLen; i++) {
				bufView[i] = str.charCodeAt(i);
		}
		return bufView;
}

function delayedNotification(callback) {
		setTimeout(function() {
				if(isSubscribed) {
					const now = new Date();
					const data = {
						h: now.getHours(),
						m: now.getMinutes(),
						s: now.getSeconds()
					}
					const res = str2ab(JSON.stringify(data))
					console.log(res);
					callback(res);
					delayedNotification(callback);
				}
		}, notifyInterval * 1000);
};

CustomCharactetistic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
	console.log('onSubscribe');
	isSubscribed = true;
	console.log(maxValueSize)
	delayedNotification(updateValueCallback);
	this._updateValueCallback = updateValueCallback;
}

CustomCharactetistic.prototype.onUnsubscribe = function(maxValueSize, updateValueCallback) {
	console.log('onUnSubscribe');
	isSubscribed = false;
	this._updateValueCallback = null;
}

util.inherits(CustomCharactetistic, BlenoCharacteristic);

module.exports = CustomCharactetistic;
