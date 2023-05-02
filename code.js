`use strict`;

(async function TTCalc() {
	const arItemTypes = [
		"Raw Resource",
		"Craft Item",
		"🛠️ Equip. Tool",
		"📐 Building",
	];

	// ⚡️ Power Consumption / Production in kW
	// ⏱ Time to Craft
	// 🚫 Can't hand-craft

	const jURL = `/items.json`;
	const jRequest = new Request(jURL);

	const jResponse = await fetch(jRequest);
	const TTItems = JSON.parse( await jResponse.text() );

	// console.info(TTItems);
	const elItemsParent = document.getElementById('Items');
	const elItemTemplate = document.getElementsByTagName('template')[0];
	// console.info(elItemsParent);
	// console.info(elItemTemplate);

	for (const jItem of TTItems)
	{
		let elItem = elItemTemplate.content.cloneNode(true).firstChild;	//is an array of length 1 w/o firstChild
		// ITEM NAME:
		elItem.querySelector('h3').innerText = `${jItem.name}`;

		// ITEM DESCRIPTION:
		if (`${jItem.desc}`.includes('$')) {
			for ( let sMatch of [...`${jItem.desc}`.matchAll(/\$\d+/g)].flat() ) {
				// confirm sMatch is a natural?
				jItem.desc = `${jItem.desc}`.replace(sMatch, `${TTItems[sMatch.slice(1)].name}`);
			}
		}
		elItem.querySelector('p').innerText = `${jItem.desc}`;

		// SPRITESHEET POSITION:
		if ( !isNaN(`${jItem.img}`) ) {
			elItem.querySelector('.img').style['background-position-y'] = `-${jItem.img * 152}px`;
		}

		// ITEM TYPE:
		if (jItem.type !== undefined) {
			elItem.querySelector('.type dd').innerText = arItemTypes[`${jItem.type}`];
		}

		// ITEM CATEGORY:
		if (jItem.cat !== undefined) {
			elItem.querySelector('.cat dd').innerText = `${jItem.cat}`;
		} else {
			elItem.querySelector(`.cat`).remove();
		}

		elItemsParent.appendChild(elItem);
	}
})();	//function self-calls when finished loading