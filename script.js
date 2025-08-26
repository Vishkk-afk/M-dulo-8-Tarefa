document.getElementById("numero").addEventListener("blur", (event) => {
    const elemento = event.target;
    const numeroInformado = elemento.value;
    localStorage.setItem("numero", numeroInformado);
});
document.getElementById("cep").addEventListener("blur", (event) => {
    const elemento = event.target;
    const cepInformado = elemento.value;

    if(!(cepInformado.length === 8))
        return;

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                const meusDados = JSON.stringify(data);
                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("estado").value = data.uf;
                localStorage.setItem("dados", meusDados);
                return;
            } else {
                alert("CEP não encontrado.")
            }
        })
        .catch(error => console.error("Erro ao buscar o CEP:", error));

    localStorage.setItem("cep", cepInformado);
});

document.addEventListener("DOMContentLoaded", () => {
    const numeroSalvo = localStorage.getItem("numero");
    const cepSalvo = localStorage.getItem("cep");
    const meusDadosSalvos = JSON.parse(localStorage.getItem("dados"));

    if (numeroSalvo) {
        document.getElementById("numero").value = numeroSalvo;
    }
    if (cepSalvo) {
        document.getElementById("cep").value = cepSalvo;
    }
    if (meusDadosSalvos) {
        const dados = meusDadosSalvos;
        document.getElementById("logradouro").value = dados.logradouro;
        document.getElementById("bairro").value = dados.bairro;
        document.getElementById("cidade").value = dados.localidade;
        document.getElementById("estado").value = dados.uf;
    }
});
