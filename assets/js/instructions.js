document.addEventListener('DOMContentLoaded', function() {
  var el = document.querySelector('.js-fade');
  if (el.classList.contains('is-paused')){
    el.classList.remove('is-paused');
  };

}
