import contract from '../game.contract.json' with { type: 'json' };
export const T = contract.tuning;
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[2]-b[2]);
const copy=x=>JSON.parse(JSON.stringify(x));
export class Game {
 constructor(seed=1,s={}) {
  let n=seed>>>0; const rnd=()=>((n=(Math.imul(n,1664525)+1013904223)>>>0)/4294967296);
  this.tick=0;this.state='playing';this.score=0;this.time=s.time_left_s??T.night1_duration_s;this.player={pos:[0,0,0],carried:0,flames:T.flames,...copy(s.player||{})};this.invuln=0;this.cooldown=0;this.yVel=0;
  this.lanterns=Array.from({length:5},(_,i)=>{const a=i*Math.PI*2/5;return {id:`L${i+1}`,pos:[Math.sin(a)*16,0,Math.cos(a)*16],lit:false,deposited:0}});
  for(const l of s.lanterns||[]){let target=this.lanterns.find(x=>x.id===l.id);if(!target) throw Error('Invalid lantern id');Object.assign(target,copy(l));}
  this.motes=s.motes?copy(s.motes).map((p,i)=>({id:`M${i+1}`,pos:p})):s.random_motes===false?[]:Array.from({length:35},(_,i)=>{let a=rnd()*Math.PI*2,r=3+rnd()*18;return {id:`M${i+1}`,pos:[Math.sin(a)*r,0,Math.cos(a)*r]}});
  this.shades=s.shades?copy(s.shades).map((p,i)=>({id:p.id??`S${i+1}`,pos:p.pos,state:'chase',stun:0})):s.random_shades===false?[]:Array.from({length:3},(_,i)=>{let a=rnd()*Math.PI*2;return {id:`S${i+1}`,pos:[Math.sin(a)*20,0,Math.cos(a)*20],state:'chase',stun:0}});
  this.prev={jump:false,interact:false,pulse:false};
 }
 event(name,data){this.events.push({type:'event',tick:this.tick,name,data});}
 snapshot(){const round=p=>p.map(v=>Math.round(v*1000)/1000);return {type:'snapshot',tick:this.tick,sim_tick:this.tick,state:this.state,time_left_s:Math.max(0,this.time),score:this.score,player:{...this.player,pos:round(this.player.pos)},lanterns:this.lanterns.map(l=>({...l,pos:round(l.pos)})),shades:this.shades.map(s=>({id:s.id,pos:round(s.pos),state:s.state})),motes_active:this.motes.length,motes:this.motes.map(m=>({...m,pos:round(m.pos)}))};}
 end(result,reason){if(this.state!=='playing')return;this.state=result;if(result==='won')this.score+=Math.floor(this.time)*T.score.per_second_left+this.player.flames*T.score.per_flame_left;this.event('game_over',{result,reason});}
 step(input={}){
  if(this.state!=='playing')return [];this.tick++;this.events=[];let p=this.player;this.invuln=Math.max(0,this.invuln-1/60);this.cooldown=Math.max(0,this.cooldown-1/60);let move=input.move||[0,0],yaw=(input.cam_yaw_deg||0)*Math.PI/180;let len=Math.max(1,Math.hypot(...move)),x=(move[0]*Math.cos(yaw)+move[1]*Math.sin(yaw))/len,z=(-move[0]*Math.sin(yaw)+move[1]*Math.cos(yaw))/len;p.pos[0]+=x*T.player_speed/60;p.pos[2]+=z*T.player_speed/60;
  const d=Math.hypot(p.pos[0],p.pos[2]);if(d>24){p.pos[0]*=24/d;p.pos[2]*=24/d;}
  if(input.jump&&!this.prev.jump&&p.pos[1]<=0)this.yVel=6;this.yVel-=15/60;p.pos[1]=Math.max(0,p.pos[1]+this.yVel/60);if(!p.pos[1])this.yVel=0;
  for(let i=this.motes.length-1;i>=0;i--)if(p.carried<T.carry_capacity&&dist(p.pos,this.motes[i].pos)<=T.pickup_radius){this.motes.splice(i,1);p.carried++;this.score+=T.score.per_mote;this.event('mote_picked',{carried:p.carried});}
  if(input.interact&&!this.prev.interact){let l=this.lanterns.find(l=>!l.lit&&dist(p.pos,l.pos)<=T.interact_radius);if(l&&p.carried){let amount=Math.min(p.carried,T.lantern_cost-l.deposited);p.carried-=amount;l.deposited+=amount;this.event('deposit',{lantern_id:l.id,amount,deposited:l.deposited});if(l.deposited>=T.lantern_cost){l.lit=true;this.score+=T.score.per_lantern;this.event('lantern_lit',{lantern_id:l.id});if(this.lanterns.every(l=>l.lit))this.end('won','all_lit');}}}
  if(input.pulse&&!this.prev.pulse&&p.carried>=T.pulse_cost&&this.cooldown<=0){p.carried-=T.pulse_cost;this.cooldown=T.pulse_cooldown_s;let ids=[];for(const s of this.shades)if(dist(p.pos,s.pos)<=T.pulse_radius){let dx=s.pos[0]-p.pos[0],dz=s.pos[2]-p.pos[2],d=Math.hypot(dx,dz)||1;s.pos[0]+=dx/d*T.pulse_push_m;s.pos[2]+=dz/d*T.pulse_push_m;s.stun=T.pulse_stun_s;s.state='stunned';ids.push(s.id);this.score+=T.score.per_stun;}this.event('pulse',{stunned_ids:ids});}
  for(const s of this.shades){if(s.stun>0){s.stun=Math.max(0,s.stun-1/60);if(!s.stun)s.state='chase';continue;}let dx=p.pos[0]-s.pos[0],dz=p.pos[2]-s.pos[2],d=Math.hypot(dx,dz);if(d){let next=[s.pos[0]+dx/d*T.shade_speed/60,s.pos[1],s.pos[2]+dz/d*T.shade_speed/60];if(!this.lanterns.some(l=>l.lit&&dist(next,l.pos)<=T.safe_radius))s.pos=next;}if(this.invuln<=0&&dist(p.pos,s.pos)<=T.shade_hit_radius){p.flames--;this.invuln=T.invuln_s;this.event('player_hit',{by:'shade',flames:p.flames,dropped:0});if(p.flames<=0)this.end('lost','no_flames');}}
  this.time=Math.max(0,this.time-1/60);if(this.time<=1e-9){this.time=0;this.end('lost','dawn');}this.prev={jump:!!input.jump,interact:!!input.interact,pulse:!!input.pulse};return this.events;
 }
}
