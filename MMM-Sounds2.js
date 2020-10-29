Module.register('MMM-Sounds2', {

    /**
    * Default Config
    */
    defaults: {
        debug:          false,
        startupSound:   true,
        alertSound:     true,
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
      if (notification === 'CONFIG') {
         if (!this.isLoaded) {
            this.config   = payload;
            this.isLoaded = true;
            if (this.config.startupSound) {
              this.log('Playing Startup Sound');
              playSound("startup");
            }
          }
        } else if (notification === 'PLAY_ALERT') {
		        this.log('Received Play Alert Notification');
            if (typeof payload === 'string') {
                this.log('Playing ' + payload.sound + );
                this.playAlert(payload);
            } else if (typeof payload === 'object') {
                if (typeof payload.sound === 'undefined' || !payload.sound) {
                    this.log('Could not play sound, `sound` was not supplied');
                } else {
                    this.log('Playing ' + payload.sound + ' with ' + payload.delay + 'ms delay');
                    this.playAlert(payload.sound, payload.delay);
                }
            }
        } else if (notification === 'SHOW_ALERT') {
          if (!this.isLoaded) {
             this.config   = payload;
             this.isLoaded = true;
             if (this.config.alertSound) {
               this.log('Alert Module Sound Triggered');
   		         playSound("alert");
             }
           }
	     }
    },

    /**
    * @param {String}  filename
    * @param {Number} [delay]  in ms
    */
    playAlert: function (soundname, delay) {
        // Only play if outside of quiet hours

        let play = true;

        if (this.config.quietTimeStart && this.config.quietTimeEnd) {
            this.log('Quiet Time Start is: ' + this.config.quietTimeStart);
            this.log('Quiet Time End is: ' + this.config.quietTimeEnd);

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
            delay = delay || this.config.defaultDelay;
            this.log('Playing ' + soundname + ' with ' + delay + 'ms delay');
            setTimeout(() => {
                playSound(soundname);
            }, delay);
		    } else {
            this.log('Not playing sound as quiet hours are in effect');
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
