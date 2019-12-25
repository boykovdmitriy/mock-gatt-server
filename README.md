# mock-gatt-server

You can install it by ```npm install```.

If you want to use this mock file on OSX you need to install and use `bleno-mac` instead of `bleno`

ServiceId: `092c2f68-87d6-41f5-87c8-4edef16e6d32`

CharacteriscisServiceId: `031a785c-a742-4d2f-9bcb-3a81437336a5`

If you want to test it without developing client part you can use LightBlue app for android or IOS.

This mock service can:
1) Receive client message
2) Response to client with default message(sends number 42)
3) Notify client each 5 seconds by sending current time in JSON
