const sleep = ms => new Promise(r => setTimeout(r, ms));


async function type2(target, text1, text2){
	await type(target, text1, 5);
	await clear(target, text1);
	await type(target, text2, 5000);

}

async function clear(target, text_raw){
	clearflag = true;
	text = text_raw + " clear"
	for (let i = text_raw.length; i < text.length+1; i++){
		text_mod = '';
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
		if (text[i-1] == "."){
			st = 100;
		} else if (text[i-1] == "$"){
			st = 300;
		} else if (text[i-1] == ","){
			st = 100;
		} else {
			st = 15+Math.floor(Math.random()*20);
		}

		await sleep(st);
		document.getElementById(target).innerHTML = text_mod;			
		
	}
	await sleep(200);
	document.getElementById(target).innerHTML = text_mod + " ";
	await sleep(500);
	document.getElementById(target).innerHTML = text_mod + "_";	
	await sleep(500);
	document.getElementById(target).innerHTML = "";

	clearflag = false;
}

async function type(target, text, loop){
	disable();
	last_text = text;
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
					st = 300;
				} else if (text[i-1] == "$"){
					st = 500;
				} else if (text[i-1] == ","){
					st = 200;
				} else {
					st = 15+Math.floor(Math.random()*20);
				}

				await sleep(st);
				document.getElementById(target).innerHTML = text_mod;			
			}
		}

	}
	flipflop = 1;
	if (loop>10){
		enable();
	}
	while (loop>0) {
		if (clearflag){
			loop = -1;
		}
		loop = loop - 1;
		await sleep(500);
		if (flipflop == 1){
			document.getElementById(target).innerHTML = text_mod + "_";	
		} else {
			document.getElementById(target).innerHTML = text_mod + " ";
		}
		flipflop = flipflop ^ 1;
		
	}
}

