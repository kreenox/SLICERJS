
importScripts();

//les message reçus par le slicer
onMessage = function(event){
	
	
	switch(event.data.comm)
	{
		case "file":
			break;
		case "filestr":
			break;
		case "slice":
			break;
		case "print":
			break;
		default:
			postMessage({comm: "err", dat: "commande inconnue : " + event.data.dat});
			break;
	}
}?;