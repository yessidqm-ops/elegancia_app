/* Al Día Sistemas · Suscripción de Elegancia Grooming
   Para cada cliente cambiá solo CLIENTE_ID (el mismo nombre que ponés en "Códigos Al Día Sistemas"). */
(function(){
var CLIENTE_ID='ELEGANCIA-01';
var CONFIG={precio:5000,dia:23,sinpe:'8599-4415',whatsapp:'50685994415',marca:'Al Día Sistemas',app:'Elegancia',secreto:'e07e9e6bc37291cf1d4aebee'};
var KEY='aldia_licencia_'+CLIENTE_ID, AVISO_DIAS=5;
var MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
function h32(t){var h=2166136261>>>0;for(var i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h>>>0}
function codigoMes(id,per){var A='23456789ABCDEFGHJKLMNPQRSTUVWXYZ';var a=h32(CONFIG.secreto+'|'+id.toUpperCase().trim()+'|'+per);var b=h32(per+'#'+a+'#'+CONFIG.secreto);var n=(a^Math.imul(b,2654435761))>>>0,c='';for(var i=0;i<6;i++){c+=A[n&31];n=n>>>5}return c.slice(0,3)+'-'+c.slice(3)}
function pad(n){return String(n).padStart(2,'0')}
function iso(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function hoy(){return iso(new Date())}
function venceDe(y,m){return y+'-'+pad(m+1)+'-'+pad(CONFIG.dia)}           // día de pago del mes m (0-11)
function sigVence(fecha){var d=new Date(fecha+'T12:00');var y=d.getFullYear(),m=d.getMonth();if(d.getDate()>CONFIG.dia){m++;if(m>11){m=0;y++}}return venceDe(y,m)}
function mas1(y,m){m++;if(m>11){m=0;y++}return [y,m]}
function fd(f){return f.split('-').reverse().join('/')}
function nom(f){var p=f.split('-');return +p[2]+' de '+MESES[+p[1]-1]+' de '+p[0]}
function dias(f){return Math.round((new Date(f+'T12:00')-new Date(hoy()+'T12:00'))/864e5)}
function money(n){return '₡'+n.toLocaleString('es-CR')}
function leer(){try{var s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&s.pagadoHasta)return s}catch(e){}return null}
function guardar(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
window.__aldiaLicencia={codigoMes:codigoMes,id:CLIENTE_ID,abrir:function(){abierta=true;pintar()}};
var L=leer();
if(!L){L={pagadoHasta:sigVence(hoy()),visto:hoy(),pagos:[]};guardar(L)}       // primer mes de regalo
if(L.visto<hoy()){L.visto=hoy();guardar(L)}
function hoyReal(){return L.visto>hoy()?L.visto:hoy()}                          // si atrasan el reloj, no les sirve
function bloqueada(){return hoyReal()>L.pagadoHasta}
function activar(txt){
  var c=String(txt||'').toUpperCase().replace(/[^A-Z0-9]/g,'');if(c.length!==6)return 'El código tiene 6 letras y números, por ejemplo ABC-123.';
  var d=new Date(L.pagadoHasta+'T12:00'),y0=d.getFullYear(),m0=d.getMonth();
  for(var k=-3;k<=3;k++){var y=y0,m=m0+k;while(m<0){m+=12;y--}while(m>11){m-=12;y++}
    var per=y+'-'+pad(m+1);if(codigoMes(CLIENTE_ID,per).replace('-','')===c){
      var n=mas1(y,m),nuevo=venceDe(n[0],n[1]);
      if(nuevo<=L.pagadoHasta)return 'Ese código ya se usó. Si pagaste otro mes, escribinos por WhatsApp.';
      L.pagadoHasta=nuevo;L.pagos.push({mes:per,en:hoy()});guardar(L);return true}}
  return 'Ese código no es válido. Revisalo o escribinos por WhatsApp.'}

var css='#aldia-licencia,#aldia-licencia *{box-sizing:border-box}#aldia-licencia{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;--n:#2C4256;--nd:#1B2838;--ac:#8C6E54;--bg:#EEF0F3;--mut:#6b7380;--line:#E3E7EC;--w:#9a6a0b;--wb:#FBF0DA;--ok:#1f6b3d;--okb:#E4F4EA;--bad:#a72d2d;--badb:#FBE7E6;color:var(--nd)}'
+'#aldia-licencia .fab{position:fixed;left:max(12px,env(safe-area-inset-left,0px));bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:9000;background:var(--n);color:#fff;border:0;border-radius:99px;padding:9px 14px;font:600 13px system-ui;box-shadow:0 4px 14px rgba(0,0,0,.28);cursor:pointer}'
+'#aldia-licencia .fab.aviso{background:var(--w)}'
+'#aldia-licencia .cov{position:fixed;inset:0;z-index:9500;background:rgba(27,40,56,.55);overflow:auto;-webkit-overflow-scrolling:touch}'
+'#aldia-licencia .cov.lock{background:var(--bg);z-index:9600}'
+'#aldia-licencia .top{background:var(--nd);color:#fff;padding:calc(14px + env(safe-area-inset-top,0px)) 16px 14px;font:700 19px Georgia,serif;display:flex;align-items:center;justify-content:space-between;gap:10px}'
+'#aldia-licencia .top button{border:0;background:rgba(255,255,255,.16);color:#fff;border-radius:99px;padding:7px 13px;font:600 13px system-ui;cursor:pointer}'
+'#aldia-licencia .pag{max-width:480px;margin:0 auto;padding:14px 16px calc(24px + env(safe-area-inset-bottom,0px));display:grid;gap:12px;background:var(--bg)}'
+'#aldia-licencia .cov:not(.lock) .pag{margin-top:40px;border-radius:22px 22px 0 0;min-height:calc(100% - 40px)}'
+'#aldia-licencia .card{background:#fff;border:1.5px solid var(--line);border-radius:22px;padding:18px;box-shadow:0 6px 18px rgba(27,40,56,.07)}'
+'#aldia-licencia .card.c{text-align:center}#aldia-licencia .ico{font-size:52px;line-height:1.1}'
+'#aldia-licencia h2{margin:6px 0 6px;font-size:23px;font-weight:800;color:var(--nd)}'
+'#aldia-licencia p{margin:6px 0;font-size:15px;line-height:1.45;color:var(--mut)}'
+'#aldia-licencia .lbl{font-size:15px;color:var(--mut)}#aldia-licencia .monto{font-size:38px;font-weight:800;margin:2px 0;color:var(--nd)}'
+'#aldia-licencia .sinpe{font-size:34px;font-weight:800;letter-spacing:1px;color:var(--nd)}'
+'#aldia-licencia .fila{display:flex;align-items:center;justify-content:space-between;gap:10px}'
+'#aldia-licencia .pasos{font-size:15px;color:var(--mut);line-height:1.5;margin:12px 0}'
+'#aldia-licencia button.b{border:0;border-radius:99px;padding:14px 20px;font:700 17px system-ui;background:var(--n);color:#fff;cursor:pointer}#aldia-licencia button.b.full{width:100%}'
+'#aldia-licencia button.cp{border:0;border-radius:99px;padding:12px 18px;font:700 15px system-ui;background:#E6E9ED;color:var(--n);cursor:pointer}'
+'#aldia-licencia input{width:100%;padding:16px;border:1.5px solid var(--line);border-radius:18px;font:600 19px system-ui;letter-spacing:3px;text-transform:uppercase;margin:8px 0 10px;color:var(--nd);background:#fff}#aldia-licencia input::placeholder{color:#9aa1ab}'
+'#aldia-licencia .err{color:var(--bad);font-size:14px;min-height:0;margin-bottom:8px}#aldia-licencia .err:empty{display:none}'
+'#aldia-licencia .est{border-radius:14px;padding:11px 14px;font-size:15px;font-weight:600;margin-top:10px}'
+'#aldia-licencia .est.ok{background:var(--okb);color:var(--ok)}#aldia-licencia .est.w{background:var(--wb);color:var(--w)}'
+'#aldia-licencia .pie{text-align:center;color:var(--mut);font-size:14px;padding:4px 0}#aldia-licencia .pie b{color:var(--nd)}'
+'#aldia-licencia .ban{position:fixed;top:0;left:0;right:0;z-index:9100;background:var(--wb);color:var(--w);padding:calc(8px + env(safe-area-inset-top,0px)) 14px 8px;font:600 13px system-ui;display:flex;gap:10px;align-items:center;border-bottom:1px solid #e8d6a8}'
+'#aldia-licencia .ban span{flex:1}#aldia-licencia .ban button{border:0;background:transparent;color:inherit;font:700 13px system-ui;text-decoration:underline;cursor:pointer;padding:4px}';

var root=document.createElement('div');root.id='aldia-licencia';
var st=document.createElement('style');st.textContent=css;
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var abierta=false,aviso_off=false;try{aviso_off=sessionStorage.getItem(KEY+'_aviso')==='1'}catch(e){}
function estado(){var d=dias(L.pagadoHasta),mal=bloqueada();
  return {d:d,mal:mal,pronto:!mal&&d<=AVISO_DIAS}}
function msgWA(){return 'Hola, ya pagué la mensualidad de '+CONFIG.app+' ('+money(CONFIG.precio)+'). Cliente: '+CLIENTE_ID+'. Les mando el comprobante.'}
function mesPer(){var p=L.pagadoHasta.split('-');return MESES[+p[1]-1]+' '+p[0]}
function hoja(bloq){
  var e=estado(),cab,intro;
  if(bloq){cab='<div class="card c"><div class="ico">🔒</div><h2>La app está pausada</h2><p>La mensualidad de '+mesPer()+' venció el '+fd(L.pagadoHasta)+'. Tus datos están guardados y seguros. Apenas pagués, ingresá el código y todo vuelve a funcionar.</p></div>'}
  else{cab='<div class="card"><h2 style="margin-top:0">Mi suscripción</h2>'+(e.pronto?'<div class="est w">Tu pago vence '+(e.d===0?'hoy':e.d===1?'mañana':'en '+e.d+' días')+' ('+fd(L.pagadoHasta)+').</div>':'<div class="est ok">Estás al día hasta el '+fd(L.pagadoHasta)+'.</div>')+'</div>'}
  return '<div class="pag">'+cab
  +'<div class="card"><div class="lbl">Mensualidad</div><div class="monto">'+money(CONFIG.precio)+'</div><p style="margin-top:0">Se paga el '+CONFIG.dia+' de cada mes por SINPE Móvil</p>'
  +'<div class="lbl" style="margin-top:14px">SINPE Móvil</div><div class="fila"><div class="sinpe">'+esc(CONFIG.sinpe)+'</div><button class="cp" data-x="copiar">Copiar</button></div>'
  +'<div class="pasos">1. Hacé el SINPE por '+money(CONFIG.precio)+'.<br>2. Mandá el comprobante por WhatsApp al mismo número.<br>3. Te respondemos con un código para activar el mes.</div>'
  +'<button class="b full" data-x="wa">📲 Enviar comprobante por WhatsApp</button></div>'
  +'<div class="card"><div class="lbl">Código de activación de '+mesPer()+'</div>'
  +'<input id="aldia-cod" placeholder="EJ: ABC-123" autocomplete="off" autocapitalize="characters" maxlength="8" aria-label="Código de activación"><div class="err" id="aldia-err" role="alert"></div>'
  +'<button class="b" data-x="activar">Activar</button></div>'
  +'<div class="pie">Cliente: <b>'+esc(CLIENTE_ID)+'</b> · Sistema hecho por <b>'+esc(CONFIG.marca)+'</b></div></div>'}
function pintar(){
  var e=estado(),h='';
  if(e.mal){h='<div class="cov lock"><div class="top">Elegancia Grooming</div>'+hoja(true)+'</div>'}
  else{
    if(e.pronto&&!aviso_off&&!abierta)h+='<div class="ban"><span>Tu suscripción vence '+(e.d===0?'hoy':e.d===1?'mañana':'en '+e.d+' días')+'. Pagá '+money(CONFIG.precio)+' por SINPE al '+esc(CONFIG.sinpe)+'.</span><button data-x="abrir">Ver cómo</button><button data-x="ocultar" aria-label="Ocultar aviso">✕</button></div>';
    if(abierta)h+='<div class="cov" data-x="fondo"><div style="background:var(--bg);min-height:100%"><div class="top">Elegancia Grooming<button data-x="cerrar">Cerrar</button></div>'+hoja(false)+'</div></div>'}
  var prev=document.getElementById('aldia-cod'),val=prev?prev.value:'';
  root.innerHTML=h;var ni=document.getElementById('aldia-cod');if(ni&&val)ni.value=val}
root.addEventListener('click',function(ev){
  var t=ev.target.closest('[data-x]');if(!t)return;var x=t.getAttribute('data-x');
  if(x==='fondo'&&ev.target!==t)return;
  if(x==='abrir'){abierta=true;pintar()}
  else if(x==='cerrar'||x==='fondo'){abierta=false;pintar()}
  else if(x==='ocultar'){aviso_off=true;try{sessionStorage.setItem(KEY+'_aviso','1')}catch(e){}pintar()}
  else if(x==='copiar'){var n=CONFIG.sinpe,ok=function(){t.textContent='¡Copiado!';setTimeout(function(){t.textContent='Copiar número'},1600)};
    try{navigator.clipboard.writeText(n).then(ok,function(){window.prompt&&0;t.textContent=n})}catch(e){t.textContent=n}}
  else if(x==='wa'){window.open('https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(msgWA()),'_blank')}
  else if(x==='activar'){var r=activar(document.getElementById('aldia-cod').value);
    if(r===true){abierta=true;root.innerHTML='<div class="cov lock"><div class="top">Elegancia Grooming</div><div class="pag"><div class="card c"><div class="ico">✅</div><h2>¡Pago confirmado!</h2><p>Gracias. Tu suscripción queda al día hasta el '+nom(L.pagadoHasta)+'.</p><button class="b full" data-x="listo">Seguir usando la app</button></div></div></div>'}
    else{var er=document.getElementById('aldia-err');if(er)er.textContent=r}}
  else if(x==='listo'){abierta=false;pintar()}});
root.addEventListener('keydown',function(ev){if(ev.key==='Enter'&&ev.target.id==='aldia-cod'){var b=root.querySelector('[data-x="activar"]');if(b)b.click()}});
function montar(){document.head.appendChild(st);document.body.appendChild(root);pintar();
  setInterval(function(){if(!abierta&&!document.getElementById('aldia-cod')){var b=bloqueada();pintar()}},60000)}
if(document.body)montar();else document.addEventListener('DOMContentLoaded',montar);

})();
