let users = [];
let chatEnabled = false;

function fetchUser() {
	fetch('https://randomuser.me/api/')
		.then(response => response.json())
		.then(data => addUser(data.results[0]))
		.catch(err => alert(err))
}

function addUser(user) {
	users.push(user);
	document.getElementById('members').innerHTML += (`
		<li class="group">
			<div class="userpic">
				<img src="${user.picture.thumbnail}" alt="userpic">
			</div>
			<h2 class="username">${user.name.first}</h2>
		</li>
	`);

	if (!chatEnabled) {
		initChat();
	}
}

function fetchMessage() {
	fetch('https://www.randomtext.me/api/gibberish/p-1/5-35')
		.then(response => response.json())
		.then(data => addMessage(getRandomUser(), data.text_out))
		.catch(err => alert(err))
}

function addMessage(user, message) {
	let date = new Date();
	let hours = pad(date.getHours());
	let minutes = pad(date.getMinutes());
	let messages = document.getElementById('messages');
	messages.innerHTML += (`
		<li class="group">
				<div class="userpic">
					<img src="${user.picture.thumbnail}" alt="userpic">
				</div>
				<div class="message">
					<h2>
						<span class="username">${user.name.first}</span>
						<span class="time">${hours}:${minutes}</span>
					</h2>
					${message}
				</div>
		</li>
	`)
	messages.scrollTop = messages.scrollHeight;
}

function getRandomUser() {
	return users[Math.floor(Math.random() * users.length)];
}

function pad(number) {
	if (number < 10) {
		return '0' + number;
	}
	return number;
}

function initChat(){
	chatEnabled = true;
	let delay = Math.random() * 5000;
	fetchMessage()
	setTimeout(initChat, delay);
}

document.getElementById('add').addEventListener('click', fetchUser);

addUser({
	picture: {
		thumbnail: 'https://portal-ua.globallogic.com/gitlab/uploads/-/system/user/avatar/2136/avatar.png'
	},
	name: {
		first: 'Viktor Yarmus'
	}
});

addUser({
	picture: {
		thumbnail: 'https://portal-ua.globallogic.com/gitlab/uploads/-/system/user/avatar/741/avatar.png'
	},
	name: {
		first: 'Pavlo Halan'
	}
});






