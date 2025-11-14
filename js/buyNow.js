const buyModal = document.getElementById("buyModal");
const closeModalBtn = document.getElementById("closeModal");
const closeFormBtn = document.getElementById("closeForm");

// Formulario
const buyForm = document.getElementById("buyForm");

// Paso 1: Dirección de facturación
const buyStep1 = document.getElementById("buyStep1");
// Paso 2: Método de pago
const buyStep2 = document.getElementById("buyStep2");

const nextStep1Btn = document.getElementById("nextStep1");
const prevStep2Btn = document.getElementById("prevStep2");

const optionButtons = document.querySelectorAll(".option-btn");
const optionContents = document.querySelectorAll(".option-content");

// Cargar el select de departamentos
const departamentoSelect = document.getElementById("departamentoSelect");
const departamentos = [
  { value: "artigas", text: "Artigas" },
  { value: "canelones", text: "Canelones" },
  { value: "cerro largo", text: "Cerro Largo" },
  { value: "colonia", text: "Colonia" },
  { value: "durazno", text: "Durazno" },
  { value: "flores", text: "Flores" },
  { value: "florida", text: "Florida" },
  { value: "lavalleja", text: "Lavalleja" },
  { value: "maldonado", text: "Maldonado" },
  { value: "montevideo", text: "Montevideo" },
  { value: "paysandu", text: "Paysandú" },
  { value: "rioNegro", text: "Río Negro" },
  { value: "rivera", text: "Rivera" },
  { value: "rocha", text: "Rocha" },
  { value: "salto", text: "Salto" },
  { value: "sanJose", text: "San José" },
  { value: "soriano", text: "Soriano" },
  { value: "tacuarembo", text: "Tacuarembó" },
  { value: "treintaYTres", text: "Treinta y tres" },
];
departamentos.forEach((departamento) => {
  const option = document.createElement("option");
  option.value = departamento.value;
  option.text = departamento.text;
  departamentoSelect.appendChild(option);
});

/**
 * Cuando se hace click en "Continuar compra"
 * Se abre el modal
 */
btnBuyNow.addEventListener("click", () => {
  const envioSeleccionado = document.querySelector('input[name="tipoEnvio"]:checked');

  if (!envioSeleccionado) {
    alert("¡Debes seleccionar primero el tipo de envío!");
    return;
  }

  // Abrir modal
  buyModal.classList.add("active");
  resetForm();
});

// Cerrar el modal
function closeModal() {
  buyModal.classList.remove("active");
}
closeFormBtn.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target === buyModal) closeModal();
});

/**
 * Volver atrás (Paso 2 → Paso 1)
 */
prevStep2Btn.addEventListener("click", function () {
  buyStep2.classList.remove("active");
  buyStep1.classList.add("active");
});

/**
 Siguiente paso después de ingresar Dirección de facturación
 */
nextStep1Btn.addEventListener("click", () => {
  // Validar primer paso (dirección)
  if (validateBuyStep1()) {
    buyStep1.classList.remove("active");
    buyStep2.classList.add("active");
  }
});

/**
  Se encarga de validar la primer parte de Dirección de facturación
 */
function validateBuyStep1() {
  const requiredFields = buyStep1.querySelectorAll("[required]");
  let valido = true;

  requiredFields.forEach((campo) => {
    if (!campo.value.trim()) {
      campo.classList.add("input-error"); // borde rojo
      valido = false;
    } else {
      campo.classList.remove("input-error");
    }
  });

  if (!valido) {
    buyForm.reportValidity();
    return false;
  }

  return true;
}

/**
 Selección de transferencia bancaria o tarjeta de crédito
 */
optionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const option = this.getAttribute("data-option");

    // Actualizar botones activos
    optionButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    // Mostrar contenido correspondiente
    optionContents.forEach((content) => {
      content.classList.remove("active");
      if (
        content.id ===
        `option${option.charAt(0).toUpperCase() + option.slice(1)}`
      ) {
        content.classList.add("active");
      }
    });
  });
});

// Resetear el formulario al abrir modal
function resetForm() {
  buyForm.reset();

  // Volver al primer paso
  buyStep2.classList.remove("active");
  buyStep1.classList.add("active");

  // Resetear opciones
  optionButtons.forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector('.option-btn[data-option="transferencia"]')
    .classList.add("active");

  optionContents.forEach((content) => content.classList.remove("active"));
  document.getElementById("optionTransferencia").classList.add("active");
}

/*
 Enviar el formulario
 */
buyForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const esValido = validarCompra();

  closeModal(); // Cierra el modal de compra
  mostrarModalFeedback(esValido); // Muestra cartel según resultado
});

/*
 Verifica que todos los datos estén completos antes de finalizar la compra
 */
function validarCompra() {
  // Dirección
  const departamento = document.getElementById("departamentoSelect")?.value.trim();
  const localidad = document.getElementById("localidad")?.value.trim();
  const calle = document.getElementById("calle")?.value.trim();
  const nroPuerta = document.getElementById("nroPuerta")?.value.trim();
  const esquina = document.getElementById("esquina")?.value.trim();

  if (![departamento, localidad, calle, nroPuerta, esquina].every(Boolean)) {
    return false;
  }

  // Forma de envío
  const envioSeleccionado = document.querySelector('input[name="tipoEnvio"]:checked');
  if (!envioSeleccionado) return false;

  // Cantidad de productos
  const cantidades = document.querySelectorAll('input[name="quantity"]');

  /*
   Si el carrito está vacío no permite finalizar compra
   */
  if (cantidades.length === 0) return false;

  for (const input of cantidades) {
    const valor = parseInt(input.value);
    if (isNaN(valor) || valor <= 0) return false;
  }

  // Forma de pago
  const opcionActiva = document.querySelector(".option-btn.active");
  if (!opcionActiva) return false;

  // Transferencia banco
  if (opcionActiva.dataset.option === "transferencia") {
    const bancoSeleccionado = document.querySelector('input[name="banco"]:checked');
    if (!bancoSeleccionado) return false;
  }

  // Tarjeta todos los datos completos
  if (opcionActiva.dataset.option === "tarjeta") {
    const nombre = document.getElementById("fullName")?.value.trim();
    const nroTarjeta = document.getElementById("nroTarjeta")?.value.trim();
    const vencimiento = document.getElementById("vencimiento")?.value.trim();
    const cvv = document.getElementById("cvv")?.value.trim();

    if (![nombre, nroTarjeta, vencimiento, cvv].every(Boolean)) return false;
  }

  return true;
}

/*
 Modal con mensaje de compra exitosa o error
 */

function mostrarModalFeedback(exito) {
  const modal = document.createElement("div");
  modal.classList.add("feedback-modal");

  modal.innerHTML = `
    <div class="feedback-content ${exito ? "success" : "error"}">
      <span class="icon">
        ${
          exito
            ? `
          <svg viewBox="0 0 24 24" fill="currentColor" width="44" height="44">
            <path d="M20.285 6.709l-11.285 11.285-5.285-5.285 1.414-1.414 3.871 3.871 9.871-9.871z"/>
          </svg>`
            : `
          <svg viewBox="0 0 24 24" fill="currentColor" width="44" height="44">
            <path d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222 5.636 5.636 10.586 10.586 5.636 15.536l1.414 1.414L12 12 16.95 16.95l1.414-1.414L13.414 10.586z"/>
          </svg>`
        }
      </span>
      <h2>${exito ? "¡Compra realizada!" : "Algo salió mal :("}</h2>
      <button class="feedback-btn">${exito ? "¡Genial!" : "Reintentar"}</button>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".feedback-btn").addEventListener("click", () => {
    modal.remove();
  });
}
