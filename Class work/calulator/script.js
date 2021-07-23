/**
 * Add three buttons above the vending machine: 'normal', 'grid', 'flex'. Attach a listener to each
 * function that removes any class from '#app' and adds on the one associated with this button.
 * *BONUS* See if we can do it using only one event listener function
 */

// $('#app > button').click(function() {
//     $('#app').removeClass().addClass($(this).data('class-value'));
// })

/**
 * Add a function to listen for button clicks `.control-item button` clicks.
 * When the button is clicked, update the text of the `.control-item p` tag to
 * be the button that was clicked. If it was alphanumeric, clear the entire
 * `.control-item p` and make it just that, otherwise just update the second value
 * 
 * Add a listener to the `#buy-button button` click. So that when it is clicked,
 * you clone the element from the location in `#items` and append it to the `#item-slot`
 * div
 * 
 * Keep track of how many items you have in the vending machine. Lets start with
 * 5 of each, as you buy one, remove one until it's 0. Once it's zero, replace the
 * item in the vending machine with '⛔️' (add a class of 'empty' as well).
 */

