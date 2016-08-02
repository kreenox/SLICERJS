
function slice(model, Zh)//cette fonction appele le slicer adapté au modele
{
	if(model instanceof STLModel)
		return sliceSTL(model, Zh);
}


//peut etre mettre les lsicers dans differents fichier plus tard

function sliceSTL(model, Zh){//on fait UNE tranche
	
	var res = [];
	var templine;
	//on cherche une face tranchée par le plan
	for(let n = 0; n < model.facetab.length; n++)
		if(!model.facetab[n].used)//si ma tranche n'est pas déjà utilisée
		{
			if((model.facetab[n].v1.z >= Zh && model.facetab[n].v2.z <= Zh) || 
				(model.facetab[n].v2.z >= Zh && model.facetab[n].v1.z <= Zh) || 
				(model.facetab[n].v2.z >= Zh && model.facetab[n].v3.z <= Zh) || 
				(model.facetab[n].v3.z >= Zh && model.facetab[n].v2.z <= Zh) || 
				(model.facetab[n].v3.z >= Zh && model.facetab[n].v1.z <= Zh) || 
				(model.facetab[n].v1.z >= Zh && model.facetab[n].v3.z <= Zh)){
				templine = sliceFace(model, Zh, model.facetab[n]);
				if(templine == undefined || templine == null){
					model.facetab[n].used = true;
					continue;
				}
				res.push(templine.p1);
				if(!(templine.p1.equivalent(templine.p2)))
					res.push(templine.p2);
				buildpoly(model, res, model.facetab[n], Zh);
			}
			else model.facetab[n].used = true;
		}
		
	return res;
	
	var buildpoly = function(model, poly, start, Zh){
		var actuel = start;
		var templine;
		while(model.facetab[actuel.next[0]].used != true || model.facetab[actuel.next[1].used != true || model.facetab[actuel.next[2]].used != true/*reste a trouver le meilleur*/){
			for(let n = 0; n < actuel.next.length; n++)//pour chaques suivant
			{
				var face = model.facetab[actuel.next[n]];
				if(!face.used)
				{//si la face n'a pa éte utilisée on verifie si elle est coupée par le plan
					if((face.v1.z >= Zh && face.v2.z <= Zh) ||
						face.v2.z >= Zh && face.v1.z <= Zh) ||
						face.v2.z >= Zh && face.v3.z <= Zh) ||
						face.v3.z >= Zh && face.v2.z <= Zh) ||
						face.v3.z >= Zh && face.v1.z <= Zh) ||
						face.v1.z >= Zh && face.v3.z <= Zh)){
						templine = sliceFace(face, Zh, model);
						if(templine == undefined || templine == null)
							continue;
						else if(!templine.p1.equivalent(poly[poly.length - 1])){
							if(templine.p2.equivalent(poly[0]))
								return;
							if(!templine.p1.equivalent(templine.p2))
								poly.push(templine.p2);
							actuel = face;
							break;
						}
						else if(templine.p2.equivalent(poly[poly.length - 1])){
							if(templine.p1.equivalent(poly[0]))
								return;
							if(!templine.p1.equivalent(templine.p2))
								poly.push(templine.p1);
							actuel = face;
							break;
						}
					}
					else face.used = true;//si la face n'est pas coupéee par le plan on la marque comme utilisée
				}
			}
		}
	};
	
	var sliceFace = function(model, Zh, face){
		//les 4 cas(le cas ou la face n'est pas tranche n'est pas pris en compte)
		//la face est dans le plan(pour le moment on fait rien)
		if(face.v1.z == Zh && face.v2.z == Zh && face.v3.z == Zh){
			face.used = true;
			return;
		}
		//la face a un seul sommet sur le plan
		else if(face.v1.z == Zh && face.v2.z != Zh && face.v3.z != Zh){
			face.used = true;
			return new Ligne(new Point2D(face.v1.x, face.v1.y), new Point2D(face.v1.x, face.v1.y));
		}
		else if(face.v1.z != Zh && face.v2.z == Zh && face.v3.z != Zh){
			face.used = true;
			return new Ligne(new Point2D(face.v2.x, face.v2.y), new Point2D(face.v2.x, face.v2.y));
		}
		else if(face.v1.z != Zh && face.v2.z != Zh && face.v3.z == Zh){
			face.used = true;
			return new Ligne(new Point2D(face.v3.x, face.v3.y), new Point2D(face.v3.x, face.v3.y));
		}
		//la face a un cote dans le plan
		//on renvoi la ligne et on marque la face adjacente comme utilisée
		else if(face.v1.z == Zh && face.v2.z == Zh){
			face.used == true;
			for(let n = 0; n < 3; n++)
				if((face.v1.equivalent(mod.facetab[face.next[n]].v1) && face.v2.equivalent(mod.facetab[face.next[n]].v2)) || (face.v1.equivalent(mod.facetab[face.next[n]].v2) && face.v2.equivalent(mod.facetab[face.next[n]].v1)) ||
					(face.v1.equivalent(mod.facetab[face.next[n]].v2) && face.v2.equivalent(mod.facetab[face.next[n]].v3)) || (face.v1.equivalent(mod.facetab[face.next[n]].v3) && face.v2.equivalent(mod.facetab[face.next[n]].v2)) ||
					(face.v1.equivalent(mod.facetab[face.next[n]].v3) && face.v2.equivalent(mod.facetab[face.next[n]].v1)) || (face.v1.equivalent(mod.facetab[face.next[n]].v1) && face.v2.equivalent(mod.facetab[face.next[n]].v3)))
					mod.facetab[face.next[n]].used == true;
			return new Ligne(new Point2D(face.v1.x, face.v1.y), new Point2D(face.v2.x, face.v2.y));
		}
		else if(face.v2.z == Zh && face.v3.z == Zh){
			face.used == true;
			for(let n = 0; n < 3; n++)
				if((face.v2.equivalent(mod.facetab[face.next[n]].v1) && face.v3.equivalent(mod.facetab[face.next[n]].v2)) || (face.v2.equivalent(mod.facetab[face.next[n]].v2) && face.v3.equivalent(mod.facetab[face.next[n]].v1)) ||
					(face.v2.equivalent(mod.facetab[face.next[n]].v2) && face.v3.equivalent(mod.facetab[face.next[n]].v3)) || (face.v2.equivalent(mod.facetab[face.next[n]].v3) && face.v3.equivalent(mod.facetab[face.next[n]].v2)) ||
					(face.v2.equivalent(mod.facetab[face.next[n]].v3) && face.v3.equivalent(mod.facetab[face.next[n]].v1)) || (face.v2.equivalent(mod.facetab[face.next[n]].v1) && face.v3.equivalent(mod.facetab[face.next[n]].v3)))
					mod.facetab[face.next[n]].used == true;
			return new Ligne(new Point2D(face.v2.x, face.v2.y), new Point2D(face.v3.x, face.v3.y));
		}
		else if(face.v3.z == Zh && face.v1.z == Zh){
			face.used == true;
			for(let n = 0; n < 3; n++)
				if((face.v3.equivalent(mod.facetab[face.next[n]].v1) && face.v1.equivalent(mod.facetab[face.next[n]].v2)) || (face.v3.equivalent(mod.facetab[face.next[n]].v2) && face.v1.equivalent(mod.facetab[face.next[n]].v1)) ||
					(face.v3.equivalent(mod.facetab[face.next[n]].v2) && face.v1.equivalent(mod.facetab[face.next[n]].v3)) || (face.v3.equivalent(mod.facetab[face.next[n]].v3) && face.v1.equivalent(mod.facetab[face.next[n]].v2)) ||
					(face.v3.equivalent(mod.facetab[face.next[n]].v3) && face.v1.equivalent(mod.facetab[face.next[n]].v1)) || (face.v3.equivalent(mod.facetab[face.next[n]].v1) && face.v1.equivalent(mod.facetab[face.next[n]].v3)))
					mod.facetab[face.next[n]].used == true;
			return new Ligne(new Point2D(face.v3.x, face.v3.y), new Point2D(face.v1.x, face.v1.y));
		}
		else{//la face est coupée franchement
			var l1, l2, l3, t1, t2, t3;
			l1 = new Ligne(face.v1, face.v2);
			l2 = new Ligne(face.v2, face.v3);
			l3 = new Ligne(face.v3, face.v1);
			t1 = sliceline(l1, Zh);
			t2 = sliceline(l2, Zh);
			t3 = sliceline(l3, Zh);
			if(t1 <= 1 && t1 >= 0 && t2 <= 1 && t2 >= 0){
				face.used = true;
				return new Ligne(pointOf(l1, t1), pointOf(l2, t2);
			}
			else if(t2 <= 1 && t2 >= 0 && t3 <= 1 && t3 >= 0){
				face.used = true;
				return new Ligne(pointOf(l2, t2), pointOf(l3, t3));
			}
			else if(t3 <= 1 && t3 >=0 && t1 <= 1 && t1 >= 0){
				face.used = true;
				return new Ligne(pointOf(l3, t2), pointOf(l1, t1));
			}
		}
	};
	
	var sliceline = function(l, Zh){
		if(l.p1.z == l.p2.z)
			return Infinity;//ligne paralelle au plan
		return ((-l.p1.z + Zh) / (l.p2.z - l.p1.z));
	};
	
	var pointOf = function(l, t){
		return new Point2D(corrpre(l.p1.x + (l.p2.x - l.p1.x) * t, 3), corrpre(l.p1.y + (.p2.y - l.p1.y) * t, 3));
	};
	
	
};