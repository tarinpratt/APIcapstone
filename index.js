'use strict';

function getRecipes(fetchUrl) {
fetch(fetchUrl)
.then(response => response.json())
.then(responseJson => displayResults(responseJson))
.catch(error => alert('Something went wrong. Try again later.'));

}




function displayResults(responseJson) {
  if(responseJson.count === 0){
    alert('Invalid ingredient. Please try again.')
  }
  $('.results').empty();
 
for (let i = 0; i < responseJson.hits.length; i++){
  let healthLabels = responseJson.hits[i].recipe.healthLabels;
  let sepLabels = healthLabels.join(', ');
  let dietLabels = responseJson.hits[i].recipe.dietLabels;
  let sepDietLabels = dietLabels.join(', ');
  let calories = responseJson.hits[i].recipe.calories;
  let newCal = calories.toFixed();
  let ingredients = responseJson.hits[i].recipe.ingredientLines;
  let ingredientList = ingredients.map((ingredient) =>
    `<li>${ingredient}</li>`
);
  let excludeCommas = ingredientList.join(' ');
$('.results').append(`
<li><h3><a href=${responseJson.hits[i].recipe.url} target="_blank">${responseJson.hits[i].recipe.label}</a></h3>
  <a href=${responseJson.hits[i].recipe.url} target="_blank">
  <div class="imgText">
    <img class="foodImg" src='${responseJson.hits[i].recipe.image}'>
    <div class="centered">
    Get Instructions
    </div>
  </div>
  </a>
<p class="diet">${sepDietLabels}</p>
<h4>Recipe Diet Restrictions: </h4>
<p class="health">${sepLabels}</p>
  <ul class="ingredients"><h4>Ingredients Needed</h4>${excludeCommas}</ul>
<p class="calories">${newCal} Calories</p>
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
let endUrl = '&app_id=bddad298&app_key=aef7ebaa03f59a99ac50f1aebe65a16d&from=0&to=10';
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



