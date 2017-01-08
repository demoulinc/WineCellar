"use strict";
var Guid = require('Guid');

module.exports = class Wine  {
    constructor() {
        this.id = Guid.raw();
        this.label = "";
        this.appellation ="";
        this.color ="";
        this.year = null;
        this.region ="";
        this.country ="";
        this.dealer ="";
        this.grapeVarieties ="";
        this.numberOfBottles = 0;
    }
}

