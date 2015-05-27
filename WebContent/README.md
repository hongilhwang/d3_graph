# StevenChart
Steven Bar Chart

* d3.js를 이용한 간단한 바차
  
# 기본 사용방법 
* import
```html
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <script src="/barchart/barchart.js"></script>
    
    <style type="text/css">
        
        #stevenBar .axis path,
        #stevenBar .axis line {
            fill: none;
            stroke: black;
            shape-rendering: crispEdges;
        }
        
        #stevenBar .axis text {
            font-family: sans-serif;
            font-size:11px;
        }

    </style>
```
* html
```html
<div id="stevenBar"></div>
```

* script
```
    var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];
                
    var head = [
                "col1","col2","col3","col4","col5","col6","col7","col8","col9","col10"
                ];
    
    var barChart = new Steven_Bar();
    
    barChart.setOption({
                            "name" : "stevenBar",
                            "layout" : { 
                                            "width" : 500, 
                                            "height" : 100 
                                        },
                            "xAxis" : { "height" : 20 },
                            "yAxis" : { "width" : 20 },
                            "bar" : { 
                                        "width" : 20, 
                                        "padding" : 1 
                                    },
                            "value" : {
                                            "height" : 20,
                                            "font" : { 
                                                        "size" : "11px", 
                                                        "color" : "#FFFFFF" 
                                                    } 
                                        }
                        });
                        
    barChart.setDataset(dataset);
    barChart.setHead(head);
    
    barChart.view();
```