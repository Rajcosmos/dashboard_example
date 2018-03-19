
//**  Collect Data from /names extract "response" and on change trigger getdata function for the selected drop down value) */
function option_selection(){

var queryURL="/names";

d3.json(queryURL, function(error, response) {

    console.log('error:', error);
    if (error) return console.warn(error);
    //console.log(response);
    //console.log("type", typeof(response));
    init_gauge(response[0]);
    metadata(response[0]);
    for (i=0 ; i< response.length; i++){
      var names_options = response[i];
     //using d3 to feed the drop in data so that we can select the options
      d3.select('#selDataset')
        .append('option')
        .on("change",optionChanged)
        .attr('value',response[i])
        .text(response[i]);
     //Trigger function on change
      function optionChanged(){
       var data=d3.select('option').node().value;
       getData(data)
      }
   
      
    }

  })
}


function metadata(sample){

    var url="/metadata/"+sample;
    console.log(url);
    d3.json(url, function(error, resp) {
      console.log('error:', error);
      if (error) return console.warn(error);
  
    
       var data =[
         {name:"AGE", number:resp[0].AGE},
         {name:"BBTPYE", number:resp[0].BBTYPE},
         {name:"ETHNICITY",number:resp[0].ETHNICITY},
         {name:"GENDER",number:resp[0].GENDER},
         {name:"LOCATION",number:resp[0].LOCATION},
         {name:"SAMPLEID",number:resp[0].SAMPLEID}
       ]

        d3.selectAll("div")
        .data(data, function(d) { return d ? d.name : this.id; })
        .style("font-size", "15px")
        .text(function(d) { 
          return [d.name,d.number] });
        

    });
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
    height: 400,
    width: 400,
  };
  Plotly.plot('pie', data, layout);
}


function updatePlotly_pie(newdata,labels) {
  var PIE = document.getElementById('pie');
  console.log(labels);
  //console.log(newdata);
  Plotly.restyle(PIE, 'values', [newdata]);
  Plotly.restyle(PIE, 'labels', [labels]);
}

//** *************************Gauge Chart *****************
//************ */

function init_gauge(sample)
{

var url="/wfreq/"+sample;
console.log(url);

d3.json(url, function(error, resp) {
  console.log('error:', error);
  if (error) return console.warn(error);
  console.log(resp[0].WFREQ);

// Enter a value corresponding to sample
var level = resp[0].WFREQ;

// Trig to calc meter point and multiplying by 20 to move the dial (level*20=angle degree)

var degrees = 180 - level*20,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'scrub',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/9,50/9,50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
  rotation: 90,
  text: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3',
            '1-2', '0-1', ''],
  textinfo: 'text',
  textposition:'inside',      
  marker: {colors:['rgba(0, 51, 0, .5)','rgba(0, 102, 0, .5)','rgba(0, 153, 76, .5)','rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                         'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                         'rgba(255, 255, 255, 0)']},
  labels: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b> Belly Button Washing Frequency</b> <br> Scrubs per Week',
  height: 600,
  width: 600,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);

}) ;
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
             height:500,
             width:900,
     };
     Plotly.newPlot('bubble',data,layout);
    }

    
     function updatePlotly_bubble(y,x) {
          var BUBBLE = document.getElementById('bubble');
       
           console.log(x);
          // console.log(y);
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

  // Data for Pie chart - otuid and sample_values
  var url="/samples/"+data;
  //Otuid description
  var url_desc="/otu";

// assigning samplevalue and otuid as arrays
  var samplevalues = [];
  var otuid = [];

  // Get response from the /samples/<sample>
  d3.json(url, function(error, response) {
    //console.log('error:', error);
    //if (error) return console.warn(error);
    //console.log(response);
    //console.log("type", typeof(response));
    //console.log(response[0].otu_ids.length);
    //console.log(response[0].sample_values.length);
    
    for (var i=1; i<response[0].otu_ids.length;i++){

      samplevalues.push(response[0].sample_values[i]);
      otuid.push(response[0].otu_ids[i]);
    }

   // console.log(samplevalues);
   // console.log(otuid);
//NOTE : tried sorting but it seems the values of otuid remains same hence picking only top 10 sample values**
    samplevalues.sort(function(a,b){return b - a});
    //otuid.sort(function(a,b){return b - a});
    //console.log("After sort")
//console.log(samplevalues);
//console.log(otuid);
 
var dataPlots=[]
var labelPlots=[]
 for (var i=0; i<10; i++) {
 dataPlots.push(samplevalues[i]);
 labelPlots.push(otuid[i]);
 }
updatePlotly_pie(dataPlots,labelPlots);  
updatePlotly_bubble(dataPlots,labelPlots);

})

metadata(data);
init_gauge(data);

}


option_selection();
init_pie();
//init_gauge();
init_bubble();