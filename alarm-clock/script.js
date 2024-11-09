let time = document.querySelector('.time_show');
let day_st = document.querySelector('.day');
let date_show = document.querySelector('.date_show');
let alarm_time = document.querySelector('.alarmTime');
let show_alarms = document.querySelector('.show_alarms');
let timeValue = [];
var audio = document.getElementById("myAudio");
let alarmAcknowledged = false;

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  time.innerHTML = formattedTime;
}


function updateDate() {
  const dayStrings = ['SUN', 'MON', "TUE", "WED", "THU", "FRI", "SAT"];
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  const currentDay = dayStrings[day];
  day_st.innerHTML = currentDay;
  const formattedDate = `${month}/${date}`;
  date_show.innerHTML = formattedDate;
}

setInterval(() => {
  updateTime();
  updateDate();
  checkAlarms();
}, 1000);


document.querySelector(".add_alarm").addEventListener("click", function() {
  document.getElementById("popup").style.display = "block";
});


function closePopup() {
  const alarmTimeValue = alarm_time.value; 
  if (alarmTimeValue) {
    show_alarms.innerHTML += `<div class="alarm_time"><h2>${alarmTimeValue}</h2></div>`;
    timeValue.push(alarmTimeValue);
    alarm_time.value = ""; 
    console.log(timeValue);
  }
  document.getElementById("popup").style.display = "none"; 
}


function checkAlarms() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  for (let i = 0; i < timeValue.length; i++) {
    if (timeValue[i] === currentTime && !alarmAcknowledged) {
      triggerAlarm();
      audio.play();
      break; 
    }
  }
}


function triggerAlarm() {
  
  document.getElementById("popup_alarm").style.display = "block";
}


function closeAlarmPopup() {
  document.getElementById("popup_alarm").style.display = "none";
  audio.pause();
  alarmAcknowledged = true; 
}


document.querySelector('#popup button').addEventListener('click', closePopup);
document.querySelector('#popup_alarm button').addEventListener('click', closeAlarmPopup);
