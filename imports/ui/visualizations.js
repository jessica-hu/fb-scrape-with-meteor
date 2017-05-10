import Highcharts from 'highcharts';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './visualizations.html';

Template.visualizations.events({
});

export function formatUserData(data) {
  var dictionary = {'ANGRY' : 0, 'HAHA' : 0, 'LIKE' : 0, 'LOVE' : 0, 'SAD' : 0, 'WOW' : 0};

  for(var i in data.reactions){
     dictionary[data.reactions[i].type] = dictionary[data.reactions[i].type] + 1;
   }

  return Object.values(dictionary);
}


export function insert(val) {
  document.getElementById("inserthere").innerHTML = val;
}

export function createReactBar(input) {
  $(function () {
    var myChart = Highcharts.chart('bar chart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Reaction Data Breakdown'
      },
      xAxis: {
        categories: ['ANGRY', 'HAHA', 'LIKE', 'LOVE', 'SAD', 'WOW']
      },
      yAxis: {
        title: {
          text: 'Total Reactions'
        },
        type: 'linear',
        tickInterval: 20,
      },
      series: [
        {
          data: formatUserData(input),
          name: Session.get('userid')
        }
      ],
      credits: false
    });
  });
}
