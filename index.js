'use strict';

function getRecipes(fetchUrl) {
fetch(fetchUrl)
.then(response => response.json())
.then(responseJson => displayResults(responseJson))
.catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  $('.results').empty();
for (let i = 0; i < responseJson.hits.length; i++){
  let healthLabels = responseJson.hits[i].recipe.healthLabels;
  let sepLabels = healthLabels.join(', ');
  let dietLabels = responseJson.hits[i].recipe.dietLabels;
  let sepDietLabels = dietLabels.join(', ');
  let calories = responseJson.hits[i].recipe.calories;
  let newCal = calories.toFixed();

$('.results').append(`
<li><h3><a href=${responseJson.hits[i].recipe.url} target="_blank">${responseJson.hits[i].recipe.label}</a></h3>
  <a href=${responseJson.hits[i].recipe.url} target="_blank"><img class="foodImg" src='${responseJson.hits[i].recipe.image}'></a>
<p class="diet">${sepDietLabels}</p>
<p class="health">${sepLabels}</p>
<p class="calories">Calories: ${newCal}</p>
`)
};
$('.results').removeClass('hidden');
}

function getCheckedValues(){
let checkedValues = [];
$('input:checked').each(function(i){
checkedValues[i] = $(this).val();
});
console.log(checkedValues)
return checkedValues;
}

function buildSearchUrl(textValue, checkedValues) {
let rootUrl = 'https://api.edamam.com/search?q=' + textValue;
let endUrl = '&app_id=bddad298&app_key=aef7ebaa03f59a99ac50f1aebe65a16d&from=0&to=5';
let healthQuery = '';
for (let i = 0; i < checkedValues.length; i ++){
  healthQuery += '&health=' + checkedValues[i];
}
console.log(healthQuery)
console.log(rootUrl + healthQuery + endUrl)
return rootUrl + healthQuery + endUrl;
}

function getValue(){
$('.recipeForm').submit(event => {
event.preventDefault();
const textValue = $('#listOfRecipes').val();
console.log(textValue);
let checkedValues = getCheckedValues();
let fetchUrl = buildSearchUrl(textValue, checkedValues);
getRecipes(fetchUrl);
});
}



$(function() {
console.log('app loaded waiting for submit');
getValue();
});

