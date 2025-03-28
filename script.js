let materias = [];

    //remove os possíveis acentos das matérias
    function removerAcentos(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function adicionarMateria() {
        let cargaHoraria = document.getElementById("cargaHoraria").value.replace(',', '.');
        let nota = document.getElementById("nota").value.replace(',', '.');
        let materia = document.getElementById("materia").value;
        cargaHoraria = parseFloat(cargaHoraria);
        nota = parseFloat(nota);
        materia = String(materia).trim();

        //verifica o input
        if (materia === "") {
            alert("Por favor, insira o nome da matéria");       
            return;
        }

        if (isNaN(cargaHoraria) || cargaHoraria <= 0) {
            alert("Por favor, insira uma carga horária válida");
            return;
        }
        if(isNaN(nota) || nota < 0 || nota > 10){
            alert("Por favor, insira uma nota válida");
            return;
        }

        //verifica se a matéria já foi adicionada
        let materiaSemAcento = removerAcentos(materia.toLowerCase());
        for (let i = 0; i < materias.length; i++) {
            let materiaSemAcentoLista = removerAcentos(materias[i].materia.toLowerCase());
            if (materiaSemAcento === materiaSemAcentoLista) {
                alert("Essa matéria já foi adicionada.");
                return;
            }
        }
        materias.push({ materia, cargaHoraria, nota });

        let lista = document.getElementById("listaMaterias");
        let item = document.createElement("li");
        item.textContent = `Matéria: ${materia}, Carga Horária: ${cargaHoraria}, Nota: ${nota}`;
        lista.appendChild(item);

        document.getElementById("materia").value = "";
        document.getElementById("cargaHoraria").value = "";
        document.getElementById("nota").value = "";

    }

    function calcularCR() {
        if (materias.length === 0) {
            document.getElementById("resultado").textContent = "Não é possível calcular o seu Coeficiente de Rendimento.";
            return;
     }
            
        let somaNotasPonderadas = 0;
        let somaCargasHorarias = 0;

        for (let materia of materias) {
            somaNotasPonderadas += materia.cargaHoraria * materia.nota;
            somaCargasHorarias += materia.cargaHoraria;
        }

        let CR = somaNotasPonderadas / somaCargasHorarias;
        if (CR >= 5){
            document.getElementById("resultado").style.color = "green";
            document.getElementById("resultado").textContent = `O seu Coeficiente de Rendimento equivale a ${CR.toFixed(1)}`;
        }
        else {
            document.getElementById("resultado").style.color = "red";
            document.getElementById("resultado").textContent = `O seu Coeficiente de Rendimento equivale a ${CR.toFixed(1)}`;
        }
    }

document.getElementById("btnAdicionar").addEventListener("click", adicionarMateria);
document.getElementById("btnCalcular").addEventListener("click", calcularCR);
