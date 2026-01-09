// HR Dashboard - Simplified Version
console.log('Dashboard script loading...');

// Data
const DATA = {
  timeline: [
    {m:'14-01',h:13,l:3,c:1168},{m:'14-02',h:15,l:1,c:1182},{m:'14-03',h:16,l:3,c:1195},{m:'14-04',h:17,l:5,c:1207},
    {m:'14-05',h:15,l:2,c:1220},{m:'14-06',h:16,l:5,c:1231},{m:'14-07',h:14,l:4,c:1241},{m:'14-08',h:16,l:5,c:1252},
    {m:'14-09',h:12,l:8,c:1256},{m:'14-10',h:20,l:10,c:1266},{m:'14-11',h:13,l:11,c:1268},{m:'14-12',h:19,l:14,c:1273},
    {m:'15-01',h:11,l:17,c:1267},{m:'15-02',h:15,l:20,c:1262},{m:'15-03',h:17,l:19,c:1260},{m:'15-04',h:17,l:20,c:1257},
    {m:'15-05',h:13,l:20,c:1250},{m:'15-06',h:17,l:17,c:1250},{m:'15-07',h:13,l:8,c:1255},{m:'15-08',h:14,l:5,c:1264},
    {m:'15-09',h:14,l:2,c:1276},{m:'15-10',h:17,l:1,c:1292},{m:'15-11',h:12,l:0,c:1304},{m:'15-12',h:17,l:0,c:1321},
    {m:'16-01',h:12,l:0,c:1333},{m:'16-02',h:14,l:0,c:1347},{m:'16-03',h:15,l:0,c:1362},{m:'16-04',h:14,l:0,c:1376},
    {m:'16-05',h:14,l:0,c:1390},{m:'16-06',h:16,l:0,c:1406},{m:'16-07',h:13,l:0,c:1419},{m:'16-08',h:14,l:0,c:1433},
    {m:'16-09',h:13,l:0,c:1446},{m:'16-10',h:13,l:0,c:1459},{m:'16-11',h:8,l:0,c:1467},{m:'16-12',h:3,l:0,c:1470}
  ],
  depts: [
    {name:'Sales',total:446,left:92,rate:20.63},
    {name:'R&D',total:961,left:133,rate:13.84},
    {name:'HR',total:63,left:12,rate:19.05}
  ],
  levels: {
    Sales: [133,200,69,37,7],
    'R&D': [82,534,218,106,21],
    HR: [12,34,9,5,3]
  },
  gender: {Male:882,Female:588},
  age: {'<30':331,'30-40':617,'40-50':342,'50+':180},
  sat: [
    {d:'Sales',j:2.66,e:2.65,w:2.73},
    {d:'R&D',j:2.75,e:2.74,w:2.77},
    {d:'HR',j:2.81,e:2.75,w:2.73}
  ],
  time2hire: [{d:'Sales',t:17.7},{d:'R&D',t:17.8},{d:'HR',t:18.6}]
};

// Colors
const C = {
  p:'#00d4ff',s:'#ff006e',a:'#ffbe0b',g:'#06ffa5',w:'#ff9f1c',
  bg:'#0a0e27',card:'#141937',txt:'#e0e7ff',muted:'#8b93b8',border:'#1e2447'
};

let charts = {};
let currentPage = 1;

// Destroy chart helper
function killChart(id) {
  if (charts[id]) {
    charts[id].destroy();
    delete charts[id];
  }
}

// Create chart
function makeChart(id, type, data, options = {}) {
  killChart(id);
  const canvas = document.getElementById(id);
  if (!canvas) {
    console.error('Canvas not found:', id);
    return;
  }
  
  try {
    const ctx = canvas.getContext('2d');
    const defaultOpts = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {color: C.txt, font: {family: 'Exo 2', size: 12}}
        },
        tooltip: {
          backgroundColor: C.card,
          titleColor: C.txt,
          bodyColor: C.txt,
          borderColor: C.border,
          borderWidth: 1
        }
      }
    };
    
    if (type !== 'doughnut' && type !== 'scatter') {
      defaultOpts.scales = {
        x: {ticks: {color: C.muted}, grid: {color: C.border}},
        y: {ticks: {color: C.muted}, grid: {color: C.border}}
      };
    }
    
    charts[id] = new Chart(ctx, {
      type: type,
      data: data,
      options: {...defaultOpts, ...options}
    });
    console.log('Chart created:', id);
  } catch (e) {
    console.error('Chart error:', id, e);
  }
}

// Page renderers
function renderPage1() {
  console.log('Rendering page 1...');
  const last24 = DATA.timeline.slice(-24);
  
  makeChart('chart1', 'line', {
    labels: last24.map(d => d.m),
    datasets: [
      {
        label: 'Headcount',
        data: last24.map(d => d.c),
        borderColor: C.p,
        backgroundColor: C.p + '20',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Attrition',
        data: last24.map(d => d.l),
        borderColor: C.s,
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ]
  });
  
  makeChart('chart2', 'bar', {
    labels: DATA.depts.map(d => d.name),
    datasets: [{
      label: 'Attrition %',
      data: DATA.depts.map(d => d.rate),
      backgroundColor: C.s
    }]
  });
}

function renderPage2() {
  console.log('Rendering page 2...');
  
  // KPIs
  document.getElementById('kpis2').innerHTML = `
    <div class="kpi-card" style="border-left:3px solid ${C.p}">
      <div class="kpi-icon" style="background:${C.p}20;color:${C.p}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Departments</div>
        <div class="kpi-value" style="color:${C.p}">3</div>
        <div class="kpi-subtitle">Business units</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.a}">
      <div class="kpi-icon" style="background:${C.a}20;color:${C.a}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Job Levels</div>
        <div class="kpi-value" style="color:${C.a}">5</div>
        <div class="kpi-subtitle">Career tiers</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.g}">
      <div class="kpi-icon" style="background:${C.g}20;color:${C.g}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Average Age</div>
        <div class="kpi-value" style="color:${C.g}">36.9 yrs</div>
        <div class="kpi-subtitle">Workforce</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.w}">
      <div class="kpi-icon" style="background:${C.w}20;color:${C.w}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Avg Tenure</div>
        <div class="kpi-value" style="color:${C.w}">7.0 yrs</div>
        <div class="kpi-subtitle">Retention</div>
      </div>
    </div>
  `;
  
  const colors = [C.p,C.s,C.a,C.g,C.w];
  const datasets = [1,2,3,4,5].map((l,i) => ({
    label: 'Level '+l,
    data: [DATA.levels.Sales[i], DATA.levels['R&D'][i], DATA.levels.HR[i]],
    backgroundColor: colors[i]
  }));
  
  makeChart('chart3', 'bar', {
    labels: ['Sales','R&D','HR'],
    datasets: datasets
  });
  
  makeChart('chart4', 'doughnut', {
    labels: ['Male','Female'],
    datasets: [{
      data: [DATA.gender.Male, DATA.gender.Female],
      backgroundColor: [C.p,C.s]
    }]
  });
  
  makeChart('chart5', 'bar', {
    labels: Object.keys(DATA.age),
    datasets: [{
      label: 'Count',
      data: Object.values(DATA.age),
      backgroundColor: C.a
    }]
  });
}

function renderPage3() {
  console.log('Rendering page 3...');
  
  document.getElementById('kpis3').innerHTML = `
    <div class="kpi-card" style="border-left:3px solid ${C.s}">
      <div class="kpi-icon" style="background:${C.s}20;color:${C.s}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Attrition Rate</div>
        <div class="kpi-value" style="color:${C.s}">16.12%</div>
        <div class="kpi-subtitle">Overall</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.w}">
      <div class="kpi-icon" style="background:${C.w}20;color:${C.w}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Total Leavers</div>
        <div class="kpi-value" style="color:${C.w}">237</div>
        <div class="kpi-subtitle">12-month</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.s}">
      <div class="kpi-icon" style="background:${C.s}20;color:${C.s}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Highest Risk</div>
        <div class="kpi-value" style="color:${C.s}">Sales</div>
        <div class="kpi-subtitle">20.63%</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.g}">
      <div class="kpi-icon" style="background:${C.g}20;color:${C.g}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Target</div>
        <div class="kpi-value" style="color:${C.g}">85%</div>
        <div class="kpi-subtitle">Current: 83.88%</div>
      </div>
    </div>
  `;
  
  makeChart('chart6', 'bar', {
    labels: DATA.depts.map(d => d.name),
    datasets: [
      {label:'Leavers',data:DATA.depts.map(d => d.left),backgroundColor:C.s},
      {label:'Total',data:DATA.depts.map(d => d.total),backgroundColor:C.p+'40'}
    ]
  });
  
  const last24 = DATA.timeline.slice(-24);
  makeChart('chart7', 'line', {
    labels: last24.map(d => d.m),
    datasets: [
      {label:'Hires',data:last24.map(d => d.h),borderColor:C.g,backgroundColor:C.g+'20',borderWidth:3,fill:true,tension:0.4},
      {label:'Leavers',data:last24.map(d => d.l),borderColor:C.s,backgroundColor:C.s+'20',borderWidth:3,fill:true,tension:0.4}
    ]
  });
}

function renderPage4() {
  console.log('Rendering page 4...');
  
  document.getElementById('kpis4').innerHTML = `
    <div class="kpi-card" style="border-left:3px solid ${C.g}">
      <div class="kpi-icon" style="background:${C.g}20;color:${C.g}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Job Satisfaction</div>
        <div class="kpi-value" style="color:${C.g}">2.73</div>
        <div class="kpi-subtitle">Out of 4.0</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.p}">
      <div class="kpi-icon" style="background:${C.p}20;color:${C.p}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Environment</div>
        <div class="kpi-value" style="color:${C.p}">2.72</div>
        <div class="kpi-subtitle">Workplace</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.a}">
      <div class="kpi-icon" style="background:${C.a}20;color:${C.a}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Work-Life</div>
        <div class="kpi-value" style="color:${C.a}">2.76</div>
        <div class="kpi-subtitle">Balance</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.w}">
      <div class="kpi-icon" style="background:${C.w}20;color:${C.w}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">High Performers</div>
        <div class="kpi-value" style="color:${C.w}">15%</div>
        <div class="kpi-subtitle">Rating 4/4</div>
      </div>
    </div>
  `;
  
  makeChart('chart8', 'bar', {
    labels: DATA.sat.map(s => s.d),
    datasets: [
      {label:'Job Sat.',data:DATA.sat.map(s => s.j),backgroundColor:C.g},
      {label:'Env Sat.',data:DATA.sat.map(s => s.e),backgroundColor:C.p},
      {label:'Work-Life',data:DATA.sat.map(s => s.w),backgroundColor:C.a}
    ]
  });
  
  const scatter = Array.from({length:100},()=>({x:Math.random()*1.5+2.5,y:Math.random()*4+1}));
  makeChart('chart9', 'scatter', {
    datasets: [{label:'Employees',data:scatter,backgroundColor:C.p+'99'}]
  }, {
    scales: {
      x: {type:'linear',title:{display:true,text:'Performance',color:C.txt},ticks:{color:C.muted},grid:{color:C.border},min:2.5,max:4.5},
      y: {title:{display:true,text:'Satisfaction',color:C.txt},ticks:{color:C.muted},grid:{color:C.border},min:0,max:5}
    }
  });
}

function renderPage5() {
  console.log('Rendering page 5...');
  
  document.getElementById('kpis5').innerHTML = `
    <div class="kpi-card" style="border-left:3px solid ${C.g}">
      <div class="kpi-icon" style="background:${C.g}20;color:${C.g}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Total Hires</div>
        <div class="kpi-value" style="color:${C.g}">1,470</div>
        <div class="kpi-subtitle">All-time</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.s}">
      <div class="kpi-icon" style="background:${C.s}20;color:${C.s}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Total Leavers</div>
        <div class="kpi-value" style="color:${C.s}">237</div>
        <div class="kpi-subtitle">Cumulative</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.p}">
      <div class="kpi-icon" style="background:${C.p}20;color:${C.p}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Net HC Change</div>
        <div class="kpi-value" style="color:${C.p}">+1,233</div>
        <div class="kpi-subtitle">Growth</div>
      </div>
    </div>
    <div class="kpi-card" style="border-left:3px solid ${C.a}">
      <div class="kpi-icon" style="background:${C.a}20;color:${C.a}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">Time to Hire</div>
        <div class="kpi-value" style="color:${C.a}">17.8 days</div>
        <div class="kpi-subtitle">Speed</div>
      </div>
    </div>
  `;
  
  const last36 = DATA.timeline.slice(-36);
  makeChart('chart10', 'line', {
    labels: last36.map(d => d.m),
    datasets: [
      {label:'Hires',data:last36.map(d => d.h),borderColor:C.g,backgroundColor:C.g+'40',borderWidth:3,fill:true,tension:0.4},
      {label:'Leavers',data:last36.map(d => d.l),borderColor:C.s,borderWidth:3,fill:false,tension:0.4}
    ]
  });
  
  makeChart('chart11', 'bar', {
    labels: DATA.time2hire.map(t => t.d),
    datasets: [{label:'Days',data:DATA.time2hire.map(t => t.t),backgroundColor:C.a}]
  });
}

// Navigation
function switchPage(p) {
  console.log('Switching to page', p);
  currentPage = p;
  
  // Update nav
  document.querySelectorAll('.nav-pill').forEach((pill,i) => {
    pill.classList.toggle('active', i+1===p);
  });
  
  // Show/hide pages
  for(let i=1; i<=5; i++) {
    document.getElementById('page'+i).classList.toggle('hidden', i!==p);
  }
  
  // Render
  setTimeout(() => {
    switch(p) {
      case 1: renderPage1(); break;
      case 2: renderPage2(); break;
      case 3: renderPage3(); break;
      case 4: renderPage4(); break;
      case 5: renderPage5(); break;
    }
  }, 100);
  
  window.scrollTo({top:0,behavior:'smooth'});
}

function updateDashboard() {
  switchPage(currentPage);
}

// Init
window.addEventListener('load', () => {
  console.log('Window loaded, initializing dashboard...');
  setTimeout(() => {
    renderPage1();
    console.log('Dashboard ready!');
  }, 300);
});

console.log('Dashboard script loaded successfully');
