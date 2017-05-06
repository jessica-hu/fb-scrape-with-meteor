import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { PostData, UserData } from '../lib/api/database.js';

import './body.html';
const visualizations = require('./visualizations');

Template.body.onCreated(function(){
  // Here, this equals the current template instance. We can assign
  // our ReactiveVar to it, making it accessible throughout the
  // current template instance.
  Session.set('userid', 'Seth Van Doren');
});

Template.body.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.body.events({
  'submit .user-id'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    var text = target.text.value;
    /*if (isNaN(parseFloat(text)) || !isFinite(text)) { //if user inputs a name
        var returnText = JSON.stringify(UserData.findOne({ 'name' : text}));
    } else {
        var returnText = JSON.stringify(UserData.findOne({ '_id' : text}));
    }*/

    //visualizations.insert(returnText);
    console.log(text);
    Session.set( "userid", text );
    visualizations.createHigh();
    },
  });

// Hannah Bockley
// Seth Van Doren
