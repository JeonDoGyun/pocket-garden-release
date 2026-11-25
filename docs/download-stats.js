export function summarize(releases, baseline) {
 const rows = releases.filter(r => !r.draft && !r.prerelease).map(r => {
  let installs = 0, updates = 0;
  for (const a of r.assets) {
   const count = Math.max(0, a.download_count - (baseline.assets[String(a.id)] || 0));
   if (/^PokeGarden-[\d.]+-arm64\.dmg$/.test(a.name)) installs += count;
   if (/^PokeGarden-[\d.]+-arm64\.zip$/.test(a.name)) updates += count;
  }
  return {version:r.tag_name, installs, updates};
 });
 return {rows, installs:rows.reduce((n,r)=>n+r.installs,0), updates:rows.reduce((n,r)=>n+r.updates,0)};
}
if (typeof document !== 'undefined') {
 const status=document.querySelector('#status'),refresh=document.querySelector('#refresh');
 async function json(url) {const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw Error('조회 실패');return r.json()}
 async function load() {
  refresh.disabled=true;status.textContent='다운로드 기록을 확인하고 있어요.';
  try {
   const baseline=await json('./download-baseline.json'),releases=[];
   for(let page=1;;page++) {const batch=await json(`https://api.github.com/repos/JeonDoGyun/pocket-garden-release/releases?per_page=100&page=${page}`);releases.push(...batch);if(batch.length<100)break}
   const result=summarize(releases,baseline),fmt=n=>n.toLocaleString('ko-KR');
   document.querySelector('#known').textContent=fmt(baseline.knownUsers)+'명';
   document.querySelector('#installs').textContent=fmt(result.installs)+'회';
   document.querySelector('#updates').textContent=fmt(result.updates)+'회';
   document.querySelector('#started').textContent=new Date(baseline.startedAt).toLocaleString('ko-KR');
   const body=document.querySelector('tbody');body.replaceChildren();
   for(const row of result.rows) {const tr=document.createElement('tr');for(const text of [row.version,fmt(row.installs),fmt(row.updates)]){const td=document.createElement('td');td.textContent=text;tr.append(td)}body.append(tr)}
   status.textContent=new Date().toLocaleString('ko-KR')+' 기준';
  } catch {status.textContent='기록을 불러오지 못했어요. 잠시 후 새로고침해 주세요. 마지막 조회 값이 있다면 그대로 표시해요.'}
  finally {refresh.disabled=false}
 }
 refresh.addEventListener('click',load);load();
}
