window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

var showModal = function () {
  var modal = document.querySelector('ons-modal');
  modal.show();
}

var hideModal = function () {
  var modal = document.querySelector('ons-modal');
  modal.hide();
}