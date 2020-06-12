'use strict';

const apiIdFood = '076cf645';
const apiKeyFood = 'ebfe0b29f52ad5580cc19df518a23379';
const apiKeyCocktail = '1';
const searchURLFood = 'https://api.edamam.com/search';
const searchURLCocktail = 'https://www.thecocktaildb.com/api/json/v1/';

// Shuffles an array.
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Displays the food recipe results.
function displayFoodResults(responseJson) {
    console.log(responseJson);
    $('#food-results-list').empty();

    if (responseJson.count === 0) {
        $('#food-error').removeClass('hidden');
        $('#food-results').addClass('hidden');
        $('#start-over').removeClass('hidden');
        startOver();
        } else {
            shuffle(responseJson.hits);
            for (let i = 0; i < responseJson.hits.length; i++){
                $('#food-results-list').append(
                    `<li><h3>${responseJson.hits[i].recipe.label}</h3>
                    <img class="images" src ="${responseJson.hits[i].recipe.image}">
                    <p>Ingredients needed:</p>
                    </li>`)
                for (let j = 0; j < responseJson.hits[i].recipe.ingredientLines.length; j++){
                    $('#food-results-list').append(
                        `<li>${responseJson.hits[i].recipe.ingredientLines[j]}</li>`)
                    }
                $('#food-results-list').append(
                    `<p>Serves: ${responseJson.hits[i].recipe.yield}  |  Calories: ${Math.round(responseJson.hits[i].recipe.calories)}</p>
                    <p>For directions to this recipe, go to <a href="${responseJson.hits[i].recipe.url}" target="_blank">${responseJson.hits[i].recipe.source}.</p>`)
                }; 
            $('#food-results').removeClass('hidden');
            $('#food-error').addClass('hidden');
            $('#start-over').removeClass('hidden');
            startOver();
    }
}

// Creates the string for the food restritions to add to the URL.
function getFoodRestrictions(lc, lf, ve, vg) {
    let lcRestriction = '';
    let lfRestriction = '';
    let veRestriction = '';
    let vgRestriction = '';

    if (lc) {
        lcRestriction = '&diet=low-carb';
    } else {
        lcRestriction = '';
    };
    if (lf) {
        lfRestriction = '&diet=low-fat';
    } else {
        lfRestriction = '';
    };
    if (ve) {
        veRestriction = '&health=vegan';
    } else {
        veRestriction = '';
    };
    if (vg) {
        vgRestriction = '&health=vegetarian';
    } else {
        vgRestriction = '';
    };
    
    const restrictions = lcRestriction + lfRestriction + veRestriction + vgRestriction;
    return restrictions;
}

// Fetches the food recipes from the API.
function getFood(query, results) {
    const lowCarb = $('#low-carb').is(':checked');
    const lowFat = $('#low-fat').is(':checked');
    const vegan = $('#vegan').is(':checked');
    const vegetarian = $('#vegetarian').is(':checked');
    let foodRestrictions = getFoodRestrictions(lowCarb, lowFat, vegan, vegetarian);

    const url = searchURLFood + '?q=' + query + '&app_id=' + apiIdFood + '&app_key=' + apiKeyFood + '&from=0&to=' + results + foodRestrictions;
    console.log(url);

    if (query === "") {
        console.log('no food search');
    } else {
    $('#options').addClass('hidden');
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayFoodResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong with your food search: ${err.message}`);
            $('#food-results').addClass('hidden');
      }); 
    }
}

// Displays the cocktail recipe results.
function displayCocktailResults(responseJson) {
    console.log(responseJson);
    $('#cocktail-results-list').empty();

    if (responseJson.drinks == null) {
        $('#cocktail-error').removeClass('hidden');
        $('#cocktail-results').addClass('hidden');
        $('#start-over').removeClass('hidden');
        startOver();
        } else {
            shuffle(responseJson.drinks); 
            
            // This bit makes sure the maximum results requested does not exceed the number of entries in the array.
            let results = 1;
            if ($('#max-results').val() > responseJson.drinks.length) {
                results = responseJson.drinks.length;
            } else {
                results = $('#max-results').val();
            };

            // This adds the results to the DOM.
            for (let i = 0; i < results; i++) {
                $('#cocktail-results-list').append(
                    `<li><h3>${responseJson.drinks[i].strDrink}</h3>
                    <img class="images" src ="${responseJson.drinks[i].strDrinkThumb}">
                    <p>Ingredients needed:</p>
                    <li><span class="${responseJson.drinks[i].strMeasure1}">${responseJson.drinks[i].strMeasure1} </span><span class="${responseJson.drinks[i].strIngredient1}">${responseJson.drinks[i].strIngredient1}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure2}">${responseJson.drinks[i].strMeasure2} </span><span class="${responseJson.drinks[i].strIngredient2}">${responseJson.drinks[i].strIngredient2}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure3}">${responseJson.drinks[i].strMeasure3} </span><span class="${responseJson.drinks[i].strIngredient3}">${responseJson.drinks[i].strIngredient3}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure4}">${responseJson.drinks[i].strMeasure4} </span><span class="${responseJson.drinks[i].strIngredient4}">${responseJson.drinks[i].strIngredient4}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure5}">${responseJson.drinks[i].strMeasure5} </span><span class="${responseJson.drinks[i].strIngredient5}">${responseJson.drinks[i].strIngredient5}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure6}">${responseJson.drinks[i].strMeasure6} </span><span class="${responseJson.drinks[i].strIngredient6}">${responseJson.drinks[i].strIngredient6}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure7}">${responseJson.drinks[i].strMeasure7} </span><span class="${responseJson.drinks[i].strIngredient7}">${responseJson.drinks[i].strIngredient7}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure8}">${responseJson.drinks[i].strMeasure8} </span><span class="${responseJson.drinks[i].strIngredient8}">${responseJson.drinks[i].strIngredient8}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure9}">${responseJson.drinks[i].strMeasure9} </span><span class="${responseJson.drinks[i].strIngredient9}">${responseJson.drinks[i].strIngredient9}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure10}">${responseJson.drinks[i].strMeasure10} </span><span class="${responseJson.drinks[i].strIngredient10}">${responseJson.drinks[i].strIngredient10}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure11}">${responseJson.drinks[i].strMeasure11} </span><span class="${responseJson.drinks[i].strIngredient11}">${responseJson.drinks[i].strIngredient11}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure12}">${responseJson.drinks[i].strMeasure12} </span><span class="${responseJson.drinks[i].strIngredient12}">${responseJson.drinks[i].strIngredient12}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure13}">${responseJson.drinks[i].strMeasure13} </span><span class="${responseJson.drinks[i].strIngredient13}">${responseJson.drinks[i].strIngredient13}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure14}">${responseJson.drinks[i].strMeasure14} </span><span class="${responseJson.drinks[i].strIngredient14}">${responseJson.drinks[i].strIngredient14}</span></li>
                    <li><span class="${responseJson.drinks[i].strMeasure15}">${responseJson.drinks[i].strMeasure15} </span><span class="${responseJson.drinks[i].strIngredient15}">${responseJson.drinks[i].strIngredient15}</span></li>
                    <p>${responseJson.drinks[i].strInstructions}</p>
                    </li>`);
                };        
            $('#cocktail-results').removeClass('hidden');
            $('#cocktail-error').addClass('hidden');
            $('#start-over').removeClass('hidden');
            startOver();
    }
}

// Fetches the cocktail recipes from the API.
function getCocktails(query) {
    const url = searchURLCocktail + apiKeyCocktail + '/search.php?s=' + query;
    console.log(url);

    if (query === "") {
        console.log('no cocktail search');
    } else {
    $('#options').addClass('hidden');
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayCocktailResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong with your cocktail search: ${err.message}`);
            $('#cocktail-results').addClass('hidden');
      });
    }
}

// Displays the options view and hides the landing view.
function displayOptions(food, cocktails) {
    if (food) {
        $('#food-options').removeClass('hidden');
        $('#options-button').removeClass('hidden');
        $('#max').removeClass('hidden');
        $('#landing').addClass('hidden');
    } else {
        $('#food-options').addClass('hidden');
        $('#no-food-search').removeClass('hidden');
    };
    if (cocktails) {
        $('#cocktail-options').removeClass('hidden');
        $('#options-button').removeClass('hidden');
        $('#max').removeClass('hidden');
        $('#landing').addClass('hidden');
    } else {
        $('#cocktail-options').addClass('hidden');
        $('#no-cocktail-search').removeClass('hidden');
    };
    if (!food && !cocktails) {
        $('#options-button').addClass('hidden');
        $('#no-food-search').addClass('hidden');
        $('#no-cocktail-search').addClass('hidden');
        alert('You must pick at least one option.');
    }
}

// Selects both food and cocktail checkboxes on landing view.
function checkBoth() {
    $('#both').click(function() {
        if ($(this).is(':checked')) {
            document.getElementById('food').checked = true;
            document.getElementById('cocktails').checked = true;
        } else {
            document.getElementById('food').checked = false;
            document.getElementById('cocktails').checked = false;
        }
    });
}

// Waits for the user to select recipes for food, cocktail, or both on the landing view.
function watchLanding() {
    checkBoth();
    $('#landing-button').click(function() {
        const foodLanding = $('#food').is(':checked');
        const cocktailsLanding = $('#cocktails').is(':checked');
        displayOptions(foodLanding, cocktailsLanding);
    });
}

// Waits for the user to select their search options.
function watchOptions() {
    $('#options-button').click(function() {
        event.preventDefault();
        const foodSearch = $('#food-search').val();
        const cocktailSearch = $('#cocktail-search').val();
        const maxResults = $('#max-results').val();
        getFood(foodSearch, maxResults);
        getCocktails(cocktailSearch);
    });
}

// Waits for the user to click the start over button, clears the values, and starts the app again.
function startOver() {
    $('#start-over').click(function() {
        event.preventDefault();
        $('#food-results-list').empty();
        $('#cocktail-results-list').empty();
        $('#food-results').addClass('hidden');
        $('#cocktail-results').addClass('hidden');
        $('#food-options').addClass('hidden');
        $('#cocktail-options').addClass('hidden');
        $('#options-button').addClass('hidden');
        $('#max').addClass('hidden');
        $('#landing').removeClass('hidden');
        $('#start-over').addClass('hidden');
        $('#food-error').addClass('hidden');
        $('#cocktail-error').addClass('hidden');
        $('#js-error-message').addClass('hidden');
        $('#no-food-search').addClass('hidden');
        $('#no-cocktail-search').addClass('hidden');
        $('#options').removeClass('hidden');
        document.getElementById('food').checked = false;
        document.getElementById('cocktails').checked = false;
        document.getElementById('both').checked = false;
        document.getElementById('low-carb').checked = false;
        document.getElementById('low-fat').checked = false;
        document.getElementById('vegan').checked = false;
        document.getElementById('vegetarian').checked = false;
        document.getElementById('food-search').value = '';
        document.getElementById('cocktail-search').value = '';
        document.getElementById('max-results').value = 1;
    });
}

function runIt() {
    watchLanding();
    watchOptions();
}

$(runIt);