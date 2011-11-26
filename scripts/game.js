function Game() {};
Game.prototype = {

    init: function() {
        this.fps = 10;
        this.step = 1 / this.fps;
        this.reset();
    },
    
    // Reset the game
    reset: function() {
        this.example = 0;
    },
    
    // Update the game model
    update: function() {
        if(Math.random() < 0.2) {
            this.example++;
            this.publish("example", this.example);
        }
    },

    subscribe: function(e, callback, target) {
        this.subs = this.subs || {};
        this.subs[e] = this.subs[e] || [];
        this.subs[e].push({ callback: callback, target: target });
    },

    publish: function(e) {
        this.subs && this.subs[e].forEach(function(sub) {
            var args = [].slice.call(arguments, 1);
            sub.callback.apply(sub.target, args)
        });
    }
}