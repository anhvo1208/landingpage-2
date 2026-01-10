// HR Dashboard - Debug Version
console.log('=== DASHBOARD SCRIPT START ===');

// Check Chart.js
console.log('Chart.js available?', typeof Chart !== 'undefined');

// Data
const DATA = {
  timeline: [{m:'14-01',h:13,l:3,c:1168},{m:'14-02',h:15,l:1,c:1182},{m:'14-03',h:16,l:3,c:1195},{m:'14-04',h:17,l:5,c:1207},{m:'14-05',h:15,l:2,c:1220},{m:'14-06',h:16,l:5,c:1231},{m:'14-07',h:14,l:4,c:1241},{m:'14-08',h:16,l:5,c:1252},{m:'14-09',h:12,l:8,c:1256},{m:'14-10',h:20,l:10,c:1266},{m:'14-11',h:13,l:11,c:1268},{m:'14-12',h:19,l:14,c:1273},{m:'15-01',h:11,l:17,c:1267},{m:'15-02',h:15,l:20,c:1262},{m:'15-03',h:17,l:19,c:1260},{m:'15-04',h:17,l:20,c:1257},{m:'15-05',h:13,l:20,c:1250},{m:'15-06',h:17,l:17,c:1250},{m:'15-07',h:13,l:8,c:1255},{m:'15-08',h:14,l:5,c:1264},{m:'15-09',h:14,l:2,c:1276},{m:'15-10',h:17,l:1,c:1292},{m:'15-11',h:12,l:0,c:1304},{m:'15-12',h:17,l:0,c:1321},{m:'16-01',h:12,l:0,c:1333},{m:'16-02',h:14,l:0,c:1347},{m:'16-03',h:15,l:0,c:1362},{m:'16-04',h:14,l:0,c:1376},{m:'16-05',h:14,l:0,c:1390},{m:'16-06',h:16,l:0,c:1406},{m:'16-07',h:13,l:0,c:1419},{m:'16-08',h:14,l:0,c:1433},{m:'16-09',h:13,l:0,c:1446},{m:'16-10',h:13,l:0,c:1459},{m:'16-11',h:8,l:0,c:1467},{m:'16-12',h:3,l:0,c:1470}],
  depts: [{n:'Sales',t:446,l:92,r:20.63},{n:'R&D',t:961,l:133,r:13.84},{n:'HR',t:63,l:12,r:19.05}]
};

const C = {p:'#00d4ff',s:'#ff006e',a:'#ffbe0b',g:'#06ffa5',w:'#ff9f1c',txt:'#e0e7ff',muted:'#8b93b8',border:'#1e2447'};

let charts = {};
let currentPage = 1;

function safe_destroy(id) {
  if (charts[id]) {
    try {
      charts[id].destroy();
      console.log('Destroyed chart:', id);
    } catch(e) {
      console.warn('Destroy error:', e);
    }
    delete charts[id];
  }
}

function make_chart(id, type, labels, datasets) {
  console.log('Creating chart:', id, 'type:', type);
  
  safe_destroy(id);
  
  const canvas = document.getElementById(id);
  if (!canvas) {
    console.error('Canvas not found:', id);
    return;
  }
  
  console.log('Canvas found:', id, 'size:', canvas.width, 'x', canvas.height);
  
  try {
    const ctx = canvas.getContext('2d');
    
    const config = {
      type: type,
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: C.txt,
              font: { size: 11 }
            }
          }
        }
      }
    };
    
    if (type !== 'doughnut') {
      config.options.scales = {
        x: { ticks: { color: C.muted }, grid: { color: C.border } },
        y: { ticks: { color: C.muted }, grid: { color: C.border } }
      };
    }
    
    charts[id] = new Chart(ctx, config);
    console.log('✓ Chart created successfully:', id);
    
  } catch(e) {
    console.error('Chart creation error:', id, e);
  }
}

function render_page_1() {
  console.log('>>> RENDERING PAGE 1 <<<');
  
  const t = DATA.timeline.slice(-24);
  
  // Chart 1: Line
  make_chart('chart1', 'line',
    t.map(x => x.m),
    [
      {
        label: 'Headcount',
        data: t.map(x => x.c),
        borderColor: C.p,
        backgroundColor: C.p + '30',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Attrition',
        data: t.map(x => x.l),
        borderColor: C.s,
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ]
  );
  
  // Chart 2: Bar
  make_chart('chart2', 'bar',
    DATA.depts.map(x => x.n),
    [{
      label: 'Attrition %',
      data: DATA.depts.map(x => x.r),
      backgroundColor: C.s
    }]
  );
  
  console.log('Page 1 rendered');
}

function switch_page(page_num) {
  console.log('Switching to page:', page_num);
  currentPage = page_num;
  
  // Update nav pills
  document.querySelectorAll('.nav-pill').forEach((pill, i) => {
    if (i + 1 === page_num) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
  
  // Show/hide pages
  document.querySelectorAll('.page').forEach(page => {
    const pageAttr = page.getAttribute('data-page');
    if (pageAttr == page_num) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });
  
  // Render after delay
  setTimeout(() => {
    if (page_num === 1) render_page_1();
    // Add other pages here
  }, 150);
}

function handle_filter_change(e) {
  const selected = e.target.value;
  console.log('Filter changed to:', selected);
  
  // Re-render current page with filtered data
  switch_page(currentPage);
}

// Initialize
window.addEventListener('load', function() {
  console.log('=== WINDOW LOADED ===');
  console.log('Chart.js available?', typeof Chart !== 'undefined');
  
  // Wait for Chart.js
  if (typeof Chart === 'undefined') {
    console.error('Chart.js NOT LOADED!');
    alert('Chart.js failed to load. Check internet connection.');
    return;
  }
  
  // Setup nav pills
  document.querySelectorAll('.nav-pill').forEach((pill, i) => {
    pill.addEventListener('click', () => {
      console.log('Nav pill clicked:', i + 1);
      switch_page(i + 1);
    });
  });
  
  // Setup filter
  const filter = document.getElementById('deptFilter');
  if (filter) {
    filter.addEventListener('change', handle_filter_change);
    console.log('Filter initialized');
  } else {
    console.error('Filter element not found!');
  }
  
  // Setup KPI clicks
  document.addEventListener('click', function(e) {
    const card = e.target.closest('[data-goto]');
    if (card) {
      const goto = parseInt(card.getAttribute('data-goto'));
      console.log('KPI card clicked, goto page:', goto);
      switch_page(goto);
    }
  });
  
  // Initial render
  setTimeout(() => {
    console.log('Starting initial render...');
    render_page_1();
  }, 500);
  
  console.log('=== INITIALIZATION COMPLETE ===');
});

console.log('=== DASHBOARD SCRIPT LOADED ===');
