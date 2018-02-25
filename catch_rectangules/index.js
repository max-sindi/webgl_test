let gl;
let rect;

window.addEventListener("load", function() {
	const canvas = document.getElementById('canvas');

	const shapeWidth = 200,
				shapeHeight = 200;

	canvas.width = parseInt(getComputedStyle(document.body).width);
	canvas.height = parseInt(getComputedStyle(document.body).height);

	gl = canvas.getContext('webgl');

	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
	gl.enable(gl.SCISSOR_TEST);

	// init first block and futher each new block will be reinitiated in this var
	rect = new Rectangular();

	// how frequently image updates
	const smoothness = 7;
  // how quickly
  let speed = 1;
	// work loop
	let timer;
  setRectSelfMoving();

  function setRectSelfMoving() {
    timer = setInterval( () => {
      gl.scissor(rect.positionLeft, rect.positionBot, rect.width, rect.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      rect.positionBot -= speed;

      // when rect reaches the bottom, replace this rect by new
  		if(rect.positionBot <= 0) {
        rect = new Rectangular();
      }
    }, smoothness );
  }

  canvas.addEventListener('mousedown', mousedownHandler);
	canvas.addEventListener('click', clickHandler);

  function mousedownHandler(e) {
		const coords = {
			x: e.x,
			y: convertToBottomBased(e.y),
		}

		// if clicked inside the rect ->
		console.log(isMouseOverRect(coords, rect));
		// debugger;
    if( isMouseOverRect(coords, rect) ) {
      console.log('mousedowned');
			// clearInterval(timer);
    }
  }

	function clickHandler(e) {
		const coords = {
			x: e.x,
			y: convertToBottomBased(e.y),
		}

    // if clicked inside the rect -> replace this rect by new
		if( isMouseOverRect(coords, rect) ) {
			rect = new Rectangular();
		}
	}

  function isMouseOverRect(coords, rect) {
    let {x, y} = coords,
        {positionLeft, positionRight, positionBot, height} = rect,
				positionTop = positionBot + height;

    if(  x >= positionLeft
			&& x <= positionRight
			&& y >= positionBot
			&& y <= positionTop)
    {
      return true;
    } else {
			return false;
		}
  }

	function Rectangular() {
		// sizes
		this.width = getRandomNumber(30, 200);
		this.height = getRandomNumber(30, 200);
		// debugger;
		// starts from very top and random horizontal position
		this.positionBot = gl.drawingBufferHeight - this.height;
		this.positionLeft = getRandomNumber(0, gl.drawingBufferWidth - shapeWidth);

		// debugger;
		// this.positionTop = this.positionBot + this.height;
		this.positionRight = this.positionLeft + this.width;

		gl.clearColor( ...getRandomColor() );
	}

  // converts y-coordinate that it starts from bottom
  function convertToBottomBased(y) {
    return canvas.height - y;
  }

	function getRandomColor() {
		return [Math.random(), Math.random(), Math.random(), 1];
	}

	function getRandomNumber(from, to) {
		return Math.floor( (Math.random() * to) + from );
	}
});
