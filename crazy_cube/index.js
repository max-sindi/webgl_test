let gl;

window.addEventListener("load", function() {
  const canvas = document.getElementById('canvas');

  const shapeWidth = 200,
        shapeHeight = 200;

  canvas.width = 1300;
  canvas.height = 600;

  gl = canvas.getContext('webgl');

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.enable(gl.SCISSOR_TEST);
  // gl.clearColor(0.1, 0.2, 0.5, 1.0);
  // gl.clear(gl.COLOR_BUFFER_BIT);

  // const randomColor = getRandomColor();

  gl.clearColor( ...getRandomColor() );

  // gl.colorMask(true, true, true, true);
  // gl.scissor(90, 90, 60, 50);

  // const startTopPosition =
  let positionBot = gl.drawingBufferHeight - shapeHeight,
      positionLeft = gl.drawingBufferWidth - shapeWidth,
      speed = 10,
      // if this values are positive, the shape moves to bottom and to left,
      // and vice versa
      verticalDirection = speed,
      horizontalDirection = speed;

  setInterval(function () {
    gl.scissor(positionLeft, positionBot, shapeWidth, shapeHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    positionLeft -= horizontalDirection;
    positionBot -= verticalDirection;

    if(positionBot <= 0 || positionBot >= gl.drawingBufferHeight - shapeHeight) {
      verticalDirection *= -1;
      gl.clearColor( ...getRandomColor() );
    }

    if(positionLeft <= 0 || positionLeft >= gl.drawingBufferWidth - shapeWidth) {
      horizontalDirection *= -1;
      gl.clearColor( ...getRandomColor() );
    }
  }, 17);

  document.body.addEventListener('keypress', function(e) {
    // debugger
    if(e.key === 'w' || e.key === 'ц') {
      verticalDirection *= 1.1;
      horizontalDirection *= 1.1;
    } else if(e.key === 's' || e.key === 'ы') {
      verticalDirection *= 0.9;
      horizontalDirection *= 0.9;
    }
  });

  // gl.getParameter(gl.SCISSOR)
    // let timer = setInterval(animation, 17);
    // const size = [40, 40,],
    //       speed = 3;

    // function animation() {
    //   gl.scissor()
    // }


    function getRandomColor() {
      return [Math.random(), Math.random(), Math.random(), 1];
    }
});