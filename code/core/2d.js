
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

//retourne un polygone rectengulaire qui contient tout les points du polygone passé en parametre
function buildABoundary(poly){
	var Max = new Point2D(poly[0].x, poly[0].y);
	var min = new Point2D(poly[0].x, poly[0].y);
	
	for(let n = 0; n < poly.length; n++)
	{
		if(max.x < poly[n].x)
			max.x = poly[n].x;
		if(max.y < poly[n].y)
			max.y = poly[n].y;
		if(min.x > poly[n].x)
			min.x = poly[n].x;
		if(min.y > poly[n].y)
			min.y = poly[n].y;
	}
	
	return [new Point2D(min.x, min.y), new Point2D(min.x, max.y), new Point2D(max.x, max.y), new Point2D(max.x, min.y)];
}