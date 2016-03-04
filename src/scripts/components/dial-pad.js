import { Component, register } from '../component'
var DialPad = register({
    beforeUpdate: function(action, props) {
        if (action === 'dialing') {
            // ...
        } else if (action === 'callout') {
            console.log('div before callout');
            this.interval = loading(this.props.dom.callout, 'Call');
        }
    },
    afterUpdate: function(action, props) {
        if (action === 'dialing') {
            // ...
        } else if (action === 'callout') {
            if (this.interval) {
                this.interval.cancel('Call');
                this.interval = null;
            }
        }
    },
    methods: {
        dialing: function(finish, event) {
            var button = event.target;
            this.props.dom.number.value += button.getAttribute('data-value');
            return finish(this.props);
        },
        callout: function(finish) {
            this.props.toNumber = this.props.dom.number.value;
            this.props.fromNumber = localStorage.getItem('username');
            return finish(this.props);
        }
    }
})

function loading(target, text) {
    var dotCount = 1;
    var interval = window.setInterval(() => {
        var dot = '';
        var dotCountTmp = dotCount;
        while (dotCount--)
            dot += '.';
        target.textContent = text + dot;
        dotCount = (dotCountTmp + 1) % 4;
    }, 500)
    return {
        cancel: function(text) {
            if (interval) {
                window.clearInterval(interval);
                interval = null;
                if (typeof text !== 'undefined')
                    target.textContent = text;
            }
        }
    }
}
export default DialPad;