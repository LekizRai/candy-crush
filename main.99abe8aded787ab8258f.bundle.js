(()=>{"use strict";var e,t={852:(e,t,i)=>{var s=i(440),r=i.n(s);class o extends Phaser.Scene{constructor(){super("init")}preload(){this.load.image("background","./assets/images/backgrounds/background.png")}create(){this.scene.start("preload")}}class n extends Phaser.Scene{constructor(){super("preload")}preload(){this.cameras.main.setBackgroundColor(16777215),this.add.image(0,0,"background").setOrigin(0),this.createLoadingbar(),this.load.on("progress",(e=>{this.progressBar.clear(),this.progressBar.fillStyle(16774867,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*e,16)}),this),this.load.on("complete",(()=>{this.progressBar.destroy(),this.loadingBar.destroy()}),this),this.load.audio("explosion","./assets/audios/explosion.mp3"),this.load.audio("victory","./assets/audios/victory.mp3"),this.load.audio("theme","./assets/audios/theme.mp3"),this.load.pack("preload","./assets/images/pack.json","preload")}create(){this.sound.add("explosion"),this.sound.add("victory"),this.sound.add("theme"),this.scene.start("gameplay")}createLoadingbar(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(6139463,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}const h={SCORE:0,HIGH_SCORE:0,GRID_WIDTH:8,GRID_HEIGHT:8,TILE_WIDTH:64,TILE_HEIGHT:64,TILE_TYPES:["gem-1","gem-2","gem-3","gem-4","gem-5","gem-6","gem-7"],MATCH_TYPES:["0","4H","4V","5","5S"],MILESTONES:[1e3,2e3,5e3,1e4,15e3,2e4,3e4,5e4,75e3,1e5]},l=e=>Math.round(20*(e+1)+e*h.TILE_WIDTH+h.TILE_WIDTH/2),a=e=>Math.round((e-h.TILE_WIDTH/2-20)/(20+h.TILE_WIDTH)),d=e=>Math.round(20*(e+1)+e*h.TILE_HEIGHT+h.TILE_HEIGHT/2),c=e=>Math.round((e-h.TILE_HEIGHT/2-20)/(20+h.TILE_HEIGHT)),p=(e,t)=>e.filter((e=>t.includes(e))),g=(e,t)=>Array.from(new Set([...e,...t])),u=(e,t)=>e.filter((e=>t.indexOf(e)<0)),T=e=>{let t=e.length;for(;0!=t;){let i=Math.floor(Math.random()*t);t--,[e[t],e[i]]=[e[i],e[t]]}return e},f=(e,t)=>{const i=Math.abs(e.x-t.x),s=Math.abs(e.y-t.y);return 1.2*Math.max(i,s)};class m extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.setInteractive(),this.scene.add.existing(this),this.explosionType=h.MATCH_TYPES[0],this.allowScore=!1,this.scene.events.on("prohibitscore",(()=>{this.allowScore=!1})),this.scene.events.on("allowscore",(()=>{this.allowScore=!0}))}setExplosionType(e){this.explosionType=e}getExplostionType(){return this.explosionType}setTileTexture(e){e<=6&&this.setTexture(h.TILE_TYPES[e])}addGlow(e){var t;const i=null===(t=this.postFX)||void 0===t?void 0:t.addGlow(e,0,0);this.scene.tweens.add({targets:i,outerStrength:8,duration:500,yoyo:!0,loop:-1,ease:Phaser.Math.Easing.Sine.InOut}),this.scene.tweens.add({targets:this,alpha:.8,duration:500,yoyo:!0,loop:-1,ease:Phaser.Math.Easing.Sine.InOut})}doDestroyEffect(e,t=0,i,s){return this.isTweening()?Promise.resolve():(this.allowScore&&this.scene.events.emit("tiledestroyed",25),new Promise(i&&s?r=>{this.addBurstingParticle(t),this.scene.add.tween({targets:this,x:i,y:s,scale:0,duration:500,delay:t,ease:Phaser.Math.Easing.Expo.Out,repeat:0,onComplete:()=>{this.active&&this.destroy(),e(),r()},onStart:()=>{this.scene.sound.play("explosion")}})}:i=>{this.addBurstingParticle(t),this.scene.add.tween({targets:this,scale:0,duration:500,delay:t,ease:Phaser.Math.Easing.Expo.Out,repeat:0,onComplete:()=>{this.active&&(this.setVisible(!1),this.destroy()),e(),i()},onStart:()=>{this.scene.sound.play("explosion")}})}))}addBurstingParticle(e){const t=this.scene.add.particles(this.x,this.y,"particle",{lifespan:400,speed:{min:200,max:400},scale:{start:1,end:0},rotate:{min:0,max:360},blendMode:"ADD",emitting:!1});this.parentContainer.add(t),setTimeout((()=>{t.explode(50,0,0)}),e)}isTweening(){const e=this.scene.tweens.getTweensOf(this);for(let t=0;t<e.length;t++)if(e[t].isActive())return!0;return!1}}class S{constructor(e){this.scene=e}createTileId(e,t,i){return new m({scene:this.scene,x:t,y:i,texture:h.TILE_TYPES[e]})}createRandomTile(e,t){const i=h.TILE_TYPES[Phaser.Math.RND.between(0,h.TILE_TYPES.length-2)];return new m({scene:this.scene,x:e,y:t,texture:i})}}class y{constructor(e,t,i){this.tileList=e,this.mergedIntoTile=t,this.type=i||this.calcMatchType()}getMatchType(){return this.type}getTileList(){return this.tileList}getMergedIntoTile(){return this.mergedIntoTile}calcMatchType(){for(let e=0;e<this.tileList.length;e++)if(this.tileList[e].getExplostionType()!=h.MATCH_TYPES[0])return h.MATCH_TYPES[0];if(!(this.tileList.length>=4))return h.MATCH_TYPES[0];{let e=[0,0,0,0];for(let t=0;t<this.tileList.length;t++)this.tileList[t].x-this.mergedIntoTile.x>0?e[3]=1:this.tileList[t].x-this.mergedIntoTile.x<0?e[2]=1:this.tileList[t].y-this.mergedIntoTile.y>0?e[1]=1:this.tileList[t].y-this.mergedIntoTile.y<0&&(e[0]=1);const t=e[0]+e[1]+e[2]+e[3];if(!(this.tileList.length>=5))return e[0]+e[1]==2?h.MATCH_TYPES[2]:h.MATCH_TYPES[1];if(4==t)return h.MATCH_TYPES[4];if(3==t)return h.MATCH_TYPES[4];if(2==t)return e[0]+e[1]==1?h.MATCH_TYPES[4]:h.MATCH_TYPES[3]}return h.MATCH_TYPES[0]}}var x=function(e,t,i,s){return new(i||(i=Promise))((function(r,o){function n(e){try{l(s.next(e))}catch(e){o(e)}}function h(e){try{l(s.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(n,h)}l((s=s.apply(e,t||[])).next())}))};class E extends Phaser.GameObjects.Container{constructor(e,t,i){super(e,t,i),this.onSwapping=!1,this.emptiesInColumn=[],this.secondSwapping=!1,this.idlingTime=0,e.add.existing(this),this.scene.input.on("gameobjectdown",this.down,this),this.scene.input.on("pointerup",this.up,this),this.scene.input.on("gameobjectover",this.over,this),this.scene.input.on("gameobjectout",this.out,this),this.tileFactory=new S(e),this.groundGrid=[],this.tileGrid=[],this.haveTile=[],this.tilePosition=[];for(let e=0;e<h.GRID_HEIGHT;e++){this.groundGrid[e]=[],this.tileGrid[e]=[],this.haveTile[e]=[],this.tilePosition[e]=[];for(let t=0;t<h.GRID_WIDTH;t++)this.groundGrid[e][t]=this.scene.add.image(l(t),d(e),"ground"),this.add(this.groundGrid[e][t])}for(let e=0;e<h.GRID_HEIGHT;e++)for(let t=0;t<h.GRID_WIDTH;t++)this.tilePosition[e][t]={x:l(t),y:d(e)},this.tileGrid[e][t]=this.tileFactory.createRandomTile(l(t),d(e)),this.haveTile[e][t]=!0,this.add(this.tileGrid[e][t]);this.haveSpecialTile=!1,this.onSwapping=!0,this.doRandomShuffle(),this.firstSelectionFrame=this.scene.add.image(0,0,"selection").setVisible(!1),this.secondSelectionFrame=this.scene.add.image(0,0,"selection").setVisible(!1),this.add(this.firstSelectionFrame),this.add(this.secondSelectionFrame),this.scene.add.tween({targets:this.firstSelectionFrame,scale:.9,yoyo:!0,duration:200,ease:Phaser.Math.Easing.Cubic.In,repeat:-1,persist:!0}),this.scene.add.tween({targets:this.secondSelectionFrame,scale:.9,yoyo:!0,duration:200,ease:Phaser.Math.Easing.Cubic.In,repeat:-1,persist:!0});for(let e=0;e<8;e++)this.emptiesInColumn.push(0);this.isDown=!1}finish(){for(let e=0;e<h.GRID_HEIGHT;e++)for(let t=0;t<h.GRID_WIDTH;t++)this.scene.tweens.killTweensOf(this.tileGrid[e][t]),this.tileGrid[e][t].setScale(1),this.scene.add.tween({targets:this.tileGrid[e][t],x:346,y:346,delay:20*(8*e+t),duration:500,onComplete:()=>{this.tileGrid[e][t].destroy(),this.haveTile[e][t]=!1}})}restart(){this.onSwapping=!0,this.scene.events.emit("prohibitscore");for(let e=0;e<h.GRID_HEIGHT;e++)for(let t=0;t<h.GRID_WIDTH;t++)this.tilePosition[e][t]={x:l(t),y:d(e)},this.tileGrid[e][t]=this.tileFactory.createRandomTile(l(t),d(e)),this.haveTile[e][t]=!0,this.add(this.tileGrid[e][t]);this.doRandomShuffle()}reset(){this.idlingTime=0,this.firstSelectionFrame.setVisible(!1),this.secondSelectionFrame.setVisible(!1);for(let e=0;e<this.tileGrid.length;e++)for(let t=0;t<this.tileGrid[e].length;t++)this.scene.tweens.killTweensOf(this.tileGrid[e][t]),this.tileGrid[e][t].setScale(1),this.tileGrid[e][t].setX(this.tilePosition[e][t].x),this.tileGrid[e][t].setY(this.tilePosition[e][t].y)}down(e,t){return x(this,void 0,void 0,(function*(){if(this.isDown=!0,!this.onSwapping)if(this.reset(),this.firstSelectedTile)if(this.firstSelectedTile!=t){this.firstSelectionFrame.setVisible(!1),this.secondSelectedTile=t;const e=Math.floor(Math.abs(this.firstSelectedTile.x-this.secondSelectedTile.x)/h.TILE_WIDTH),i=Math.floor(Math.abs(this.firstSelectedTile.y-this.secondSelectedTile.y)/h.TILE_HEIGHT);1===e&&0===i||0===e&&1===i?(this.onSwapping=!0,yield this.swapTiles(),this.firstSelectedTile=void 0):(this.firstSelectionFrame.setVisible(!0),this.firstSelectionFrame.setPosition(t.x,t.y),this.firstSelectedTile=t)}else this.firstSelectionFrame.setVisible(!0),this.firstSelectionFrame.setPosition(t.x,t.y),this.firstSelectedTile=t;else this.firstSelectionFrame.setVisible(!0),this.firstSelectionFrame.setPosition(t.x,t.y),this.firstSelectedTile=t}))}up(e){this.isDown=!1}over(e,t){return x(this,void 0,void 0,(function*(){if(!this.onSwapping)if(this.isDown){if(this.firstSelectedTile)if(this.firstSelectedTile!=t){this.firstSelectionFrame.setVisible(!1),this.secondSelectedTile=t;const e=Math.floor(Math.abs(this.firstSelectedTile.x-this.secondSelectedTile.x)/h.TILE_WIDTH),i=Math.floor(Math.abs(this.firstSelectedTile.y-this.secondSelectedTile.y)/h.TILE_HEIGHT);1===e&&0===i||0===e&&1===i?(this.onSwapping=!0,yield this.swapTiles(),this.firstSelectedTile=void 0):(this.firstSelectionFrame.setVisible(!0),this.firstSelectionFrame.setPosition(t.x,t.y),this.firstSelectedTile=t)}else this.firstSelectionFrame.setVisible(!0),this.firstSelectionFrame.setPosition(t.x,t.y),this.firstSelectedTile=t}else t!=this.firstSelectedTile&&this.scene.add.tween({targets:t,scale:1.2,duration:100,repeat:0})}))}out(e,t){this.onSwapping||this.scene.add.tween({targets:t,scale:1,duration:100,repeat:0})}doSwapTiles(){return x(this,void 0,void 0,(function*(){let e=[];e.push(new Promise((e=>{var t,i;this.scene.add.tween({targets:this.firstSelectedTile,x:null===(t=this.secondSelectedTile)||void 0===t?void 0:t.x,y:null===(i=this.secondSelectedTile)||void 0===i?void 0:i.y,duration:200,ease:Phaser.Math.Easing.Cubic.InOut,repeat:0,yoyo:!1,onComplete:()=>{e()}})}))),e.push(new Promise((e=>{var t,i;this.scene.add.tween({targets:this.secondSelectedTile,x:null===(t=this.firstSelectedTile)||void 0===t?void 0:t.x,y:null===(i=this.firstSelectedTile)||void 0===i?void 0:i.y,duration:200,ease:Phaser.Math.Easing.Cubic.InOut,repeat:0,yoyo:!1,onComplete:()=>{e()}})}))),yield Promise.all(e)}))}swapTiles(){return x(this,void 0,void 0,(function*(){if(this.firstSelectedTile&&this.secondSelectedTile){const e={x:this.firstSelectedTile.x,y:this.firstSelectedTile.y},t={x:this.secondSelectedTile.x,y:this.secondSelectedTile.y};this.firstSelectedTile.getExplostionType()==h.MATCH_TYPES[4]&&(this.haveSpecialTile=!0),this.secondSelectedTile.getExplostionType()==h.MATCH_TYPES[4]&&(this.haveSpecialTile=!0),this.tileGrid[c(e.y)][a(e.x)]=this.secondSelectedTile,this.tileGrid[c(t.y)][a(t.x)]=this.firstSelectedTile,yield this.doSwapTiles(),this.secondSwapping?this.secondSwapping=!1:yield this.checkMatches(),this.firstSelectedTile=this.tileGrid[c(e.y)][a(e.x)],this.secondSelectedTile=this.tileGrid[c(t.y)][a(t.x)]}else this.secondSwapping=!1}))}checkMatches(){return x(this,void 0,void 0,(function*(){this.reset();const e=this.getMatches(this.tileGrid);e.length>0||this.haveSpecialTile?(this.haveSpecialTile=!1,yield this.removeTile(e),yield this.refillTile(),yield this.tileUp(),yield this.checkMatches()):(this.secondSwapping=!0,yield this.swapTiles(),yield this.tileUp(),this.scene.events.emit("allowscore"),this.onSwapping=!1)}))}refillTile(){return x(this,void 0,void 0,(function*(){this.idlingTime=0;let e=[];for(let e=0;e<8;e++)this.emptiesInColumn[e]=0;for(let t=this.tileGrid.length-1;t>=0;t--)for(let i=0;i<this.tileGrid[t].length;i++)this.haveTile[t][i]?this.emptiesInColumn[i]>0&&(e.push(this.moveWithTweenTo(this.tileGrid[t][i],t+this.emptiesInColumn[i],i)),this.tileGrid[t+this.emptiesInColumn[i]][i]=this.tileGrid[t][i],this.haveTile[t+this.emptiesInColumn[i]][i]=!0,this.haveTile[t][i]=!1):this.emptiesInColumn[i]+=1;for(let t=this.tileGrid.length-1;t>=0;t--)for(let i=0;i<this.tileGrid[t].length;i++)if(!this.haveTile[t][i]&&this.emptiesInColumn[i]>0){const s=this.tileFactory.createRandomTile(l(i),d(t-this.emptiesInColumn[i]));this.add(s),e.push(this.moveWithTweenTo(s,t,i)),this.tileGrid[t][i]=s,this.haveTile[t][i]=!0}yield Promise.all(e)}))}tileUp(){return x(this,void 0,void 0,(function*(){this.idlingTime=0,this.firstSelectedTile=void 0,this.secondSelectedTile=void 0}))}moveWithTweenTo(e,t,i){return new Promise((s=>{this.scene.add.tween({targets:e,y:d(t),ease:Phaser.Math.Easing.Bounce.Out,duration:1e3*this.emptiesInColumn[i]/8,repeat:0,yoyo:!1,onComplete:()=>{s()}})}))}removeTile(e){return x(this,void 0,void 0,(function*(){let t=[];this.firstSelectedTile&&this.secondSelectedTile&&(this.firstSelectedTile.texture&&(this.haveSpecialTile=!1,this.doMatchFiveExplosion(t,this.firstSelectedTile)),this.secondSelectedTile.getExplostionType()==h.MATCH_TYPES[4]&&(this.haveSpecialTile=!1,this.doMatchFiveExplosion(t,this.secondSelectedTile)));for(let i=0;i<e.length;i++)switch(e[i].getMatchType()){case h.MATCH_TYPES[0]:e[i].getTileList().forEach((e=>{e.getExplostionType()!=h.MATCH_TYPES[0]&&this.doExplosion(t,e)})),e[i].getTileList().forEach((e=>{t.push(e.doDestroyEffect((()=>{this.haveTile[c(e.y)][a(e.x)]=!1})))}));break;case h.MATCH_TYPES[1]:{const s=e[i].getMergedIntoTile();e[i].getTileList().forEach((r=>{const o=c(r.y),n=a(r.x);r!=s?t.push(r.doDestroyEffect((()=>{this.haveTile[o][n]=!1}),0,s.x,s.y)):(s.setExplosionType(e[i].getMatchType()),s.addGlow(16777215))}));break}case h.MATCH_TYPES[2]:{const s=e[i].getMergedIntoTile();e[i].getTileList().forEach((r=>{const o=c(r.y),n=a(r.x);r!=s?t.push(r.doDestroyEffect((()=>{this.haveTile[o][n]=!1}),0,s.x,s.y)):(s.setExplosionType(e[i].getMatchType()),s.addGlow(16777215))}));break}case h.MATCH_TYPES[3]:{const s=e[i].getMergedIntoTile();e[i].getTileList().forEach((r=>{const o=c(r.y),n=a(r.x);r!=s?t.push(r.doDestroyEffect((()=>{this.haveTile[o][n]=!1}),0,s.x,s.y)):(s.setExplosionType(e[i].getMatchType()),s.addGlow(16711680))}));break}case h.MATCH_TYPES[4]:{const s=e[i].getMergedIntoTile();s.setTileTexture(6),e[i].getTileList().forEach((r=>{const o=c(r.y),n=a(r.x);r!=s?t.push(r.doDestroyEffect((()=>{this.haveTile[o][n]=!1}),0,s.x,s.y)):(s.setExplosionType(e[i].getMatchType()),s.addGlow(16777215))}));break}}yield Promise.all(t)}))}doRandomShuffle(){this.idlingTime=0;let e=64,t=[];for(let e=0;e<this.tileGrid.length;e++)for(let i=0;i<this.tileGrid[0].length;i++)t.push(this.tileGrid[e][i]);t=T(t);const i=Phaser.Math.RND.between(1,3);let s,r=0,o=window.performance.now();s=1==i?new Phaser.Geom.Triangle(346,150,100,520,592,520):2==i?new Phaser.Geom.Circle(346,346,246):new Phaser.Geom.Rectangle(121,121,450,450),this.placeOnShape(t,s),this.scene.tweens.add({targets:s,scale:1,ease:"Quintic.easeInOut",duration:2e3,onUpdate:()=>{const e=window.performance.now(),i=e-o;if(o=e,r+i>15){r=0;const e=t.shift();e&&(t.push(e),this.placeOnShape(t,s))}else r+=i},onComplete:()=>{for(let i=0;i<this.tileGrid.length;i++)for(let s=0;s<this.tileGrid[0].length;s++)this.tileGrid[i][s]=t[i*this.tileGrid.length+s],this.scene.add.tween({targets:t[i*this.tileGrid.length+s],x:this.tilePosition[i][s].x,y:this.tilePosition[i][s].y,duration:700,delay:200,onComplete:()=>{e--,0==e&&this.checkMatches()}})}})}placeOnShape(e,t){t instanceof Phaser.Geom.Triangle?Phaser.Actions.PlaceOnTriangle(e,t):t instanceof Phaser.Geom.Circle?Phaser.Actions.PlaceOnCircle(e,t):t instanceof Phaser.Geom.Rectangle&&Phaser.Actions.PlaceOnRectangle(e,t)}getMatches(e){this.idlingTime=0;const t=[],i=[];let s=[],r=[],o=[];for(let t=0;t<e.length;t++){o=[];for(let r=0;r<e[t].length;r++)r<e[t].length-2&&e[t][r]&&e[t][r+1]&&e[t][r+2]&&e[t][r].texture.key===e[t][r+1].texture.key&&e[t][r+1].texture.key===e[t][r+2].texture.key&&(o.length>0&&-1==o.indexOf(e[t][r])&&(i.push(o),s.push(!1),o=[]),-1==o.indexOf(e[t][r])&&o.push(e[t][r]),-1==o.indexOf(e[t][r+1])&&o.push(e[t][r+1]),-1==o.indexOf(e[t][r+2])&&o.push(e[t][r+2]));o.length>0&&(i.push(o),s.push(!1))}for(let t=0;t<e[0].length;t++){o=[];for(let r=0;r<e.length;r++)r<e.length-2&&e[r][t]&&e[r+1][t]&&e[r+2][t]&&e[r][t].texture.key===e[r+1][t].texture.key&&e[r+1][t].texture.key===e[r+2][t].texture.key&&(o.length>0&&-1==o.indexOf(e[r][t])&&(i.push(o),s.push(!1),o=[]),-1==o.indexOf(e[r][t])&&o.push(e[r][t]),-1==o.indexOf(e[r+1][t])&&o.push(e[r+1][t]),-1==o.indexOf(e[r+2][t])&&o.push(e[r+2][t]));o.length>0&&(i.push(o),s.push(!1))}for(let e=0;e<i.length-1;e++){if(s[e])continue;const o=u(i[e],r);if(!(o.length<3))for(let n=e+1;n<i.length;n++){if(s[n])continue;const h=u(i[n],r);if(h.length<3)continue;const l=p(o,h),a=g(o,h);if(l.length>0){s[e]=!0,s[n]=!0,this.firstSelectedTile&&a.indexOf(this.firstSelectedTile)>-1?t.push(new y(a,this.firstSelectedTile)):this.secondSelectedTile&&a.indexOf(this.secondSelectedTile)>-1?t.push(new y(a,this.secondSelectedTile)):t.push(new y(a,l[0])),a.forEach((e=>{r.push(e)}));break}}}for(let e=0;e<i.length;e++){if(s[e])continue;const o=u(i[e],r);if(!(o.length<3)){if(this.firstSelectedTile&&o.indexOf(this.firstSelectedTile)>-1)t.push(new y(o,this.firstSelectedTile));else if(this.secondSelectedTile&&o.indexOf(this.secondSelectedTile)>-1)t.push(new y(o,this.secondSelectedTile));else{const e=o.length;t.push(new y(o,o[Math.floor(e/2)]))}o.forEach((e=>{r.push(e)}))}}return t}displayHint(){let e=!1;for(let t=0;t<this.tileGrid.length;t++){for(let i=0;i<this.tileGrid[0].length;i++){if(this.doHintSwap(t,i,t+1,i)){this.firstSelectionFrame.setPosition(l(i),d(t)),this.secondSelectionFrame.setPosition(l(i),d(t+1)),this.firstSelectionFrame.setVisible(!0),this.secondSelectionFrame.setVisible(!0),e=!0;break}if(this.doHintSwap(t,i,t-1,i)){this.firstSelectionFrame.setPosition(l(i),d(t)),this.secondSelectionFrame.setPosition(l(i),d(t-1)),this.firstSelectionFrame.setVisible(!0),this.secondSelectionFrame.setVisible(!0),e=!0;break}if(this.doHintSwap(t,i,t,i+1)){this.firstSelectionFrame.setPosition(l(i),d(t)),this.secondSelectionFrame.setPosition(l(i+1),d(t)),this.firstSelectionFrame.setVisible(!0),this.secondSelectionFrame.setVisible(!0),e=!0;break}if(this.doHintSwap(t,i,t,i-1)){this.firstSelectionFrame.setPosition(l(i),d(t)),this.secondSelectionFrame.setPosition(l(i-1),d(t)),this.firstSelectionFrame.setVisible(!0),this.secondSelectionFrame.setVisible(!0),e=!0;break}}if(e)break}return e}doHintSwap(e,t,i,s){if(i<0||i>=this.tileGrid.length)return!1;if(s<0||s>=this.tileGrid[0].length)return!1;let r=this.tileGrid[e][t];this.tileGrid[e][t]=this.tileGrid[i][s],this.tileGrid[i][s]=r;let o=this.haveMatch();return r=this.tileGrid[i][s],this.tileGrid[i][s]=this.tileGrid[e][t],this.tileGrid[e][t]=r,o}haveMatch(){for(let e=0;e<this.tileGrid.length;e++)for(let t=0;t<this.tileGrid[e].length;t++)if(t<this.tileGrid[e].length-2&&this.tileGrid[e][t]&&this.tileGrid[e][t+1]&&this.tileGrid[e][t+2]&&this.tileGrid[e][t].texture.key===this.tileGrid[e][t+1].texture.key&&this.tileGrid[e][t+1].texture.key===this.tileGrid[e][t+2].texture.key)return!0;for(let e=0;e<this.tileGrid[0].length;e++)for(let t=0;t<this.tileGrid.length;t++)if(t<this.tileGrid.length-2&&this.tileGrid[t][e]&&this.tileGrid[t+1][e]&&this.tileGrid[t+2][e]&&this.tileGrid[t][e].texture.key===this.tileGrid[t+1][e].texture.key&&this.tileGrid[t+1][e].texture.key===this.tileGrid[t+2][e].texture.key)return!0;return!1}doIdling(){const e=Phaser.Math.RND.between(1,2);for(let t=0;t<h.GRID_WIDTH;t++)for(let i=0;i<h.GRID_HEIGHT;i++)this.scene.add.tween({targets:this.groundGrid[t][i],y:this.groundGrid[t][i].y+10,alpha:.2,duration:200,delay:1==e?100*(t+i):150*i,yoyo:!0,repeat:0,onComplete:()=>{this.idlingTime=0}})}update(e,t){this.idlingTime>5e3?(this.idlingTime=0,this.displayHint()?this.doIdling():this.restart()):this.idlingTime+=t}doExplosion(e,t){this.idlingTime=0,t.getExplostionType()==h.MATCH_TYPES[1]||t.getExplostionType()==h.MATCH_TYPES[2]?this.doMatchFourExplosion(e,t):this.doMatchFiveExplosion(e,t)}doMatchFourExplosion(e,t){this.idlingTime=0;const i=c(t.y),s=a(t.x);if(t.getExplostionType()==h.MATCH_TYPES[1])for(let s=0;s<h.GRID_WIDTH;s++)e.push(this.tileGrid[i][s].doDestroyEffect((()=>{this.haveTile[i][s]=!1}),f(t,this.tileGrid[i][s])));else if(t.getExplostionType()==h.MATCH_TYPES[2])for(let i=0;i<h.GRID_HEIGHT;i++)e.push(this.tileGrid[i][s].doDestroyEffect((()=>{this.haveTile[i][s]=!1}),f(t,this.tileGrid[i][s])))}doMatchFiveExplosion(e,t){this.idlingTime=0;const i=c(t.y),s=a(t.x);if(t.getExplostionType()==h.MATCH_TYPES[3])for(let i=0;i<h.GRID_HEIGHT;i++)for(let s=0;s<h.GRID_WIDTH;s++)this.tileGrid[i][s].texture==t.texture&&e.push(this.tileGrid[i][s].doDestroyEffect((()=>{this.haveTile[i][s]=!1})));else if(t.getExplostionType()==h.MATCH_TYPES[4])for(let t=i-1;t<=i+1;t++)for(let i=s-1;i<=s+1;i++)t>=0&&t<h.GRID_WIDTH&&i>=0&&i<h.GRID_WIDTH&&e.push(this.tileGrid[t][i].doDestroyEffect((()=>{this.haveTile[t][i]=!1})))}}class w extends Phaser.GameObjects.Container{constructor(e,t,i){super(e,t,i),e.add.existing(this),this.currentScore=0,this.currentMilestoneId=0,this.initProgressBar(),this.initMilestoneBoard(),this.add(this.progressFrame),this.add(this.progressHead),this.add(this.progressTail),this.add(this.progressBody),this.add(this.progressScoreFrame),this.add(this.progressScore),this.add(this.milestoneBoard),this.add(this.milestoneWord),this.add(this.milestoneScore)}initProgressBar(){this.scene.events.on("tiledestroyed",(e=>{let t=!1;this.currentScore+e>=h.MILESTONES[this.currentMilestoneId]?this.currentScore!=h.MILESTONES[this.currentMilestoneId]&&(t=!0,this.currentScore=h.MILESTONES[this.currentMilestoneId]):this.currentScore+=e,this.scene.add.tween({targets:this.progressBody,scaleX:this.currentScore/h.MILESTONES[this.currentMilestoneId]*2.085,duration:200,onUpdate:()=>{this.progressTail.setX(15+this.progressBody.displayWidth),this.setDisplayProgressScore(this.currentScore)},onComplete:()=>{this.setDisplayProgressScore(this.currentScore),t&&this.scene.events.emit("milestoneachieved",this.currentMilestoneId)}})})),this.progressFrame=this.scene.add.image(0,125,"progress-frame").setOrigin(0),this.progressHead=this.scene.add.image(9,140,"progress-head").setOrigin(0),this.progressTail=this.scene.add.image(19,140,"progress-tail").setOrigin(0),this.progressBody=this.scene.add.image(16,140,"progress-body").setScale(0,1).setOrigin(0),this.progressScoreFrame=this.scene.add.image(100,220,"progress-score").setOrigin(0),this.progressScore=this.scene.add.text(120,230,String(this.currentScore),{fontFamily:"garamond",fontStyle:"bold",fontSize:64,color:"#efe1bb"}),this.setDisplayProgressScore(this.currentScore)}initMilestoneBoard(){this.milestoneBoard=this.scene.add.image(720,0,"progress-milestone").setOrigin(0),this.milestoneWord=this.scene.add.text(825,60,"MILESTONE",{fontFamily:"garamond",fontStyle:"bold",fontSize:64,color:"#efe1bb"}),this.milestoneScore=this.scene.add.text(0,160,String(h.MILESTONES[this.currentMilestoneId]),{fontFamily:"garamond",fontStyle:"bold",fontSize:100,color:"#efe1bb"}),this.setDisplayMilestoneScore()}finish(){this.scene.add.tween({targets:this.progressBody,scaleX:0,duration:1e3,onUpdate:()=>{this.progressTail.setX(15+this.progressBody.displayWidth),this.setDisplayProgressScore(Math.floor(this.scaleX/2.085*this.currentScore)),this.currentScore=Math.floor(this.scaleX/2.085*this.currentScore)},onComplete:()=>{this.currentScore=0,this.setDisplayProgressScore(this.currentScore)}})}restart(){this.currentMilestoneId+=1,this.currentMilestoneId>=10&&(this.currentMilestoneId=0),this.setDisplayMilestoneScore()}setDisplayProgressScore(e){this.progressScore.setText(String(e)),this.progressScore.setX(275-this.progressScore.displayWidth/2)}setDisplayMilestoneScore(){this.milestoneScore.setText(String(h.MILESTONES[this.currentMilestoneId])),this.milestoneScore.setX(1020-this.milestoneScore.displayWidth/2)}}class v extends Phaser.Scene{constructor(){super("gameplay")}create(){this.cameras.main.setBackgroundColor(16777215),this.add.image(0,0,"background").setOrigin(0),this.gameBoard=new E(this,60,260),this.progressInfo=new w(this,75,60).setScale(.5),this.lightDrop=this.add.particles(0,0,"particle",{x:{min:0,max:800},lifespan:1e4,speed:{min:100,max:200},scale:{start:1,end:1},blendMode:"ADD",quantity:1,frequency:100}),this.add.zone(0,0,800,1e3).setOrigin(0),this.scene.launch("achievement")}update(e,t){this.gameBoard.update(e,t)}finish(){this.lightDrop.setVisible(!1),this.lightDrop.pause(),this.cameras.main.alpha=.5,this.gameBoard.finish(),this.progressInfo.finish()}restart(){this.lightDrop.setVisible(!0),this.lightDrop.resume(),this.cameras.main.alpha=1,this.gameBoard.restart(),this.progressInfo.restart()}}class I extends Phaser.GameObjects.Particles.Particle{constructor(e){super(e),this.drag=.99,this.swayAmplitude=Phaser.Math.Between(5,7),this.swayFrequency=Phaser.Math.FloatBetween(.01,.03),this.swayPhase=Phaser.Math.FloatBetween(0,2*Math.PI),this.maxVeY=Number.MAX_VALUE,this.isDropped=!1,this.isDown=!1}update(e,t,i){const s=super.update(e,t,i),r=e/1e3;return this.maxVeY>this.velocityY&&(this.maxVeY=this.velocityY),this.swayPhase+=this.swayFrequency,Math.abs(this.velocityY)<.999*Math.abs(this.maxVeY)?(this.isDown||(this.velocityY=Phaser.Math.Linear(this.velocityY,0,3*r)),(this.velocityY>100||this.isDown)&&(this.alpha-=.2*r,this.velocityY=100,this.isDown=!0),this.x+=Math.sin(this.swayPhase)*this.swayAmplitude*r,this.angle+=100*r,this.isDropped=!0):this.isDropped||(this.angle+=30*r,this.velocityY*=this.drag),this.velocityX=Phaser.Math.Linear(this.velocityX,0,3*r),s}}const G=I;class M{constructor(e,t,i){this.scene=e,this.createEmitter(t,i)}createEmitter(e,t){const i={lifespan:2e3,speed:{min:1500,max:3500},accelerationY:1e3,angle:{min:e,max:t},alpha:{start:1,end:0},quantity:40,scaleX:{min:.5,max:1},scaleY:{min:.5,max:1},particleClass:G};this.emitter=this.scene.add.particles(0,0,"leaf-particle",i),this.emitter.setDepth(10),this.emitter.setScale(.8),this.emitter.stop()}burst(e,t){this.emitter.setPosition(e,t),this.emitter.explode()}}class P extends Phaser.Scene{constructor(){super("achievement")}preload(){}create(){this.onWaiting=!1,this.waitingTime=0,this.milestoneBoard=this.add.image(400,0,"progress-achievement").setScale(.6).setVisible(!1),this.achievementWord=this.add.text(270,0,"ACHIEVEMENT",{fontFamily:"garamond",fontStyle:"bold",fontSize:32,color:"#efe1bb"}).setVisible(!1),this.milestoneScore=this.add.text(0,0,"0",{fontFamily:"garamond",fontStyle:"bold",fontSize:80,color:"#efe1bb"}).setVisible(!1),this.scene.get("gameplay").events.on("milestoneachieved",(e=>{this.sound.play("victory"),this.onWaiting=!0,setTimeout((()=>{this.doConfetti()}),500),this.dropMilestoneBoard(e);const t=this.scene.get("gameplay");t instanceof v&&t.finish()}))}update(e,t){this.onWaiting&&(this.waitingTime>3e3?(this.waitingTime=0,this.onWaiting=!1,this.add.tween({targets:this.milestoneBoard,y:1400,duration:1e3,ease:Phaser.Math.Easing.Back.InOut}),this.add.tween({targets:this.achievementWord,y:1400,duration:1e3,ease:Phaser.Math.Easing.Back.InOut}),this.add.tween({targets:this.milestoneScore,y:1400,duration:1e3,ease:Phaser.Math.Easing.Back.InOut,onComplete:()=>{this.milestoneBoard.setVisible(!1),this.achievementWord.setVisible(!1);const e=this.scene.get("gameplay");e instanceof v&&e.restart()}})):this.waitingTime+=t)}doConfetti(){this.leftConfetti=new M(this,-120,-30),this.rightConfetti=new M(this,210,300),this.leftConfetti.burst(-50,900),this.rightConfetti.burst(850,900)}dropMilestoneBoard(e){this.milestoneBoard.setVisible(!0),this.achievementWord.setVisible(!0),this.milestoneScore.setVisible(!0),this.milestoneScore.setText(String(h.MILESTONES[e])),this.milestoneScore.setX(400-this.milestoneScore.displayWidth/2),this.milestoneBoard.setY(-300),this.achievementWord.setY(-300),this.milestoneScore.setY(-300),this.add.tween({targets:this.milestoneBoard,y:600,duration:1e3,ease:Phaser.Math.Easing.Back.InOut}),this.add.tween({targets:this.achievementWord,y:400,duration:1e3,ease:Phaser.Math.Easing.Back.InOut}),this.add.tween({targets:this.milestoneScore,y:550,duration:1e3,ease:Phaser.Math.Easing.Back.InOut})}}const b={title:"Candy crush",url:"https://github.com/digitsensitive/phaser3-typescript",version:"0.0.1",width:800,height:1e3,type:Phaser.AUTO,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},parent:"game",scene:[o,n,v,P],backgroundColor:"#de3412",render:{pixelArt:!1,antialias:!0}};class H extends r().Game{constructor(e){super(e)}}window.addEventListener("load",(()=>{new H(b)}))}},i={};function s(e){var r=i[e];if(void 0!==r)return r.exports;var o=i[e]={exports:{}};return t[e].call(o.exports,o,o.exports,s),o.exports}s.m=t,e=[],s.O=(t,i,r,o)=>{if(!i){var n=1/0;for(d=0;d<e.length;d++){for(var[i,r,o]=e[d],h=!0,l=0;l<i.length;l++)(!1&o||n>=o)&&Object.keys(s.O).every((e=>s.O[e](i[l])))?i.splice(l--,1):(h=!1,o<n&&(n=o));if(h){e.splice(d--,1);var a=r();void 0!==a&&(t=a)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[i,r,o]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={792:0};s.O.j=t=>0===e[t];var t=(t,i)=>{var r,o,[n,h,l]=i,a=0;if(n.some((t=>0!==e[t]))){for(r in h)s.o(h,r)&&(s.m[r]=h[r]);if(l)var d=l(s)}for(t&&t(i);a<n.length;a++)o=n[a],s.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return s.O(d)},i=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var r=s.O(void 0,[96],(()=>s(852)));r=s.O(r)})();