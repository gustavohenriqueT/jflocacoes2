document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // ANIMAÇÃO FLUIDA DE SCROLL (INTERSECTION OBSERVER)
    // ==========================================================================
    // Faz com que os elementos surjam suavemente ao rolar a página
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // O elemento aparece quando 15% dele estiver visível
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Remova a barra ('//') da linha de baixo se quiser que anime apenas na primeira vez
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observa todos os elementos com a classe .fade-element
    document.querySelectorAll(".fade-element").forEach(el => {
        scrollObserver.observe(el);
    });

    // ==========================================================================
    // LÓGICA DA FROTA (TABS E AUTOPLAY)
    // ==========================================================================
    const tabButtons = [...document.querySelectorAll(".tab-btn")];
    const tabPanes = [...document.querySelectorAll(".tab-pane")];
    const thumbs = [...document.querySelectorAll(".thumb-item")];
    const interestButton = document.getElementById("fleet-interest");
    let currentIndex = 0;
    let interval;

    const vehicleNames = [
    "Caminhão Toco",
    "Caminhão Toco",
    "Caminhão Pipa",
    "Caminhão Pipa",
    "Caminhão Baú",
    "Caminhão Sider"
    ];

    const vehicleValues = [
    "Caminhão Toco",
    "Caminhão Toco",
    "Caminhão Pipa",
    "Caminhão Pipa",
    "Caminhão Baú",
    "Caminhão Sider"
    ];

    function switchTab(index) {
        if (!tabButtons[index]) return;
        
        // Remove estado 'active' de todos
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabPanes.forEach(pane => pane.classList.remove("active"));
        thumbs.forEach(thumb => thumb.classList.remove("active"));

        // Adiciona estado 'active' no item selecionado
        tabButtons[index].classList.add("active");
        const target = tabButtons[index].dataset.target;
        document.getElementById(`tab-${target}`)?.classList.add("active");
        thumbs[index]?.classList.add("active");
        currentIndex = index;

        // Atualiza o botão de interesse para pré-preencher o formulário
        if (interestButton) {
            interestButton.dataset.vehicle = vehicleValues[index];
            interestButton.textContent = `TENHO INTERESSE — ${vehicleNames[index].toUpperCase()}`;
        }
    }

    // Passador automático das fotos da frota (6.5 segundos)
    function startAutoplay() {
        clearInterval(interval);
        interval = setInterval(() => switchTab((currentIndex + 1) % tabButtons.length), 6500);
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            switchTab(index);
            startAutoplay();
        });
    });

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            switchTab(index);
            startAutoplay();
        });
    });

    // Envia o veículo escolhido para o formulário no clique
    interestButton?.addEventListener("click", () => {
        const vehicle = interestButton.dataset.vehicle || "";
        const select = document.getElementById("veiculo");
        if (select) {
            select.value = vehicle;
            if (!select.value) select.value = "";
        }
    });

    // Inicialização da frota
    switchTab(0);
    startAutoplay();

    // ==========================================================================
    // MENU MOBILE
    // ==========================================================================
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".navbar nav");
    
    menuToggle?.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(open));
    });

    // Fecha o menu mobile ao clicar num link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            nav?.classList.remove("open");
            menuToggle?.setAttribute("aria-expanded", "false");
        });
    });

    // ==========================================================================
    // BOTÕES "TENHO INTERESSE" (Secção Serviços)
    // ==========================================================================
    document.querySelectorAll(".card-link").forEach(link => {
        link.addEventListener("click", () => {
            const service = link.dataset.service;
            const select = document.getElementById("servico");
            if (select && service) select.value = service;
        });
    });

    // ==========================================================================
    // ENVIO DO FORMULÁRIO (VIA AJAX PARA O enviar.php)
    // ==========================================================================
    const form = document.getElementById("form-contato");
    const message = document.getElementById("form-mensagem");

    form?.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede recarregamento da página

        const button = form.querySelector("button[type='submit']");
        const original = button.textContent;
        button.disabled = true;
        button.textContent = "ENVIANDO...";
        message.textContent = "";

        try {
            // Requisição para o arquivo PHP de e-mail (Não modifique se o caminho continuar sendo enviar.php)
            const response = await fetch("enviar.php", {
                method: "POST",
                body: new FormData(form)
            });

            if (!response.ok) throw new Error("Falha no envio");

            message.innerHTML = "<p style='color:#4ade80'>Solicitação enviada com sucesso. Entraremos em contato em breve.</p>";
            form.reset(); // Limpa o formulário após sucesso
        } catch {
            message.innerHTML = "<p style='color:#f87171'>Não foi possível enviar agora. Você pode falar diretamente pelo WhatsApp.</p>";
        } finally {
            button.disabled = false;
            button.textContent = original;
            // Limpa a mensagem após 7 segundos
            setTimeout(() => { message.textContent = ""; }, 7000);
        }
    });
});