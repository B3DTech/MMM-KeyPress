Module.register("MMM-KeyPress", {
    start: function () {
        Log.log("Starting module: " + this.name);
    },

    notificationReceived: function(notification, payload, sender) {
        if (notification === "DOM_OBJECTS_CREATED") {
            window.addEventListener("keydown", this.keypressHandler.bind(this));
            window.addEventListener("pointerdown", this.pointerDownHandler.bind(this));
            window.addEventListener("pointerup", this.pointerUpHandler.bind(this));
        }
    },
    
    touchStartX: 0,
    touchEndX: 0,
    
    pointerDownHandler: function(event) {
        // Pointer events provide coordinates directly on the event
        this.touchStartX = event.screenX;
    },
    
    pointerUpHandler: function(event) {
        this.touchEndX = event.screenX;
        this.handleSwipe();
    },
    
    handleSwipe: function() {
        var difference = this.touchEndX - this.touchStartX;
        var threshold = 50;  // Adjust threshold as required
    
        if (difference > threshold) {
            this.sendSwipeNotification("ArrowLeft");
        } else if (difference < -threshold) {
            this.sendSwipeNotification("ArrowRight");
        }
    },

    sendSwipeNotification: function(direction) {
        var payload = {
            step: (direction === "ArrowRight" ? 1 : -1)  // 1 to move forward, -1 to move backward
        };
        this.sendNotification('CX3_GLANCE_CALENDAR', payload);
    },

    keypressHandler: function(event) {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            this.sendSwipeNotification(event.key);
        }
    }
});
