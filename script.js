// --- Internationalization ---
const translations = {
    en: {
      headerTitle: "Annual Leave Optimizer",
      selectCountry: "Select Country:",
      leaveDaysAvailable: "Number of Leave Days Available:",
      leaveYearStart: "Leave Year Start (DD-MM-YYYY):",
      offDays: "Select Your Regular Off Days:",
      optimizeLeave: "Optimize my Leave !",
      advertisement: "Advertisement",
      footerText: "&copy; 2025 Annual Leave Optimizer. All rights reserved.",
      summaryTemplate: "Optimized leave days used: {used}. Leave days remaining for personal use: {remaining}."
    },
    fr: {
      headerTitle: "Optimiseur de Congés Annuels",
      selectCountry: "Sélectionnez un pays:",
      leaveDaysAvailable: "Nombre de jours de congé disponibles:",
      leaveYearStart: "Début de l'année de congé (JJ-MM-AAAA):",
      offDays: "Sélectionnez vos jours de repos habituels:",
      optimizeLeave: "Optimiser mes congés !",
      advertisement: "Publicité",
      footerText: "&copy; 2025 Optimiseur de Congés Annuels. Tous droits réservés.",
      summaryTemplate: "Jours de congé optimisés utilisés: {used}. Jours restants pour usage personnel: {remaining}."
    },
    es: {
      headerTitle: "Optimizador de Vacaciones Anuales",
      selectCountry: "Selecciona un país:",
      leaveDaysAvailable: "Número de días de vacaciones disponibles:",
      leaveYearStart: "Inicio del año de vacaciones (DD-MM-AAAA):",
      offDays: "Selecciona tus días de descanso habituales:",
      optimizeLeave: "Optimizar mis Vacaciones !",
      advertisement: "Publicidad",
      footerText: "&copy; 2025 Optimizador de Vacaciones Anuales. Todos los derechos reservados.",
      summaryTemplate: "Días de vacaciones optimizados usados: {used}. Días restantes para uso personal: {remaining}."
    },
    de: {
      headerTitle: "Urlaubsoptimierer",
      selectCountry: "Land auswählen:",
      leaveDaysAvailable: "Verfügbare Urlaubstage:",
      leaveYearStart: "Beginn des Urlaubsjahres (TT-MM-JJJJ):",
      offDays: "Wählen Sie Ihre regulären freien Tage:",
      optimizeLeave: "Meinen Urlaub optimieren!",
      advertisement: "Werbung",
      footerText: "&copy; 2025 Urlaubsoptimierer. Alle Rechte vorbehalten.",
      summaryTemplate: "Optimierte Urlaubstage verwendet: {used}. Verbleibende Urlaubstage für persönliche Nutzung: {remaining}."
    },
    it: {
      headerTitle: "Ottimizzatore di Ferie Annuali",
      selectCountry: "Seleziona Paese:",
      leaveDaysAvailable: "Numero di giorni di ferie disponibili:",
      leaveYearStart: "Inizio dell'anno ferie (GG-MM-AAAA):",
      offDays: "Seleziona i tuoi giorni di riposo abituali:",
      optimizeLeave: "Ottimizza le mie Ferie!",
      advertisement: "Pubblicità",
      footerText: "&copy; 2025 Ottimizzatore di Ferie Annuali. Tutti i diritti riservati.",
      summaryTemplate: "Giorni di ferie ottimizzati usati: {used}. Giorni di ferie rimanenti per uso personale: {remaining}."
    },
    pt: {
      headerTitle: "Otimizador de Férias Anuais",
      selectCountry: "Selecione o País:",
      leaveDaysAvailable: "Número de dias de férias disponíveis:",
      leaveYearStart: "Início do Ano de Férias (DD-MM-AAAA):",
      offDays: "Selecione seus dias de folga habituais:",
      optimizeLeave: "Otimizar minhas Férias!",
      advertisement: "Publicidade",
      footerText: "&copy; 2025 Otimizador de Férias Anuais. Todos os direitos reservados.",
      summaryTemplate: "Dias de férias otimizados usados: {used}. Dias restantes para uso pessoal: {remaining}."
    },
    nl: {
      headerTitle: "Jaarlijkse Vakantie-Optimalisator",
      selectCountry: "Selecteer Land:",
      leaveDaysAvailable: "Aantal beschikbare vakantiedagen:",
      leaveYearStart: "Start van het vakantiejaar (DD-MM-YYYY):",
      offDays: "Selecteer je reguliere vrije dagen:",
      optimizeLeave: "Optimaliseer mijn vakantie!",
      advertisement: "Advertentie",
      footerText: "&copy; 2025 Jaarlijkse Vakantie-Optimalisator. Alle rechten voorbehouden.",
      summaryTemplate: "Geoptimaliseerde vakantiedagen gebruikt: {used}. Resterende vakantiedagen voor persoonlijk gebruik: {remaining}."
    }
  };
  
  // Determine language preference from the browser (first two letters)
  const userLang = navigator.language.slice(0, 2);
  const lang = translations[userLang] || translations.en;
  
  // Update text elements according to detected language.
  function applyTranslations() {
    document.getElementById("headerTitle").innerText = lang.headerTitle;
    document.getElementById("labelSelectCountry").innerText = lang.selectCountry;
    document.getElementById("labelLeaveDays").innerText = lang.leaveDaysAvailable;
    document.getElementById("labelLeaveYearStart").innerText = lang.leaveYearStart;
    document.getElementById("labelOffDays").innerText = lang.offDays;
    document.getElementById("optimizeBtn").innerText = lang.optimizeLeave;
    document.getElementById("adTop").innerText = lang.advertisement;
    document.getElementById("adBottom").innerText = lang.advertisement;
    document.getElementById("footerText").innerHTML = lang.footerText;
  }
  
  // Call our translation function on page load.
  document.addEventListener("DOMContentLoaded", applyTranslations);
  
  // Set default date for leaveYearStart input (April 1 of current year)
  document.addEventListener("DOMContentLoaded", () => {
    const leaveYearStartInput = document.getElementById("leaveYearStart");
    const currentYear = new Date().getFullYear();
    // Format YYYY-MM-DD (default to April 1)
    leaveYearStartInput.value = `${currentYear}-04-01`;
  });
  
  // Global variables for monthly calendars and current month index
  let monthlyCalendars = [];
  let currentMonthIndex = 0;
  
  // --- Load Country List ---
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch('https://date.nager.at/api/v3/AvailableCountries');
      const countries = await res.json();
      const select = document.getElementById('countrySelect');
      select.innerHTML = countries
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(country => `<option value="${country.countryCode}">${country.name} (${country.countryCode})</option>`)
        .join('');
      select.prepend(new Option('-- ' + lang.selectCountry + ' --', ''));
    } catch (error) {
      showError('Failed to load country list. Please refresh the page.');
    }
  });
  
  // --- Set Up Button Listener ---
  document.getElementById('optimizeBtn').addEventListener('click', optimizeAnnualLeave);
  
  // --- Main Optimization Function ---
  async function optimizeAnnualLeave() {
    clearError();
    const countryCode = document.getElementById('countrySelect').value;
    if (!countryCode) {
      showError('Please select a country.');
      return;
    }
    
    const leaveDaysInput = parseInt(document.getElementById('leaveDaysInput').value, 10);
    if (isNaN(leaveDaysInput) || leaveDaysInput < 0) {
      showError('Please enter a valid number of leave days.');
      return;
    }
    
    // Get the leave year start from input and compute leave year end.
    const leaveYearStartInput = document.getElementById('leaveYearStart').value;
    let leaveYearStart = new Date(leaveYearStartInput);
    let leaveYearEnd = new Date(leaveYearStart);
    leaveYearEnd.setFullYear(leaveYearEnd.getFullYear() + 1);
    leaveYearEnd.setDate(leaveYearEnd.getDate() - 1);
    
    // Determine effective start: max(today, leaveYearStart)
    const today = new Date();
    let effectiveStart = today > leaveYearStart ? today : leaveYearStart;
    if (effectiveStart > leaveYearEnd) {
      showError('The leave period has already ended.');
      return;
    }
    
    // Read off-day settings.
    const offDayCheckboxes = document.querySelectorAll('.offDayCheckbox');
    const offDaysSet = new Set();
    offDayCheckboxes.forEach(cb => {
      if (cb.checked) {
        offDaysSet.add(parseInt(cb.value, 10));
      }
    });
    
    // --- Fetch Public Holidays for Relevant Years ---
    let holidaysArray = [];
    const startYear = effectiveStart.getFullYear();
    const endYear = leaveYearEnd.getFullYear();
    try {
      for (let yr = startYear; yr <= endYear; yr++) {
        const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${yr}/${countryCode}`);
        if (res.ok) {
          const yrHolidays = await res.json();
          holidaysArray = holidaysArray.concat(yrHolidays);
        }
      }
    } catch (error) {
      showError('Failed to fetch holidays.');
      return;
    }
    
    // Map holidays by date (YYYY-MM-DD)
    const holidaysMap = {};
    holidaysArray.forEach(holiday => {
      holidaysMap[holiday.date] = holiday;
    });
    
    // --- Generate Days Array for the Effective Leave Period ---
    let days = generatePeriodDays(effectiveStart, leaveYearEnd, offDaysSet, holidaysMap);
    days.forEach(day => day.origStatus = day.status);
    
    // --- Optimize Leave Gaps ---
    const initialLeave = leaveDaysInput;
    let leaveDaysUsed = optimizeLeaveGaps(days, leaveDaysInput);
    let leaveDaysRemaining = initialLeave - leaveDaysUsed;
    
    // --- Override Christmas Bridge ---
    const extraUsed = overrideChristmasBridges(days, leaveDaysRemaining);
    leaveDaysUsed += extraUsed;
    leaveDaysRemaining = initialLeave - leaveDaysUsed;
    
    // --- Generate Monthly Calendars for the Period ---
    monthlyCalendars = generateMonthlyCalendars(days);
    if (monthlyCalendars.length === 0) {
      showError('No days available in the specified leave period.');
      return;
    }
    // Open on the current month if available.
    const now = new Date();
    currentMonthIndex = monthlyCalendars.findIndex(m => m.year === now.getFullYear() && m.month === now.getMonth());
    if (currentMonthIndex < 0) currentMonthIndex = 0;
    renderCurrentMonth();
    
    // Show month navigation.
    document.getElementById('monthNav').classList.remove('hidden');
    
    // Update summary using our translation template.
    document.getElementById('summary').innerText = lang.summaryTemplate
      .replace("{used}", leaveDaysUsed)
      .replace("{remaining}", leaveDaysRemaining);
    
    // Set up tooltip events.
    setupTooltips();
  }
  
  // --- Generate Days for a Given Period ---
  function generatePeriodDays(startDate, endDate, offDaysSet, holidays) {
    let days = [];
    let date = new Date(startDate);
    while (date <= endDate) {
      const dateStr = date.toISOString().split('T')[0];
      const dayOfWeek = date.getDay();
      const holiday = holidays[dateStr];
      const isHoliday = holiday !== undefined;
      const isDefaultOff = offDaysSet.has(dayOfWeek);
      let status;
      if (isHoliday) {
        status = 'holiday';
      } else if (isDefaultOff) {
        status = 'off';
      } else {
        status = 'work';
      }
      days.push({
        date: new Date(date),
        dateStr,
        dayOfWeek,
        status,
        holidayName: isHoliday ? (holiday.localName || holiday.name) : null
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  
  // --- Optimize Leave Gaps ---
  function optimizeLeaveGaps(days, availableLeaveDays) {
    let leaveDaysUsed = 0;
    let restIndices = [];
    for (let i = 0; i < days.length; i++) {
      if (days[i].origStatus === 'holiday' || days[i].origStatus === 'off') {
        restIndices.push(i);
      }
    }
    
    let gaps = [];
    for (let i = 0; i < restIndices.length - 1; i++) {
      const r1 = restIndices[i];
      const r2 = restIndices[i + 1];
      const gapLength = r2 - r1 - 1;
      if (gapLength > 0 && (days[r1].origStatus === 'holiday' || days[r2].origStatus === 'holiday')) {
        const midIndex = Math.floor((r1 + r2) / 2);
        const midMonth = days[midIndex].date.getMonth();
        let cost = gapLength;
        if (midMonth === 6 || midMonth === 7) { // July/August penalty.
          cost += 0.5;
        }
        gaps.push({ start: r1, end: r2, gapLength, cost });
      }
    }
    
    gaps.sort((a, b) => a.cost - b.cost);
    
    for (const gap of gaps) {
      if (availableLeaveDays >= gap.gapLength) {
        for (let j = gap.start + 1; j < gap.end; j++) {
          if (days[j].status === 'work') {
            days[j].status = 'leave';
            leaveDaysUsed++;
            availableLeaveDays--;
          }
        }
      }
    }
    return leaveDaysUsed;
  }
  
  // --- Override Christmas Bridge ---
  function overrideChristmasBridges(days, availableLeaveDays) {
    let extraUsed = 0;
    days.forEach((day, index) => {
      const month = day.date.getMonth();
      const d = day.date.getDate();
      if (month === 11 && (d === 24 || d === 25)) {
        if (day.status === 'work' && availableLeaveDays > 0) {
          let leftRest = false, rightRest = false;
          if (index > 0) {
            const left = days[index - 1].status;
            if (left === 'holiday' || left === 'off' || left === 'leave') leftRest = true;
          }
          if (index < days.length - 1) {
            const right = days[index + 1].status;
            if (right === 'holiday' || right === 'off' || right === 'leave') rightRest = true;
          }
          if (leftRest || rightRest) {
            day.status = 'leave';
            extraUsed++;
            availableLeaveDays--;
          }
        }
      }
    });
    return extraUsed;
  }
  
  // --- Generate Monthly Calendars ---
  function generateMonthlyCalendars(days) {
    const monthsMap = {};
    days.forEach(day => {
      const year = day.date.getFullYear();
      const month = day.date.getMonth();
      const key = `${year}-${month}`;
      if (!monthsMap[key]) monthsMap[key] = [];
      monthsMap[key].push(day);
    });
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const calendars = [];
    for (const key in monthsMap) {
      const parts = key.split('-');
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      const monthDays = monthsMap[key];
      let html = `<div class="grid grid-cols-7 gap-1 text-center">`;
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      weekdays.forEach(w => {
        html += `<div class="font-bold">${w}</div>`;
      });
      const firstDayOfWeek = monthDays[0].date.getDay();
      for (let i = 0; i < firstDayOfWeek; i++) {
        html += `<div class="p-2"></div>`;
      }
      monthDays.forEach(day => {
        let bgColor = 'bg-white';
        if (day.status === 'holiday') {
          bgColor = 'bg-blue-300';
        } else if (day.status === 'off') {
          bgColor = 'bg-green-300';
        } else if (day.status === 'leave') {
          bgColor = 'bg-purple-300';
        }
        let extraAttr = "";
        if (day.status === 'holiday') {
          extraAttr = `class="holiday-cell p-2 border ${bgColor}" data-tooltip="Date: ${day.dateStr} &#10;${day.holidayName}"`;
        } else {
          extraAttr = `class="p-2 border ${bgColor}"`;
        }
        html += `<div ${extraAttr}>
                   ${day.date.getDate()}
                 </div>`;
      });
      html += `</div>`;
      calendars.push({ year, month, name: monthNames[month], days: monthDays, html });
    }
    calendars.sort((a, b) => {
      if (a.year === b.year) {
        return a.month - b.month;
      }
      return a.year - b.year;
    });
    return calendars;
  }
  
  // --- Render Current Month ---
  function renderCurrentMonth() {
    if (!monthlyCalendars.length) return;
    currentMonthIndex = (currentMonthIndex + monthlyCalendars.length) % monthlyCalendars.length;
    const cal = monthlyCalendars[currentMonthIndex];
    document.getElementById('monthTitle').textContent = `${cal.name} ${cal.year}`;
    document.getElementById('calendar').innerHTML = cal.html;
    setupTooltips();
  }
  
  // --- Month Navigation Listeners ---
  document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonthIndex--;
    renderCurrentMonth();
  });
  document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonthIndex++;
    renderCurrentMonth();
  });
  
  // --- Tooltip Setup ---
  function setupTooltips() {
    const tooltip = document.getElementById('tooltip');
    const holidayCells = document.querySelectorAll('.holiday-cell');
    holidayCells.forEach(cell => {
      cell.addEventListener('mouseenter', showTooltip);
      cell.addEventListener('mousemove', moveTooltip);
      cell.addEventListener('mouseleave', hideTooltip);
      cell.addEventListener('click', toggleTooltip);
    });
    
    function showTooltip(e) {
      tooltip.innerHTML = e.currentTarget.getAttribute('data-tooltip');
      tooltip.style.display = 'block';
      moveTooltip(e);
    }
    
    function moveTooltip(e) {
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      let left = e.pageX + 10;
      let top = e.pageY + 10;
      if (left + tooltipWidth > window.innerWidth) {
        left = e.pageX - tooltipWidth - 10;
      }
      if (top + tooltipHeight > window.innerHeight) {
        top = e.pageY - tooltipHeight - 10;
      }
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    }
    
    function hideTooltip() {
      tooltip.style.display = 'none';
    }
    
    function toggleTooltip(e) {
      if (tooltip.style.display === 'block') {
        hideTooltip();
      } else {
        showTooltip(e);
      }
    }
  }
  
  // --- Utility Functions ---
  function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
  }
  
  function clearError() {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }
  