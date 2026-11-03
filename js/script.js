const $ = (id) => document.getElementById(id);
const money = (value) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number.isFinite(value)?value:0);
const pct = (value) => `${(value*100).toLocaleString('pt-BR',{maximumFractionDigits:1})}%`;
const profiles = {
  CONSERVADOR: {'PAPEL':.30,'TIJOLO':.10,'HÍBRIDOS':.10,'FOFs':.10,'DESENVOLVIMENTO':.20,'HOTELARIAS':.20},
  MODERADO: {'PAPEL':.32,'TIJOLO':.35,'HÍBRIDOS':.08,'FOFs':.05,'DESENVOLVIMENTO':.10,'HOTELARIAS':.10},
  AGRESSIVO: {'PAPEL':.30,'TIJOLO':0,'HÍBRIDOS':.10,'FOFs':.20,'DESENVOLVIMENTO':.30,'HOTELARIAS':.10}
};
const colors=['#167a50','#50a77d','#8cc9a8','#b5d8c3','#e0b45b','#8b9e91'];
let growthChart, allocationChart;

function futureValue(monthly, rate, months){
  if(months<=0) return 0;
  if(Math.abs(rate)<1e-12) return monthly*months;
  return monthly*((Math.pow(1+rate,months)-1)/rate);
}
function getInputs(){
  return {
    salary:Math.max(0,Number($('salary').value)||0),
    monthly:Math.max(0,Number($('monthly').value)||0),
    years:Math.min(60,Math.max(1,Math.round(Number($('years').value)||1))),
    rate:Math.max(0,(Number($('rate').value)||0)/100),
    yieldRate:Math.max(0,(Number($('yield').value)||0)/100)
  };
}
function render(){
  const v=getInputs(), months=v.years*12;
  const total=futureValue(v.monthly,v.rate,months);
  $('suggested').textContent=money(v.salary*.30);
  $('futureValue').textContent=money(total);
  $('monthlyIncome').textContent=money(total*v.yieldRate);
  $('investedTotal').textContent=money(v.monthly*months);
  $('periodLabel').textContent=`em ${v.years} ${v.years===1?'ano':'anos'}`;

  const labels=[], values=[];
  for(let m=0;m<=months;m+=Math.max(1,Math.ceil(months/60))){
    labels.push(m===0?'Início':`${(m/12).toLocaleString('pt-BR',{maximumFractionDigits:1})} a`);
    values.push(futureValue(v.monthly,v.rate,m));
  }
  if(labels[labels.length-1]!==`${v.years} a`){labels.push(`${v.years} a`);values.push(total);}
  if(growthChart){growthChart.data.labels=labels;growthChart.data.datasets[0].data=values;growthChart.update();}
  else if(window.Chart){
    growthChart=new Chart($('growthChart'),{type:'line',data:{labels,datasets:[{data:values,label:'Patrimônio',borderColor:'#168052',backgroundColor:'rgba(22,128,82,.10)',fill:true,tension:.32,pointRadius:0,pointHitRadius:8,borderWidth:2.5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>money(c.raw)}}},scales:{x:{grid:{display:false},ticks:{color:'#829087',maxTicksLimit:7,font:{size:10}}},y:{grid:{color:'#edf1ee'},ticks:{color:'#829087',font:{size:10},callback:v=>v>=1000000?`R$ ${(v/1000000).toLocaleString('pt-BR',{maximumFractionDigits:1})} mi`:v>=1000?`R$ ${(v/1000).toLocaleString('pt-BR',{maximumFractionDigits:0})} mil`:money(v)}}}}});
  }

  const scenarioYears=[2,5,10,20,30];
  $('scenarioRows').innerHTML=scenarioYears.map(y=>{
    const value=futureValue(v.monthly,v.rate,y*12);
    return `<tr><td>${y} ${y===1?'ano':'anos'}</td><td>${money(value)}</td><td>${money(value*v.yieldRate)}</td></tr>`;
  }).join('');
  renderAllocation();
}
function renderAllocation(){
  const profile=$('profile').value, aporte=getInputs().monthly, allocation=profiles[profile];
  const names=Object.keys(allocation), values=names.map(n=>allocation[n]);
  $('allocationList').innerHTML=names.map((name,i)=>`<div class="allocation-item"><div class="allocation-name"><i class="allocation-dot" style="background:${colors[i]}"></i>${name}</div><div class="allocation-value"><strong>${money(aporte*allocation[name])}</strong><small>${pct(allocation[name])}</small></div></div>`).join('');
  if(allocationChart){allocationChart.data.datasets[0].data=values;allocationChart.update();}
  else if(window.Chart){
    allocationChart=new Chart($('allocationChart'),{type:'doughnut',data:{labels:names,datasets:[{data:values,backgroundColor:colors,borderWidth:3,borderColor:'#fff',hoverOffset:5}]},options:{responsive:true,maintainAspectRatio:false,cutout:'68%',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.label}: ${pct(c.raw)} (${money(aporte*c.raw)})`}}}}});
  }
}
['salary','monthly','years','rate','yield'].forEach(id=>$(id).addEventListener('input',render));
$('profile').addEventListener('change',renderAllocation);
$('reset').addEventListener('click',()=>{$('salary').value=2000;$('monthly').value=200;$('years').value=5;$('rate').value=1.08;$('yield').value=.60;$('profile').value='CONSERVADOR';render();});
render();
