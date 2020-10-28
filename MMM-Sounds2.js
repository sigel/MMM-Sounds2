Module.register('MMM-Sounds2', {

    /**
     * Default Config
     */
    defaults: {
        debug:          false,
        startupSound:   null,
        defaultDelay:   10,
        quietTimeStart: null,
        quietTimeEnd:   null
    },

    /**
     * Module Start
     */
    start: function() {
        this.sendSocketNotification('CONFIG', this.config);
        Log.info('Starting module: ' + this.name);
    },


    /**
    * Module Start
    */
    getScripts: function() {
		return [
			this.file('sounds.js'),
		]
	},



    /**
     * Notification Received from other modules
     *
     * @param {String} notification
     * @param {*}      payload
     */
    notificationReceived: function(notification, payload, sender) {
        if (notification === 'PLAY_ALERT') {
		this.log('Received Play Alert Notification');
		playSound("ping");
        }
	if (notification === 'SHOW_ALERT') {
		this.log('Alert Module Triggered');
		playSound("ping");
	}
    },

    /**
     * @param {String}  filename
     * @param {Number} [delay]  in ms
     */
    playFile: function (filename, delay) {
        // Only play if outside of quiet hours
        let play = true;

        if (this.config.quietTimeStart && this.config.quietTimeEnd) {
            this.log('Quiet Time Start is: ' + this.config.quietTimeStart, true);
            this.log('Quiet Time End is: ' + this.config.quietTimeEnd, true);

            let start_moment = moment(this.config.quietTimeStart, 'HH:mm');
            let end_moment   = moment(this.config.quietTimeEnd, 'HH:mm');

            this.log('Start Moment: ' + start_moment.format('YYYY-MM-DD HH:mm'));
            this.log('End Moment: ' + end_moment.format('YYYY-MM-DD HH:mm'));

            let time = moment();

            if (start_moment.isBefore(end_moment)) {
                if (moment().isBetween(start_moment, end_moment)) {
                    play = false;
                }
            } else {
                let day_start = moment('00:00:00', 'HH:mm:ss');
                let day_end = moment('23:59:59', 'HH:mm:ss');
                if (time.isBetween(day_start, end_moment) || time.isBetween(start_moment, day_end)) {
                    play = false;
                }
            }
        }

        if (play) {
			playSound("dead");
		}
	},


    /**
     * Outputs log messages
     *
     * @param {String}  message
     * @param {Boolean} [debug_only]
     */
    log: function (message, debug_only) {
        if (!debug_only || (debug_only && typeof this.config.debug !== 'undefined' && this.config.debug)) {
            console.log('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] [MMM-Sounds2] ' + message);
        }
    }
 
});
