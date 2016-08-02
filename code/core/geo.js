
function Ligne(p1, p2){
	this.p1 = p1;
	this.p2 = p2;
	
	this.equivalent(l){
		if(!(l instanceof Ligne))
			return false;
		return (this.p1.equivalent(l.p1) && this.p2.equivalent(l.p2)) || (this.p1.equivalent(l.p2) && this.p2.equivalent(l.p1));
	};
	
	this.longueur = function(){
		if(this.p1.z == undefined)//2d
			return ((this.p2.x - this.p1.x) * (this.p2.x - this.p1.x)) + ((this.p2.y - this.p1.y) * (this.p2.y - this.p1.y));
		//3d
		return ((this.p2.x - this.p1.x) * (this.p2.x - this.p1.x)) + ((this.p2.y - this.p1.y) * (this.p2.y - this.p1.y)) + ((this.p2.z - this.p1.z) * (this.p2.z - this.p1.z));
	};
}