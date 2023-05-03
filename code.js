`use strict`;

(async function TTCalc() {
	const arItemTypes = [
		`Raw Resource`,
		`Craft Item`,
		`🛠️Equip.Tool`,
		`📐Building`,
	];

	// ⚡️ Power Consumption / Production in kW
	// 🚫 Can't hand-craft

	const nImgSize = 152;

	const jURL = `/items.json`;
	const jRequest = new Request(jURL);

	const jResponse = await fetch(jRequest);
	const TTItems = JSON.parse( await jResponse.text() );

	// console.info(TTItems);
	const elItemsParent = document.getElementById(`Items`);
	const elItemTemplate = document.getElementsByTagName(`template`)[0];
	// console.info(elItemsParent);
	// console.info(elItemTemplate);

	for (const jItem of TTItems)
	{
		let elItem = elItemTemplate.content.cloneNode(true).firstChild;	//is an array of length 1 w/o firstChild
		// ITEM NAME:
		elItem.getElementsByTagName(`h3`)[0].innerText = `${jItem.name}`;

		// ITEM DESCRIPTION:
		if (`${jItem.desc}`.includes(`$`)) {
			for ( let sMatch of [...`${jItem.desc}`.matchAll(/\$\d+/g)].flat() ) {
				// confirm sMatch is a natural?
				jItem.desc = `${jItem.desc}`.replace(sMatch, `${TTItems[sMatch.slice(1)].name}`);
			}
		}
		elItem.getElementsByClassName(`desc`)[0].innerText = `${jItem.desc}`;

		// SPRITESHEET POSITION:
		if ( !isNaN(`${jItem.img}`) ) {
			elItem.getElementsByClassName(`img`)[0].style[`background-position-y`] = `-${jItem.img * nImgSize}px`;
		}

		// ITEM TYPE:
		if (jItem.type !== undefined) {
			elItem.querySelector(`.type dd`).innerText = arItemTypes[`${jItem.type}`];
		}
		// ITEM CATEGORY:
		if (jItem.cat !== undefined) {
			elItem.querySelector(`.cat dd`).innerText = `${jItem.cat}`;
		} else {
			// elItem.getElementsByClassName(`cat`)[0].style.visibility = 'hidden';
		}
		// IS FUEL?
		if (!jItem.fuel) {
			elItem.getElementsByClassName(`fuel`)[0].style.visibility = `hidden`;
		}

		// CRAFT INGREDIENTS:
		let elRecipe = elItem.getElementsByClassName(`recipe`)[0];
		if (jItem.recipe === undefined) {
			elRecipe.remove();
		}
		else if ( Object.values(jItem.recipe).length !== 0 ) {
			let elRecipeTemplate = elRecipe.getElementsByTagName(`template`)[0];
			// console.info(`${jItem.name}:`);
			for (const prop in jItem.recipe) {
				let elRecipeItem = elRecipeTemplate.content.cloneNode(true).firstChild;
				// console.log(prop);
				if (prop == -1) {
					elItem.querySelector(`.recipe h4`).innerText = `Recipe (x${jItem.recipe[prop]}):`;
					continue;
				} else if (isNaN(prop)) {
					console.warn(`Invalid recipe item for "${jItem.name}":\n"${prop}"`);
					continue;
				}
				// console.log( TTItems[prop].name );
				elRecipeItem.children[0].style[`background-position-y`] = `-${TTItems[prop].img * nImgSize*0.5}px`;
				elRecipeItem.children[1].innerText = `${TTItems[prop].name} ${ jItem.recipe[prop]!=1 ? `(x${jItem.recipe[prop]})`:`` }`;
				elRecipe.appendChild(elRecipeItem);
			}
		}
		else {
			elRecipe.innerHTML = '<h4>[RECIPE UNKNOWN]</h4>';
		}

		// CRAFTING TIME:
		let elTime = elItem.getElementsByClassName(`time`)[0];
		if (jItem.time) {
			elTime.children[1].innerText = `${jItem.time}s`;
		} else {
			elTime.remove();
		}

		elItemsParent.appendChild(elItem);
	}
})();	//function self-calls when finished loading