
# Input Image File Button and Preview.

simple change input file to be a button, show name, size, and preview of image. Just tiny lib that could make it eazy.
	
Usage
-----

	<div id="yourid">
	</div>

	<script src=inputfilepreview.min.js></script>

On script, call: <code>new InputFilePreview()</code>

write script like this:

	<script>
	let button = document.getElementById("yourid");
	new InputFilePreview(button);
	</script>

or if use jQuery:

	let inputimage = $('#yourid');
	new InputFilePreview(inputimage);


Change Preview Position
-----------------------

By default, position preview bellow of button input. But it's could change the position to up of preview. Just add div element after first div with class <code>.inbpreview</code> and your class.

	<div id="yourid">
	  <div class="inbpreview"></div>
	</div>

There are options, example if you would change label, and custom of name input that default is "filename":

	new InputFilePreview(inputimage, {
	  buttonText: "Browse Image",
	  name: "myInputName"
	});

Filter Image Type
-----------------
It could filter image type by acceptType:

	new InputFilePreview(inputimage, {
	  buttonText: "Browse Image",
	  acceptType: ['image/gif', 'image/png']
	});


Default Options:
----------------
<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>buttonText</td>
<td>string</td>
<td>"Choose Image"</td>
</tr>
<tr>
<td>name</td>
<td>string</td>
<td>"filename"</td>
</tr>
<tr>
<td>showInfo</td>
<td>Boolean</td>
<td>true</td>
</tr>
<tr>
<td>showPreview</td>
<td>Boolean</td>
<td>true</td>
</tr>
<tr>
<td>acceptType</td>
<td>Array</td>
<td>['image/jpg', 'image/jpeg', 'image/png', 'image/gif']</td>
</tr>
<tr>
<td>previewStyles</td>
<td>Object</td>
<td>{'max-width': '200px', 'max-height': '200px', 'border-radius': '10px', 'border': '3px solid #ccc', 'margin-bottom': 0}</td>
</tr>
<td>onChange</td>
<td>function</td>
<td>arguments (event, imagesrc)</td>
</tr>
</tbody>
</table>

onChange
--------
There is onchange event to customization
	
	let imgid = document.getElementById('myImage');

	new InputFilePreview(inputimage, {
	  showPreview: false,
	  onChange: function(e, img) {
	  	var image = document.getElementById('newpreview');
        image.src = img
	  	// your another scripts
	  }
	});

Styles
------
For custom style for preview it could use previewStyles property (look Default Options), follow property default and input the value.
	
	buttonText: 'Browse Image',
	previewStyles: {
	  'border': '10px solid #ccc'
	}

Or, replace on style and using <code>!important</code> if have the same style. And for another stylist also use this.

example:
	
	<style>
	/* for button */
	.inblabel {
	  width: 500px !important;
	}

	/* for preview */
	.inbpreview img {
	  /*
	  some style here
	  */
	}

	/* for text name and size */
	.inbfilename {
	  font-size: 20px !important;
	}
	</style>

