import React, { FC, useEffect, useRef, useState } from 'react';

import { isMobileSafari } from 'react-device-detect';

type ViewportDimensions = {
  width: number;
  height: number;
}

type DoScroll = {
  targetTop: number;
  direction: 'up' | 'down';
}

type ScrollSnapRef = {
  isScrolling: boolean;
  currentPaneNumber: number;
  lastTouchedLayerY: number;
}

type ScrollSnapProps = {
  panes: number;
}

/*
* ScrollSnap - Takes over scrolling behavior based on number of full screen window "panes" 
*/
const ScrollSnap: FC<ScrollSnapProps> = ({ panes }) => {

  const scrollSnap = useRef<ScrollSnapRef>({
    isScrolling: false,
    currentPaneNumber: 1,
    lastTouchedLayerY: 0,
  });

  const [viewportDimensions, setViewportDimensions] = useState<ViewportDimensions>({
    width: 0, height: 0
  });

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

  }, [viewportDimensions])

  const setContainer = () => {

    let newHeight = window.innerHeight;
    const newWidth = window.innerWidth;

    if (isMobileSafari) {
      newHeight = newHeight + 85;
    }

    if (newHeight !== viewportDimensions.height) {
      setViewportDimensions({ height: newHeight, width: newWidth });
      window.scrollTo(0, (scrollSnap.current.currentPaneNumber - 1) * newHeight);
    }

  }

  const onTouchStart = (e) => {
    // Save last position to determine delta movement
    scrollSnap.current.lastTouchedLayerY = e.layerY;
  }

  const onScroll = async (e) => {
    if (scrollSnap.current.isScrolling) return null;
    scrollSnap.current.isScrolling = true;

    // Desktop 
    const delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 10) || 1;
    let direction = delta < 0 ? 'up' : 'down';

    if (isMobileSafari) {
      // console.log("SAFARI", scrollSnap.current.lastTouchedLayerY, e.layerY)
      direction = scrollSnap.current.lastTouchedLayerY - e.layerY < 0 ? 'up' : 'down';
    }

    if (direction === 'up') {
      await movePageUp()
    } else if (direction === 'down') {
      await movePageDown()
    }
    setTimeout(() => {
      scrollSnap.current.isScrolling = false;
    }, isMobileSafari ? 100 : 1000);
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
    if (scrollSnap.current.currentPaneNumber === 1) return // no scroll
    const previousPaneNumber = scrollSnap.current.currentPaneNumber - 1;
    const previousScrollTop = previousPaneNumber === 1 ? 0 : viewportDimensions.height * (previousPaneNumber - 1);
    scrollSnap.current.currentPaneNumber = previousPaneNumber;
    return doScroll({ targetTop: previousScrollTop, direction: 'up' });
  }

  const movePageDown = () => {
    if (scrollSnap.current.currentPaneNumber === panes) return // no scroll
    const nextPaneNumber = scrollSnap.current.currentPaneNumber + 1;
    const nextScrollTop = viewportDimensions.height * scrollSnap.current.currentPaneNumber;
    scrollSnap.current.currentPaneNumber = nextPaneNumber;
    console.log("Do scroll down");
    return doScroll({ targetTop: nextScrollTop, direction: 'down' });
  }
  const doScroll = ({ targetTop, direction }: DoScroll) => {
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

        console.log("Scroll", direction, currentTop, targetTop, "Adv", pixelAdvance);

        window.scrollBy(0, direction === 'down' ? pixelAdvance : -pixelAdvance);

        if (direction === 'down' && currentTop >= targetTop || direction === 'up' && currentTop <= targetTop) {
          resolve(true);
        } else {
          setTimeout(scrollExec, 1);
        }
      }
      setTimeout(scrollExec, 1);

      function easeOutSine(x) {
        return Math.sin((x * Math.PI) / 2);
      }
      function easeInSine(x) {
        return 1 - Math.cos((x * Math.PI) / 2);
      }
    })

  }

  return null
}

export default ScrollSnap;
