import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { PostData, UserData } from '../lib/api/database.js';

import './body.html';
const visualizations = require('./visualizations');


//443809049300463
if(Meteor.isClient) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '443809049300463',
      status     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
  };
}


Template.body.onCreated(function(){
    Session.setDefault('userid', 'CHRIS TRIL');
    console.log(Session.get('userid'));
});

Tracker.autorun(() => {
  Meteor.subscribe('user_reactions', Session.get('userid'),
          { onReady: draw() }
  );
});

function draw() {
    var input = UserData.findOne({"name" : Session.get('userid')});

    if (input) {
        visualizations.createReactBar(input);
        FB.api(
          "/" + input._id + "/picture?type=large",
          function (response) {
            if (response && !response.error) {
              var elem = document.createElement("picture");
              elem.setAttribute("src", response.data.url);
              document.getElementById("image-cropper").appendChild(elem);
            }
          }
        );
    } else {
        console.log('what r u doin')
    }
}

Template.body.helpers({
});

Template.body.events({
  'submit .user-id'(event) {
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value.toUpperCase();

    Session.set('userid', text);
    },
});

// Hannah Bockley
// Seth Van Doren
