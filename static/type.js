const sleep = ms => new Promise(r => setTimeout(r, ms));


async function type2(target, text1, text2){
	await type(target, text1, 5);
	if (!clearflag){
		await clear(target);
	}	
	await type(target, text2, 5000);

}

async function clear(target){
	disable();
	clearflag = true;
	await sleep(200);
	cur = document.getElementById(target).innerHTML.replace("_", "");

	while ((cur[cur.length-1] == " ") | (cur.slice(cur.length-4, cur.length) == "<br>") | (cur.slice(cur.length-6, cur.length) == "&nbsp;")){
		if (cur.slice(cur.length-4, cur.length) == "<br>") {
			cur = cur.slice(0, cur.length-4);
		} else if (cur.slice(cur.length-6, cur.length) == "&nbsp;") {
			cur = cur.slice(0, cur.length-6);
		} else {
			cur = cur.slice(0, cur.length-1);
		}
		
	}
	
	text_mod_clear = cur+"<br />";
	clear_txt = "> clear";
	for (let i = 0; i < clear_txt.length; i++){
		text_mod_clear = text_mod_clear + clear_txt[i];
		st = 15+Math.floor(Math.random()*20);
		await sleep(st);
		document.getElementById(target).innerHTML = text_mod_clear+"_";			
		
	}
	await sleep(200);
	document.getElementById(target).innerHTML = text_mod_clear + " ";
	await sleep(500);
	document.getElementById(target).innerHTML = text_mod_clear + "_";	
	await sleep(500);
	document.getElementById(target).innerHTML = "";

	clearflag = false;
	enable();
}

async function type(target, text, loop){
	// disable();
	
	for (let i = 1; i < text.length + 1; i++){
		text_mod = '';
		if (!clearflag){
			arrows = 0;
			arrowmem = 0;
			for (let j = 0; j < text.length + 1; j++){
				if (text[j] == "<"){
					arrows = arrows + 1;
				}
				if (j<i){
					arrowmem = arrows;
				}
				if (arrows>0){
					text_mod = text_mod + text[j];

					if (text[j] == ">") {
						arrows = arrows -1;
					}

					

				} else if (text[j] == ">"){
					if (j<i){
						text_mod = text_mod + "<br />>";
					} else {
						text_mod = text_mod + "<br /> ";
					}			
				} else if (text[j] == " "){
					text_mod = text_mod + "&nbsp";
				}else if (text[j] == "$"){
					text_mod = text_mod;
				} else if (j<i){
					text_mod = text_mod + text[j];
				} else if (j<i+1) {
					if (i<text.length) {
						text_mod = text_mod + "_";
					}				
				} else {
					text_mod = text_mod + " ";
				}

			}
			if (arrowmem<=0){
				if (text[i-1] == "."){
					st = 10;
				} else if (text[i-1] == "$"){
					st = 500;
				} else if (text[i-1] == ","){
					st = 100;
				} else {
					st = 10+Math.floor(Math.random()*15);
				}

				document.getElementById(target).innerHTML = text_mod;
				await sleep(st);			
			}
		}

	}
	flipflop = 1;
	// if (loop>10){
	// 	enable();
	// }
	while ((loop>0) & !(clearflag)) {
		loop = loop - 1;
		if (flipflop == 1){
			document.getElementById(target).innerHTML = text_mod + "_";	
		} else {
			document.getElementById(target).innerHTML = text_mod + " ";
		}
		flipflop = flipflop ^ 1;
		await sleep(500);
		
	}
}

