import './ScrollSnap.css';

import React, { useEffect, useRef, useState } from 'react';

import ScrollPane from './ScrollPane';
import { isMobileSafari } from 'react-device-detect';

function ScrollSnap({
  panes
}) {

  const scrollSnap = useRef({
    isScrolling: false,
    currentPane: 1,
    isTouch: false,
    lastTouch: 0,
  });

  const [viewportHeight, setViewportHeight] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {


    setContainer();

    window.addEventListener('resize', setContainer);
    document.addEventListener('mousewheel', onScroll);
    document.addEventListener('DOMMouseScroll', onScroll);
    document.addEventListener('touchmove', onScroll);
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousewheel', onScroll);
      document.removeEventListener('DOMMouseScroll', onScroll);
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('touchmove', onScroll);
      document.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('resize', setContainer);
    }

  }, [viewportHeight, viewportWidth])

  const setContainer = () => {

    let newHeight = window.innerHeight;
    const newWidth = window.innerWidth;

    if (isMobileSafari) {
      newHeight = newHeight + 85;
    }

    if (newHeight !== viewportHeight) {
      setViewportHeight(newHeight);
      setViewportWidth(newWidth);
      window.scrollTo(0, (scrollSnap.current.currentPane - 1) * newHeight);
    }

  }

  const onTouchStart = (e) => {
    // Save last position to determine delta movement
    scrollSnap.current.isTouch = true;
    scrollSnap.current.lastTouch = e.layerY;
  }

  const onScroll = async (e) => {
    if (scrollSnap.current.isScrolling) return null;
    scrollSnap.current.isScrolling = true;

    // Desktop 
    const delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 10) || 1;
    let direction = delta < 0 ? 'up' : 'down';

    if (scrollSnap.current.isTouch) {
      direction = scrollSnap.current.lastTouch - e.layerY < 0 ? 'up' : 'down';
      console.log("TOUCH", direction, scrollSnap.current.lastTouch, e.layerY);
    }

    if (direction === 'up') {
      await movePageUp()
    } else if (direction === 'down') {
      await movePageDown()
    }
    setTimeout(() => {
      scrollSnap.current.isScrolling = false;
    }, scrollSnap.current.isTouch ? 100 : 1000);
  }

  const onKeyDown = async (e) => {
    if (scrollSnap.current.isScrolling) return null;
    scrollSnap.current.isScrolling = true;

    const key = e.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if (key === 'ArrowUp') {
      await movePageUp()
    } else if (key === 'ArrowDown') {
      await movePageDown()
    }
    scrollSnap.current.isScrolling = false;
  };

  const movePageUp = () => {
    if (scrollSnap.current.currentPane === 1) return // no scroll
    const previousPaneNumber = scrollSnap.current.currentPane - 1;
    const previousScrollTop = previousPaneNumber === 1 ? 0 : viewportHeight * (previousPaneNumber - 1);
    scrollSnap.current.currentPane = previousPaneNumber;
    return doScroll(previousScrollTop, 'up');
  }

  const movePageDown = () => {
    if (scrollSnap.current.currentPane === panes.length) return // no scroll
    const nextPaneNumber = scrollSnap.current.currentPane + 1;
    const nextScrollTop = viewportHeight * scrollSnap.current.currentPane;
    scrollSnap.current.currentPane = nextPaneNumber;
    return doScroll(nextScrollTop, 'down');
  }

  const doScroll = (targetTop, direction) => {
    return new Promise((resolve, reject) => {

      const duration = 450; // approx milliseconds
      const easingIncrement = 1 / duration;
      let scrollCounter = -1;

      // Use settimouet repeatedly 

      const scrollExec = () => {
        const currentTop = window.scrollY;

        scrollCounter = scrollCounter + 1;
        const speed = easeOutSine(easingIncrement * scrollCounter);
        let pixelAdvance = 100 * speed;

        // Dont go over
        if (direction === 'down' && (pixelAdvance + currentTop) > targetTop) {
          pixelAdvance = targetTop - currentTop;
        } else if (direction === 'up' && (currentTop - pixelAdvance) < targetTop) {
          pixelAdvance = currentTop - targetTop;
        }

        window.scrollBy({
          left: 0, top: direction === 'down' ? pixelAdvance : -pixelAdvance
        })

        // console.log("Scroll...", currentTop, targetTop, pixelAdvance, window.scrollY);
        if (direction === 'down' && currentTop >= targetTop || direction === 'up' && currentTop <= targetTop) {
          resolve(true);
        } else {
          setTimeout(scrollExec, 1)
        }
      }
      scrollExec();

      function easeOutSine(x) {
        return Math.sin((x * Math.PI) / 2);
      }
      function easeInSine(x) {
        return 1 - Math.cos((x * Math.PI) / 2);
      }
    })

  }

  return (
    <div className="ScrollSnap">
      {panes && panes.map((pane, i) => {
        return (
          <ScrollPane
            key={i}
            width={viewportWidth}
            height={viewportHeight}
          >
            {pane}
          </ScrollPane>
        )
      })}
    </div>
  );
}

export default ScrollSnap;
