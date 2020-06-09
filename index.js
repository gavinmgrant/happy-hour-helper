'use strict';

const apiIdFood = '076cf645';
const apiKeyFood = 'ebfe0b29f52ad5580cc19df518a23379';
const apiKeyCocktail = '1';
const searchURLFood = 'https://api.edamam.com/search';
const searchURLCocktail = 'https://www.thecocktaildb.com/api/json/v1/';


function displayFoodResults(responseJson) {
    console.log(responseJson);
    $('#food-results-list').empty();
  
    if (responseJson.count == 0) {
      $('#food-error').removeClass('hidden');
      $('#food-results').addClass('hidden');
      } else {
        for (let i = 0; i < responseJson.hits.length; i++){
            $('#food-results-list').append(
                `<li><h3>${responseJson.hits[i].recipe.label}</h3>
                <img class="images" src ="${responseJson.hits[i].recipe.image}">
                <p>Serves: ${responseJson.hits[i].recipe.yield}  |  Calories: ${Math.round(responseJson.hits[i].recipe.calories)}</p>
                <p>Ingredients needed:</p>
                </li>`)
            for (let j = 0; j < responseJson.hits[i].recipe.ingredientLines.length; j++){
                $('#food-results-list').append(
                    `<li>${responseJson.hits[i].recipe.ingredientLines[j]}</li>`)
                }
            $('#food-results-list').append(
                `<p>For directions to this recipe, go to <a href="${responseJson.hits[i].recipe.url}" target="_blank">${responseJson.hits[i].recipe.source}.</p>`)
            }; 
        
        $('#food-results').removeClass('hidden');
        $('#food-error').addClass('hidden');
        $('#start-over').removeClass('hidden');
    }
}

function displayCocktailResults(responseJson) {
    console.log(responseJson);
    $('#cocktail-results-list').empty();

    if (responseJson.drinks == null) {
        $('#cocktail-error').removeClass('hidden');
        $('#cocktail-results').addClass('hidden');
        } else {
            for (let i = 0; i < responseJson.drinks.length; i++) {
                $('#cocktail-results-list').append(
                    `<li><h3>${responseJson.drinks[i].strDrink}</h3>
                    <img class="images" src ="${responseJson.drinks[i].strDrinkThumb}">
                    <p>${responseJson.drinks[i].strInstructions}</p>
                    <p>Ingredients needed:</p>
                    <li>${responseJson.drinks[i].strMeasure1} - ${responseJson.drinks[i].strIngredient1}</li>
                    <li>${responseJson.drinks[i].strMeasure2} - ${responseJson.drinks[i].strIngredient2}</li>
                    <li>${responseJson.drinks[i].strMeasure3} - ${responseJson.drinks[i].strIngredient3}</li>
                    <li>${responseJson.drinks[i].strMeasure4} - ${responseJson.drinks[i].strIngredient4}</li>
                    <li>${responseJson.drinks[i].strMeasure5} - ${responseJson.drinks[i].strIngredient5}</li>
                    <li>${responseJson.drinks[i].strMeasure6} - ${responseJson.drinks[i].strIngredient6}</li>
                    <li>${responseJson.drinks[i].strMeasure7} - ${responseJson.drinks[i].strIngredient7}</li>
                    </li>`)
            };

        $('#cocktail-results').removeClass('hidden');
        $('#cocktail-error').addClass('hidden');
        $('#start-over').removeClass('hidden');
    }
}

function getFoodRestrictions(gf, ve, vg) {
    console.log(gf, ve, vg)
    let gfRestriction = '';
    let veRestriction = '';
    let vgRestriction = '';

    if (gf === true) {
        gfRestriction = '&health=gluten-free';
    } else {
        gfRestriction = '';
    };

    if (ve === true) {
        veRestriction = '&health=vegan';
    } else {
        veRestriction = '';
    };

    if (vg === true) {
        vgRestriction = '&health=vegetarian';
    } else {
        vgRestriction = '';
    };
    
    const restrictions = gfRestriction + veRestriction + vgRestriction;
    return restrictions;
}

function getFood(query, maxResults=3) {
    console.log(getFoodRestrictions());
    const url = searchURLFood + '?q=' + query + '&app_id=' + apiIdFood + '&app_key=' + apiKeyFood + '&from=0&to=' + maxResults;
    console.log(url);

    if (query === "") {
        console.log('no food search')
    } else {
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayFoodResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong with your food search: ${err.message}`);
      }); 
    }
}

function getCocktails(query) {
    const url = searchURLCocktail + apiKeyCocktail + '/search.php?s=' + query;
    console.log(url);

    if (query === "") {
        console.log('no cocktail search')
    } else {
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayCocktailResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong with your cocktail search: ${err.message}`);
      });
    }
}

function displayOptions(food, cocktails) {
    if (food === true) {
        $('#food-options').removeClass('hidden');
        $('#options-button').removeClass('hidden');
        $('#landing').addClass('hidden');
    } else {
        $('#food-options').addClass('hidden');
    };
    if (cocktails === true) {
        $('#cocktail-options').removeClass('hidden');
        $('#options-button').removeClass('hidden');
        $('#landing').addClass('hidden');
    } else {
        $('#cocktail-options').addClass('hidden');
    };
    if (food === false && cocktails === false) {
        $('#options-button').addClass('hidden');
        alert('You must pick at least one option.');
    }
}

function watchLanding() {
    $('#landing-button').click(function() {
        const foodLanding = $('#food').is(':checked');
        const cocktailsLanding = $('#cocktails').is(':checked');
        displayOptions(foodLanding, cocktailsLanding);
    });
}

function watchOptions() {
    $('#options-button').click(function() {
        event.preventDefault();
        const foodSearch = $('#food-search').val();
        const maxResults = $('#max-results').val();
        const cocktailSearch = $('#cocktail-search').val();
        getFood(foodSearch, maxResults);
        getCocktails(cocktailSearch);

        const glutenFree = $('#gluten-free').is(':checked');
        const vegan = $('#vegan').is(':checked');
        const vegetarian = $('#vegetarian').is(':checked');
        getFoodRestrictions(glutenFree, vegan, vegetarian);
    });
}

function runIt() {
    watchLanding();
    watchOptions();
}

$(runIt);