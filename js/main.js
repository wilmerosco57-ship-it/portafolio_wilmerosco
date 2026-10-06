
document.addEventListener("DOMContentLoaded", () => {
  
  const theme = {
    btn: document.querySelector("#btn-theme"),
    icon: document.querySelector("#btn-theme i"),
    key: "portfolio_theme_wov",

    init() {
      const savedTheme = localStorage.getItem(this.key);
      if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        this.icon.classList.replace("fa-moon", "fa-sun");
      }

      this.btn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-theme");
        if (isDark) {
          this.icon.classList.replace("fa-moon", "fa-sun");
          localStorage.setItem(this.key, "dark");
        } else {
          this.icon.classList.replace("fa-sun", "fa-moon");
          localStorage.setItem(this.key, "light");
        }
      });
    }
  };

  const menu = {
    btnMenu: document.querySelector("#btn-menu"),
    nav: document.querySelector("#main-nav"),

    init() {
      this.btnMenu.addEventListener("click", () => {
        this.nav.classList.toggle("open");
      });

      this.nav.addEventListener("click", (e) => {
        if (e.target.classList.contains("nav-link")) {
          this.nav.classList.remove("open");
        }
      });
    }
  };

  const eduTabs = {
    btns: document.querySelectorAll(".edu-tab-btn"),
    contents: document.querySelectorAll(".edu-tab-content"),

    init() {
      this.btns.forEach(btn => {
        btn.addEventListener("click", () => {
          this.btns.forEach(b => b.classList.remove("active"));
          this.contents.forEach(c => c.classList.remove("active"));

          btn.classList.add("active");
          const targetId = btn.getAttribute("data-tab");
          document.getElementById(targetId).classList.add("active");
        });
      });
    }
  };

  const timeline = {
    data: [
      {
        cat: "Grado de Licenciatura",
        titulo: "Lic. en Ingeniería en Sistemas Electrónicos",
        desc: "Escuela Militar de Ingeniería (EMI). Título Académico y Profesional en Provisión Nacional obtenido (2021)."
      },
      {
        cat: "Posgrado - Maestría (UPB)",
        titulo: "Maestría en Ing. de Control, Instrumentación y Automatización",
        desc: "Universidad Privada Boliviana (UPB). Concluida satisfactoriamente, en fase de elaboración de perfil de tesis."
      },
      {
        cat: "Posgrado - Maestría (UNSXX)",
        titulo: "Maestría en Ingeniería Eléctrica y Automatización Industrial",
        desc: "Universidad Nacional Siglo XX. Cursando activamente el Módulo XIII."
      },
      {
        cat: "Segunda Carrera",
        titulo: "Lic. en Ingeniería de Sistemas",
        desc: "Universidad Privada Domingo Savio (UPDS). Estudiante regular de 4to semestre (2025-2026)."
      },
      {
        cat: "Formación Universitaria",
        titulo: "Lic. en Informática",
        desc: "Universidad Mayor de San Andrés (UMSA). 5to semestre cursado con enfoque en algoritmos y sistemas."
      }
    ],
    index: 0,
    catEl: document.querySelector("#timeline-category"),
    titleEl: document.querySelector("#timeline-title"),
    descEl: document.querySelector("#timeline-desc"),
    dotsEl: document.querySelector("#timeline-dots"),
    btnPrev: document.querySelector("#tl-btn-prev"),
    btnNext: document.querySelector("#tl-btn-next"),

    init() {
      this.data.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.dataset.idx = i;
        this.dotsEl.appendChild(dot);
      });

      this.render();

      this.btnPrev.addEventListener("click", () => {
        this.index = (this.index - 1 + this.data.length) % this.data.length;
        this.render();
      });

      this.btnNext.addEventListener("click", () => {
        this.index = (this.index + 1) % this.data.length;
        this.render();
      });

      this.dotsEl.addEventListener("click", (e) => {
        if (e.target.classList.contains("dot")) {
          this.index = Number(e.target.dataset.idx);
          this.render();
        }
      });
    },

    render() {
      const item = this.data[this.index];
      this.catEl.textContent = item.cat;
      this.titleEl.textContent = item.titulo;
      this.descEl.textContent = item.desc;

      const allDots = this.dotsEl.querySelectorAll(".dot");
      allDots.forEach((d, i) => {
        d.classList.toggle("active", i === this.index);
      });
    }
  };

  const scrollSpy = {
    sections: document.querySelectorAll("section"),
    navLinks: document.querySelectorAll(".nav-link"),

    init() {
      window.addEventListener("scroll", () => {
        let current = "";
        this.sections.forEach((sec) => {
          const top = sec.offsetTop - 120;
          if (window.scrollY >= top) {
            current = sec.getAttribute("id");
          }
        });

        this.navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
      });
    }
  };

  const imageModal = {
    modal: document.querySelector("#image-modal"),
    modalImg: document.querySelector("#modal-img"),
    modalCaption: document.querySelector("#modal-caption"),
    btnClose: document.querySelector("#modal-close"),
    
    triggerProfile: document.querySelector(".avatar-circle img"),
    triggerMemories: document.querySelectorAll(".memory-card"),

    init() {
      
      if (this.triggerProfile) {
        this.triggerProfile.addEventListener("click", () => {
          this.open(this.triggerProfile.src, "Wilmer Waldino Osco Vera - Foto de Perfil");
        });
      }

      this.triggerMemories.forEach(card => {
        card.addEventListener("click", () => {
          const img = card.querySelector("img");
          const caption = card.querySelector("figcaption") ? card.querySelector("figcaption").textContent : "";
          if (img) {
            this.open(img.src, caption);
          }
        });
      });
      this.btnClose.addEventListener("click", () => this.close());

      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.modal.classList.contains("active")) {
          this.close();
        }
      });
    },

    open(src, captionText) {
      this.modalImg.src = src;
      this.modalCaption.textContent = captionText;
      this.modal.classList.add("active");
      document.body.style.overflow = "hidden"; 
    },

    close() {
      this.modal.classList.remove("active");
      document.body.style.overflow = "auto";
      setTimeout(() => {
        this.modalImg.src = "";
        this.modalCaption.textContent = "";
      }, 300);
    }
  };

  imageModal.init();

  theme.init();
  menu.init();
  eduTabs.init();
  timeline.init();
  scrollSpy.init();
});