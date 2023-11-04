function createUI() {
    var window = new Window("dialog", "Add Markers");
    window.alignChildren = "left";

    var intervalGroup = window.add("group");
    intervalGroup.add("statictext", undefined, "BPM:");

	var checkboxFR = intervalGroup.add("checkbox", undefined, "Привязать к фреймрэйту?");
	checkboxFR.value = true;
	
    var intervalInput = intervalGroup.add("edittext", undefined, "140");
    intervalInput.characters = 4;
	
    var buttonGroup = window.add("group");
	
    var addButton = buttonGroup.add("button", undefined, "Add Markers");
    addButton.onClick = function() {
        var bpm = parseFloat(intervalInput.text);
        var comp = app.project.activeItem;
		
		var frameRate = comp.frameRate;
		var duration = comp.duration;
		
        var layer = comp.layers.addSolid([0,0,0], "Markers", comp.width, comp.height, comp.pixelAspect, comp.duration);
        var markerCount = Math.floor(duration / bpm);

		var beats = 60 / bpm;
		var count = duration * bpm / 60;
        for (i = 0; i < count; i++) {
			var markerTime = i * beats;
			if (checkboxFR.value)
			{
				markerTime = (Math.round(markerTime * frameRate))/frameRate;
			}
            layer.property("ADBE Marker").setValueAtTime(markerTime, new MarkerValue(i + 1));
        }
		window.close();
        //alert("Markers added successfully!");
    };
	
    window.show();
}
createUI();
