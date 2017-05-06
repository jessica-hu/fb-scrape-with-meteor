import Highcharts from 'highcharts';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './visualizations.html';

Template.visualizations.events({
});


export function formatUserData(data) {
  var dictionary = {'ANGRY' : 0, 'HAHA' : 0, 'LIKE' : 0, 'LOVE' : 0, 'SAD' : 0, 'WOW' : 0};
  console.log(JSON.stringify(data));

  for(var i in data.reactions){
     dictionary[data.reactions[i].type] = dictionary[data.reactions[i].type] + 1;
   }

  return Object.values(dictionary);
}


export function insert(val) {
  document.getElementById("inserthere").innerHTML = val;
}

export function createHigh(input) {
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
          data: formatUserData(input)
        }
      ]
    });
  });
}
