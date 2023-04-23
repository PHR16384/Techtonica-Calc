`use strict`;

(async function TTCalc() {
	const arItemTypes = [
		"Raw Resource",
		"Craftable / Intermediate",
		"🛠️ Equippable Tool",
		"📐 Building",
	];

	const jURL = `/items.json`;
	const jRequest = new Request(jURL);

	const jResponse = await fetch(jRequest);
	const TTItems = JSON.parse( await jResponse.text() );

	// console.info(TTItems);
	const elItemsParent = document.getElementById('Items');
	const elItem = document.getElementsByClassName('Item')[0];
	elItem.remove();

	// document.createElement(`<div>foo</div>`);
	console.info(elItemsParent);
	console.info(elItem);

	for (const Item of TTItems)
	{
		console.info(Item);
	}

})();