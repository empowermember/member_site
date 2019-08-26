$(document).ready(function () {
	// On submit click, set the value
	$('#blogSearchButton').click(function (e) {
		blogSearch();
	});
	$("#_catgDropDown").change(function () {
		var searchCategory = $('#_catgDropDown').val();
		if (!searchCategory || searchCategory !== '') {
			$('#_txtWord').val('');
		}
	});

	$('#_txtWord').keyup(function () {
		$("#_catgDropDown")[0].selectedIndex = 0;
	});

	var queryParms = parseQueryParams();
	if ($.isEmptyObject(queryParms)) {
		blogSearch();
	}
});

function blogSearch() {
	var searchCategory = $('#_catgDropDown').val();
	var searchText = $('#_txtWord').val();

	if ((!searchText || searchText === '') && searchCategory !== '') {
		searchText = searchCategory;
	}


	if (!searchText || searchText === '') {
		// Search on last two years (e.g. 2017 & 2016)
		var dt = new Date();
		searchText = dt.getFullYear().toString() + ' ' + (dt.getFullYear() - 1).toString();
	}

	var queryParameters = parseQueryParams();

	// Add new parameters or update existing ones
	queryParameters['searchtext'] = searchText;
	queryParameters['searchmode'] = 'anyword';
	delete queryParameters['page'];

	/*
	 * Replace the query portion of the URL.
	 * jQuery.param() -> create a serialized representation of an array or
	 *     object, suitable for use in a URL query string or Ajax request.
	 */
	location.search = $.param(queryParameters); // Causes page to reload
}

function parseQueryParams() {
	/*
	 * queryParameters -> handles the query string parameters
	 * queryString -> the query string without the fist '?' character
	 * re -> the regular expression
	 * m -> holds the string matching the regular expression
	 */
	var queryParameters = {}, queryString = location.search.substring(1),
		re = /([^&=]+)=([^&]*)/g, m;

	// Creates a map with the query string parameters
	while (m = re.exec(queryString)) {
		queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}

	return queryParameters;
}