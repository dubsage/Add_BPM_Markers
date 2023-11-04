function createUI() {
    var window = new Window("dialog", "Add Markers");
    window.alignChildren = "left";
	
    var intervalGroup = window.add("group");
    var checkboxFR = intervalGroup.add("checkbox", undefined, "Stick to framerate?");
    checkboxFR.value = true;
	
	var checkboxUOB = intervalGroup.add("checkbox", undefined, "Use only bars?");
    checkboxUOB.value = false;
	
    intervalGroup.add("statictext", undefined, "BPM:");
    var intervalInput = intervalGroup.add("edittext", undefined, "140");
    intervalInput.characters = 4;
	
    var buttonGroup = window.add("group");
    var addButton = buttonGroup.add("button", undefined, "Add Markers");
	
    addButton.onClick = function() {    
        var bpm = parseFloat(intervalInput.text);
        var comp = app.project.activeItem;
	    
	    var frameRate = comp.frameRate;
	    var duration = comp.duration;
	    
        var layer = comp.layers.addSolid([0,0,0], bpm + " BPM Markers", comp.width, comp.height, comp.pixelAspect, comp.duration);
        var markerCount = Math.floor(duration / bpm);
	    
	    var beatsPerSecond = 60 / bpm;
	    var count = duration * bpm / 60;
		
	    if (checkboxUOB.value) {
			beatsPerSecond = 60 / (bpm / 4);
			count = duration * (bpm / 4) / 60;
		}
		
        for (i = 0; i < count; i++) {
	        var markerTime = i * beatsPerSecond;
	        if (checkboxFR.value) {
	            markerTime = (Math.round(markerTime * frameRate))/frameRate;
	        }
			layer.property("ADBE Marker").setValueAtTime(markerTime, new MarkerValue((i % 4) + 1));
        }
		window.close();
    };	
    window.show();
}
createUI();
