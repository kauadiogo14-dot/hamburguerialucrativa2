import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {files,lessons,modules} from './course';
import terms from './termos.json';
import './style.css';

const shapes={
 book:<><path d="M3 5c4-1 6-1 9 1 3-2 5-2 9-1v14c-4-1-6-1-9 1-3-2-5-2-9-1zM12 6v14"/></>,
 grid:<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10M3 15h18"/></>,
 folder:<path d="M3 8V5a1 1 0 0 1 1-1h6l2 3h8a1 1 0 0 1 1 1v11H3z"/>,
 down:<path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4"/>,
 arrow:<path d="M4 12h15m-6-6 6 6-6 6"/>, ext:<path d="M6 18 18 6M6 6h12v12"/>,
 play:<path d="m8 4 12 8-12 8z"/>,ok:<path d="m4 12 5 5L20 6"/>,
 list:<><path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/></>,
 doc:<><path d="M5 3h9l5 5v13H5zM14 3v6h5M8 13h8M8 17h6"/></>,
 chev:<path d="m8 4 8 8-8 8"/>,menu:<path d="M3 6h18M3 12h18M3 18h18"/>, back:<path d="m14 5-7 7 7 7"/>,
 layers:<><path d="m3 8 9-5 9 5-9 5zM3 12l9 5 9-5M3 16l9 5 9-5"/></>
};
function Icon({name,size=20}){return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{shapes[name]}</svg>}
function Brand(){return <a href="#inicio" className="brand" aria-label="Hamburgueria Lucrativa, início"><i aria-hidden="true"><b/><b/><b/></i><strong>HAMBURGUERIA<br/>LUCRATIVA<span>.</span></strong></a>}
function getRoute(){
 const raw=location.hash.slice(1); if(raw==='biblioteca')return {view:'library'};
 const match=raw.match(/^aula\/(\d+)$/);const lesson=match&&lessons.find(l=>l.id===Number(match[1]));
 return lesson?{view:'lesson',lesson}:{view:'home'};
}
const storeKey='hl-area-v1';
function saved(){try{const s=JSON.parse(localStorage.getItem(storeKey)||'{}');return {done:Array.isArray(s.done)?[...new Set(s.done.filter(id=>lessons.some(l=>l.id===id)))]:[],last:lessons.some(l=>l.id===s.last)?s.last:null}}catch{return {done:[],last:null}}}
const lessonLink=n=>'#aula/'+n, pad=n=>String(n).padStart(2,'0');
function Header({view}){return <header><div className="top"><Brand/><nav aria-label="Navegação principal"><a className={view==='library'?'':'current'} href="#inicio"><Icon name="book" size={17}/>Meu curso</a><a className={view==='library'?'current':''} href="#biblioteca"><Icon name="folder" size={17}/>Biblioteca</a></nav></div></header>}
function Meter({done}){const n=done.length,pct=Math.round(n/lessons.length*100);return <div className="meter"><div><span>Seu progresso</span><b>{pct}%</b></div><progress value={n} max={lessons.length} aria-label="Progresso no curso"/><small>{n} de {lessons.length} aulas concluídas</small></div>}
function FileLink({f}){return <a className="file" href={f.href} download={f.local?true:undefined} target={f.local?undefined:'_blank'} rel={f.local?undefined:'noopener noreferrer'}><span className={'file-icon '+(f.local?'':'online')}><Icon name={f.type==='XLSX'?'grid':f.local?'doc':'layers'} size={22}/></span><span><small>{f.type}{!f.local?' · Modelo editável':''}</small><strong>{f.name}</strong></span><span className="trailing"><Icon name={f.local?'down':'ext'} size={18}/></span></a>}
function Home({state}){
 const {done,last}=state;const next=last&&!done.includes(last)?last:lessons.find(x=>!done.includes(x.id))?.id||1;
 return <><section className="hero" aria-labelledby="course-title">
   <div className="hero-title">
     <div className="eyebrow"><i/>Área do aluno</div>
     <h1 id="course-title">HAMBURGUERIA<br/><em>LUCRATIVA.</em></h1>
   </div>
   <picture className="hero-mockup">
     <source type="image/webp" srcSet="/brand/kit-672.webp 672w, /brand/kit-1200.webp 1200w" sizes="(max-width: 760px) min(87vw, 495px), (max-width: 1242px) 49vw, 604px"/>
     <img src="/brand/kit-hamburgueria.png" width="1536" height="1024"
     alt="Kit Hamburgueria Lucrativa com planilha de precificação, videoaulas, controle de estoque, cardápio de montagem e artes para Canva."
       fetchPriority="high"/>
   </picture>
   <div className="hero-details">
     <p>Da ficha técnica ao preço de venda. Aprenda a calcular quanto custa cada item do seu cardápio.</p>
     <a className="primary" href={lessonLink(next)}><Icon name="play" size={16}/>{done.length===15?'Revisar curso':last?'Continuar curso':'Começar curso'}<Icon name="arrow" size={17}/></a>
   </div>
 </section>
 <div className="homegrid"><section><div className="section-title"><div><span className="eyebrow">Percurso de estudo</span><h2>Módulos do curso</h2></div><small>15 aulas</small></div><div className="modlist">{modules.map((m,i)=>{const group=lessons.filter(x=>x.module===i);const ndone=group.filter(x=>done.includes(x.id)).length;return <a className={'module color'+i} key={m.name} href={lessonLink((group.find(x=>!done.includes(x.id))||group[0]).id)}><span className="modicon"><Icon name={m.icon} size={29}/></span><span className="modcopy"><small>Módulo {pad(i+1)} · {group.length} aulas</small><strong>{m.short}</strong><span>{m.intro}</span></span><span className="round"><Icon name={ndone===group.length?'ok':'chev'} size={16}/></span></a>})}</div></section>
 <aside className="resources"><Meter done={done}/><div className="divider"/><span className="eyebrow">Acesso rápido</span><h3>Planilhas e modelos</h3><p>Baixe os arquivos de trabalho e abra as coleções editáveis.</p><a className="textlink" href="#biblioteca">Abrir biblioteca <Icon name="arrow" size={17}/></a></aside></div></>
}
function Library(){const [filter,setFilter]=useState('Todos');const options=['Todos','XLSX','PDF','Canva'];const found=files.filter(f=>filter==='Todos'||f.type===filter);return <section className="libpage"><span className="eyebrow"><i/>Materiais do curso</span><h1>Biblioteca<span>.</span></h1><p>Planilhas para usar no dia a dia, guia de consulta e modelos editáveis.</p><div className="filters" aria-label="Filtrar por formato">{options.map(o=><button key={o} aria-pressed={o===filter} onClick={()=>setFilter(o)}>{o==='XLSX'?'Planilhas':o}</button>)}</div><div className="libgrid">{found.map(f=><FileLink key={f.id} f={f}/>)}</div></section>}
function LessonIndex({lesson,done}){return <div className="indexbox"><span className="eyebrow">Índice do curso</span>{modules.map((m,i)=><details key={lesson.module+'-'+i} open={lesson.module===i}><summary><span>Módulo {pad(i+1)}</span><strong>{m.name}</strong></summary>{lessons.filter(l=>l.module===i).map(l=><a key={l.id} className={lesson.id===l.id?'active':''} aria-current={lesson.id===l.id?'page':undefined} href={lessonLink(l.id)}><span className="ordinal">{done.includes(l.id)?<Icon name="ok" size={14}/>:pad(l.id)}</span>{l.title}</a>)}</details>)}</div>}
function Video({l}){const [playing,setPlaying]=useState(false);return <div className="media"><div className="player">{playing?<iframe title={l.title} src={'https://www.youtube-nocookie.com/embed/'+l.video+'?autoplay=1&rel=0'} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>:<button className="cover" onClick={()=>setPlaying(true)} aria-label={'Reproduzir '+l.title}><div><span className="eyebrow">Videoaula · {pad(l.id-3)} de 08</span><strong>{l.title}</strong></div><span className="play"><Icon name="play" size={25}/></span></button>}</div><a className="yt" target="_blank" rel="noopener noreferrer" href={'https://www.youtube.com/watch?v='+l.video}>Assistir no YouTube <Icon name="ext" size={13}/></a></div>}
function Lesson({l,done,toggle}){
 const material=files.filter(f=>l.resources.includes(f.id));const isDone=done.includes(l.id);
 return <><a className="crumb" href="#inicio"><Icon name="back" size={15}/>Voltar ao curso</a><div className="reader"><aside className="deskindex"><LessonIndex lesson={l} done={done}/></aside><article><details className="mobileindex"><summary><Icon name="list" size={17}/>Escolher aula</summary><LessonIndex lesson={l} done={done}/></details><span className="eyebrow">Módulo {pad(l.module+1)} · Aula {pad(l.id)} de 15</span><h1>{l.title}</h1><p className="lead">{l.summary}</p>{l.video&&<Video key={l.id} l={l}/>}
 {material.length>0&&<section className="attachments" aria-label="Materiais da aula">{material.map(f=><FileLink f={f} key={f.id}/>)}</section>}
 <div className="bodytext">{l.id===2?terms.map((t,i)=>t.endsWith(':')||i===0?<h3 key={i}>{t.replace(/:$/,'')}</h3>:<p key={i}>{t}</p>):l.body.map((p,i)=><p key={i}>{p.includes('suporte@')?<>{p.split('suporte@planilhaspremium.com.br')[0]}<a href="mailto:suporte@planilhaspremium.com.br">suporte@planilhaspremium.com.br</a>{p.split('suporte@planilhaspremium.com.br')[1]}</>:p}</p>)}</div>
 <div className="lessonend"><button className={isDone?'finished':'primary'} aria-pressed={isDone} onClick={()=>toggle(l.id)}><Icon name="ok" size={17}/>{isDone?'Aula concluída':'Marcar como concluída'}</button><div>{l.id>1&&<a className="step" aria-label="Aula anterior" href={lessonLink(l.id-1)}><Icon name="back" size={17}/></a>}<a className="step next" href={l.id===15?'#inicio':lessonLink(l.id+1)}>{l.id===15?'Voltar ao curso':'Próxima aula'}<Icon name="arrow" size={17}/></a></div></div></article></div></>
}
function App(){
 const [route,setRoute]=useState(getRoute),[state,setState]=useState(saved);
 useEffect(()=>{const onHash=()=>{setRoute(getRoute());window.scrollTo(0,0);document.getElementById('content')?.focus({preventScroll:true})};window.addEventListener('hashchange',onHash);return()=>window.removeEventListener('hashchange',onHash)},[]);
 useEffect(()=>{if(route.view==='lesson')setState(s=>s.last===route.lesson.id?s:{...s,last:route.lesson.id});document.title=(route.lesson?.title||(route.view==='library'?'Biblioteca':'Área do aluno'))+' · Hamburgueria Lucrativa'},[route]);
 useEffect(()=>{try{localStorage.setItem(storeKey,JSON.stringify(state))}catch{}},[state]);
 const toggle=id=>setState(s=>({...s,done:s.done.includes(id)?s.done.filter(x=>x!==id):[...s.done,id]}));
 return <><a className="skip" href="#content" onClick={e=>{e.preventDefault();document.getElementById('content').focus()}}>Ir para o conteúdo</a><Header view={route.view}/><main id="content" tabIndex="-1">{route.view==='library'?<Library/>:route.view==='lesson'?<Lesson key={route.lesson.id} l={route.lesson} done={state.done} toggle={toggle}/>:<Home state={state}/>}</main><footer><span>Hamburgueria Lucrativa</span><a href={lessonLink(1)}>Ajuda e suporte <Icon name="ext" size={13}/></a></footer></>
}
createRoot(document.getElementById('root')).render(<App/>);
