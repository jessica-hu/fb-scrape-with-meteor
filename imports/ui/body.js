import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { PostData, UserData } from '../lib/api/database.js';

import './body.html';
const visualizations = require('./visualizations');

Template.body.onCreated(function(){
    Session.set('userid', 'Seth Van Doren');

    console.log(Session.get('userid'));
});

Tracker.autorun(() => {
  Meteor.subscribe('user_reactions', Session.get('userid'));
});

Template.body.helpers({
});

Template.body.events({
  'submit .user-id'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var value = $(event.target).val();
    /*if (isNaN(parseFloat(text)) || !isFinite(text)) { //if user inputs a name
        var returnText = JSON.stringify(UserData.findOne({ 'name' : text}));
    } else {
        var returnText = JSON.stringify(UserData.findOne({ '_id' : text}));
    }*/

    // update the templateId - whis will cause the autorun to execute again

    //visualizations.insert(returnText);
    visualizations.createHigh(UserData.findOne({"name" : Session.get('userid')}));
    },
});

// Hannah Bockley
// Seth Van Doren
