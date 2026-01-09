// HR Dashboard - Fixed Version
console.log('Dashboard initializing...');

// Data
const DATA = {
  all: {
    timeline: [{m:'14-01',h:13,l:3,c:1168},{m:'14-02',h:15,l:1,c:1182},{m:'14-03',h:16,l:3,c:1195},{m:'14-04',h:17,l:5,c:1207},{m:'14-05',h:15,l:2,c:1220},{m:'14-06',h:16,l:5,c:1231},{m:'14-07',h:14,l:4,c:1241},{m:'14-08',h:16,l:5,c:1252},{m:'14-09',h:12,l:8,c:1256},{m:'14-10',h:20,l:10,c:1266},{m:'14-11',h:13,l:11,c:1268},{m:'14-12',h:19,l:14,c:1273},{m:'15-01',h:11,l:17,c:1267},{m:'15-02',h:15,l:20,c:1262},{m:'15-03',h:17,l:19,c:1260},{m:'15-04',h:17,l:20,c:1257},{m:'15-05',h:13,l:20,c:1250},{m:'15-06',h:17,l:17,c:1250},{m:'15-07',h:13,l:8,c:1255},{m:'15-08',h:14,l:5,c:1264},{m:'15-09',h:14,l:2,c:1276},{m:'15-10',h:17,l:1,c:1292},{m:'15-11',h:12,l:0,c:1304},{m:'15-12',h:17,l:0,c:1321},{m:'16-01',h:12,l:0,c:1333},{m:'16-02',h:14,l:0,c:1347},{m:'16-03',h:15,l:0,c:1362},{m:'16-04',h:14,l:0,c:1376},{m:'16-05',h:14,l:0,c:1390},{m:'16-06',h:16,l:0,c:1406},{m:'16-07',h:13,l:0,c:1419},{m:'16-08',h:14,l:0,c:1433},{m:'16-09',h:13,l:0,c:1446},{m:'16-10',h:13,l:0,c:1459},{m:'16-11',h:8,l:0,c:1467},{m:'16-12',h:3,l:0,c:1470}],
    depts: [{n:'Sales',t:446,l:92,r:20.63},{n:'R&D',t:961,l:133,r:13.84},{n:'HR',t:63,l:12,r:19.05}],
    levels: {Sales:[133,200,69,37,7],RD:[82,534,218,106,21],HR:[12,34,9,5,3]},
    gender: {Male:882,Female:588},
    age: {'<30':331,'30-40':617,'40-50':342,'50+':180},
    sat: [{d:'Sales',j:2.66,e:2.65,w:2.73},{d:'R&D',j:2.75,e:2.74,w:2.77},{d:'HR',j:2.81,e:2.75,w:2.73}],
    tth: [{d:'Sales',t:17.7},{d:'R&D',t:17.8},{d:'HR',t:18.6}]
  }
};

const C = {p:'#00d4ff',s:'#ff006e',a:'#ffbe0b',g:'#06ffa5',w:'#ff9f1c',bg:'#0a0e27',card:'#141937',txt:'#e0e7ff',muted:'#8b93b8',border:'#1e2447'};

// Global state
let charts = {};
let currentPage = 1;
let selectedDept = 'All';
let isRendering = false;

// Kill chart safely
function destroyChart(id) {
  if (charts[id]) {
    try {
      charts[id].destroy();
    } catch(e) {
      console.warn('Chart destroy error:', id);
    }
    delete charts[id];
  }
}

// Create chart with error handling
function createChart(id, config) {
  if (isRendering) return;
  
  destroyChart(id);
  
  const canvas = document.getElementById(id);
  if (!canvas) {
    console.error('Canvas not found:', id);
    return;
  }
  
  try {
    const ctx = canvas.getContext('2d');
    charts[id] = new Chart(ctx, config);
    console.log('Chart created:', id);
  } catch(e) {
    console.error('Chart creation error:', id, e);
  }
}

// Chart defaults
const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {labels: {color: C.txt, font: {family: 'Exo 2', size: 10}}},
    tooltip: {backgroundColor: C.card, titleColor: C.txt, bodyColor: C.txt, borderColor: C.border, borderWidth: 1}
  },
  scales: {
    x: {ticks: {color: C.muted, font: {size: 9}}, grid: {color: C.border}},
    y: {ticks: {color: C.muted, font: {size: 9}}, grid: {color: C.border}}
  }
};

// Generate KPI HTML
function kpiHTML(icon, title, value, sub, color, page) {
  const svg = {
    users: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
    down: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>',
    clock: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    award: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    dollar: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    brief: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    target: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/></svg>',
    activity: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    up: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>'
  }[icon];
  
  return `<div class="kpi-card" style="border-left:3px solid ${color}" ${page?`data-goto="${page}"`:''}>
    <div class="kpi-icon" style="background:${color}20;color:${color}">${svg}</div>
    <div class="kpi-content">
      <div class="kpi-title">${title}</div>
      <div class="kpi-value" style="color:${color}">${value}</div>
      <div class="kpi-subtitle">${sub}</div>
    </div>
  </div>`;
}

// Render pages
function renderPage1() {
  if (isRendering) return;
  isRendering = true;
  
  console.log('Rendering page 1');
  const d = DATA.all;
  const t = d.timeline.slice(-24);
  
  createChart('chart1', {
    type: 'line',
    data: {
      labels: t.map(x => x.m),
      datasets: [
        {label:'Headcount',data:t.map(x => x.c),borderColor:C.p,backgroundColor:C.p+'20',borderWidth:2,fill:true,tension:0.4},
        {label:'Attrition',data:t.map(x => x.l),borderColor:C.s,borderWidth:2,fill:false,tension:0.4}
      ]
    },
    options: chartDefaults
  });
  
  createChart('chart2', {
    type: 'bar',
    data: {
      labels: d.depts.map(x => x.n),
      datasets: [{label:'Attrition %',data:d.depts.map(x => x.r),backgroundColor:C.s}]
    },
    options: chartDefaults
  });
  
  isRendering = false;
}

function renderPage2() {
  if (isRendering) return;
  isRendering = true;
  
  console.log('Rendering page 2');
  const d = DATA.all;
  const kpis = document.getElementById('kpi-page2');
  if (kpis) {
    kpis.innerHTML = 
      kpiHTML('brief','DEPARTMENTS','3','Business units',C.p) +
      kpiHTML('target','JOB LEVELS','5','Career tiers',C.a) +
      kpiHTML('users','AVERAGE AGE','36.9 yrs','Workforce',C.g) +
      kpiHTML('activity','AVG TENURE','7.0 yrs','Retention',C.w);
  }
  
  const colors = [C.p,C.s,C.a,C.g,C.w];
  const ds = [1,2,3,4,5].map((l,i) => ({
    label:'Level '+l,
    data:[d.levels.Sales[i],d.levels.RD[i],d.levels.HR[i]],
    backgroundColor:colors[i]
  }));
  
  createChart('chart3', {
    type: 'bar',
    data: {labels:['Sales','R&D','HR'], datasets:ds},
    options: chartDefaults
  });
  
  createChart('chart4', {
    type: 'doughnut',
    data: {
      labels:['Male','Female'],
      datasets:[{data:[d.gender.Male,d.gender.Female],backgroundColor:[C.p,C.s]}]
    },
    options: {responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:C.txt}}}}
  });
  
  createChart('chart5', {
    type: 'bar',
    data: {
      labels:Object.keys(d.age),
      datasets:[{label:'Count',data:Object.values(d.age),backgroundColor:C.a}]
    },
    options: chartDefaults
  });
  
  isRendering = false;
}

function renderPage3() {
  if (isRendering) return;
  isRendering = true;
  
  console.log('Rendering page 3');
  const d = DATA.all;
  const kpis = document.getElementById('kpi-page3');
  if (kpis) {
    kpis.innerHTML =
      kpiHTML('down','ATTRITION RATE','16.12%','Overall',C.s) +
      kpiHTML('users','TOTAL LEAVERS','237','12-month',C.w) +
      kpiHTML('activity','HIGHEST RISK','Sales','20.63%',C.s) +
      kpiHTML('target','TARGET','85%','Current: 83.88%',C.g);
  }
  
  createChart('chart6', {
    type: 'bar',
    data: {
      labels: d.depts.map(x => x.n),
      datasets: [
        {label:'Leavers',data:d.depts.map(x => x.l),backgroundColor:C.s},
        {label:'Total',data:d.depts.map(x => x.t),backgroundColor:C.p+'40'}
      ]
    },
    options: chartDefaults
  });
  
  const t = d.timeline.slice(-24);
  createChart('chart7', {
    type: 'line',
    data: {
      labels: t.map(x => x.m),
      datasets: [
        {label:'Hires',data:t.map(x => x.h),borderColor:C.g,backgroundColor:C.g+'20',borderWidth:2,fill:true,tension:0.4},
        {label:'Leavers',data:t.map(x => x.l),borderColor:C.s,backgroundColor:C.s+'20',borderWidth:2,fill:true,tension:0.4}
      ]
    },
    options: chartDefaults
  });
  
  isRendering = false;
}

function renderPage4() {
  if (isRendering) return;
  isRendering = true;
  
  console.log('Rendering page 4');
  const d = DATA.all;
  const kpis = document.getElementById('kpi-page4');
  if (kpis) {
    kpis.innerHTML =
      kpiHTML('award','JOB SATISFACTION','2.73','Out of 4.0',C.g) +
      kpiHTML('activity','ENVIRONMENT','2.72','Workplace',C.p) +
      kpiHTML('target','WORK-LIFE','2.76','Balance',C.a) +
      kpiHTML('up','HIGH PERFORMERS','15%','Rating 4/4',C.w);
  }
  
  createChart('chart8', {
    type: 'bar',
    data: {
      labels: d.sat.map(x => x.d),
      datasets: [
        {label:'Job Sat.',data:d.sat.map(x => x.j),backgroundColor:C.g},
        {label:'Env Sat.',data:d.sat.map(x => x.e),backgroundColor:C.p},
        {label:'Work-Life',data:d.sat.map(x => x.w),backgroundColor:C.a}
      ]
    },
    options: chartDefaults
  });
  
  const scatter = Array.from({length:100},()=>({x:Math.random()*1.5+2.5,y:Math.random()*4+1}));
  createChart('chart9', {
    type: 'scatter',
    data: {datasets:[{label:'Employees',data:scatter,backgroundColor:C.p+'99'}]},
    options: {
      responsive:true,
      maintainAspectRatio:false,
      plugins:{legend:{labels:{color:C.txt}},tooltip:{backgroundColor:C.card,titleColor:C.txt,bodyColor:C.txt}},
      scales:{
        x:{type:'linear',title:{display:true,text:'Performance',color:C.txt},ticks:{color:C.muted},grid:{color:C.border},min:2.5,max:4.5},
        y:{title:{display:true,text:'Satisfaction',color:C.txt},ticks:{color:C.muted},grid:{color:C.border},min:0,max:5}
      }
    }
  });
  
  isRendering = false;
}

function renderPage5() {
  if (isRendering) return;
  isRendering = true;
  
  console.log('Rendering page 5');
  const d = DATA.all;
  const kpis = document.getElementById('kpi-page5');
  if (kpis) {
    kpis.innerHTML =
      kpiHTML('up','TOTAL HIRES','1,470','All-time',C.g) +
      kpiHTML('down','TOTAL LEAVERS','237','Cumulative',C.s) +
      kpiHTML('users','NET HC CHANGE','+1,233','Growth',C.p) +
      kpiHTML('clock','TIME TO HIRE','17.8 days','Speed',C.a);
  }
  
  const t = d.timeline.slice(-36);
  createChart('chart10', {
    type: 'line',
    data: {
      labels: t.map(x => x.m),
      datasets: [
        {label:'Hires',data:t.map(x => x.h),borderColor:C.g,backgroundColor:C.g+'40',borderWidth:2,fill:true,tension:0.4},
        {label:'Leavers',data:t.map(x => x.l),borderColor:C.s,borderWidth:2,fill:false,tension:0.4}
      ]
    },
    options: chartDefaults
  });
  
  createChart('chart11', {
    type: 'bar',
    data: {
      labels: d.tth.map(x => x.d),
      datasets: [{label:'Days',data:d.tth.map(x => x.t),backgroundColor:C.a}]
    },
    options: chartDefaults
  });
  
  isRendering = false;
}

// Page navigation
function switchPage(pageNum) {
  console.log('Switching to page', pageNum);
  currentPage = pageNum;
  
  // Update pills
  document.querySelectorAll('.nav-pill').forEach((pill, i) => {
    pill.classList.toggle('active', i+1 === pageNum);
  });
  
  // Show/hide pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.toggle('active', page.getAttribute('data-page') == pageNum);
  });
  
  // Render charts after delay
  setTimeout(() => {
    [null, renderPage1, renderPage2, renderPage3, renderPage4, renderPage5][pageNum]?.();
  }, 100);
  
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// Event handlers
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');
  
  // Nav pills
  document.querySelectorAll('.nav-pill').forEach((pill, i) => {
    pill.addEventListener('click', () => switchPage(i + 1));
  });
  
  // Filter
  document.getElementById('deptFilter')?.addEventListener('change', (e) => {
    selectedDept = e.target.value;
    console.log('Filter changed:', selectedDept);
    switchPage(currentPage);
  });
  
  // KPI click navigation
  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-goto]');
    if (card) {
      const page = parseInt(card.getAttribute('data-goto'));
      switchPage(page);
    }
  });
  
  // Initial render
  setTimeout(() => {
    renderPage1();
    console.log('Dashboard ready!');
  }, 500);
});

console.log('Dashboard script loaded');
