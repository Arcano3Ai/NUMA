import { processBotQuery } from './numaBotEngine.js';

export class NumaBotWidget {
  constructor(options = {}) {
    this.onOpenProduct = options.onOpenProduct || (() => {});
    this.onAddToCart = options.onAddToCart || (() => {});
    this.isOpen = false;
    this.messages = [];

    this.initDOM();
    this.bindEvents();
    this.sendInitialGreeting();
    this.startNumberCycle();
  }

  /**
   * Cicla suavemente números sagrados en el launcher del bot
   */
  startNumberCycle() {
    const SACRED_NUMBERS = ['3', '7', '11', '22', '33', '1', '9', '432', '8', '5'];
    let idx = 0;

    setInterval(() => {
      idx = (idx + 1) % SACRED_NUMBERS.length;
      const nextNum = SACRED_NUMBERS[idx];
      const numEl = document.getElementById('numa-bot-cycling-num');
      const badgeEl = document.getElementById('numa-bot-badge');

      if (numEl) {
        numEl.classList.remove('pulse-num');
        void numEl.offsetWidth; // Reflow para reiniciar la animación
        numEl.textContent = nextNum;
        numEl.classList.add('pulse-num');
      }

      if (badgeEl) {
        badgeEl.textContent = `✨ Vibración ${nextNum}`;
      }
    }, 2000);
  }

  /**
   * Construye el DOM del launcher y la ventana flotante
   */
  initDOM() {
    // Si ya existe, no duplicar
    if (document.getElementById('numa-bot-launcher')) return;

    // 1. Launcher Flotante
    const launcher = document.createElement('div');
    launcher.id = 'numa-bot-launcher';
    launcher.className = 'numa-bot-launcher';
    launcher.setAttribute('role', 'button');
    launcher.setAttribute('aria-label', 'Abrir Oráculo NÜMA');
    launcher.innerHTML = `
      <div class="numa-bot-launcher-icon">
        <span class="numa-bot-rotating-number pulse-num" id="numa-bot-cycling-num">3</span>
      </div>
      <div class="numa-bot-launcher-text">
        <span class="numa-bot-launcher-title">Oráculo NÜMA</span>
        <span class="numa-bot-launcher-sub">Frecuencia Sagrada & Asistente</span>
      </div>
      <span class="numa-bot-badge" id="numa-bot-badge">✨ Vibración 3</span>
    `;

    // 2. Ventana de Chat Flotante
    const chatWindow = document.createElement('div');
    chatWindow.id = 'numa-bot-window';
    chatWindow.className = 'numa-bot-window';
    chatWindow.setAttribute('aria-hidden', 'true');
    chatWindow.innerHTML = `
      <header class="numa-bot-header">
        <div class="numa-bot-header-info">
          <div class="numa-bot-avatar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div class="numa-bot-header-titles">
            <h4 class="numa-bot-title">Oráculo NÜMA</h4>
            <div class="numa-bot-status">
              <span class="numa-bot-status-dot"></span>
              <span>Sintonizado en vivo</span>
            </div>
          </div>
        </div>
        <div class="numa-bot-header-actions">
          <button class="numa-bot-btn-icon" id="numa-bot-restart-btn" title="Reiniciar conversación">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
          </button>
          <button class="numa-bot-btn-icon" id="numa-bot-close-btn" title="Cerrar ventana">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <div class="numa-bot-messages" id="numa-bot-messages-list"></div>

      <div class="numa-bot-quick-replies" id="numa-bot-quick-replies"></div>

      <footer class="numa-bot-footer">
        <form class="numa-bot-form" id="numa-bot-form">
          <input
            type="text"
            id="numa-bot-input"
            class="numa-bot-input"
            placeholder="Escribe tu fecha natal o pregúntame por un producto..."
            autocomplete="off"
          />
          <button type="submit" class="numa-bot-send-btn" aria-label="Enviar mensaje">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </footer>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(chatWindow);

    this.launcherEl = launcher;
    this.windowEl = chatWindow;
    this.messagesListEl = document.getElementById('numa-bot-messages-list');
    this.quickRepliesEl = document.getElementById('numa-bot-quick-replies');
    this.formEl = document.getElementById('numa-bot-form');
    this.inputEl = document.getElementById('numa-bot-input');
  }

  /**
   * Vincula los escuchadores de eventos
   */
  bindEvents() {
    this.launcherEl.addEventListener('click', () => this.toggle());

    document.getElementById('numa-bot-close-btn')?.addEventListener('click', () => {
      this.close();
    });

    document.getElementById('numa-bot-restart-btn')?.addEventListener('click', () => {
      this.messagesListEl.innerHTML = '';
      this.sendInitialGreeting();
    });

    this.formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.inputEl.value.trim();
      if (!text) return;
      this.inputEl.value = '';
      this.handleUserMessage(text);
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.windowEl.classList.add('is-open');
    this.windowEl.setAttribute('aria-hidden', 'false');
    this.inputEl.focus();
    this.scrollToBottom();
  }

  close() {
    this.isOpen = false;
    this.windowEl.classList.remove('is-open');
    this.windowEl.setAttribute('aria-hidden', 'true');
  }

  sendInitialGreeting() {
    const greeting = processBotQuery('hola');
    this.appendMessage('bot', greeting.text, greeting.products);
    this.renderQuickReplies(greeting.quickReplies);
  }

  handleUserMessage(text) {
    // 1. Mensaje del usuario
    this.appendMessage('user', text);
    this.renderQuickReplies([]); // Ocultar temporalmente chips

    // 2. Indicador de escritura animado
    this.showTypingIndicator();

    // 3. Procesar consulta con motor local (respuesta tras breve retardo para sensación natural)
    setTimeout(() => {
      this.hideTypingIndicator();
      const result = processBotQuery(text);
      this.appendMessage('bot', result.text, result.products);
      this.renderQuickReplies(result.quickReplies);
    }, 400);
  }

  showTypingIndicator() {
    const typing = document.createElement('div');
    typing.id = 'numa-bot-typing-indicator';
    typing.className = 'numa-bot-msg bot';
    typing.innerHTML = `
      <div class="numa-bot-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    this.messagesListEl.appendChild(typing);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const typing = document.getElementById('numa-bot-typing-indicator');
    if (typing) typing.remove();
  }

  /**
   * Agrega un mensaje a la lista
   */
  appendMessage(role, rawText, products = []) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `numa-bot-msg ${role}`;

    const formattedHtml = this.formatMarkdown(rawText);

    let productsHtml = '';
    if (products && products.length > 0) {
      productsHtml = `
        <div class="numa-bot-products-wrap">
          ${products.map(p => `
            <div class="numa-bot-product-card" data-product-id="${p.id}">
              <img src="${p.image}" alt="${p.name}" class="numa-bot-prod-thumb" onerror="this.src='./assets/images/numa_logo_circle.png'" />
              <div class="numa-bot-prod-details">
                <div class="numa-bot-prod-name" title="${p.name}">${p.name}</div>
                <div class="numa-bot-prod-price">$${p.price} MXN</div>
              </div>
              <button class="numa-bot-prod-action" data-action="view" data-product-id="${p.id}">
                Ver
              </button>
            </div>
          `).join('')}
        </div>
      `;
    }

    msgDiv.innerHTML = `
      <div class="numa-bot-bubble">
        ${formattedHtml}
        ${productsHtml}
      </div>
    `;

    // Vincular clics en las tarjetas de producto
    if (products && products.length > 0) {
      msgDiv.querySelectorAll('.numa-bot-prod-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const prodId = btn.dataset.productId;
          if (prodId) {
            this.onOpenProduct(prodId);
          }
        });
      });

      msgDiv.querySelectorAll('.numa-bot-product-card').forEach(card => {
        card.addEventListener('click', () => {
          const prodId = card.dataset.productId;
          if (prodId) {
            this.onOpenProduct(prodId);
          }
        });
      });
    }

    this.messagesListEl.appendChild(msgDiv);
    this.scrollToBottom();
  }

  /**
   * Renderiza los botones de respuestas rápidas (Chips)
   */
  renderQuickReplies(replies = []) {
    this.quickRepliesEl.innerHTML = '';
    if (!replies || replies.length === 0) return;

    replies.forEach(replyText => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'numa-bot-chip';
      chip.textContent = replyText;
      chip.addEventListener('click', () => {
        this.handleUserMessage(replyText);
      });
      this.quickRepliesEl.appendChild(chip);
    });

    this.scrollToBottom();
  }

  /**
   * Formateador simple de Markdown para las burbujas
   */
  formatMarkdown(text = '') {
    // Escapar tags HTML peligrosos
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Negritas: **texto**
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Cursivas: *texto*
    safe = safe.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Listas con viñeta •
    const lines = safe.split('\n');
    let inList = false;
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('• ')) {
        const itemContent = trimmed.substring(2);
        return `<div style="margin-left: 6px; margin-bottom: 3px;">• ${itemContent}</div>`;
      }
      return trimmed ? `<p>${trimmed}</p>` : '';
    });

    return processedLines.join('');
  }

  scrollToBottom() {
    requestAnimationFrame(() => {
      this.messagesListEl.scrollTop = this.messagesListEl.scrollHeight;
    });
  }
}
