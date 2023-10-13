//This are the ul's. Here we will add our new li's after creating them
let filmList = document.querySelector(".filmList");
let shipList = document.querySelector(".shipList");
let pilotList = document.querySelector(".pilotList");
let favPilotList = document.querySelector(".favPilotList");

let Starships = document.createElement("button")

let favoriteList = []

let infoStarships = function () {
}



//fetch whole object
fetch(`https://swapi.constructor-learning.com/api/films/`)
    .then((res) => res.json())
    .then((data) => {
        
        //This is how book is built:
        /*
        [{...},{...},{...}]

        */
        book = data.results
        listMovies()
        ifClicked()
    })


    //Functions section ******************************************************************************
    //Create the basic movie list inside of the filmlist ul
    let listMovies = function () {
        for (movie of book) {
            let li = document.createElement("li")
            li.classList.add("title")
            li.innerText = movie.title
            filmList.appendChild(li)  
        }
    }

    let currentMovieStarships = []
    let listStarships = function () {
        // Clear the existing starship list
        shipList.innerHTML = '';
    
        for (movie of book) {
            if (event.target.parentNode.innerText.includes(movie.title)) {
                // Clear the previous starship data
                currentMovieStarships = []; 
    
                for (ships of movie.starships) {
                    fetch(ships)
                        .then((res) => res.json())
                        .then((data => {
                            // Store starship data for the current movie
                            currentMovieStarships.push(data); 
    
                            let li = document.createElement("li");
                            li.className = "starship";
                            li.innerText = data.name;
                            shipList.appendChild(li);

                            let btn = document.createElement("button")
                            btn.className = "pilotButton"
                            btn.innerText = "Pilots"
                            li.appendChild(btn)
    
                            li.addEventListener("click", () => displayStarshipInfo(data, li));
                            this.addEventListener("click", (event) => displayPilots(currentMovieStarships[0]))
                        }));
                }
            }
        }
        
    }
    counter = 0;
    let displayPilots= function (starship) {
        if (counter < 1) {
            if (starship.pilots.length > 0) {
                for (pilot of starship.pilots) {
                    fetch(pilot)
                        .then((res) => res.json())
                        .then((data) => {
                            let li = document.createElement("li")
                            li.className = "pilotName"
                            li.innerText = data.name
                            pilotList.appendChild(li)
                            console.log(data.name)

                            let btn = document.createElement("button")
                            btn.className = "favorise"
                            btn.innerText = ""
                            li.appendChild(btn)
                        })
                }
                
            } else {
                console.log("there are no pilots")
            }
        }

    counter ++
        
    }
    
    
    // Function to display starship information
    let displayStarshipInfo = function (data, starshipElement) {
    // Check if the starship information is already displayed
    let existingInfoElements = starshipElement.querySelectorAll(".infosShip");

    if (existingInfoElements.length > 0) {
        // Starship information is already displayed, so remove it
        for (let element of existingInfoElements) {
            element.remove();
        } 
    } else {
        // Starship information is not displayed, so display it
        for (let shipInfos in data) {
            if (shipInfos.includes("crew") || shipInfos.includes("name") || shipInfos.includes("passengers")) {
                starshipElement.classList.add("isClicked");
                let li = document.createElement("li");
                li.className = "infosShip";
                li.innerText = `${shipInfos}: ${data[shipInfos]}`;
                starshipElement.appendChild(li);
            }
        }
    }
}
    
    
    //Functions section End***************************************************************************

    //Here we handle the click events
    let ifClicked = function () {
        this.addEventListener("click", function (event) {
            if (event.target.className === "starship") {
                infoStarships()
            }

            //Handle the click on the favorise button
            if (event.target.className === "favorise") {
                
                if (!(favoriteList.includes(event.target.parentNode.innerText))) {
                    let li = document.createElement("li");
                li.className = "favoritePilot";
                li.innerText = event.target.parentNode.innerText;
                favPilotList.appendChild(li);
                let btnDeleteFavorite = document.createElement("button");
                btnDeleteFavorite.className = "btnDeleteFavorite";
                li.appendChild(btnDeleteFavorite);
                favoriteList.push(event.target.parentNode.innerText);
                }
            }

            //Here we are trying to delete the favorised pilot after the delete button is being pressed, unfortunately it does not work
            if (event.target.className === "btnDeleteFavorite") {
                // Get the pilot's name from the parent element
                const pilotName = event.target.parentNode.innerText;
                //
                const pilotIndex = favoriteList.indexOf(pilotName);
                if (pilotIndex !== -1) {
                    favoriteList.splice(pilotIndex, 1);
                }
            
                // Remove the list item from the favorites list
                event.target.parentNode.remove();
            }

            //display the opening crawl***************************************************************
            //Check if the class of the clicked object is "title"
            if (event.target.className === "title") {
                //If it is loop through book, which is the entire starwars object im using
                for (movie of book) {
                    //If the property title is equal to the innerText of the clicked elemen (The inner text is equal to the movie title)
                    if (movie.title === event.target.innerText) {

                        //Add the startships button to later see the starships, set a innerText and append it to the clicked element, which is the li we clicked
                        Starships.classList.add("titleButton")
                        Starships.innerText = "starships"
                        event.target.appendChild(Starships)

                        //Create an element for the opening crawl add the opening crawl and append it to the li element which is the movie title. Also add the class opening_crawl
                        let li = document.createElement("li")
                        li.classList.add("opening_crawl")
                        li.innerText = movie.opening_crawl
                        event.target.appendChild(li)
                    }
                }
            } 

            //Close the opening crawl***************************************************************
            if (event.target.className === "opening_crawl") {
                event.target.remove()
                Starships.remove()
            }
            
            
            if (event.target.className === "titleButton") {
                listStarships()  
            }
            
            
            
        })
    }
    
    