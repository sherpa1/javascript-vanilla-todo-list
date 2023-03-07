//écoute de l'événement "DOMContentLoaded" et exécution de la fonction init lorsque le DOM de la page HTML est chargé.
document.addEventListener("DOMContentLoaded", init);

class Task {
    constructor(content, done = false, important = false) {
        this.content = content;
        this.done = done;
        this.important = important;
        this.created_at = new Date();
    }
}

//initialise une collection d'objets de type Task
const tasks = [
    new Task("Acheter des fleurs"),
    new Task("Aller à la pharmacie", true),
    new Task("Sortir le chien", false, true),
    new Task("Prendre rdv chez le médecin"),
    new Task("Réserver hotel pour vacances d'été"),
    new Task("Déclaration d'impôts"),
    new Task("Acheter cadeau pour anniversaire de Jean", true)
];

function onSubmit(event) {
    event.preventDefault();//évite le rechargement de page après la validation du formulaire

    const important = document.querySelector("#task_important").checked;
    //récupère la valeur de la checkbox


    const content = document.querySelector('#task_content').value;
    //récupère la valeur de l'input

    document.querySelector('#task_content').value = "";
    //vide le champ de texte

    if (content === "") {
        alert("Vous devez saisir un contenu");
        return;
    }

    const task = new Task(content, false, important);

    tasks.unshift(task);
    //ajoute la nouvelle tâche en 1ère position de la liste

    refresh_tasks();
}

function refresh_tasks() {
    const tasks_container = document.querySelector("#tasks_container");

    let html = "";//par défaut le contenu html de la balise tasks_container est vide 

    tasks.map(a_task => html += task_template(a_task));
    //pour chaque task contenue dans la liste on ajoute une balise article au contenu html de la balise tasks_container

    tasks_container.innerHTML = html;
    //on met à jour le contenu html de la balise tasks_container

    const buttons = document.querySelectorAll("article.task button");
    //on récupère chaque bouton dans une balise article 

    for (const btn of buttons) {
        //on ajoute un écouteur sur l'événement click de chaque bouton
        btn.addEventListener('click', (event) => {

            //récupère la balise article parent du bouton cliqué
            const task = event.currentTarget.parentNode;

            //récupère la valeur de data-status de la balise article (parent du bouton cliqué)
            const status = task.dataset.status;

            if (status === "todo") {
                //modifie la valeur de data-status de la balise article à done
                task.dataset.status = "done";

                //remplace la classe de la balise article de todo à done
                task.className = task.className.replace("todo", "done");

                //remplace le texte du bouton de V à x
                task.querySelector("button").innerHTML = get_icon_according_done(true);
            } else {
                //supprime la balise article du DOM
                document.querySelector("#tasks_container").removeChild(task);
            }
        });
    }
}

function get_classname_according_done(done) {
    //retourne "done" ou "todo" en fonction de la valeur de done (true / false)
    return done ? "done" : "todo";
}

function get_classname_according_importance(important) {
    //retourne "important" ou "normal" en fonction de la valeur de important (true / false)
    return important ? "important" : "normal";
}

function format_date(date) {
    //formate la date
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
}

function get_icon_according_done(done) {
    //retourne "x" ou "V" selon la valeur de done (true / false)
    return done ? `<span class="material-symbols-outlined">close</span>` : `<span class="material-symbols-outlined">done</span>`;
}

function get_dataStatus_according_done(done) {
    //retourne "done" ou "todo" selon la valeur de done (true / false)
    return done ? "done" : "todo";
}

function task_template(task) {
    //retourne une balise article dynamiquement complétée selon les valeur de l'objet Task passé en paramètre
    return `
    <article class="task
    ${get_classname_according_done(task.done)}
    ${get_classname_according_importance(task.important)}
    "
    data-status="${get_dataStatus_according_done(task.done)}"
    >
        <span contenteditable="true">${task.content}</span>

        <span class="date">
        (${format_date(task.created_at)})
        </span>
        
        <button class="button button-clear"> 
        ${get_icon_according_done(task.done)}
        </button>
    
    </article>`;
}

function filter() {
    const show_done = document.querySelector("#filter");

    if (show_done.dataset.filter === "all") {
        show_done.dataset.filter = "done-only";
        show_done.innerText = "Afficher les tâches accomplies";
        const tasks_to_hide = document.querySelectorAll("article.task");
        tasks_to_hide.forEach(task => task.classList.remove("hide"));
    } else {
        show_done.dataset.filter = "all";
        show_done.innerText = "Tout Afficher";
        const tasks_to_hide = document.querySelectorAll("article.task.done");
        tasks_to_hide.forEach(task => task.classList.add("hide"));
    }

}

function init() {
    //initialise le script
    console.log('init');

    refresh_tasks();
    //met à jour le contenu de la balise 

    const add_task_form = document.querySelector("#add_task_form");

    add_task_form.addEventListener('submit', onSubmit);
    //ajoute un écouteur sur l'événement submit du formulaire add_task_form

    const show_done = document.querySelector("#filter");

    show_done.addEventListener("click", filter);
}