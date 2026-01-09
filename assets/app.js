// HR Dashboard JavaScript - Optimized Version
const D = {
  t: [{m:'14-01',h:13,l:3,c:1168},{m:'14-02',h:15,l:1,c:1182},{m:'14-03',h:16,l:3,c:1195},{m:'14-04',h:17,l:5,c:1207},{m:'14-05',h:15,l:2,c:1220},{m:'14-06',h:16,l:5,c:1231},{m:'14-07',h:14,l:4,c:1241},{m:'14-08',h:16,l:5,c:1252},{m:'14-09',h:12,l:8,c:1256},{m:'14-10',h:20,l:10,c:1266},{m:'14-11',h:13,l:11,c:1268},{m:'14-12',h:19,l:14,c:1273},{m:'15-01',h:11,l:17,c:1267},{m:'15-02',h:15,l:20,c:1262},{m:'15-03',h:17,l:19,c:1260},{m:'15-04',h:17,l:20,c:1257},{m:'15-05',h:13,l:20,c:1250},{m:'15-06',h:17,l:17,c:1250},{m:'15-07',h:13,l:8,c:1255},{m:'15-08',h:14,l:5,c:1264},{m:'15-09',h:14,l:2,c:1276},{m:'15-10',h:17,l:1,c:1292},{m:'15-11',h:12,l:0,c:1304},{m:'15-12',h:17,l:0,c:1321},{m:'16-01',h:12,l:0,c:1333},{m:'16-02',h:14,l:0,c:1347},{m:'16-03',h:15,l:0,c:1362},{m:'16-04',h:14,l:0,c:1376},{m:'16-05',h:14,l:0,c:1390},{m:'16-06',h:16,l:0,c:1406},{m:'16-07',h:13,l:0,c:1419},{m:'16-08',h:14,l:0,c:1433},{m:'16-09',h:13,l:0,c:1446},{m:'16-10',h:13,l:0,c:1459},{m:'16-11',h:8,l:0,c:1467},{m:'16-12',h:3,l:0,c:1470}],
  d: [{n:'Sales',t:446,l:92,r:20.63},{n:'R&D',t:961,l:133,r:13.84},{n:'HR',t:63,l:12,r:19.05}],
  lv: {Sales:[133,200,69,37,7],'R&D':[82,534,218,106,21],HR:[12,34,9,5,3]},
  g: {Male:882,Female:588},
  a: {'<30':331,'30-40':617,'40-50':342,'50+':180},
  s: [{d:'Sales',j:2.66,e:2.65,w:2.73},{d:'R&D',j:2.75,e:2.74,w:2.77},{d:'HR',j:2.81,e:2.75,w:2.73}],
  h: [{d:'Sales',t:17.7},{d:'R&D',t:17.8},{d:'HR',t:18.6}]
};

const C = {p:'#00d4ff',s:'#ff006e',a:'#ffbe0b',g:'#06ffa5',w:'#ff9f1c',bg:'#0a0e27',card:'#141937',txt:'#e0e7ff',muted:'#8b93b8',border:'#1e2447'};
let charts = {}, currentPage = 1;

const icons = {
  users: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  down: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>',
  clock: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  award: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  dollar: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  brief: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  target: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  activity: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  up: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>'
};

function kpi(icon,title,value,sub,color,page) {
  return `<div class="kpi-card" style="border-left:3px solid ${color}" ${page?`onclick="switchPage(${page})"`:''}>
    <div class="kpi-icon" style="background:${color}20;color:${color}">${icons[icon]}</div>
    <div class="kpi-content">
      <div class="kpi-title">${title}</div>
      <div class="kpi-value" style="color:${color}">${value}</div>
      <div class="kpi-subtitle">${sub}</div>
    </div>
  </div>`;
}

function kill(id) {
  if (charts[id]) {
    charts[id].destroy();
    delete charts[id];
  }
}

function chart(id, type, data, opts = {}) {
  kill(id);
  const canvas = document.getElementById(id);
  if (!canvas) return console.error('Canvas not found:', id);
  
  try {
    const ctx = canvas.getContext('2d');
    const def = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {labels: {color: C.txt, font: {family: 'Exo 2', size: 11}}},
        tooltip: {backgroundColor: C.card, titleColor: C.txt, bodyColor: C.txt, borderColor: C.border, borderWidth: 1}
      }
    };
    
    if (type !== 'doughnut' && type !== 'scatter') {
      def.scales = {
        x: {ticks: {color: C.muted, font: {size: 10}}, grid: {color: C.border}},
        y: {ticks: {color: C.muted, font: {size: 10}}, grid: {color: C.border}}
      };
    }
    
    charts[id] = new Chart(ctx, {type, data, options: {...def, ...opts}});
  } catch (e) {
    console.error('Chart error:', id, e);
  }
}

function p1() {
  document.getElementById('kpi1').innerHTML = 
    kpi('users','TOTAL HEADCOUNT','1,470','Active Employees',C.p,2) +
    kpi('down','ATTRITION RATE','16.12%','12-month avg',C.s,3) +
    kpi('clock','AVG TIME TO HIRE','17.8 days','Recruitment',C.a,5) +
    kpi('award','JOB SATISFACTION','2.73','Out of 4.0',C.g,4) +
    kpi('dollar','AVG MONTHLY INCOME','$6,503','Compensation',C.w);
  
  const t = D.t.slice(-24);
  chart('c1', 'line', {
    labels: t.map(d => d.m),
    datasets: [
      {label: 'Headcount', data: t.map(d => d.c), borderColor: C.p, backgroundColor: C.p + '20', borderWidth: 2, fill: true, tension: 0.4},
      {label: 'Attrition', data: t.map(d => d.l), borderColor: C.s, borderWidth: 2, fill: false, tension: 0.4}
    ]
  });
  
  chart('c2', 'bar', {
    labels: D.d.map(d => d.n),
    datasets: [{label: 'Attrition %', data: D.d.map(d => d.r), backgroundColor: C.s}]
  });
}

function p2() {
  document.getElementById('kpi2').innerHTML =
    kpi('brief','DEPARTMENTS','3','Business units',C.p) +
    kpi('target','JOB LEVELS','5','Career tiers',C.a) +
    kpi('users','AVERAGE AGE','36.9 yrs','Workforce',C.g) +
    kpi('activity','AVG TENURE','7.0 yrs','Retention',C.w);
  
  const colors = [C.p,C.s,C.a,C.g,C.w];
  const ds = [1,2,3,4,5].map((l,i) => ({
    label: 'Level '+l,
    data: [D.lv.Sales[i], D.lv['R&D'][i], D.lv.HR[i]],
    backgroundColor: colors[i]
  }));
  
  chart('c3', 'bar', {labels: ['Sales','R&D','HR'], datasets: ds});
  chart('c4', 'doughnut', {
    labels: ['Male','Female'],
    datasets: [{data: [D.g.Male, D.g.Female], backgroundColor: [C.p,C.s]}]
  });
  chart('c5', 'bar', {
    labels: Object.keys(D.a),
    datasets: [{label: 'Count', data: Object.values(D.a), backgroundColor: C.a}]
  });
}

function p3() {
  document.getElementById('kpi3').innerHTML =
    kpi('down','ATTRITION RATE','16.12%','Overall',C.s) +
    kpi('users','TOTAL LEAVERS','237','12-month',C.w) +
    kpi('activity','HIGHEST RISK','Sales','20.63%',C.s) +
    kpi('target','TARGET','85%','Current: 83.88%',C.g);
  
  chart('c6', 'bar', {
    labels: D.d.map(d => d.n),
    datasets: [
      {label: 'Leavers', data: D.d.map(d => d.l), backgroundColor: C.s},
      {label: 'Total', data: D.d.map(d => d.t), backgroundColor: C.p + '40'}
    ]
  });
  
  const t = D.t.slice(-24);
  chart('c7', 'line', {
    labels: t.map(d => d.m),
    datasets: [
      {label: 'Hires', data: t.map(d => d.h), borderColor: C.g, backgroundColor: C.g + '20', borderWidth: 2, fill: true, tension: 0.4},
      {label: 'Leavers', data: t.map(d => d.l), borderColor: C.s, backgroundColor: C.s + '20', borderWidth: 2, fill: true, tension: 0.4}
    ]
  });
}

function p4() {
  document.getElementById('kpi4').innerHTML =
    kpi('award','JOB SATISFACTION','2.73','Out of 4.0',C.g) +
    kpi('activity','ENVIRONMENT','2.72','Workplace',C.p) +
    kpi('target','WORK-LIFE','2.76','Balance',C.a) +
    kpi('up','HIGH PERFORMERS','15%','Rating 4/4',C.w);
  
  chart('c8', 'bar', {
    labels: D.s.map(s => s.d),
    datasets: [
      {label: 'Job Sat.', data: D.s.map(s => s.j), backgroundColor: C.g},
      {label: 'Env Sat.', data: D.s.map(s => s.e), backgroundColor: C.p},
      {label: 'Work-Life', data: D.s.map(s => s.w), backgroundColor: C.a}
    ]
  });
  
  const scatter = Array.from({length:100}, () => ({x: Math.random()*1.5+2.5, y: Math.random()*4+1}));
  chart('c9', 'scatter', {
    datasets: [{label: 'Employees', data: scatter, backgroundColor: C.p + '99'}]
  }, {
    scales: {
      x: {type: 'linear', title: {display: true, text: 'Performance', color: C.txt}, ticks: {color: C.muted}, grid: {color: C.border}, min: 2.5, max: 4.5},
      y: {title: {display: true, text: 'Satisfaction', color: C.txt}, ticks: {color: C.muted}, grid: {color: C.border}, min: 0, max: 5}
    }
  });
}

function p5() {
  document.getElementById('kpi5').innerHTML =
    kpi('up','TOTAL HIRES','1,470','All-time',C.g) +
    kpi('down','TOTAL LEAVERS','237','Cumulative',C.s) +
    kpi('users','NET HC CHANGE','+1,233','Growth',C.p) +
    kpi('clock','TIME TO HIRE','17.8 days','Speed',C.a);
  
  const t = D.t.slice(-36);
  chart('c10', 'line', {
    labels: t.map(d => d.m),
    datasets: [
      {label: 'Hires', data: t.map(d => d.h), borderColor: C.g, backgroundColor: C.g + '40', borderWidth: 2, fill: true, tension: 0.4},
      {label: 'Leavers', data: t.map(d => d.l), borderColor: C.s, borderWidth: 2, fill: false, tension: 0.4}
    ]
  });
  
  chart('c11', 'bar', {
    labels: D.h.map(h => h.d),
    datasets: [{label: 'Days', data: D.h.map(h => h.t), backgroundColor: C.a}]
  });
}

function switchPage(p) {
  currentPage = p;
  document.querySelectorAll('.nav-pill').forEach((pill, i) => {
    pill.classList.toggle('active', i + 1 === p);
  });
  for (let i = 1; i <= 5; i++) {
    document.getElementById('page' + i).classList.toggle('hidden', i !== p);
  }
  setTimeout(() => {
    [p1, p2, p3, p4, p5][p - 1]();
  }, 50);
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function updateDashboard() {
  switchPage(currentPage);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    p1();
    document.getElementById('loading').classList.add('hidden');
  }, 500);
});
