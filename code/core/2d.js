
function point2D(x, y){
	
	this.x = x;
	this.y = y;
	
	this.equivalent = function(p){
		if(!(p instanceof Point2D))
			return false;
		if(this.x == p.x)
			if(this.y == p.y)
				return true;
		return false;
	};
}