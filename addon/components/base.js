import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

export default Component.extend({
  memory: inject.service('memory-scroll'),

  didRender() {
    this._super(...arguments);
    let key = this.get('key');
    if (!key) {
      throw new Error("You must provide a key to memory-scroll like {{memory-scroll key=\"my-awesome-pane\"}}.");
    }
    if (key !== this._lastKey) {
      this.remember(this._lastKey);
      this._lastKey = key;
      Ember.$(document).ready(function() {
        this.restore(key);        
      }.bind(this));
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this.remember(this.get('key'));
  },

  remember(key) {
    if (key) {
      var position = window.scrollY;
      this.get('memory')[key] = position;
    }
  },

  restore(key) {
    var position = this.get('memory')[key] || 0;
    window.scrollTo(0, position);
  }

});
