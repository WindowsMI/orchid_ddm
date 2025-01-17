!(function (exports) {
  'use strict';

  const Month = {
    monthGrid: document.getElementById('month-grid'),
    tabButton: document.getElementById('year-tab-button'),
    label: document.getElementById('year-label'),
    grid: document.getElementById('year-grid'),

    init: function () {
      this.createMonths();

      document.addEventListener('localized', this.handleLocalization.bind(this));
      this.tabButton.addEventListener('click', this.handleTabButton.bind(this));
    },

    handleLocalization: function () {
      const langCode =
        L10n.currentLanguage === 'ar'
          ? 'ar-SA'
          : L10n.currentLanguage;
      const dateLabel = new Date().toLocaleDateString(langCode, {
        year: 'numeric'
      });

      this.label.textContent = dateLabel;
    },

    handleTabButton: function () {
      if (Calendar.currentPage === 'month') {
        const currentYearMonth = this.grid.querySelector('.current-month');
        Transitions.scale(this.monthGrid, currentYearMonth);
      }

      Calendar.currentPage = 'year';
    },

    createMonths: function () {
      for (let index = 0; index < 12; index++) {
        const grid = document.createElement('div');
        grid.classList.add('grid');

        const week = document.createElement('div');
        week.classList.add('week');
        grid.appendChild(week);

        ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].forEach((weekDay) => {
          const weekDayElement = document.createElement('span');
          weekDayElement.classList.add('weekday');
          weekDayElement.dataset.l10nId = `monthName-${weekDay}`;
          week.appendChild(weekDayElement);
        });

        const gridBody = document.createElement('div');
        gridBody.classList.add('body');
        grid.appendChild(gridBody);

        const calendarGrid = new MonthCalendarGrid(gridBody, new Date().getFullYear(), index - 1);

        this.grid.appendChild(grid);
      }
    }
  };

  Month.init();

  exports.Month = Month;
})(window);
