
function STLFace(n, v1, v2, v3){
	
	this.n = n;
	this.v1 = v1;
	this.v2 = v2;
	this.v3 = v3;
	
	//trouvé dans cura
	this.next = [];
	this.num;
	this.used = false;
}

function STLModel(){
	
	this.facetab = [];
	//pour la boundaryBox : m => min; p => max
	this.xm;
	this.xp;
	this.ym;
	this.yp;
	this.zm;
	this.zp;
	
	this.add = function(f){
		//on verifie pas pour le moment
		this.facetab.push(f);
		//on met a jour le boundaryBox
		//a deplacer dans une autre methode plus tard
		if(xm == undefined)
		{
			this.xm = this.xp = f.v1.x;
			this.ym = this.yp = f.v1.y;
			this.zm = this.zp = f.v1.z;
		}
		
		//les min de la boundaryBox
		if(this.xm > f.v1.x)
			this.xm = f.v1.x;
		if(this.xm > f.v2.x)
			this.xm = f.v2.x;
		if(this.xm > f.v3.x)
			this.xm = f.v3.x;
		if(this.ym > f.v1.y)
			this.ym = f.v1.y;
		if(this.ym > f.v2.y)
			this.ym = f.v2.y;
		if(this.ym > f.v3.y)
			this.ym = f.v3.y;
		if(this.zm > f.v1.z)
			this.zm = f.v1.z;
		if(this.zm > f.v2.z)
			this.zm = f.v2.z;
		if(this.zm > f.v3.z)
			this.zm = f.v3.z;
		
		if(this.xp < f.v1.x)
			this.xp = f.v1.x;
		if(this.xp < f.v2.x)
			this.xp = f.v2.x;
		if(this.xp < f.v3.x)
			this.xp = f.v3.x;
		if(this.yp < f.v1.y)
			this.yp = f.v1.y;
		if(this.yp < f.v2.y)
			this.yp = f.v2.y;
		if(this.yp < f.v3.y)
			this.yp = f.v3.y;
		if(this.zp < f.v1.z)
			this.zp = f.v1.z;
		if(this.zp < f.v2.z)
			this.zp = f.v2.z;
		if(this.zp < f.v3.z)
			this.zp = f.v3.z;
		
	};
	
	this.clear = function(){
		this.facetab.length = 0;
		this.xm = this.ym = this.zm = this.xp = this.yp = this.zp = undefined;
	};
	
	this.findNext = function(){
		for(let n = 0; n < this.facetab.length; n++)
			for(let m = n + 1; m < this.facetab.length; n++)
			{
				if(this.facetab[n].next.length == 3)
					break;// si la face à déjà ses trois voisins on arrete
				if((this.facetab[n].v1.equivalent(this.facetab[m].v1) && this.facetab[n].v2.equivalent(this.facetab[m].v2)) ||
					(this.facetab[n].v1.equivalent(this.facetab[m].v2) && this.facetab[n].v2.equivalent(this.facetab[m].v1))){
					this.facetab[n].next.push(m);
					this.facetab[m].next.push(n);
				}
				else if((this.facetab[n].v1.equivalent(this.facetab[m].v2) && this.facetab[n].v2.equivalent(this.facetab[m].v3)) ||
					(this.facetab[n].v1.equivalent(this.facetab[m].v3) && this.facetab[n].v2.equivalent(this.facetab[m].v2))){
					this.facetab[n].next.push(m);
					this.facetab[m].next.push(n);
				}
				else if((this.facetab[n].v1.equivalent(this.facetab[m].v1) && this.facetab[n].v2.equivalent(this.facetab[m].v3)) ||
					(this.facetab[n].v1.equivalent(this.facetab[m].v3) && this.facetab[n].v2.equivalent(this.facetab[m].v1))){
					this.facetab[n].next.push(m);
					this.facetab[m].next.push(n);
				}
				else if((this.facetab[n].v2.equivalent(this.facetab[m].v2) && this.facetab[n].v3.equivalent(this.facetab[m].v1)) ||
					(this.facetab[n].v2.equivalent(this.facetab[m].v1) && this.facetab[n].v3.equivalent(this.facetab[m].v2))){
					this.facetab[n].next.push(m);
					this.facetab[m].next.push(n);
				}
				else if((this.facetab[n].v2.equivalent(this.facetab[m].v2) && this.facetab[n].v3.equivalent(this.facetab[m].v3)) ||
					(this.facetab[n].v2.equivalent(this.facetab[m].v3) && this.facetab[n].v3.equivalent(this.facetab[m].v2))){
					this.facetab[n].next.push(m);
					this.facetab[m].next.push(n);
				}
				else if((this.facetab[n].v2.equivalent(this.facetab[m].v1) && this.facetab[n].v3.equivalent(this.facetab[m].v3)) ||
					(this.facetab[n].v2.equivalent(this.facetab[m].v3) && this.facetab[n].v3.equivalent(this.facetab[m].v1))){
					this.facetab[n].next.push(m);
					this.facetab[m].next.push(n);
				}
				else if((this.facetab[n].v1.equivalent(this.facetab[m].v1) && this.facetab[n].v3.equivalent(this.facetab[m].v2)) ||
					(this.facetab[n].v1.equivalent(this.facetab[m].v2) && this.facetab[n].v3.equivalent(this.facetab[m].v1))){
					this.facetab[n].next.push(m);
					this.facetab[m].next.push(n);
				}
				else if((this.facetab[n].v3.equivalent(this.facetab[m].v3) && this.facetab[n].v1.equivalent(this.facetab[m].v2)) ||
					(this.facetab[n].v3.equivalent(this.facetab[m].v2) && this.facetab[n].v1.equivalent(this.facetab[m].v3))){
					this.facetab[n].next.push(m);
					this.facetab[m].next.push(n);
				}
				else if((this.facetab[n].v1.equivalent(this.facetab[m].v1) && this.facetab[n].v3.equivalent(this.facetab[m].v3)) ||
					(this.facetab[n].v1.equivalent(this.facetab[m].v3) && this.facetab[n].v3.equivalent(this.facetab[m].v1))){
					this.facetab[n].next.push(m);
					this.facetab[m].next.push(n);
				}
			}
	};
	
	this.resetUsed = function(){//remet les faces a non utilisées
		for(let n = 0; n < this.facetab.length; n++)
			this.facetab[n].used = false;
	};
	
	this.buildFromBlob(read){
		this.clear();
		var offset = 0;//indice de lecture
		var vue = new DataView(read, 80);//on passe les 80 premiers octets
		var.nbface = vue.getUint32(offset, true);//on recupere le nombre de faces
		offset += 4;
		
		var x, y, z, n, v1, v2, v3;//les composantes XYZ, la normale et les trois vertex
		for(let n = 0; n < nbface; n++)
		{
			x = vue.getFloat32(offset, true);
			y = vue.getFloat32(offset + 4, true);
			z = vue.getFloat32(offset + 8, true);
			n = Vecteur(corrpre(x, 3), corrpre(y, 3), corrpre(z, 3));
			x = vue.getFloat32(offset + 12, true);
			y = vue.getFloat32(offset + 16, true);
			z = vue.getFloat32(offset + 20, true);
			v1 = new Vertex(corrpre(x, 3), corrpre(y, 3), corrpre(z, 3));
			x = vue.getFloat32(offset + 24, true);
			y = vue.getFloat32(offset + 28, true);
			z = vue.getFloat32(offset + 32, true);
			v2 = new Vertex(corrpre(x, 3), corrpre(y, 3), corrpre(z, 3));
			x = vue.getFloat32(offset + 36, true);
			y = vue.getFloat32(offset + 40, true);
			z = vue.getFloat32(offset + 44, true);
			v3 = new Vertex(corrpre(x, 3), corrpre(y, 3), corrpre(z, 3));
			this.add(new STLFace(n, v1, v2, v3);
			offset += 50;//chque face fait 50 octets
		}
		this.findNext();
		
	}
	
	this.buildFromString = function(str){
		this.clear();
		var strtab = str.split('\n');
		//retrait des caracteres blancs
		for(let n = 0; n < strtab; n++){
			strtab[n] = strtab[n].trim();
			strtab[n] = strtab[n].toLowerCase();
		}
		
		for(let n = 0; n < strtab.length; n++)
		{
			if(strtab[n].search(/facet normal/) != -1)
			{//on construit une face
				var x, y, z, n, v1, v2, v3, temp;
				temp = strtab[n].split(' ');
				x = parseFloat(temp[2]);
				y = parseFloat(temp[3]);
				z = parseFloat(temp[4]);
				n = new Vecteur(x, y, z);
				n++; n++;
				temp = strtab[n].split(' ');
				x = parseFloat(temp[1]);
				y = parseFloat(temp[2]);
				z = parseFloat(temp[3]);
				v1 = new Vertex(x, y, z);
				n++;
				temp = strtab[n].split(' ');
				x = parseFloat(temp[1]);
				y = parseFloat(temp[2]);
				z = parseFloat(temp[3]);
				v2 = new Vertex(x, y, z);
				n++;
				temp = strtab[n].split(' ');
				x = parseFloat(temp[1]);
				y = parseFloat(temp[2]);
				z = parseFloat(temp[3]);
				v3 = new Vertex(x, y, z);
				facetab.push(new STLFace(n, v1, v2, v3));
			}
		}
		this.findNext();
		
	};
}