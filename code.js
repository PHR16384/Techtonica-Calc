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
		let elItem = elItemTemplate.content.cloneNode(true).firstChild;
		elItem.querySelector('h3').innerText = `${jItem.name}`;

		if (`${jItem.desc}`.includes('$')) {
			for ( let sMatch of [...`${jItem.desc}`.matchAll(/\$\d+/g)].flat() ) {
				// confirm sMatch is a natural?
				jItem.desc = `${jItem.desc}`.replace(sMatch, `${TTItems[sMatch.slice(1)].name}`);
			}
		}
		elItem.querySelector('p').innerText = `${jItem.desc}`;

		if ( !isNaN(`${jItem.img}`) ) {
			console.log(`${jItem.img}`);
			elItem.querySelector('.img').style['background-position-y'] = `-${jItem.img * 152}px`;
		}

		if (jItem.type !== undefined) {
			elItem.querySelector('.type').innerText = arItemTypes[`${jItem.type}`];
		}

		elItemsParent.appendChild(elItem);
	}
})();	//function self-calls when finished loading