import Highcharts from 'highcharts';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { PostData, UserData } from '../lib/api/database.js';

import './visualizations.html';

Template.visualizations.onRendered( function(){
  console.log(UserData.find({"name" : 'Seth Van Doren'}).fetch());
});







export function formatUserData(userID) {
  var user = UserData.findOne({"name" : userID});
  //if (user.count() == 0) {
  //    return [0, 0, 0, 0, 0, 0];
  //}

  var dictionary = {'ANGRY' : 0, 'HAHA' : 0, 'LIKE' : 0, 'LOVE' : 0, 'SAD' : 0, 'WOW' : 0};
  console.log(JSON.stringify(user));

  for(var i in user.reactions){
     dictionary[user.reactions[i].type] = dictionary[user.reactions[i].type] + 1;
   }

  return Object.values(dictionary);
}


export function insert(val) {
  document.getElementById("inserthere").innerHTML = val;
}

export function createHigh() {
  $(function () {
    var myChart = Highcharts.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Reaction Data breakdown'
      },
      xAxis: {
        categories: ['ANGRY', 'HAHA', 'LIKE', 'LOVE', 'SAD', 'WOW']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        },
      },
      series: [
        {
          name: 'John',
          data: formatUserData(Session.get('userid'))
        }
      ]
    });
  });
}
