function dragStart(e) {
	e.dataTransfer.setData("text/plain", e.target.id);
	e.dropEffect = "move";
}

function dragOver(e) {
	e.preventDefault();
}

function drop(e) {
	e.preventDefault();
	if(!e.target.hasChildNodes()){
		let symbol = document.getElementById(e.dataTransfer.getData("text")).cloneNode();
		symbol.innerHTML = e.dataTransfer.getData("text");
		symbol.removeAttribute('id');
		symbol.removeAttribute('draggable');
		e.target.appendChild(symbol);
	}
}

document.getElementById('x').addEventListener('dragstart', dragStart);
document.getElementById('o').addEventListener('dragstart', dragStart);
document.getElementById('grid').addEventListener('dragover', dragOver);
document.getElementById('grid').addEventListener('drop', drop);
