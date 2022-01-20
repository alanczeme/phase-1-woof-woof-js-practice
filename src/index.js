// Declare Global Element Variables
const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');

// Add img to dog info div
let dogImage = document.createElement('img');
let dogName = document.createElement('h2');
let dogButton = document.createElement('button');
dogInfo.append(dogImage, dogName, dogButton);

doges = []

// Fetch the data from the server
function getData() {
    console.log("getting data")
    fetch('http://localhost:3000/pups')
    .then((resp) => resp.json())
    .then((data) => handleDogData(data))
    .catch((err) => console.error(err));
}
getData();

 // When a user clicks the Good Dog/Bad Dog button, two things should happen:
 dogButton.addEventListener('click', (e) => {
    console.log('CLICKED')
    // e.preventDefault();

    const dogGoodBad = e.target.textContent;

    
    if (dogGoodBad === "Good Dog!") { 
        e.target.textContent = "Bad Dog!" 
    } else { 
        e.target.textContent = "Good Dog!";
    }

    //dogButton.textContent = ( dog.isGoodDog ? "Bad Dog!" : "Good Dog!" );
    //dog.isGoodDog = !dog.isGoodDog;

    fetch(`http://localhost:3000/pups/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'brandon' })
    })
    .then((response) => response.json())
    .then(dog => {
        console.log(dog)
    })
    .catch(err => {
        console.error("DID NOT WORK :(")
    });
})

// Handle the dog data from the server, creating a span with the dog's name
function handleDogData(dogs) {
    doges = dogs;
    console.log("HANDLE DOG DATA")
    dogs.forEach(dog => {
        // let dog = dogs[id];
        let dogSpan = document.createElement('span');
        dogSpan.textContent = dog.name;
        dogSpan.id = dog.id;

        // Event Listener for Click on span, which adds proper image, name and button text
        dogSpan.addEventListener('click', (e) => {

            // e.preventDefault();
            dogImage.src = dog.image;
            dogName.textContent = dog.name;
            dogButton.textContent = ( dog.isGoodDog ? "Good Dog!" : "Bad Dog!" );
        })

        dogBar.appendChild(dogSpan);

       
    })
}



// The button's text should change from Good to Bad or Bad to Good
// The corresponding pup object in the database should be updated to reflect the new isGoodDog value
// You can update a dog by making a PATCH request to /pups/:id and including the updated isGoodDog status in the body of the request.

