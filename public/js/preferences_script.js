/*
    Search Bar Option
*/

let song_one = {
    name: "Song 1",
    artist: "Artist Name 1",
    type: "song"
}

let song_two = {
    name: "Song 2",
    artist: "Artist Name 2",
    type: "song"
}

let song_three = {
    name: "Song 3",
    artist: "Artist Name 3",
    type: "song"
}

let dj_one = {
    name: "DJ Name 1",
    type: "dj"
}

let dj_two = {
    name: "DJ Name 2",
    type: "dj"
}

let dj_three = {
    name: "DJ Name 3",
    type: "dj"
}

song_dj_list = [song_one, song_two, song_three, dj_one, dj_two, dj_three];

let liked_songs = document.querySelector(".liked-songs");
let liked_djs = document.querySelector(".liked-djs")

function search_bar() {
    let search_results = document.querySelector(".results");
    let search_input = document.getElementById("searchInput").value;
    search_input = search_input.toLowerCase();

    search_results.innerHTML = '';

    for (let i = 0; i < song_dj_list.length; i++) {
        if (song_dj_list[i]["name"].toLowerCase().includes(search_input)) {
            const result = document.createElement("li");
            const text = document.createTextNode(song_dj_list[i]["name"]);
            result.appendChild(text);
            
            const text2 = document.createTextNode("Add");
            const btn = document.createElement("button");
            
            btn.appendChild(text2);
            
            if (song_dj_list[i]["type"] == "song" && search_input.length != 0) {
                btn.addEventListener("click", function() {
                    result.removeChild(btn);
                    liked_songs.appendChild(result);
                }); 
            }

            if (song_dj_list[i]["type"] == "dj" && search_input.length != 0) {
                btn.addEventListener("click", function() {
                    result.removeChild(btn);
                    liked_djs.appendChild(result);
                }); 
            }
            
            result.appendChild(btn);

            search_results.appendChild(result)

        }
    }

    if (search_input == 0) {
        search_results.innerHTML = '';
    }

}



const modal = document.querySelector(".modal-songs");
const overlay = document.querySelector(".overlay-1");
const openModalBtn = document.querySelector(".btn-1");
const closeModalBtn = document.querySelector(".btn-close");


const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};


closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);


document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});


const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  const likedSongList = document.querySelectorAll(".liked-songs li");
  console.log(likedSongList)
  for (let i = 0; i < likedSongList.length; i++) {
        const text = document.createTextNode("Remove");
        const btn = document.createElement("button");
            
        btn.appendChild(text);
        
            
        btn.addEventListener("click", function() {
            liked_songs.removeChild(likedSongList[i])
        }); 
        
        likedSongList[i].appendChild(btn);
  }
};

openModalBtn.addEventListener("click", openModal);

