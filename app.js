// Piece Class: Represents a Composition
class Piece{
    constructor(title, comp, link) {
        this.title = title;
        this.comp = comp;
        this.link = link;
    }
}


// UI Class: Handle UI Tasks
class UI {
    static displayRep() {
        const StoredRep = [
            {
                title: 'Ode to Joy',
                comp: 'Ludwig von Beethoven',
                link: 'www.fake.ca'
            },
            {
                title: 'Prelude in G Minor',
                comp: 'Sergei Rachmaninoff',
                link: 'www.fake.ca'
            }
        ];

        const rep = StoredRep

        rep.forEach((piece) => UI.addRepToList(piece));
    }

    static addRepToList(piece) {
        const list = document.querySelector('#rep-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${piece.title}</td>
        <td>${piece.comp}</td>
        <td>${piece.link}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `; 

        list.appendChild(row);
    }

    static deletePiece(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#rep-form');
        container.insertBefore(div, form); 
        // Vanish After 3 Seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#comp').value = '';
        document.querySelector('#link').value = '';
    }
}
// Store Class: Handles Storage
class Store{
    static getRep(){
        let rep;
        if(localStorage.getItem('piece') === null) {
            piece = [];
        } else {
            pieces = JSON.parse(localStorage.getItem('rep'));
        }

        return rep; 
    }

    static addPiece(piece){
        const rep = Store.getRep();

        rep.push('rep', JSON.stringify(rep));
    }

    static removePiece(piece){
        const rep = Store.getRep();

        rep.forEach((piece, index) => {
            if(piece.title === title) {
                rep.splice(index, 1)
            }
        });

        localStorage.setItem('rep', JSON.stringify(rep));
    }
}





// Event: Display Rep
document.addEventListener('DOMContentLoaded', UI.displayRep())

// Event: Add a Piece
document.querySelector('#rep-form').addEventListener('submit', (e) => {
    // Prevent Actual Submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const comp = document.querySelector('#comp').value; 
    const link = document.querySelector('#link').value; 

    // Validate 
    if(title === '' || comp === '') {
       UI.showAlert('Please fill in all fields.', 'danger');
    } else {
    // Instatiate Piece
    const piece = new Piece(title, comp, link);

    // Add Piece to List
    UI.addRepToList(piece);

    // Show Success Message
    UI.showAlert('Book Added', 'success');

    // Clear Fields
    UI.clearFields();
    }
});

// Event Remove a Piece
document.querySelector('#rep-list').addEventListener('click', (e) => {
    UI.deletePiece(e.target)
    // Show Success Message
    UI.showAlert('Book Removed', 'success');
});