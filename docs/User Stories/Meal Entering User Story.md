# Meal Entering User Story

A logged in user will press the enter meal(s) button on the dashboard when they want to enter meals they have eaten in the past few days (relying on memory).  
This will take them to the meal entry page.  
  
There are two ways for the user to provide their meal information.  
The user either types in a list of meals they ate by using the large text field or presses the upload photos button to upload multiple photos of those meals.  
After the user provides either information, they can press the “Submit” button to accept.  
If one of the fields is empty, they will get a message saying “please enter text, or upload photos” and if neither of the fields are filled,  
they can still proceed to the next page by pressing the submit button. If the user doesn’t want to enter a meal, they can click the cancel button and go back to the dashboard.  
  
Next, the user will want to verify that the API has correctly identified their past meal(s) and how many calories were in them.  
They will be presented with a list of cards, each one having the food name and number of calories the API has identified.  
At the bottom of the card, the user can see the total calories in a box. The user can delete a card or enter a new amount of calories into a card.  
The user can also create a custom card for any meals the API missed. To do that, they will enter the food name and calorie amount.  
If both fields are filled, a new card will be created. Otherwise, they will get a message saying “please fill both fields”.  
  
At the bottom they will have a confirm button which will take them to the dashboard and a back button that will take them back to the meal entering page.
