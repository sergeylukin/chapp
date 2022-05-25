// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Snap from 'snapsvg-cjs';

const Logo = forwardRef(({ title = '' }, ref) => {
  const containerRef = useRef();
  const maskObjRef = useRef();
  useEffect(() => {
    const s = Snap(containerRef.current);
    const sMaxX = 800;
    const sMaxY = 600;
    const viewBoxList = [0, -50, sMaxX, sMaxY];
    s.attr({
      viewBox: viewBoxList,
    });

    const gLines = s.g();
    const gText = s.g();
    let patt;
    let text;
    const maskElem = s.mask();

    const pSize = 1700;
    const maxLines = 16;
    const maxLinesDouble = maxLines * 2;
    const lineStep = pSize / maxLines;
    const lines = [];
    const pathDur = 1000;
    const delay = 250;

    const colorSteps = maxLines / 2;
    const colors = [
      'purple',
      'crimson',
      'orangered',
      'orange',
      'gold',
      'yellowgreen',
      'steelblue',
      'teal',
      'purple',
    ];

    const lineLength = Math.sqrt(Math.pow(pSize, 2) * 2);

    const lineObj = function () {
      const d = 'M' + [pSize, 0, 0, pSize];
      const path = s.path(d);
      let pos = 0;
      let addMask = false;
      let pathDelay = 0;
      let dashArray = 0;
      let strokeW = 0;

      this.init = function (params) {
        pos = params.pos;
        strokeW = params.strokeW;
        const strokeColor = params.color || 'hotpink';
        const offsetX = params.offsetX || 0;
        const x = pSize - lineStep * (pos + 0.5) + offsetX;
        const translateParams = [x, 0];

        pathDelay = params.delay || delay;
        dashArray = lineLength;
        addMask = params.addMask || false;

        path.attr({
          transform: 'translate(' + translateParams + ')',
          'stroke-width': strokeW,
          stroke: strokeColor,
          'stroke-linecap': 'square',
          'stroke-dashoffset': lineLength,
          'stroke-dasharray': dashArray,
        });

        gLines.add(path);
      }; // Init

      this.reset = function () {
        path.attr({
          'stroke-dashoffset': lineLength,
          'stroke-dasharray': dashArray,
        });
      };

      this.animdDelay = function () {
        setTimeout(pathAnim, (maxLinesDouble - pos) * pathDelay);
      };

      let countNextAnim = 0;

      function runNextAnim() {
        if (addMask == true) {
          // Why 0?
          if (pos == 0) {
            countNextAnim++;

            maskObjRef.current.maskAnim();
          }
        }
      }

      function pathAnim() {
        path.animate(
          {
            'stroke-dashoffset': '0',
          },
          pathDur
          // runNextAnim
        );
      }
    }; // lineObj

    // ------------------------------------

    function createLines(params) {
      const strokeW = params.strokeW;

      for (let i = 0; i < maxLinesDouble; i++) {
        const line = new lineObj();
        const color = params.color || colors[i % colorSteps];

        line.init({
          pos: i,
          strokeW: params.strokeW,
          offsetX: params.offsetX,
          delay: params.delay,
          addMask: params.addMask || false,
          color: color,
        });

        lines.push(line);
      }
    }

    // ------------------------------------

    function createPattern() {
      //     console.log('* - createPattern');

      const rect = s.rect(0, 0, pSize, pSize);
      rect.attr({
        fill: 'white',
      });

      gLines.add(rect);

      createLines({
        strokeW: lineStep / 1.4,
        addMask: false,
      });

      createLines({
        strokeW: 2,
        color: '#002',
        offsetX: lineStep / 2 + 7,
        delay: 300,
        addMask: true,
      });

      patt = gLines.toPattern(0, 0, pSize, pSize);
    }

    function animatePattern() {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        line.reset();
        line.animdDelay();
      }
    }

    // ------------------------------------

    const textObj = function () {
      const textDur = 1500;
      const dashoffset = 1200;
      const textGInit = s.g();
      const text = s.text('50%', '64%', title);

      text.attr({
        dy: '.3em',
        'font-size': '1.15em',
      });

      textGInit.add(text);

      textGInit.attr({
        'text-anchor': 'middle',
        font: '15em/1 Impact',
        fill: 'white',
        stroke: '#000',
        'stroke-width': 3,
        'stroke-dasharray': dashoffset,
        'stroke-dashoffset': dashoffset,
      });

      const textGFill = textGInit.clone();

      textGInit.attr({
        transform: 'translate(10,10)',
      });

      gText.add(textGInit, textGFill);

      this.textAnim = function () {
        textGFill.animate(
          {
            'stroke-dashoffset': 0,
          },
          textDur,
          setTextStroke
        );
      };

      function setTextStroke() {
        setTextFill();

        textGInit.animate(
          {
            'stroke-dashoffset': 0,
          },
          textDur
        );
      }

      function setTextFill() {
        animatePattern();

        textGFill.attr({
          fill: patt,
        });
      }

      this.reset = function () {
        const initState = {
          fill: 'white',
          'stroke-dasharray': dashoffset,
          'stroke-dashoffset': dashoffset,
        };

        textGInit.attr(initState);
        textGFill.attr(initState);

        this.textAnim();
      };
    };

    // ------------------------------------

    function createText() {
      //     console.log('* - createText');
      text = new textObj();
      text.textAnim();
    }

    // ------------------------------------

    const maskObjInit = function () {
      let maskShape;

      let currentStep = 0;
      const steps = [
        { rx: '10%', ry: '10%' },
        { rx: '35%', ry: '35%' },
        { rx: '0%', ry: '0%' },
      ];

      this.init = function () {
        maskShape = s.ellipse('50%', '50%', '100%', '100%');

        maskShape.attr({
          fill: 'white',
        });

        maskElem.add(maskShape);

        gText.attr({
          mask: maskElem,
        });
      };

      this.maskAnim = function () {
        //         console.log('- * - anim mask');

        if (currentStep == steps.length) {
          // setTimeout(reRun, 1000);
          return;
        }

        maskShape.animate(steps[currentStep], 300, maskObjRef.current.maskAnim);
        currentStep++;
      };

      this.reset = function () {
        currentStep = 0;

        const initState = {
          rx: '100%',
          ry: '100%',
        };

        maskShape.attr(initState);
      };
    };

    function createMask() {
      //     console.log('* - createMask');
      maskObjRef.current = new maskObjInit();
      maskObjRef.current.init();
    }

    // ------------------------------------

    createPattern();
    createText();
    createMask();

    function reRun() {
      maskObjRef.current.reset();
      text.reset();
    }
  }, [containerRef]);

  useImperativeHandle(ref, () => ({
    playCloseAnimation() {
      maskObjRef.current.maskAnim();
      console.log(maskObjRef.current);
    },
  }));

  return (
    <svg
      ref={containerRef}
      height="300"
      width="800"
      style={{
        marginTop: -200,
        width: '70%',
        maxWidth: 800,
        maxHeight: 300,
      }}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    />
  );
  //  return <div />;
});

export default Logo;
