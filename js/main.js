document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ==========================================================================
    // CONTADORES
    // Os números só contam uma vez, quando entram na tela. Sem JavaScript
    // (ou com movimento reduzido) o valor final já está no HTML.
    // ==========================================================================
    const counters = [...document.querySelectorAll("[data-count]")];

    counters.forEach(el => {
        // data-since="2006": calcula os anos até hoje, então o número não envelhece
        if (el.dataset.since) {
            el.dataset.count = String(new Date().getFullYear() - Number(el.dataset.since));
            el.textContent = el.dataset.count;
        }
    });

    function runCounter(el) {
        const target = Number(el.dataset.count);
        const duration = 1400;
        const start = performance.now();
        const tick = now => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = String(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    if (!reduceMotion && "IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                runCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.6 });
        counters.forEach(el => {
            el.textContent = "0";
            counterObserver.observe(el);
        });
    }

    // ==========================================================================
    // MENU MOBILE
    // ==========================================================================
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".navbar nav");

    function closeMenu() {
        nav?.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
    }

    menuToggle?.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });

    // ==========================================================================
    // BOTÕES QUE PRÉ-PREENCHEM O FORMULÁRIO
    // ==========================================================================
    const selectServico = document.getElementById("servico");
    const selectVeiculo = document.getElementById("veiculo");

    document.querySelectorAll("[data-service]").forEach(link => {
        link.addEventListener("click", () => {
            if (selectServico && link.dataset.service) selectServico.value = link.dataset.service;
        });
    });

    // "Solicitar este veículo" escolhe a locação e o veículo
    document.querySelectorAll("[data-vehicle]").forEach(link => {
        link.addEventListener("click", () => {
            if (selectServico) selectServico.value = "Locação de Caminhões";
            if (selectVeiculo) {
                selectVeiculo.value = link.dataset.vehicle || "";
                if (!selectVeiculo.value) selectVeiculo.value = "";
            }
        });
    });

    // ==========================================================================
    // ENVIO DO FORMULÁRIO (abre o WhatsApp com os dados preenchidos)
    // ==========================================================================
    const WHATSAPP_NUMERO = "5511993648272"; // DDI + DDD + número, só dígitos

    const form = document.getElementById("form-contato");
    const message = document.getElementById("form-mensagem");

    form?.addEventListener("submit", (event) => {
        event.preventDefault();

        const dados = new FormData(form);
        const campo = (nome) => (dados.get(nome) || "").toString().trim();

        // Linha só aparece se o campo foi preenchido
        const opcional = (rotulo, nome) => campo(nome) ? `*${rotulo}:* ${campo(nome)}` : null;

        const linhas = [
            "Olá, gostaria de solicitar um orçamento!",
            "",
            `*Nome:* ${campo("nome")}`,
            opcional("Empresa", "empresa"),
            `*Telefone/WhatsApp:* ${campo("telefone")}`,
            opcional("E-mail", "email"),
            `*Serviço:* ${campo("servico")}`,
            opcional("Veículo", "veiculo"),
            opcional("Origem", "origem"),
            opcional("Destino", "destino"),
            opcional("Período/frequência", "periodo"),
            "",
            "*Detalhes da operação:*",
            campo("mensagem")
        ].filter(linha => linha !== null);

        const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(linhas.join("\n"))}`;

        const janela = window.open(url, "_blank");
        if (janela) janela.opener = null;
        else window.location.href = url;

        message.textContent = "Abrindo o WhatsApp com a sua solicitação...";
        message.classList.add("is-ok");
        form.reset();
        setTimeout(() => { message.textContent = ""; message.classList.remove("is-ok"); }, 7000);
    });
});
