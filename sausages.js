function sausages(container) {
  // This was generated by ChatGPT and adapted slightly to get the desired color palette and size

  var canvas = document.createElement("canvas");
  canvas.style.pointerEvents = "none";
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 0;

  container.style.position = "relative";

  for (var child of container.children) {
    child.style.position = "relative";
    child.style.zIndex = child.style.zIndex || "1";
  }

  canvas.width = screen.width; // Make the canvas fill screen horizontally
  canvas.height = container.offsetHeight;
  container.appendChild(canvas);

  var ctx = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;

  var segments = new Set();

  // Create a new segment at the top of the screen
  function newSegment() {
    segments.add({
      x: Math.random() * width,
      y: -50, // Start off screen - ChatGPT initialized this to 0
      scale: 1,
    });
  }

  // Update the position and scale of each segment
  function update() {
    for (var segment of segments) {
      segment.y += 2;
      segment.scale += 0.01;

      // Remove the segment if it has gone off screen otherwise we have a memory & CPU leak
      // ChatGPT did not do this
      if (segment.y > height) {
        segments.delete(segment);
      }
    }
  }

  // Draw the segments on the canvas
  function draw() {
    // background
    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    ctx.save();

    // Set the perspective
    ctx.translate(width / 2, height / 2);
    ctx.scale(1, -1);

    // Draw the pipes
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    for (var segment of segments) {
      // Apply a 3D transformation to the pipe
      ctx.save();
      ctx.translate(segment.x - width / 2, segment.y - height / 2);
      ctx.scale(segment.scale, segment.scale);
      ctx.rotate(-Math.PI / 4);
      ctx.fillRect(0, 0, 3, 15);
      ctx.restore();
    }

    ctx.restore();
  }

  // Main function that runs the screensaver
  function run() {
    newSegment();
    update();
    draw();
  }

  setInterval(run, 25);
  run();
}
