`use strict`;

(async function TTCalc() {
	const arItemTypes = [
		"Raw Resource",
		"Craft Item",
		"🛠️ Equip. Tool",
		"📐 Building",
	];

	// ⚡️ Power Consumption / Production
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
		elItem.querySelector('p').innerText = `${jItem.desc}`;

		if ( /^\d+,\d+$/.test(`${jItem.img}`) ) {
			jItem.img = `-${jItem.img.replace(',','px -')}px`;
			// console.log(jItem.img);
			elItem.querySelector('.img').style.backgroundPosition = jItem.img;
		}

		if (jItem.type !== undefined) {
			elItem.querySelector('.type').innerText = arItemTypes[`${jItem.type}`];
		}

		elItemsParent.appendChild(elItem);
	}
})();	//function self-calls when finished loading