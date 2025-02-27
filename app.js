document.addEventListener("DOMContentLoaded", function () {
    const inputNome = document.getElementById("amigo");
    const botaoAdicionar = document.querySelector(".button-add");
    const listaNomes = document.getElementById("listaAmigos");
    const botaoSortear = document.querySelector(".button-draw");
    const resultado = document.getElementById("resultado");

    let nomes = [];

    botaoAdicionar.addEventListener("click", function () {
        const nome = inputNome.value.trim();

        if (nome === "") {
            alert("Por favor, insira um nome válido.");
            return;
        }

        if (nomes.includes(nome)) {
            alert("Este nome já foi adicionado.");
            return;
        }

        nomes.push(nome);
        atualizarLista();
        inputNome.value = "";
        inputNome.focus();
        resultado.textContent = "";
    });

    botaoSortear.addEventListener("click", function () {
        if (nomes.length === 0) {
            alert("Adicione pelo menos um nome antes de sortear.");
            return;
        }

        // Aqui criamos um array para armazenar o resultado do sorteio
        const sorteio = [];
        const nomesSorteados = [...nomes];  // Cria uma cópia dos nomes para sortear

        nomes.forEach((nome) => {
            let amigoSorteado;

            // Sorteia um amigo diferente de quem está sendo sorteado
            do {
                amigoSorteado = nomesSorteados[Math.floor(Math.random() * nomesSorteados.length)];
            } while (amigoSorteado === nome);  // Garante que a pessoa não sorteie a si mesma

            sorteio.push({ nome: nome, amigo: amigoSorteado });

            // Remove o amigo sorteado para que não seja sorteado novamente
            nomesSorteados.splice(nomesSorteados.indexOf(amigoSorteado), 1);
        });

        // Exibe os resultados do sorteio
        resultado.innerHTML = sorteio.map(item => `<li>${item.nome} -> ${item.amigo}</li>`).join('');
    });

    function atualizarLista() {
        listaNomes.innerHTML = "";
        nomes.forEach((nome, index) => {
            const li = document.createElement("li");
            li.textContent = nome;
            
            const botaoRemover = document.createElement("button");
            botaoRemover.textContent = "Remover";
            botaoRemover.addEventListener("click", function () {
                nomes.splice(index, 1);
                atualizarLista();
                resultado.textContent = "";
            });
            
            li.appendChild(botaoRemover);
            listaNomes.appendChild(li);
        });
    }
});
