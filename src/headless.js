import fs from 'node:fs';
import {Game} from './game.js';
function fail(s){console.error(s);process.exit(2)}
try {
 let args=process.argv.slice(2), o={};for(let i=0;i<args.length;i+=2){if(!args[i]?.startsWith('--')||args[i+1]===undefined)fail('Invalid arguments');o[args[i].slice(2)]=args[i+1];}
 for(const k of ['seed','night','ticks','out'])if(o[k]===undefined)fail('Missing '+k);
 const integer=x=>/^-?\d+$/.test(x);if(!integer(o.seed)||!['1','2','3'].includes(o.night)||!integer(o.ticks)||+o.ticks<0||!integer(o['snapshot-every']??'10')||+(o['snapshot-every']??10)<1)fail('Invalid arguments');
 let s=o.scenario?JSON.parse(fs.readFileSync(o.scenario,'utf8')):{}, f=o.inputs?JSON.parse(fs.readFileSync(o.inputs,'utf8')).frames:[];
 const pos=p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite);
 if(!s||Array.isArray(s)||typeof s!=='object'||!Array.isArray(f)||s.player?.pos&&!pos(s.player.pos)||s.motes&&!Array.isArray(s.motes)||s.motes?.some(p=>!pos(p))||s.shades&&!Array.isArray(s.shades)||s.shades?.some(x=>!pos(x.pos))||s.lanterns&&!Array.isArray(s.lanterns)||s.lanterns?.some(x=>typeof x.id!=='string'||x.pos&&!pos(x.pos)))fail('Invalid scenario');
 const boolFields=['random_motes','random_shades','random_drifters','wind_enabled'];if(boolFields.some(k=>k in s&&typeof s[k]!=='boolean'))fail('Invalid scenario flags');
 for(const key of ['shades','drifters','charms']){if(key in s&&(!Array.isArray(s[key])||s[key].some(x=>!x||typeof x!=='object'||!pos(x.pos)||(x.id!==undefined&&typeof x.id!=='string'))))fail('Invalid '+key);}
 if(s.shades?.some(x=>x.state!==undefined&&!['spawning','wander','chase','recoil','stunned','drain'].includes(x.state)))fail('Invalid shade state');
 if(s.drifters?.some(x=>x.state!==undefined&&!['idle','chase','flee','removed'].includes(x.state)))fail('Invalid drifter state');
 if(s.player&&(!s.player||typeof s.player!=='object'||['invuln_ticks','dash_cd_ticks','pulse_cd_ticks','charm_ticks'].some(k=>k in s.player&&(!Number.isInteger(s.player[k])||s.player[k]<0))))fail('Invalid player');
 let last=-1;for(const x of f){if(!Number.isInteger(x.tick)||x.tick<=last||x.tick<0||x.move&&(!Array.isArray(x.move)||x.move.length!==2||x.move.some(v=>!Number.isFinite(v)||Math.abs(v)>1))||['jump','pulse','interact','dash','pause'].some(k=>k in x&&typeof x[k]!=='boolean')||'cam_yaw_deg'in x&&!Number.isFinite(x.cam_yaw_deg))fail('Invalid inputs');last=x.tick;}
 let g=new Game(+o.seed,s,+o.night),lines=[g.snapshot(),{type:'event',tick:0,name:'night_start',data:{night:+o.night}}],input={move:[0,0],cam_yaw_deg:0,jump:false,pulse:false,interact:false},j=0;for(let i=0;i<+o.ticks&&(g.state==='playing'||g.state==='paused');i++){if(f[j]?.tick===i){Object.assign(input,f[j]);j++;}lines.push(...g.step(input));if(g.tick%+(o['snapshot-every']??10)===0)lines.push(g.snapshot());}lines.push({type:'end',ticks:g.tick,state:g.state,score:g.score});fs.writeFileSync(o.out,lines.map(x=>JSON.stringify(x)).join('\n')+'\n');
} catch(e){fail(e.message)}
