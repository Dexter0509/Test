function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("Text");
  var button = ev.target.appendChild(document.getElementById(data).cloneNode(true));
  button.className = 'button'
  var delectBtn = document.createElement('b');
  delectBtn.className = 'delect'
  delectBtn.innerHTML = 'x';
  button.appendChild(delectBtn);
  delectBtn.addEventListener("click", function (e) {
    delectBtn.parentNode.parentNode.removeChild(delectBtn.parentNode);
  });
} 
