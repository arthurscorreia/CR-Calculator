let materias = [];

        function adicionarMateria() {
            let cargaHoraria = document.getElementById("cargaHoraria").value.replace(',', '.');
            let nota = document.getElementById("nota").value.replace(',', '.');

            cargaHoraria = parseFloat(cargaHoraria);
            nota = parseFloat(nota);

            materias.push({ cargaHoraria, nota });

            let lista = document.getElementById("listaMaterias");
            let item = document.createElement("li");
            item.textContent = `Carga Horária: ${cargaHoraria}, Nota: ${nota}`;
            lista.appendChild(item);

            document.getElementById("cargaHoraria").value = "";
            document.getElementById("nota").value = "";
        }

        function calcularCR() {
            let somaNotasPonderadas = 0;
            let somaCargasHorarias = 0;

            for (let materia of materias) {
                somaNotasPonderadas += materia.cargaHoraria * materia.nota;
                somaCargasHorarias += materia.cargaHoraria;
            }

            let CR = somaNotasPonderadas / somaCargasHorarias;
            document.getElementById("resultado").textContent = `O seu CR equivale a ${CR.toFixed(1)}`;
        }

        document.getElementById("btnAdicionar").addEventListener("click", adicionarMateria);
        document.getElementById("btnCalcular").addEventListener("click", calcularCR);