$(function () {
	drawSleepQualityGraph(1);
});
function getDay(str) {
	return parseInt( str.replace(/Day /,""));
}
function getMood(timing, obj) {
	var timing = "mood_"+timing;
	var day = getDay(obj.key);
	return obj.series.options[timing][day];
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
			[Date.UTC(2014, 04, 26, 23, 40), Date.UTC(2014, 04, 27, 8, 00)],
			[Date.UTC(2014, 04, 26, 23, 55), Date.UTC(2014, 04, 27, 7, 30)],
			[Date.UTC(2014, 04, 26, 23, 22), Date.UTC(2014, 04, 27, 8, 30)],
			[Date.UTC(2014, 04, 26, 22, 40), Date.UTC(2014, 04, 27, 8, 00)],
			[Date.UTC(2014, 04, 26, 23, 59), Date.UTC(2014, 04, 27, 8, 30)],
			[Date.UTC(2014, 04, 26, 22, 40), Date.UTC(2014, 04, 27, 7, 30)],
			[Date.UTC(2014, 04, 27, 02, 30), Date.UTC(2014, 04, 27, 8, 00)],
			[Date.UTC(2014, 04, 26, 23, 45), Date.UTC(2014, 04, 27, 8, 00)],
			[Date.UTC(2014, 04, 26, 22, 30), Date.UTC(2014, 04, 27, 7, 30)],
			[Date.UTC(2014, 04, 26, 22, 30), Date.UTC(2014, 04, 27, 8, 30)],
			[Date.UTC(2014, 04, 26, 23, 50), Date.UTC(2014, 04, 27, 9, 00)],
			[Date.UTC(2014, 04, 26, 23, 50), Date.UTC(2014, 04, 27, 8, 00)],
			[Date.UTC(2014, 04, 26, 23, 55), Date.UTC(2014, 04, 27, 7, 00)],
			[Date.UTC(2014, 04, 26, 23, 40), Date.UTC(2014, 04, 27, 8, 00)],
		]
	];
	$('#container').highcharts({
		chart: {
			type: 'columnrange',
		inverted: true,
		zoomType: "xy",
		},
		title: {
			text: 'Sleep Quality'
		},
		subtitle: {
			text: 'For the last 2 weeks'
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
							if (getMood("wake", this) < getMood("sleep", this) ) img = "<img src='https://cdn1.iconfinder.com/data/icons/humano2/24x24/emotes/face-sad.png'>";
							else img = "<img src='http://icons.iconarchive.com/icons/hopstarter/sleek-xp-software/24/Yahoo-Messenger-icon.png'>";
						} else {
							if (getMood("wake", this) > getMood("sleep", this) ) img = "<img src='https://cdn1.iconfinder.com/data/icons/humano2/24x24/emotes/face-sad.png'>";
							else img = "<img src='http://icons.iconarchive.com/icons/hopstarter/sleek-xp-software/24/Yahoo-Messenger-icon.png'>";
						}
						return img;
					}
				}
			}
		},
		legend: {
			enabled: false
		},
		series: [{
			name: 'Time asleep',
			color: {
				linearGradient: { x1: 0, x2: 0, y1: 0, y1: 1 },
				stops: [
					[0, 'red'],
				[1, 'green']
					]
			},
			mood_sleep: [ 20, 20, 30, 10, 80, 80, 80, 80, 30, 80, 80, 90, 60, 90 ],
			mood_wake: [ 50, 50, 20, 50, 80, 80, 50, 80, 80, 80, 80, 80, 80, 50 ],
			data: data[dataIndex]
		}]
	});
}
