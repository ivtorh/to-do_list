// Selecionar o botão de adicionar tarefa, campo de entrada e lista completa de tarefas
const btn = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const completList = document.querySelector('.list-tasks');

// Array para armazenar a lista de tarefas
let myList = [];

// Adicionar evento de clique ao botão de adicionar tarefa
btn.addEventListener('click', () => {
    // Obter o valor do campo de entrada e remover espaços em branco do início e fim
    const inputValue = input.value.trim();

    // Verificar se o valor é vazio
    if (inputValue === '') {
        // Alertar o usuário e interromper a função
        alert('Não é possível adicionar um card vazio, digite alguma coisa!');
        return;
    }

    // Adicionar a tarefa à lista
    myList.push({
        tarefa: input.value,
        concluida: false
    });

    // Limpar o campo de entrada
    input.value = '';

    // Atualizar a exibição da lista de tarefas
    showTasks();
});

// Adicionar evento de clique à lista de tarefas completas
completList.addEventListener('click', (event) => {
    if (event.target.classList.contains('checked-task')) {
        // Obter o índice da tarefa clicada e marcar/desmarcar como concluída
        const index = parseInt(event.target.dataset.index);
        checkedTask(index);
    } else if (event.target.classList.contains('delete-task')) {
        // Obter o índice da tarefa clicada e deletá-la
        const index = parseInt(event.target.dataset.index);
        deleteItem(index);
    }
});

// Função para exibir as tarefas na lista
function showTasks() {
    let newLi = '';

    // Iterar sobre as tarefas e criar elementos HTML correspondentes
    myList.forEach((task, index) => {
        newLi += `
            <li class="task ${task.concluida && "done"}">
                <img src="src/img/checked.png" alt="ícone de checked" class="checked-task" data-index="${index}">
                <p>${task.tarefa}</p>
                <img src="src/img/trash.png" alt="ícone de lixeira" class="delete-task" data-index="${index}">
            </li>
        `;
    });

    // Atualizar a lista completa de tarefas com os novos elementos
    completList.innerHTML = newLi;

    // Armazenar a lista de tarefas atualizada no armazenamento local
    localStorage.setItem('List', JSON.stringify(myList));
}

// Função para marcar/desmarcar uma tarefa como concluída
function checkedTask(index) {
    myList[index].concluida = !myList[index].concluida;

    // Atualizar a exibição das tarefas
    showTasks();
}

// Função para deletar uma tarefa
function deleteItem(index) {
    myList.splice(index, 1);

    // Atualizar a exibição das tarefas
    showTasks();
}

// Função para carregar as tarefas do armazenamento local durante o carregamento da página
function reloadTask() {
    // Obter a lista de tarefas armazenada no armazenamento local
    const taskStorage = localStorage.getItem('List');

    // Se houver tarefas armazenadas, analisar e atribuir à lista atual
    if (taskStorage) {
        myList = JSON.parse(taskStorage);
    }

    // Atualizar a exibição das tarefas
    showTasks();
}

// Chamar a função de recarregamento das tarefas ao carregar a página
reloadTask();
