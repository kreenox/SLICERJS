function Vecteur3D(x, y, z){
	
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.getNorme = function(){
		return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
	};
	
	this.prodScal = function(v){
		if(!(v instanceof Vecteur))
			throw "erreur de parametre";
		return new Vecteur(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
	};
}

function Vertex(x, y, z){
	
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.equivalent = function(v){
		if(!(v instanceof Vertex))
			return false;
		if(this.x == v.x)
			if(this.y == v.y)
				if(this.z == v.z)
					return true;
		return false;
	}
}