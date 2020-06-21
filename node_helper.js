const NodeHelper = require('node_helper')
const exec = require('child_process').exec


var _log = function() {
    var context = "[BashScripts]"
    return Function.prototype.bind.call(console.log, console, context)
}()

var log = function() {
    //do nothing
}

module.exports = NodeHelper.create({

    start: function() {
        console.log('Starting node_helper for module ' + this.name)
    },

    initialize: function() {
        console.log("[BashScripts] Initialize...")
        var debug = (this.conf.debug) ? this.conf.debug : false
        if (debug == true) log = _log
        log("Thank you for using this module to control mic")

        console.log("[BashScripts] Initialize Complete")
        this.startMic()
    },

    socketNotificationReceived: function (notification, payload) {
        switch(notification) {
            case "INIT":
                this.conf.debug = payload
                this.initialize()
                break
            case "START_MIC":
                this.startMic()
                break
            case "STOP_MIC":
                this.stopMic()
                break
        }
    },

    startMic: function(){
        exec("amixer set Capture cap")
        log("Starting Mic.")
    },

    stopMic: function(){
        exec("amixer set Capture nocap")
        log("Stopping Mic.")
    }
});
