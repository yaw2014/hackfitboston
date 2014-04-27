$(function () {
	drawSleepQualityGraph(1);
});
function getDay(str) {
	return parseInt( str.replace(/Day /,""));
}
function getMood(timing, obj) {
	var timing = "mood_"+timing;
	var day = getDay(obj.key);
	return obj.series.options[timing][day-1];
}
function drawSleepQualityGraph(dataIndex) {
	data = [
		[
			[Date.UTC(2014, 04, 13, 23, 40), Date.UTC(2014, 04, 14, 8, 00)],
			[Date.UTC(2014, 04, 14, 23, 55), Date.UTC(2014, 04, 15, 7, 30)],
			[Date.UTC(2014, 04, 15, 23, 22), Date.UTC(2014, 04, 16, 8, 30)],
			[Date.UTC(2014, 04, 16, 22, 40), Date.UTC(2014, 04, 17, 8, 00)],
			[Date.UTC(2014, 04, 17, 23, 59), Date.UTC(2014, 04, 18, 8, 30)],
			[Date.UTC(2014, 04, 18, 22, 40), Date.UTC(2014, 04, 19, 7, 30)],
			[Date.UTC(2014, 04, 20, 02, 30), Date.UTC(2014, 04, 20, 8, 00)],
			[Date.UTC(2014, 04, 20, 23, 45), Date.UTC(2014, 04, 21, 8, 00)],
			[Date.UTC(2014, 04, 21, 22, 30), Date.UTC(2014, 04, 22, 7, 30)],
			[Date.UTC(2014, 04, 22, 22, 30), Date.UTC(2014, 04, 23, 8, 30)],
			[Date.UTC(2014, 04, 23, 23, 50), Date.UTC(2014, 04, 24, 9, 00)],
			[Date.UTC(2014, 04, 24, 23, 50), Date.UTC(2014, 04, 25, 8, 00)],
			[Date.UTC(2014, 04, 25, 23, 55), Date.UTC(2014, 04, 26, 7, 00)],
			[Date.UTC(2014, 04, 26, 23, 40), Date.UTC(2014, 04, 27, 8, 00)],
		],
		[
			[Date.UTC(2014, 04, 27, 00, 02), Date.UTC(2014, 04, 27, 5, 07)],
			[Date.UTC(2014, 04, 26, 21, 53), Date.UTC(2014, 04, 27, 4, 39)],
			[Date.UTC(2014, 04, 26, 23, 03), Date.UTC(2014, 04, 27, 4, 55)],
			[Date.UTC(2014, 04, 26, 21, 37), Date.UTC(2014, 04, 27, 4, 33)],
			[Date.UTC(2014, 04, 26, 22, 42), Date.UTC(2014, 04, 27, 4, 40)],
			[Date.UTC(2014, 04, 26, 22, 02), Date.UTC(2014, 04, 27, 4, 35)],
			[Date.UTC(2014, 04, 26, 22, 01), Date.UTC(2014, 04, 27, 4, 59)],
			[Date.UTC(2014, 04, 26, 22, 33), Date.UTC(2014, 04, 27, 4, 58)],
			[Date.UTC(2014, 04, 26, 21, 10), Date.UTC(2014, 04, 27, 4, 42)],
			[Date.UTC(2014, 04, 26, 22, 22), Date.UTC(2014, 04, 27, 4, 38)],
			[Date.UTC(2014, 04, 26, 21, 47), Date.UTC(2014, 04, 27, 4, 34)],
			[Date.UTC(2014, 04, 26, 22, 24), Date.UTC(2014, 04, 27, 4, 36)],
			[Date.UTC(2014, 04, 26, 23, 14), Date.UTC(2014, 04, 27, 4, 55)],
			[Date.UTC(2014, 04, 27, 00, 03), Date.UTC(2014, 04, 27, 5, 11)],
		]
	];
	$('#container').highcharts({
		chart: {
			type: 'columnrange',
			inverted: true,
			zoomType: "xy",
			events: {
                load: function(event) {
					var good = function(v1, v2) { var avg = parseInt((v1+v2)/2)/100; return {
							linearGradient: { x1: 0, x2: 0, y1: 0, y1: 1 },
							stops: [
								[0, fadeToColor("rgb(255,0,0)", "rgb(0,255,0)", avg)],
								[1, fadeToColor("rgb(255,0,0)", "rgb(0,255,0)", avg)],
							]
						}};
					var bad = function(v1, v2) { var avg = parseInt((v1+v2)/2)/100; return {
							linearGradient: { x1: 0, x2: 0, y1: 0, y1: 1 },
							stops: [
								[0, fadeToColor("rgb(255,0,0)", "rgb(0,255,0)", avg)],
								[1, fadeToColor("rgb(255,0,0)", "rgb(0,255,0)", avg)],
							]
						}};
					var mood_sleep, mood_wake, day;
					for (var i in this.series[0].points) {
						delete this.series[0].pointAttr.hover.fill;
						delete this.series[0].pointAttr[''].fill;
						day = getDay(this.series[0].points[i].category)-1;
						mood_sleep = this.series[0].points[i].series.options.mood_sleep[day];
						mood_wake = this.series[0].points[i].series.options.mood_wake[day];
						if (mood_wake >= mood_sleep) this.series[0].points[i].graphic.attr("fill", good(mood_sleep, mood_wake));
						else this.series[0].points[i].graphic.attr("fill", bad(mood_sleep, mood_wake));
						//console.log("on day ",day,"the moods where", mood_sleep, mood_wake);
					}
                }
            }    
		},
		title: {
			text: 'Sleep Quality'
		},
		subtitle: {
			text: 'For experiment: H.I.I.T in the morning'
		},
		xAxis: {
			categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', "Day 12", "Day 13", "Day 14"]
		},
		yAxis: {
			title: {
				text: 'Bed Time'
			},
	type: "datetime"
		},
		tooltip: {
			valueSuffix: '',
			formatter: function () { 
				day = getDay(this.key);
				return "" + 
					"Mood Bedtime: " + getMood("sleep", this) + 
					", Mood Awaking: " + getMood("wake", this) + 
					"" ;
			},
		},
		plotOptions: {
			columnrange: {
				dataLabels: {
					enabled: true,
					useHTML: true,
					formatter: function (a) {
						var img;
						if (a.align == "left") {
							img = getMood("wake", this);
						} else {
							img = getMood("sleep", this);
						}
						return "<strong>"+img+"</strong>";
					}
				}
			}
		},
		legend: {
			enabled: false
		},
		series: [{
			name: 'Time asleep',
			mood_sleep: [ 20, 20, 30, 10, 80, 80, 80, 80, 30, 80, 80, 90, 60, 90 ],
			mood_wake: [ 50, 50, 20, 50, 80, 80, 50, 80, 80, 80, 80, 80, 80, 50 ],
			data: data[dataIndex]
		}]
	});
}
function fadeToColor(rgbColor1, rgbColor2, ratio) {
    var color1 = rgbColor1.substring(4, rgbColor1.length - 1).split(','),
        color2 = rgbColor2.substring(4, rgbColor2.length - 1).split(','),
        difference,
        newColor = [];

    for (var i = 0; i < color1.length; i++) {
        difference = color2[i] - color1[i];
        newColor.push(Math.floor(parseInt(color1[i], 10) + difference * ratio));
    }

    return 'rgb(' + newColor + ')';
}
