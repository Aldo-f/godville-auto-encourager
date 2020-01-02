// ==UserScript==
// @name        GodVille Auto-Encourager
// @namespace   https://github.com/hovancik/godville-auto-encourager
// @description auto-encourage your superhero when getting low on health
// @include     https://godvillegame.com/superhero
// @version     0.2.0.1
// @grant       none
// ==/UserScript==

// settings
var minHealth = 30;
var pauseTime = 15000;

function checkHealth() {
  var healthDiv = document.getElementById("hk_health");
  var healthVal = healthDiv.getElementsByClassName("l_val")[0].innerHTML;
  var health = healthVal.split(" / ")[0];
  var possibleHealth = healthVal.split(" / ")[1];
  var health_percents = (health * 100) / possibleHealth;
  if (health_percents < minHealth) {
    encourage();
  }
}

function encourage() {
  console.log("Trying to Encourage...");
  document.getElementsByClassName("no_link div_link enc_link")[0].click();
}

var encourager = setInterval(checkHealth, pauseTime);

var pauseEncourager = function() {
  console.log("Pausing...");
  clearInterval(encourager);
  encourager = 0;
};

var resumeEncourager = function() {
  pauseEncourager();
  console.log("Resuming...");
  encourager = setInterval(checkHealth, 15000);
};

var divx = document.createElement("div");
divx.innerHTML =
  '<div class="block" id="auto-encourage"><div class="block_h"><span class="l_slot"><span class="b_handle m_hover" style="display: none;" title="Drag to move this block">●</span></span><h2 class="block_title">Auto-Encourager</h2><span class="r_slot"><span class="h_min m_hover" style="display: none;">↑</span></span></div><div class="block_content"><p>I will check for health every 15 seconds and if health is less then ' +
  minHealth +
  '% I will try to encourage your superhero.</p><div><a style="display: inline;" class="no_link enc_link div_link" id="resume" title="Resume">Resume</a><a style="display: inline;" class="no_link pun_link div_link" id="pause" title="Pause">Pause</a></div></div><div class="line"/></div></div>';
document.getElementById("right_block").appendChild(divx);

document
  .getElementById("pause")
  .addEventListener("click", pauseEncourager, false);
document
  .getElementById("resume")
  .addEventListener("click", resumeEncourager, false);
