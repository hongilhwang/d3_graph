var Steven_Bar = (function () {
	    
	    var dataset = [];
	    var head = [];
	    var BAR_PADDING_PER = 0.2;
		
		
		var option = {
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
					};
		
		/* 생성자 */
		function Steven_Bar() {
			console.log("--------- Steven bar created. --------- ");
		}
	
	    
	    /**
	     * option setter 
	     **/
		Steven_Bar.prototype.setOption = function (_option) {
	        option = _option
	    };
		/**
		 * dataset Setter
		 * @param _dataset
		 */
	    Steven_Bar.prototype.setDataset = function (_dataset){
	    	dataset = _dataset;
	    };
	    /**
	     * head Setter
	     * @param _head
	     */
	    Steven_Bar.prototype.setHead = function(_head){
	    	head = _head;
	    };
	    
	    Steven_Bar.prototype.view = function () {
	    	
	        
	        //전체 공간을 생성한다.
	        var svg = d3.select("#" + option.name)
	                    .append("svg")
	                    .attr("width", option.layout.width)
	                    .attr("height", option.layout.height);
	        
	        //척도 생성
	        var yScale = d3.scale.linear()
	        					.domain([0,  d3.max(dataset)])//정의역
	        					.range([0, getViewHeight() ]);//치역
	        
	        var barScale = d3.scale.linear()
								.domain([0, option.layout.width])//정의역
								.range([0, getViewWidth()  ]);//치역
	        
	        // 축 생성 
	        var xAxisScale = d3.scale.ordinal()
						        .domain(head)
						        .rangePoints([getXAxisStartPoint(), getXAxisEndPoint()]);
	
		    var xAxis = d3.svg.axis()
					        .scale(xAxisScale)
					        .orient("buttom");
	        
		
	        //그래프 bar를 생성한다.
	        svg.selectAll("rect")
	            .data(dataset)
	            .enter()
	            .append("rect")
	            .attr("x", function(d, i){
	                return getBarXpoint(barScale, i);
	            })
	            .attr("y", function(d){
	                return getBarYpoint( yScale, d);
	            })
	            .attr("width", getBarWidth())
	            .attr("height", function(d){
	                return yScale(d);
	            }).attr("fill",function(d) {
	                return "rgb(0, 0, " + (d * 10) + ")";
	            });
	        
	        
	        //값을 출력한다.
	        svg.selectAll("text")
		        .data(dataset)
		        .enter()
		        .append("text")
		        .attr("height", 20)
		        .attr("x", function(d, i){
		        	return getBarValueXpoint(barScale, i);
		        })
		        .attr("y", function(d){
		        	var fontSize = parseInt(option.value.font.size.replace("px", ""));
		            return getBarYpoint(yScale, d) + fontSize;
		        })
		        .attr("font-family", "sans-serif")
		        .attr("font-size", option.value.font.size )
		        .attr("fill", option.value.font.color )
		        .attr("text-anchor", "middle")
		        .text( function( d ){
		        			return d;
		        	  });
	      
	        svg.append("g")
	        	.attr("class", "axis")
				.attr("transform", "translate(0," + ( option.layout.height - option.xAxis.height) + ")")
	        	.call(xAxis);
	          
	   
	    }
	    
	    /**
	     * bar의 넓이를 계산한다.
	     * 
	     */
	    function getBarWidth(){
	    	var viewWidth = getViewWidth();
	    	viewWidth /= dataset.length;
	    	return viewWidth - getBarPadding( viewWidth );
	    }
	    
	    
	    /**
	     * bar 의 간격을 계산 한다.
	     */
	    function getBarPadding( viewWidth ){
	    	return viewWidth * BAR_PADDING_PER;
	    }
	    
	    /**
	     * index별 bar의 X위치를 계산한다.
	     */
	    function getBarXpoint( scale, index ){
	    	
	    	var returnValue = (getViewWidth() / dataset.length) * index + option.yAxis.width; 
	    	
	    	return returnValue;
	    }
	    /**
	     * 값별 bar의 Y위치를 계산한다.
	     */
	    function getBarYpoint( scale, value ){
	    	var viewHeight = getViewHeight();
	    	
	    	return viewHeight - scale(value);
	    }
	    
	    /**
	     * index별 값 표시 x값 계산.
	     */
	    function getBarValueXpoint(scale, index){
	    	return getBarXpoint(scale, index) + getBarWidth() / 2;
	    }
	    
	    /**
	     * xAxis x좌표의 시작점을 구한다.
	     */
	    function getXAxisStartPoint(){
	    	return option.yAxis.width + (getBarWidth() / 2);
	    }
	    /**
	     * xAxis x좌표의 종료점을 구한.
	     */
	    function getXAxisEndPoint(){
	    	return option.layout.width - (getBarWidth() / 2) - (getBarPadding(getViewWidth()) / dataset.length) ;
	    }
	    
	    /**
	     * View(그래프 Bar가 표시 되는 곳)의 높이.
	     */
	    function getViewHeight(){
	    	return option.layout.height - option.xAxis.height;
	    }
	    
	    /**
	     * View(그래프 Bar가 표시 되는 곳)의 넓이.
	     */
	    function getViewWidth(){
	    	return option.layout.width - option.yAxis.width;
	    }
	    
	    
	    return Steven_Bar;
	   
	})();

