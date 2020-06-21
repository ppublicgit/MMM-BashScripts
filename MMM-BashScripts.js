Module.register("MMM-BashScripts", {

    defaults: {
        debug: false,
    },

    requiresVersion: "2.1.0",


    start: function () {
        mylog_ = function() {
            var context = "[BashScripts]"
            return Function.prototype.bind.call(console.log, console, context)
        }()

        mylog = function() {
            //do nothing
        }
        this.config = Object.assign({}, this.default, this.config)
        if (this.config.debug) mylog = mylog_
        this.sendSocketNotification("INIT_BS", this.config.debug)
        mylog("mmm-bs init")
    },

    notificationReceived: function (notification, payload) {
        switch(notification) {
            case "DOM_OBJECTS_CREATED":
                this.sendSocketNotification("START_MIC")
                break
            case "USER_PRESENCE":
                Log.log("mmm-bs User presence")
                if (payload == true) {
                    this.sendSocketNotification("START_MIC")
                } else this.sendSocketNotification("STOP_MIC")
                break
            case "NEW_QUOTE":
                this.sendNotification("QUOTE-OF-THE-DAY", "getNewQuote")
                break
            default :
                break
        }
    },
});
