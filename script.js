// NOVERA Studio — interactions simples
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.textContent = isOpen ? "×" : "☰";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

// Affiche automatiquement l'année actuelle dans le pied de page.
document.querySelector("#year").textContent = new Date().getFullYear();


// Envoi du formulaire avec Web3Forms
const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  submitButton.textContent = "Envoi en cours...";

  const formData = new FormData(contactForm);

  formData.append("subject", "Nouvelle demande — NOVERA Studio");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      formNote.textContent = "Votre demande a bien été envoyée ! Merci pour votre confiance.";
      contactForm.reset();
    } else {
      formNote.textContent = "Une erreur est survenue. Veuillez réessayer.";
    }

  } catch (error) {
    formNote.textContent = "Impossible d'envoyer votre demande. Vérifiez votre connexion.";
  }

  submitButton.disabled = false;
  submitButton.textContent = "Envoyer ma demande ↗";
});

// Animation des projets quand ils apparaissent à l'écran
const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

projectCards.forEach((card, index) => {
  card.classList.add("reveal");
  card.style.transitionDelay = `${index * 0.2}s`;
  projectObserver.observe(card);
});

// Animation des cartes de la section Pourquoi NOVERA
const whyCards = document.querySelectorAll(".why-card");

const whyObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

whyCards.forEach((card, index) => {
  card.classList.add("reveal");
  card.style.transitionDelay = `${index * 0.2}s`;
  whyObserver.observe(card);
});