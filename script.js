/*
 * JavaScript logic for the wedding invitation website.
 * Handles interactive elements such as the loading screen, countdown timer,
 * gallery generation, love story timeline, RSVP form, guestbook storage,
 * copy to clipboard functionality, WhatsApp sharing, and a simple chat bot.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration object containing all editable data for the invitation.
  const inviteData = {
    couple: {
      bride: {
        name: 'Siska Amelia',
        parents: 'Putri kedua dari Bpk. Wahab & Ibu Entin Kartika',
      },
      groom: {
        name: 'Dimas Aldiansyah',
        parents: 'Putra kedua dari Alm. Bpk. Wahab & Ibu Neneng Rohayati',
      },
    },
    eventDate: '2026-05-30T08:00:00+07:00',
    galleryImages: [
      'assets/images/gallery-1.jpg',
      'assets/images/gallery-2.jpg',
      'assets/images/gallery-3.jpg',
      'assets/images/gallery-4.jpg',
      'assets/images/gallery-5.jpg',
      'assets/images/gallery-6.jpg',
      'assets/images/gallery-7.jpg',
      'assets/images/gallery-8.jpg',
      'assets/images/gallery-9.jpg',
      'assets/images/gallery-10.jpg',
    ],
    loveStory: [
      {
        date: '2019',
        title: 'Pertemuan Pertama',
        description: 'Siska dan Dimas pertama kali bertemu di sebuah acara kampus dan mulai saling mengenal.',
      },
      {
        date: '2022',
        title: 'Lamaran',
        description: 'Dimas melamar Siska dengan penuh cinta dan harapan dihadapan keluarga besar.',
      },
      {
        date: '2026',
        title: 'Pernikahan',
        description: 'Mereka memutuskan untuk mengikat janji suci pernikahan dan membangun keluarga bahagia.',
      },
    ],
    danaNumber: '085314300851',
    contactNumber: '082315640398',
    mapLink: 'https://maps.app.goo.gl/hRDqyxbHkKn1B6dF6',
  };

  // Elements
  const loadingScreen = document.getElementById('loading-screen');
  const openInvitationBtn = document.getElementById('open-invitation');
  const mainContent = document.getElementById('main-content');
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const countdownEl = document.getElementById('countdown');
  const galleryGrid = document.getElementById('gallery-grid');
  const storyList = document.getElementById('story-list');
  const rsvpForm = document.getElementById('rsvp-form');
  const guestbookList = document.getElementById('guestbook-list');
  const copyDanaBtn = document.getElementById('copy-dana');
  const danaNumberEl = document.getElementById('dana-number');
  const shareWhatsappBtn = document.getElementById('share-whatsapp');
  const whatsappFloat = document.getElementById('whatsapp-float');
  // Chat bot elements
  const chatToggle = document.getElementById('chat-toggle');
  const chatClose = document.getElementById('chat-close');
  const chatWindow = document.getElementById('chat-window');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send');

  /* Utility functions */
  // Format a number with leading zeros
  function pad(num) {
    return num.toString().padStart(2, '0');
  }

  // Initialize countdown timer
  function startCountdown() {
    const eventDate = new Date(inviteData.eventDate);
    function updateCountdown() {
      const now = new Date();
      const diff = eventDate - now;
      if (diff <= 0) {
        countdownEl.textContent = 'Hari ini!';
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      countdownEl.innerHTML = `
        <div class="countdown-item"><div class="number">${pad(days)}</div><div class="label">Hari</div></div>
        <div class="countdown-item"><div class="number">${pad(hours)}</div><div class="label">Jam</div></div>
        <div class="countdown-item"><div class="number">${pad(minutes)}</div><div class="label">Menit</div></div>
        <div class="countdown-item"><div class="number">${pad(seconds)}</div><div class="label">Detik</div></div>
      `;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Generate gallery
  function populateGallery() {
    inviteData.galleryImages.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Gallery image';
      galleryGrid.appendChild(img);
    });
  }

  // Populate love story timeline
  function populateLoveStory() {
    inviteData.loveStory.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('story-item');
      li.innerHTML = `<h4>${item.date} - ${item.title}</h4><p>${item.description}</p>`;
      storyList.appendChild(li);
    });
  }

  // Load guestbook from localStorage
  function loadGuestbook() {
    const entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
    guestbookList.innerHTML = '';
    entries.forEach((entry) => {
      addGuestEntryToDOM(entry);
    });
  }

  // Add guest entry to DOM
  function addGuestEntryToDOM(entry) {
    const li = document.createElement('li');
    li.classList.add('guest-entry');
    li.innerHTML = `
      <h4>${entry.name} (${entry.status}, ${entry.count} org)</h4>
      <p>${entry.message}</p>
    `;
    guestbookList.prepend(li);
  }

  // Save guest entry
  function saveGuestEntry(entry) {
    const entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
    entries.push(entry);
    localStorage.setItem('guestbookEntries', JSON.stringify(entries));
  }

  // Handle opening invitation
  openInvitationBtn.addEventListener('click', () => {
    loadingScreen.style.opacity = 0;
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      mainContent.classList.remove('hidden');
    }, 600);
    // Play background music
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
      musicToggle.textContent = '⏸';
    }).catch(() => {
      /* ignore autoplay errors */
    });
  });

  // Music play/pause control
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
        musicToggle.textContent = '⏸';
      }).catch(() => {});
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      musicToggle.textContent = '🎵';
    }
  });

  // Initialize countdown, gallery, love story and guestbook
  startCountdown();
  populateGallery();
  populateLoveStory();
  loadGuestbook();

  // RSVP form submission
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('guest-name').value.trim();
    const message = document.getElementById('guest-message').value.trim();
    const count = document.getElementById('guest-count').value;
    const status = document.getElementById('guest-status').value;
    if (!name || !message) return;
    const entry = { name, message, count, status };
    saveGuestEntry(entry);
    addGuestEntryToDOM(entry);
    rsvpForm.reset();
    alert('Terima kasih atas konfirmasi dan ucapan Anda!');
  });

  // Copy DANA number
  copyDanaBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(inviteData.danaNumber);
      alert('Nomor DANA disalin ke clipboard');
    } catch (err) {
      alert('Gagal menyalin nomor DANA');
    }
  });

  // Share to WhatsApp
  shareWhatsappBtn.addEventListener('click', () => {
    const message = encodeURIComponent(`Assalamualaikum,\nSaya mengundang Anda ke pernikahan Siska & Dimas pada 30 Mei 2026. Silakan buka undangan digital berikut: ${window.location.href}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  });

  // Set WhatsApp floating button link
  whatsappFloat.href = `https://wa.me/${inviteData.contactNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Halo, saya ingin bertanya mengenai undangan pernikahan Siska & Dimas.')}`;

  // Display guest name from URL parameter
  function displayGuestName() {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      const heroSection = document.getElementById('hero');
      const greet = document.createElement('p');
      greet.className = 'pretitle';
      greet.textContent = `Kepada Yth: ${decodeURIComponent(to.replace(/\+/g, ' '))}`;
      heroSection.querySelector('.container').prepend(greet);
    }
  }
  displayGuestName();

  // IntersectionObserver for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .guestbook').forEach((el) => {
    el.classList.add('animate');
    observer.observe(el);
  });

  /* Chat bot logic */
  const botResponses = [
    {
      keywords: ['kapan', 'tanggal'],
      answer: 'Acara akan diadakan pada Sabtu, 30 Mei 2026. Akad pukul 08.00 WIB dan resepsi pukul 09.00 WIB.',
    },
    {
      keywords: ['lokasi', 'dimana', 'di mana', 'maps'],
      answer: 'Lokasi acara di Ds. Pangrumasan, Kp. Bojongsari. Anda dapat membuka Google Maps melalui tombol yang tersedia.',
    },
    {
      keywords: ['akad'],
      answer: 'Akad Nikah dimulai pukul 08.00 WIB dan bertempat di Ds. Pangrumasan, Kp. Bojongsari.',
    },
    {
      keywords: ['resepsi'],
      answer: 'Resepsi dimulai pukul 09.00 WIB dan bertempat di Ds. Pangrumasan, Kp. Bojongsari.',
    },
    {
      keywords: ['amplop', 'dana', 'kiriman'],
      answer: 'Anda dapat mengirim amplop digital melalui DANA ke nomor 085314300851 dan konfirmasi via WhatsApp.',
    },
    {
      keywords: ['hubungi', 'panitia', 'kontak'],
      answer: 'Silakan menghubungi 0823‑1564‑0398 melalui WhatsApp untuk informasi lebih lanjut.',
    },
    {
      keywords: ['maps', 'peta'],
      answer: 'Klik tombol “Buka Google Maps” pada bagian detail acara untuk melihat lokasi.',
    },
  ];

  function botReply(question) {
    const lower = question.toLowerCase();
    for (const item of botResponses) {
      if (item.keywords.some((kw) => lower.includes(kw))) {
        return item.answer;
      }
    }
    return 'Maaf, saya tidak memahami pertanyaan Anda. Silakan tanyakan hal lain seputar acara.';
  }

  function appendMessage(content, sender) {
    const div = document.createElement('div');
    div.className = `chat-message ${sender}`;
    div.textContent = content;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user');
    chatInput.value = '';
    const reply = botReply(text);
    setTimeout(() => {
      appendMessage(reply, 'bot');
    }, 500);
  }

  chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
  });
  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });
  chatSendBtn.addEventListener('click', handleUserMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserMessage();
    }
  });
});