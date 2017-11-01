var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var table = document.getElementById('t');

function buildCalendar(date){
	table.innerHTML = '';
	document.getElementById('header').innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`

	let d = new Date(date.getFullYear(), date.getMonth(), 1)
	let firstWeak = true;

	while (d.getMonth() == date.getMonth()){
		let tr = document.createElement('tr');
		let i = 0;
		while (i < 7){
			let td = document.createElement('td');
			if (d.getTime() == today.getTime()) {
				td.classList.add('today');
			}
			if (firstWeak){
				if (i < d.getDay() - 1){
					td.style.visibility = 'hidden'
				} else {
					td.textContent = d.getDate();
					d.setDate(d.getDate() + 1);
				}
			} else {
				td.textContent = d.getDate();

				if (d.getMonth() != date.getMonth()){
					break;
				}
				d.setDate(d.getDate() + 1);
			}
			td.classList.add('td');
			tr.appendChild(td);
			i++;
		}
		table.appendChild(tr);
		firstWeak = false;
	}
}

function selectDay(event) {
	if (event.target.tagName === 'TD'){
		Array.from(document.getElementsByTagName('td')).forEach(function(element) {
			element.classList.remove('selected')
		});
		event.target.classList.add('selected');
	}
}

buildCalendar(date);

document.getElementById('prev').addEventListener('click', function(){
	date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
	buildCalendar(date)
})

document.getElementById('next').addEventListener('click', function(){
	date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
	buildCalendar(date)
})

document.getElementById('container').addEventListener('click', selectDay)
