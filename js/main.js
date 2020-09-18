function logSubmit(event) {
  event.preventDefault();

  console.log('--------');
  console.log('income: ' + income.value);
  console.log('Current: ' + calculateCurrent(income.value));
  console.log('Greens: ' + calculateGreen(income.value));
  console.log('Labour: ' + calculateLabour(income.value));
  console.log('National: ' + calculateNational(income.value));

  log.innerHTML = "<div class='results'>\
  	<div class='current'>\
  		<h2>Current</h2>\
  		<div class='pay'><h3>Income after tax<h3> <span>$" + (income.value - calculateCurrent(income.value)) + "</span></div>\
  		<div class='pay'><h3>Tax paid<h3> <span>$" + calculateCurrent(income.value) + "</span></div>\
  	</div>\
  	<div class='labour'>\
  		<h2>Labour</h2>\
  		<div class='pay'><h3>Income after tax<h3> <span>$" + (income.value - calculateLabour(income.value)) + "</span></div>\
  		<div class='pay'><h3>Tax paid<h3> <span>$" + calculateLabour(income.value) + "</span></div>\
  	</div>\
  	<div class='green'>\
  		<h2>Greens</h2>\
  		<div class='pay'><h3>Income after tax<h3> <span>$" + (income.value - calculateGreen(income.value)) + "</span></div>\
  		<div class='pay'><h3>Tax paid<h3> <span>$" + calculateGreen(income.value) + "</span></div>\
  	</div>\
  	<div class='national'>\
  		<h2>National</h2>\
  		<div class='pay'><h3>Income after tax<h3> <span>$" + (income.value - calculateNational(income.value)) + "</span></div>\
  		<div class='pay'><h3>Tax paid<h3> <span>$" + calculateNational(income.value) + "</span></div>\
  	</div>\
  </div>";
}

const form = document.getElementById('tax');
const log = document.getElementById('log');
const income = document.getElementById('income');

form.addEventListener('submit', logSubmit);




function calculateCurrent(x) {
	var income = Number(x);
	var tax = 0;

	rate1 = processRate('{"lower":0, "higher":14000, "rate":10.5, "income":' + income + '}');

	rate2 = processRate('{"lower":14000, "higher":48000, "rate":17.5, "income":' + income + '}');

	rate3 = processRate('{"lower":48000, "higher":70000, "rate":30, "income":' + income + '}');

	rate4 = processRate('{"lower":70000, "higher":' + income + ', "rate":33, "income":' + income + '}');

	tax = rate1 + rate2 + rate3 + rate4;

	return tax;
}

function calculateGreen(x) {
	var income = Number(x);
	var tax = 0;

	rate1 = processRate('{"lower":10000, "higher":14000, "rate":10.5, "income":' + income + '}');

	rate2 = processRate('{"lower":14000, "higher":48000, "rate":17.5, "income":' + income + '}');

	rate3 = processRate('{"lower":48000, "higher":70000, "rate":30, "income":' + income + '}');

	rate4 = processRate('{"lower":70000, "higher":100000, "rate":33, "income":' + income + '}');

	rate5 = processRate('{"lower":100000, "higher":150000, "rate":37, "income":' + income + '}');

	rate6 = processRate('{"lower":150000, "higher":' + income + ', "rate":42, "income":' + income + '}');

	tax = rate1 + rate2 + rate3 + rate4 + rate5 + rate6;

	return tax;
}


function calculateLabour(x) {
	var income = Number(x);
	var tax = 0;

	rate1 = processRate('{"lower":0, "higher":14000, "rate":10.5, "income":' + income + '}');

	rate2 = processRate('{"lower":14000, "higher":48000, "rate":17.5, "income":' + income + '}');

	rate3 = processRate('{"lower":48000, "higher":70000, "rate":30, "income":' + income + '}');

	rate4 = processRate('{"lower":70000, "higher":180000, "rate":33, "income":' + income + '}');

	rate5 = processRate('{"lower":180000, "higher":' + income + ', "rate":39, "income":' + income + '}');

	tax = rate1 + rate2 + rate3 + rate4 + rate5;

	return tax;
}

function calculateNational(x) {
	var income = Number(x);
	var tax = 0;

	rate1 = processRate('{"lower":0, "higher":20000, "rate":10.5, "income":' + income + '}');

	rate2 = processRate('{"lower":20000, "higher":64000, "rate":17.5, "income":' + income + '}');

	rate3 = processRate('{"lower":64000, "higher":90000, "rate":30, "income":' + income + '}');

	rate4 = processRate('{"lower":90000, "higher":' + income + ', "rate":33, "income":' + income + '}');

	tax = rate1 + rate2 + rate3 + rate4;

	return tax;
}



function processRate(x) {
	var data = JSON.parse(x);

	var lower = data.lower;
	var higher = data.higher;
	var rate = data.rate / 100;
	var income = data.income;


	// error handlers
	if(lower = null) console.error('missing lower');
	if(higher = null) console.error('missing higher');
	if(rate = null) console.error('missing rate');
	if(income = null) console.error('missing income');

	// cancels if income does not reach this threshold
	if(data.income < data.lower) {
		return 0;
	}

	// if income fits within this bracket
	if(data.income <= data.higher) {

		// if income is between lower and higher
		return (data.income - data.lower) * data.rate / 100;

	// if income exceeds this bracket
	} else {

		// if income is over higher
		return (data.higher - data.lower) * data.rate / 100;

	}

	// return is the dollar amount of tax taken within this threshold
}




















