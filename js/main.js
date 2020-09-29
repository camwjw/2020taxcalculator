function logSubmit(event) {
  event.preventDefault();

  var current = calculateCurrent(income.value);
  var labour = calculateLabour(income.value);
  var green = calculateGreen(income.value);
  var national = calculateNational(income.value);

  log.innerHTML = "<div class='results'>\
  	<div class='current'>\
  		<h2>Current</h2>\
  		<div class='pay'>\
  			<h3>Income after tax</h3>\
  			<div class='amount'>$" + comas(income.value - current) + "</div>\
  			<div class='change'>&nbsp;</div>\
  		</div>\
  		<div class='pay'>\
  			<h3>Tax paid</h3>\
  			<div class='amount'>$" + comas(current) + "</div>\
  		</div>\
  		<div class='pay'>\
  			<h3>Weekly income</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - current) / 52)) + "</div>\
  			<div class='change'>&nbsp;</div>\
  		</div>\
  		<div class='pay'>\
  			<h3>Over three years</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - current) * 3)) + "</div>\
  			<div class='change'>&nbsp;</div>\
  		</div>\
  		<div class='pay'>\
  			<h3>Over six years</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - current) * 6)) + "</div>\
  			<div class='change'>&nbsp;</div>\
  		</div>\
  	</div>\
  	<div class='labour'>\
  		<h2>Labour</h2>\
  		<div class='pay'>\
  			<h3>Income after tax</h3>\
  			<div class='amount'>$" + comas(income.value - labour) + "</div>\
  			" + change(income.value - labour, income.value - current) + "\
  		</div>\
  		<div class='pay'>\
  			<h3>Tax paid</h3>\
  			<div class='amount'>$" + comas(labour) + "</div>\
  		</div>\
  		<div class='pay'>\
  			<h3>Weekly income</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - labour) / 52)) + "</div>\
  			" + change((income.value - labour) / 52, (income.value - current) / 52) + "\
  		</div>\
  		<div class='pay'>\
  			<h3>Over three years</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - labour) * 3)) + "</div>\
  			" + change((income.value - labour) * 3, (income.value - current) * 3) + "\
  		</div>\
  		<div class='pay'>\
  			<h3>Over six years</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - labour) * 6)) + "</div>\
  			" + change((income.value - labour) * 6, (income.value - current) * 6) + "\
  		</div>\
  	</div>\
  	<div class='green'>\
  		<h2>Greens</h2>\
  		<div class='pay'>\
  			<h3>Income after tax</h3>\
  			<div class='amount'>$" + comas(income.value - green) + "</div>\
  			" + change(income.value - green, income.value - current) + "\
  		</div>\
  		<div class='pay'>\
  			<h3>Tax paid</h3>\
  			<div class='amount'>$" + comas(green) + "</div>\
  		</div>\
  		<div class='pay'>\
  			<h3>Weekly income</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - green) / 52)) + "</div>\
  			" + change((income.value - green) / 52, (income.value - current) / 52) + "\
  		</div>\
  		<div class='pay'>\
  			<h3>Over three years</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - green) * 3)) + "</div>\
  			" + change((income.value - green) * 3, (income.value - current) * 3) + "\
  		</div>\
  		<div class='pay'>\
  			<h3>Over six years</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - green) * 6)) + "</div>\
  			" + change((income.value - green) * 6, (income.value - current) * 6) + "\
  		</div>\
  	</div>\
  	<div class='national'>\
  		<h2>National</h2>\
  		<div class='pay'>\
  			<h3>Income after tax*</h3>\
  			<div class='amount'>$" + comas(income.value - national) + "</div>\
  			" + change(income.value - national, income.value - current) + "\
  		</div>\
  		<div class='pay'>\
  			<h3>Tax paid*</h3>\
  			<div class='amount'>$" + comas(national) + "</div>\
  		</div>\
  		<div class='pay'>\
  			<h3>Weekly income*</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - national) / 52)) + "</div>\
  			" + change((income.value - national) / 52, (income.value - current) / 52) + "\
  		</div>\
  		<div class='pay'>\
  			<h3>Over three years</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - national) / 12 * 16 + (income.value - current) / 12 * 20)) + "</div>\
  			" + change((income.value - national) / 12 * 16 + (income.value - current) / 12 * 20, (income.value - current) * 3) + "\
  		</div>\
  		<div class='pay'>\
  			<h3>Over six years</h3>\
  			<div class='amount'>$" + comas(Math.round((income.value - national) / 12 * 16 + (income.value - current) / 12 * 56)) + "</div>\
  			" + change((income.value - national) / 12 * 16 + (income.value - current) / 12 * 56, (income.value - current) * 6) + "\
  		</div>\
  		<footer>*for first year<br>reduced rate for 16 months</footer>\
  	</div>\
  </div>";
}

// renders a default state if there is an income amount present
function launch() {
	const form = document.getElementById('tax');
	const log = document.getElementById('log');
	const income = document.getElementById('income');
	form.addEventListener('submit', logSubmit);
	//form.submit();
}

launch();




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

function change(after, before) {

	var direction;
	var percentage = 0;
	var amount = 0;
	var difference = after - before;

	if(difference > 0) {
		amount = comas(difference.toFixed(0));
		percentage = (difference / before) * 100
		direction = "up";
	} else if (difference < 0) {
		amount = comas(difference.toFixed(0));
		percentage = (difference / before) * 100
		direction = "down";
	} else {
		return "<div class='change'>NC</div>"
	}

	return "<div class='change " + direction + "'>" + amount + " (" + percentage.toFixed(2) + "%)</div>";
}

function comas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
















