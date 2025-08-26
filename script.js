document.getElementById("cep").addEventListener("blur", (evento)=> {
    const elemento = evento.target;
    const cepInformado = elemento.value;
    localStorage.setItem("cep", cepInformado);

    if(!(cepInformado.length === 8))
        return;

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("estado").value = data.uf;
                return;
            } else {
                alert("CEP não encontrado.")
            }

            document.getElementById("logradouro").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
        })
        .catch(error => console.error("Erro ao buscar o CEP:", error))

})

document.addEventListener("DOMContentLoaded", () => {
    const cepInputSalvo = localStorage.getItem("cep") || "";
    document.getElementById("cep").value = cepInputSalvo;
});