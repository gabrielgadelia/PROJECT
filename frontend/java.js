fetch("http://localhost:5000/history")
    .then(res => res.json())
    .then(res => displyHistory(res))
    .catch(err => console.log(err))

// GET
const displyHistory = (data) => {
    const card = document.querySelector(".card-container")
    data.forEach(history => {
      card.innerHTML += `

      <div class="card">
  <div class="card-image-wrapper">
    <img src="${history.Imagelink}" alt="დიდგორი">
    <div class="card-buttons">
      <button data-id=${history._id} onclick='onButtonUpdate(event)' class="update-btn">განახლება</button>
      <button data-id=${history._id} onclick='onButtonDelete(event)' class="delete-btn">წაშლა</button>
    </div>
  </div>
  <div class="card-content">
    <h2>${history.name}</h2>
    <h2>${history.year}</h2>
    <p>${history.Description}</p>
    <a class="card-link" target="_blank" href="${history.wikilink}">view more</a>
  </div>
</div>
      `
    });
}

// POST
const addHistory = () => {
  const name = document.getElementById("name").value
  const description = document.getElementById("Description").value
  const year = document.getElementById("year").value
  const imagelink = document.getElementById("Imagelink").value
  const wikilink = document.getElementById("wikilink").value

  const body = {
      name,
      description, 
      year, 
      imagelink, 
      wikilink
    }

    if(body.year >= 2008){
      appendAlert('WARNING YEAR CANT BE MORE THAN 2008 ', 'TRY AGAIN')
      return
    }

    console.log(body)

     fetch("http://localhost:5000/history", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}


const appendAlert = (message, type) => {
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-warning alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}


//delete
const onButtonDelete = async (event) => {
  try {
    const id = event.target.getAttribute('data-id')

    const response = await fetch(`http://localhost:5000/history/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });

    console.log(response)
    
    if (response.status === 200) {
      alert('Deleted successfully!');
      location.reload();
    } else {
      alert('Error deleting item');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

// PUT
const onButtonUpdate = async (event) => {
  try {
    const popup = document.getElementById('update-popup')
    popup.style.display = 'block'

    const name = document.getElementById("update-name")
    const description = document.getElementById("update-description")
    const year = document.getElementById("update-year")
    const imagelink = document.getElementById("update-image")
    const wikilink = document.getElementById("update-wiki")

    const updateBtn = document.getElementById('updateBtn')

    const id = event.target.getAttribute('data-id')

    const response = await fetch(`http://localhost:5000/history/${id}`)
    const history = await response.json()

    name.value = history.name
    description.value = history.description
    year.value = history.year
    imagelink.value = history.imagelink
    wikilink.value = history.wikilink
    
    updateBtn.onclick = () => onUpdate(id)    
  } catch (error) {
    alert('Error: ' + error.message);
  }
}


const onUpdate = async (id) => {
  const updatedData = {
        name: document.getElementById('update-name').value,
        description: document.getElementById('update-description').value,
        year: parseInt(document.getElementById('update-year').value),
        imagelink: document.getElementById('update-image').value,
        wikilink: document.getElementById('update-wiki').value,
    };


  try {
      const response = await fetch(`http://localhost:5000/history/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData)
      });

      if (!response.ok){
        throw new Error('Update failed');
      } 

      const result = await response.json();
      alert("Successfully updated!");
      closePopup();
      // Optionally, re-render or update the card content
  } catch (error) {
      console.error(error);
      alert("Something went wrong!");
  }
}

function closePopup() {
    document.getElementById('update-popup').style.display = 'none';
}

// DARK WHITE THEME
document.getElementById("toggleButton").addEventListener("click", function() {
  document.body.classList.toggle("dark-theme"); 
});

  document.getElementById('toggleButton').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });
  
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

    const openBtn = document.getElementById('open-popup-btn');
  const popup = document.getElementById('update-popup');

  openBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
  });

  function closePopup() {
    popup.style.display = 'none';
  }

  popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    closePopup();
  }
});
