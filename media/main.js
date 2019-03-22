function DO()
{
    var Results = document.querySelector('Result');
	Results.innerHTML = ''; // Blank out previous values in Result field

    var p = document.createElement('p');
    p.innerHTML = '<b>Results:</b><br><br>';
    Results.append(p);

	var codeline = document.getElementById('Code').value; // Get line of code
	var valuestouse = document.getElementById('Values').value; // Get values to use
	// Turn values from CSV into array
	var array = valuestouse.split(',');
	// For each item in array
	var arrayLength = array.length;
	for (var i = 0; i < arrayLength; i++) {
	// Make the the replacement
	var newline = codeline.replace(/%%%/g, array[i]);
    // Append the result, and repeat for each line
    var el = document.createElement('xmp');
    el.innerHTML = '<code><xmp>" + newline + "</xmp></code>';
    document.querySelector('Result').append(el);
	}
	//$('#Count').html("<b><i>Generated " + arrayLength + " lines of code.</i></b>");
	//$('#Result').append("</code>");
	}

