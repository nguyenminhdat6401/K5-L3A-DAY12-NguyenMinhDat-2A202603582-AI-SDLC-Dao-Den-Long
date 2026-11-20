const radial=(radius,count,start=0,cx=0,y=0)=>Array.from({length:count},(_,i)=>{const a=(start+i*360/count)*Math.PI/180;return [cx+radius*Math.cos(a),y,radius*Math.sin(a)];});
export const MAPS={
 1:{duration:300,lanterns:[[0,0,25],[23.8,0,7.7],[14.7,0,-20.2],[-14.7,0,-20.2],[-23.8,0,7.7]],motes:[...radial(12,8),...radial(33,16)],spawns:radial(37,12,15),interval:480,maxShades:6,charms:[]},
 2:{duration:330,lanterns:[[0,0,20],[17,0,-10],[-17,0,-10],[70,0,20],[87,0,-10],[53,0,-10]],motes:[...radial(10,4),...radial(22,8),...radial(10,4,0,70),...radial(22,8,0,70)],spawns:[...radial(26,8,22.5),...radial(26,8,22.5,70)],interval:420,maxShades:8,charms:[[35,0,0]]},
 3:{duration:360,lanterns:[[0,6,6],[18,3,10],[-18,3,10],[35,0,-10],[-35,0,-10],[20,0,-35],[-20,0,-35]],motes:[...radial(34,18),...Array.from({length:8},(_,i)=>{let a=(20+i*20)*Math.PI/180;return [18*Math.cos(a),3,18*Math.sin(a)];}),...radial(5,4,45,0,6)],spawns:radial(43,16),interval:360,maxShades:10,charms:[[30,0,25],[-30,0,25]]}
};
export function ground(n,x,z,y=0){if(n===1)return Math.hypot(x,z)<=40?0:null;if(n===2)return Math.hypot(x,z)<=28||Math.hypot(x-70,z)<=28||(x>=26&&x<=44&&Math.abs(z)<=2)?0:null;let r=Math.hypot(x,z);if(r>45)return null;if(r<=8&&y>=5.8)return 6;if(z>0&&r>=12&&r<=24&&y>=2.8)return 3;for(let deg of [30,150]){let a=deg*Math.PI/180,u=x*Math.cos(a)+z*Math.sin(a),v=-x*Math.sin(a)+z*Math.cos(a);if(u>=24&&u<=30&&Math.abs(v)<=1.5){let h=(30-u)/2;if(y>=h-.3)return h;}}return 0;}

// Highest solid surface at a horizontal position; ramps replace the vertical edge.
export function surface(n,x,z){
 if(n!==3)return ground(n,x,z,0);
 let r=Math.hypot(x,z);if(r>45)return null;
 for(const deg of [30,150]){const a=deg*Math.PI/180,u=x*Math.cos(a)+z*Math.sin(a),v=-x*Math.sin(a)+z*Math.cos(a);if(u>=24&&u<=30&&Math.abs(v)<=1.5)return (30-u)/2;}
 if(r<=2)return 14;if(r<=8)return 6;if(z>0&&r>=12&&r<=24)return 3;return 0;
}
export function wallBlocks(n,from,to){if(n!==3)return false;const old=surface(n,from[0],from[2]),next=surface(n,to[0],to[2]);if(next===null||old===null)return false;return next>old+.3&&from[1]<next-.05;}
