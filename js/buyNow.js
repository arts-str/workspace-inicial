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
  { value: "treintaYTres", text: "Treina y tres" },
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
btnBuyNow.addEventListener("click", (e) => {
  let envioChecked = false;
  let envio = "";

  for (const radio of radioEnvio) {
    if (radio.checked) {
      envioChecked = true;
      envio = radio.value;
      break;
    }
  }

  if (envioChecked && envio) {
    // Abrir modal
    buyModal.classList.add("active");
    resetForm();
  } else {
    alert("¡Debes seleccionar primero el tipo de envío!");
  }
});

// Cerrar el modal
function closeModal() {
  buyModal.classList.remove("active");
}
closeFormBtn.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target == buyModal) {
    closeModal();
  }
});

/**
 * Volver atrás
 */
prevStep2Btn.addEventListener("click", function () {
  buyStep2.classList.remove("active");
  buyStep1.classList.add("active");
});


/**
 * Siguiente paso después de ingresar Dirección de facturación
 */
nextStep1Btn.addEventListener("click", (e) => {
  // Validar primero paso 1: dirección de facturación
  if (validateBuyStep1()) {
    buyStep1.classList.remove("active");
    buyStep2.classList.add("active");
  }
});

/**
 * Se encarga de validar la primer parte de Dirección de facturación
 */
function validateBuyStep1() {
  // Falta agregar lógica
  return true;
}

/**
 * Seleccion de transferencia bancaria o tarjeta de crédito
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

// Resetear el formulario
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

/**
 * Enviar el formulario
 */
buyForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Falta lógica

  // Cerrar Modal
  closeModal();
});
