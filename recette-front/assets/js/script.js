function getRecette() {
    fetch('http://127.0.0.1:3002/recettes', {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    }).then((response) => {
        response.json().then((data) => {
            console.log(data);
            const recetteList = document.getElementById('recetteList');
            recetteList.innerHTML = "";
            data.forEach(recette => {
                displayRecette(recette);
            });
        });
    });
}
// Fonction pour ajouter une recette
function addRecette() {
    let ingredients = document.querySelector("#ingredients").value.split(',')
    let instructions = document.querySelector("#instructions").value.split(',')
    let recettes = {
        titre: document.querySelector("#titre").value,
        ingredients: ingredients,
        instructions: instructions,
        tpsPrepa: document.querySelector("#tpsPrepa").value,
        tpsCuisson: document.querySelector("#tpsCuisson").value,
        difficulte: document.querySelector("#difficulte").value,
        categorie: document.querySelector("#categorie").value,
    };
    fetch('http://127.0.0.1:3002/recettes', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(recettes)
    }).then((response) => {
        response.json().then((data) => {
            console.log(data);
            getRecette();
        });
    });
}
function displayRecette(recettes) {
    const recetteList = document.getElementById('recetteList');
    const titreElement = document.createElement('p');
    const ingredientsElement = document.createElement('p');
    const instructionsElement = document.createElement('p');
    const tpsPrepaElement = document.createElement('p');
    const tpsCuissonElement = document.createElement('p');
    const difficulteElement = document.createElement('p');
    const categorieElement = document.createElement('p');

    const buttonDelete = document.createElement('button');
    const buttonEdit = document.createElement('button');

    const container = document.createElement('div');

    titreElement.innerText = `Recette: ${recettes.titre}`;
    ingredientsElement.innerText = `Ingrédients: ${recettes.ingredients}`;
    instructionsElement.innerText = `Instructions: ${recettes.instructions}`;
    tpsPrepaElement.innerText = `Temps de préparation: ${recettes.tpsPrepa}`;
    tpsCuissonElement.innerText = `Temps de cuisson: ${recettes.tpsCuisson}`;
    difficulteElement.innerText = `Difficulté: ${recettes.difficulte}`;
    categorieElement.innerText = `Catégorie: ${recettes.categorie}`;

    buttonDelete.textContent = "Supprimer Recette";
    buttonEdit.textContent = "Modifier Recette";

    container.appendChild(titreElement);
    container.appendChild(ingredientsElement);
    container.appendChild(instructionsElement);
    container.appendChild(tpsPrepaElement);
    container.appendChild(tpsCuissonElement);
    container.appendChild(difficulteElement);
    container.appendChild(categorieElement);
    container.appendChild(buttonDelete);
    container.appendChild(buttonEdit);

    recetteList.appendChild(container);

    buttonDelete.classList.add("buttonDelete");
    buttonEdit.classList.add("buttonEdit");

    buttonDelete.addEventListener('click', () => {
        removeDisplayedRecette(recettes._id);
    });

    buttonEdit.addEventListener('click', () => {
        showEditModal(recettes._id); // Afficher la modale avec les données de la recette
    });
}
// Fonction pour supprimer une recette
function removeDisplayedRecette(id) {
    fetch('http://127.0.0.1:3002/recettes/' + id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
    }).then((response) => {
        response.json().then((data) => {
            getRecette();
        });
    });
}
getRecette();
// Fonction pour soumettre les modifications
function editRecette(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const recetteId = document.querySelector("#editRecetteForm").dataset.recetteId;

    // Récupérer les données du formulaire
    let ingredients = document.querySelector("#editIngredients").value.split(',');
    let instructions = document.querySelector("#editInstructions").value.split(',');

    let modifRecette = {
        titre: document.querySelector("#editTitre").value,
        ingredients: ingredients,
        instructions: instructions,
        tpsPrepa: document.querySelector("#editTpsPrepa").value,
        tpsCuisson: document.querySelector("#editTpsCuisson").value,
        difficulte: document.querySelector("#editDifficulte").value,
        categorie: document.querySelector("#editCategorie").value
    };

    // Envoyer la requête PUT pour mettre à jour la recette
    fetch(`http://127.0.0.1:3002/recettes/${recetteId}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(modifRecette) // Sérialisation correcte de l'objet complet
    })
        .then(response => response.json())
        .then(data => {
            console.log('Recette modifiée avec succès:', data);
            closeModal(); // Fermer la modale après la modification
            getRecette(); // Rafraîchir la liste des recettes après la modification
        })
        .catch(error => console.error('Erreur lors de la modification de la recette:', error));
}

// Associer la fonction au formulaire pour la soumission des modifications
document.querySelector("#editRecetteForm").addEventListener('submit', editRecette);

const btnSend = document.getElementById('btnSend');
btnSend.addEventListener('click', addRecette);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// fonction pour afficher et fermer les modales 
document.addEventListener('DOMContentLoaded', function () {

    const signupModal = document.getElementById('signupModal');
    const loginModal = document.getElementById('loginModal');
    const createRecipeModal = document.getElementById('createRecipeModal');
    const openSignupModal = document.getElementById('openSignupModal');
    const openLoginModal = document.getElementById('openLoginModal');
    const openCreateRecipeModal = document.getElementById('openCreateRecipeModal');
    const closeButtons = document.querySelectorAll('.close');
    // Ouvrir les modales lors du clic sur les boutons
    openSignupModal.onclick = function () {
        signupModal.style.display = 'flex';
    }
    openLoginModal.onclick = function () {
        loginModal.style.display = 'flex';
    }
    openCreateRecipeModal.onclick = function () {
        createRecipeModal.style.display = 'flex';
    }

    document.getElementById('signupForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        const response = await fetch('http://127.0.0.1:3002/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        alert(data.message || data.error);
    });

    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const response = await fetch('http://127.0.0.1:3002/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        // const data = await response.json();
        // if (data.token) {
        //     localStorage.setItem('token', data.token);
        //     alert('Connexion réussie!');
        //     // Rediriger ou charger des données
        // } else {
        //     alert(data.message || data.error);
        // }
    });
    // Fermer les modales lorsque l'utilisateur clique sur le bouton "x"
    closeButtons.forEach(button => {
        button.onclick = function () {
            button.parentElement.parentElement.style.display = 'none';
        }
    });

    // Fermer les modales lorsque l'utilisateur clique en dehors du contenu
    window.onclick = function (event) {
        if (event.target === signupModal || event.target === loginModal || event.target === createRecipeModal) {
            event.target.style.display = 'none';
        }
    }
    // Gestion de l'inscription
    document.getElementById('signupForm').addEventListener('submit', function (e) {
        e.preventDefault();
        // Logique d'inscription
        alert('Formulaire d\'inscription soumis');
        signupModal.style.display = 'none';
    });

    // Gestion de la connexion
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        // Logique de connexion
        alert('Formulaire de connexion soumis');
        loginModal.style.display = 'none';
    });

    // Gestion de la création de recette
    document.getElementById('recetteForm').addEventListener('submit', function (e) {
        e.preventDefault();
        // Logique de création de recette
        alert('Recette créée');
        createRecipeModal.style.display = 'none';
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fonction pour afficher la modale et récupérer les données de la recette
function showEditModal(recetteId) {
    // Afficher la modale
    const modal = document.getElementById('editRecipeModal');
    modal.style.display = 'block';

    // Récupérer les données de la recette via l'API
    fetch(`http://127.0.0.1:3002/recettes/${recetteId}`)
        .then(response => response.json())
        .then(data => {
            // Remplir les champs du formulaire de la modale avec les données de la recette
            document.querySelector("#editTitre").value = data.titre;
            document.querySelector("#editIngredients").value = data.ingredients.join(',');
            document.querySelector("#editInstructions").value = data.instructions.join(',');
            document.querySelector("#editTpsPrepa").value = data.tpsPrepa;
            document.querySelector("#editTpsCuisson").value = data.tpsCuisson;
            document.querySelector("#editDifficulte").value = data.difficulte;
            document.querySelector("#editCategorie").value = data.categorie;

            // Ajouter l'ID de la recette au formulaire pour la mise à jour
            document.querySelector("#editRecetteForm").dataset.recetteId = recetteId;
        })
        .catch(error => console.error('Erreur lors de la récupération de la recette:', error));
}

// Fonction pour fermer la modale
function closeModal() {
    const modal = document.getElementById('editRecipeModal');
    modal.style.display = 'none';
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////

