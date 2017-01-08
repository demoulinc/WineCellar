 "use strict";

 class Color {
    constructor(name, displayLabel) {
        this.name = name;
        this.displayLabel = displayLabel;
    }
    toString() {
        return this.displayLabel;
    }
}
Color.RED = new Color('RED', 'Red');
Color.WHITE = new Color('WHITE', 'White');
Color.PINK = new Color('PINK', 'Pink');

var colors = [Color.RED, Color.WHITE, Color.PINK];

module.exports = colors;

