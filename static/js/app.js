

function option_selection(){
var queryURL="/names";
d3.json(queryURL, function(error, response) {
    console.log('error:', error);
    if (error) return console.warn(error);
    console.log(response);
    console.log("type", typeof(response));
   // document.write(JSON.stringify(response));

    for (i=0 ; i< response.length; i++){
      var names_options = response[i];
     // console.log(names_options);
      d3.select('#selDataset')
        .append('option')
        .on("change",optionChanged)
        .attr('value',response[i])
        .text(response[i]);

      function optionChanged(){
      
       var data=d3.select('option').node().value;
       getData(data)
      }
      
    }

  })
}

// Pie plot ***********

function init_pie() {
  var data = [
    {
      values: [8, 78, 71, 7, 7, 7, 6, 51, 50, 5], 
      labels: [2722, 2264,41, 2178,2908,307,1193,1189,352,1208 ],
      type: 'pie',
    },
  ];
  var layout = {
    height: 600,
    width: 800,
  };
  Plotly.plot('pie', data, layout);
}
function updatePlotly(newdata,labels) {
  var PIE = document.getElementById('pie');
  console.log(labels);
  console.log(newdata);
  Plotly.restyle(PIE, 'values', [newdata]);
  Plotly.restyle(PIE, 'labels', [labels]);
}

// Bubble plot *******


function init_bubble() {
  var trace = 
    {
     x: [2722, 2264,41, 2178,2908,307,1193,1189,352,1208 ],
      y: [8, 78, 71, 7, 7, 7, 6, 51, 50, 5], 
      mode: 'markers',
      marker:{
         color:['rgb(93,164,214)','rgb(255,144,14)','(rgb(44,160,101)','(rgb(44,255,100)','(rgb(100,160,120)',
         '(rgb(23,160,95)','(rgb(245,160,100)','(rgb(50,95,101)','(rgb(67,200,120)','(rgb(45,100,101)'],
      opacity:[1,0.8,0.6,0.4,0.3,0.6,0.8,0.9,0.5,0.7],
      size:[8, 78, 71, 7, 7, 7, 6, 51, 50, 5],
      }
   
     }
     var data =[trace];

     var layout={
             title:'Hey!, Bubble Chart...',
             showlegend:false,
             height:600,
             width:1000
     };
     Plotly.newPlot('bubble',data,layout);
    }
    
     function updatePlotly(y,x) {
          var BUBBLE = document.getElementById('bubble');
       
           console.log(x);
           console.log(y);
            var s =[];
              s=y;
    
            //for (var i=0; i< s.length;i++) {
             //   s[i]=s[i]*2;
          //  }
          //    console.log(s);
         
       // console.log(temp);
           Plotly.restyle(BUBBLE, 'x', [x]);
           Plotly.restyle(BUBBLE, 'y', [y]);
           Plotly.restyle(BUBBLE, 'marker.size',[y]);

          // Plotly.restyle(BUBBLE,'color',[y]);
           
      }



function getData(data) {
  console.log(data);
  var url="/samples/"+data;

  console.log(url)
  var samplevalues = [];
  var otuid = [];
  d3.json(url, function(error, response) {
    //console.log('error:', error);
    //if (error) return console.warn(error);
    console.log(response);
    console.log("type", typeof(response));
    //console.log(JSON.stringify(response));

 
    for (i=1; i<11;i++){

      samplevalues.push(response[0].sample_values[i]);
      otuid.push(response[0].otu_ids[i]);
      
      
    }

console.log(samplevalues);
console.log(otuid);


updatePlotly(samplevalues,otuid);  
    //samplevalues.sort(function(a,b){return b - a});
    //console.log(response.sample_values[0]);
})
}

init_pie();

init_bubble();

option_selection();
