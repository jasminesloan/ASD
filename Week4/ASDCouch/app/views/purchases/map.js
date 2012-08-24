function (doc) {
	if (doc._id.substr(0, 9) === "purchase:"){
		emit(doc._id, {
			"location": doc.location,
			"purchase": doc.purchase,
			"quantity": doc.quantity,
			"date": doc.date,
			"suggestions": doc.suggestions
		});
	}
};