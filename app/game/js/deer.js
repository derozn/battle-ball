function Deer(_opts){
	Character.call(this, {
		id:Math.random(),
		x: _opts&&_opts.x || (Math.random() * (3000-512)+512),
		y: _opts&&_opts.y || 0,
		w:_opts&&_opts.w || 45,
		h:_opts&&_opts.h || 43,
		sw:_opts&&_opts.sw || 45,
		sh:_opts&&_opts.sh || 43,
		velocity:new Vector(_opts&&_opts.vx || 1, _opts&&_opts.vy || 0),
		state:Character.states['Deer'].INITIAL,
		type:'Deer'
	});

	this.type = 'Deer';
	this.powerUpState = Character.POWERUPS['Deer'].INITIAL;



	this.layer = 11;
	this.health = 100;
	this.maxhealth = 100;
	this.hitPlayer = false;
	this.strength = 10;

	this.coins = [];
	this.generateCoins(2);

};
Deer.prototype = Object.create(Character.prototype);
Deer.prototype.constructor=Deer;
Deer.prototype.parent = Character.prototype;

Deer.prototype.Jump=function(_type){
	this.switchState(Character.states[this.type].JUMPING);
	this.velocity.y = 2;// _type ? 2 : 3;
};


Deer.prototype.Update=function(){
	this.parent.Update.call(this);
	
	if(!this.inView)return false;

	this.evilWorld();

	if(this.dead){
		for(var i = 0, len = this.particles.length; i < len; i++){
			this.particles[i].Update();
		}

		for(var i = 0, len = this.coins.length; i < len; i++){
			this.coins[i].Update();
		}
	}

	if(debug || this.dead)return false;

	for(var i = 0, len = Math.floor(this.velocity.x); i < len; i++){
		var _c = this.checkCollision({x:(this.position.x - 1),y:this.position.y,side:Character.DIRECTIONS.LEFT});

		if(_c){
			if(g_Level.triggerHouse!==null&&_c===g_Level.houses[g_Level.triggerHouse]){  this.health = 0; this.Trigger(this); }
			if(g_Level.isOnRoofTops){
				this.Logic(Character.ENEMYLOGIC.JUMP);
				this.switchState(Character.states[this.type].JUMPING);
				return true;
			};
		};
		this.position.x -= 0.2;
		this.switchState(Character.states[this.type].RUNNING);
	};
};
Deer.prototype.Render=function(){

	this.parent.Render.call(this);

	if(debug){
		ctx.strokeStyle='#ff0000';
		ctx.strokeRect(this.position.x-g_Level.viewport.x,this.position.y-g_Level.viewport.y,this.size.x,this.size.y);
	}

	if(!this.dead)return false;

	for(var i = 0, len = this.coins.length; i < len; i++){this.coins[i].Render(); };

	for(var i = 0, len = this.particles.length; i < len; i++){
		this.particles[i].Render();
	};


};
/*Deer.prototype.RandomLogicAttr=function(){
	return (Math.round(Math.random() * Object.keys(Character.ENEMYLOGIC).length-1));
};*/
Deer.prototype.Logic=function(type){
	switch(type /*|| this.RandomLogicAttr()*/){

		case Character.ENEMYLOGIC.JUMP:
			this.Jump(type);
		break;

		case Character.ENEMYLOGIC.INVULNERABLE:
			//TODO: INVULNERABLE
		break;

		default:
		break;

	};
};
Deer.prototype.Restart=function(){
	this.hitPlayer = false;
	this.position.x = -1000;
	this.position.y = -1000;
	// this.oldState = Character.states['Deer'].INITIAL;
	this.switchState(Character.states['Deer'].INITIAL,true);
	this.velocity.x = 1;
	this.velocity.y = 0;
	this.parent.Restart.call(this);
	this.health = 100;
	for(var i = 0, len = this.coins.length; i < len; i++)this.coins[i].Restart();
	this.Render();
}
Deer.prototype.evilWorld=function(){
	this.parent.evilWorld.call(this);
};
Deer.prototype.Dead=function(){
	this.parent.Dead.call(this);
	for(var i = 0, len = this.coins.length; i < len; i++)this.coins[i].Spawn({x:this.position.x, y:this.position.y});
};	
Deer.prototype.Trigger=function(obj){
	this.parent.Trigger.call(this, obj);

	if(obj.type==='Player'){
		if(this.hitPlayer){return true;}
		this.hitPlayer = true;
		g_Player.Trigger(this);
	}

	if(this.health <= 0)this.Dead();
};