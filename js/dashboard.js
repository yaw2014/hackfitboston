$(function () {
	$('#container').highcharts({
		chart: {
			type: 'columnrange',
	inverted: true
		},
	title: {
		text: 'Temperature variation by month'
	},
	subtitle: {
		text: 'Observed in Vik i Sogn, Norway, 2009'
	},
	xAxis: {
		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	},
	yAxis: {
		title: {
			text: 'Temperature ( °C )'
		}
	},
	tooltip: {
		valueSuffix: '°C'
	},
	plotOptions: {
		columnrange: {
			dataLabels: {
				enabled: true,
				useHTML: true,
				formatter: function () {
					var img;
					if (this.y > 0 ) img = "<img src='https://cdn1.iconfinder.com/data/icons/humano2/24x24/emotes/face-sad.png'>";
					else img = "<img src='http://icons.iconarchive.com/icons/hopstarter/sleek-xp-software/24/Yahoo-Messenger-icon.png'>";
					return img;
				}
			}
		}
	},
	legend: {
		enabled: false
	},
	series: [{
		name: 'Temperatures',
		color: {
			linearGradient: { x1: 0, x2: 0, y1: 0, y1: 1 },
			stops: [
				[0, 'red'],
			[1, 'green']
				]
		},
		
		data: [
			[-9.7, 9.4],
			[-8.7, 6.5],
			[-3.5, 9.4],
			[-1.4, 19.9],
			[0.0, 22.6],
			[2.9, 29.5],
			[9.2, 30.7],
			[7.3, 26.5],
			[4.4, 18.0],
			[-3.1, 11.4],
			[-5.2, 10.4],
			[-13.5, 9.8]
			]
	}]
	});
});
