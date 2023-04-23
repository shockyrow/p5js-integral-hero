const SKETCH_MARGIN = 32;

let scaling;
let dx;

function getCanvasWidth() {
  return windowWidth - SKETCH_MARGIN * 2;
}

function getCanvasHeight() {
  return windowHeight - SKETCH_MARGIN * 2;
}

function f(x) {
  return Math.sin(x * x) * x;
}

function shouldPaint(x, y) {
  const fx = f(x);

  return (0 < y && y < fx) || (0 > y && y > fx);
}

function sliderMoved() {
  redraw();
}

function setup() {
  createCanvas(getCanvasWidth(), getCanvasHeight());
  scaling = createSlider(1, 1000, 100, 1);
  dx = createSlider(.1, 10, 1, .1);
  scaling.input(sliderMoved);
  dx.input(sliderMoved);
  noLoop();
}

function draw() {
  background(24);

  translate(getCanvasWidth() / 2, getCanvasHeight() / 2);
  scale(1, -1);
  noFill();

  beginShape();
  for (let i = -getCanvasWidth() / 2; i < getCanvasWidth() / 2; i += dx.value()) {
    const x = i / scaling.value();
    drawRect(x * scaling.value(), f(x) * scaling.value(), 255, 'slateblue');
  }
  endShape();
}

function drawRect(x, y, stroke_color, fill_color) {
  stroke(stroke_color);
  fill(fill_color);
  rect(x, 0, dx.value(), y);
}

function windowResized() {
  resizeCanvas(getCanvasWidth(), getCanvasHeight());
}
