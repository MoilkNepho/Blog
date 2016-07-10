window.onload = function() {
    try {
        TagCanvas.textFont = 'Trebuchet MS, Helvetica, sans-serif';
        TagCanvas.textColour = '#333';
        TagCanvas.textHeight = 14;
        TagCanvas.outlineMethod = 'block';
        TagCanvas.outlineColour = '';
        TagCanvas.maxSpeed = 0.03;
        TagCanvas.minBrightness = 0.2;
        TagCanvas.depth = 0.92;
        TagCanvas.pulsateTo = 0.6;
        TagCanvas.initial = [0.1,-0.1];
        TagCanvas.decel = 0.98;
        TagCanvas.reverse = true;
        TagCanvas.hideTags = false;
        TagCanvas.shadow = '#ccf';
        TagCanvas.shadowBlur = 3;
        TagCanvas.weight = false;
        TagCanvas.imageScale = null;
        TagCanvas.fadeIn = 1000;
        TagCanvas.clickToFront = 600;
        TagCanvas.Start('resCanvas');
        TagCanvas.tc['resCanvas'].Wheel(false)
    } catch(e) {
        console.log(e);
        document.getElementById('tagContainer').style.display = 'none';
    }
};
