let date = new Date();
let dateHeader = date.toDateString();

const dateToday = document.getElementById('title-date');
dateToday.innerHTML = dateHeader;