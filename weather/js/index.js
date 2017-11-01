let app = (function(){
	let startScreen = document.getElementById('start');
	let city = document.getElementById('input');
	let conatainer = document.getElementById('container');
	let closeButton = document.getElementById('close');
	let goButton = document.getElementById('go');

	function getWeather(query) {
		startScreen.classList.add('hidden');
		city.value = '';
		fetch('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + query + '&cnt=8&units=metric&APPID=0aa0d8ee1166457e537d0fd9f90abcf0')
			.then(response => {
				if (response.status !== 200) {
					throw new Error("Achtung!!! Not 200 response!")
				} else {
					return response.json()
				}
			})
			.then(data => updateDom(data))
			.catch((err) => {
				alert(err);
				start.classList.remove('hidden')
				city.value = '';
			});
	}

	function updateDom(data) {
		let date;
		let day;
		let weak = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

		for (let i = 0; i <= 7; i++) {
			date = new Date(data.list[i].dt * 1000)
			day = weak[date.getDay()];

			console.log(data);
			container.innerHTML += `
				<div>
					<p>${day}</p>
					<i class="${getWeatherIcon(data.list[i])}"></i>
					<p class="description">${data.list[i].weather[0].description}</p>
					<p class="temperature">${data.list[i].temp.day.toFixed()}°C</p>
					<p class="min-max">
						<span>Min ${data.list[i].temp.min.toFixed()}°C</span>
						<span class="divider" unselectable="on">|</span>
						<span>Max ${data.list[i].temp.max.toFixed()}°C</span>
					</p>
					<p class="date">${date.getDate()}/${date.getMonth() + 1}/${date.getYear() + 1900}</p>
				</div>
			`
		}

		container.children[0].classList.add('selected');
		container.children[0].children[0].innerHTML = data.city.name;
		document.title = 'Weather ' + data.city.name;

		document.getElementsByTagName('body')[0].text = container;
		let blocks = document.getElementsByTagName('div');
		Array.from(blocks).forEach(function(element) {

			element.addEventListener('click', function(e) {

				Array.from(blocks).forEach(function(element) {
					element.classList.remove('selected')
				});

				e.currentTarget.classList.add('selected');

			})
		})
	}

	function getWeatherIcon(item) {
		let id = item.weather[0].id;
		let icon = weatherIcons[id].icon;
		if (!(id > 699 && id < 800) && !(id > 899 && id < 1000)) {
			icon = 'day-' + icon;
		}
		icon = 'wi wi-' + icon;
		return icon;
	}

	function init() {
		closeButton.addEventListener('click', function() {
			container.innerHTML = '';
			startScreen.classList.remove('hidden')
			document.title = 'Weather';

		})

		goButton.addEventListener('click', function() {
			if (city.value != '') {
				getWeather(city.value);
			}
		})

		city.addEventListener('keyup', function(e) {
			console.log(1)
			if (e.keyCode == 13 && city.value != '') {
				getWeather(city.value);
			}
		})
	}

	return {
		start: init
	}

})()

app.start();
