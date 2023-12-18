const API_URL = "https://sophisticated-humane-dandelion.glitch.me"
const cardsElement = document.querySelector(".cards")

const loadData = async () => {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }
        const data = await response.json()
        printData(data)
    } catch (error) {
        console.error('Gaunant duomenis kilo problema:', error)
    }
}

const printData = (data) => {
    cardsElement.innerHTML = ""

    if (!data || data.length === 0) {
        cardsElement.innerHTML = "<p>Nėra duomenų</p>"
        return
    }

    data.forEach(item => {
        const newCard = document.createElement("div")
        newCard.classList.add("card")
        newCard.innerHTML =
        `
        <img src="${item.image}" alt="">
        <h1>${item.title}</h1>
        <span>€${item.price}</span>
        <button class="delete-btn" data-id="${item.id}">Ištrinti</button>
        `

        const deleteButton = newCard.querySelector('.delete-btn')
        deleteButton.addEventListener('click', (event) => {
            const itemId = event.target.getAttribute('data-id')
            deleteCard(itemId)
        })

        cardsElement.appendChild(newCard)
    })
}

const deleteCard = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Ištrinant elementą kilo problema.')
        }

        const cardToDelete = document.querySelector(`.card button[data-id="${id}"]`)
        if (cardToDelete) {
            cardToDelete.parentElement.remove()
        }
    } catch (error) {
        console.error('Error:', error.message)
        alert('Nepavyko ištrinti elemento. Prašau, pabandykite dar kartą.')
    }
}

loadData()
