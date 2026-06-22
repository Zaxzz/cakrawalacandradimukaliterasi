"use client";

import React, { useEffect } from "react";

export default function MouseTrail() {
  useEffect(() => {
    // All coordinates and variables are kept local inside useEffect to prevent global namespace pollution 
    // and avoid any Next.js/SSR build failures (window/document references on client only).
    let ctx;
    let f;
    let e_val = 0;
    const pos = { x: 0, y: 0 };
    let lines = [];
    let lastMoveTime = Date.now();
    let loopRunning = false;
    
    // Performance Optimized Configuration: Reduced to minimize path calculation overhead during scrolling.
    const E = {
      debug: true,
      friction: 0.5,
      trails: 20, // Reduced from 80 for scrolling performance
      size: 18,   // Reduced from 50 for scrolling performance
      dampening: 0.025,
      tension: 0.99,
    };

    function Oscillator(opt) {
      this.init(opt || {});
    }
    
    Oscillator.prototype = {
      init: function (opt) {
        this.phase = opt.phase || 0;
        this.offset = opt.offset || 0;
        this.frequency = opt.frequency || 0.001;
        this.amplitude = opt.amplitude || 1;
      },
      update: function () {
        this.phase += this.frequency;
        e_val = this.offset + Math.sin(this.phase) * this.amplitude;
        return e_val;
      },
      value: function () {
        return e_val;
      },
    };

    function Node() {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
    }

    function Line(opt) {
      this.init(opt || {});
    }

    Line.prototype = {
      init: function (opt) {
        this.spring = opt.spring + 0.1 * Math.random() - 0.05;
        this.friction = E.friction + 0.01 * Math.random() - 0.005;
        this.nodes = [];
        for (let i = 0; i < E.size; i++) {
          const t = new Node();
          t.x = pos.x;
          t.y = pos.y;
          this.nodes.push(t);
        }
      },
      update: function () {
        let spring = this.spring;
        let t = this.nodes[0];
        t.vx += (pos.x - t.x) * spring;
        t.vy += (pos.y - t.y) * spring;
        for (let i = 0, len = this.nodes.length; i < len; i++) {
          t = this.nodes[i];
          if (i > 0) {
            const prev = this.nodes[i - 1];
            t.vx += (prev.x - t.x) * spring;
            t.vy += (prev.y - t.y) * spring;
            t.vx += prev.vx * E.dampening;
            t.vy += prev.vy * E.dampening;
          }
          t.vx *= this.friction;
          t.vy *= this.friction;
          t.x += t.vx;
          t.y += t.vy;
          spring *= E.tension;
        }
      },
      draw: function () {
        let e_node, t_node;
        let n_val = this.nodes[0].x;
        let i_val = this.nodes[0].y;
        ctx.beginPath();
        ctx.moveTo(n_val, i_val);
        let a = 1;
        const o = this.nodes.length - 2;
        for (; a < o; a++) {
          e_node = this.nodes[a];
          t_node = this.nodes[a + 1];
          n_val = 0.5 * (e_node.x + t_node.x);
          i_val = 0.5 * (e_node.y + t_node.y);
          ctx.quadraticCurveTo(e_node.x, e_node.y, n_val, i_val);
        }
        e_node = this.nodes[a];
        t_node = this.nodes[a + 1];
        ctx.quadraticCurveTo(e_node.x, e_node.y, t_node.x, t_node.y);
        ctx.stroke();
        ctx.closePath();
      },
    };

    const activeListeners = {};

    function startLoop() {
      if (!loopRunning && ctx) {
        loopRunning = true;
        ctx.running = true;
        render();
      }
    }

    function onMousemove(event) {
      lastMoveTime = Date.now();

      // Set initial position first so that lines are initialized at cursor location.
      if (event.touches) {
        pos.x = event.touches[0].clientX;
        pos.y = event.touches[0].clientY;
      } else {
        pos.x = event.clientX;
        pos.y = event.clientY;
      }

      // PERFORMANCE FIX: Initialize lines ONLY ONCE on first movement.
      if (lines.length === 0) {
        lines = [];
        for (let i = 0; i < E.trails; i++) {
          lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }));
        }
      }

      startLoop();

      function updatePos(ev) {
        lastMoveTime = Date.now();
        startLoop();
        if (ev.touches) {
          pos.x = ev.touches[0].clientX;
          pos.y = ev.touches[0].clientY;
        } else {
          pos.x = ev.clientX;
          pos.y = ev.clientY;
        }
      }

      function updatePosTouch(ev) {
        lastMoveTime = Date.now();
        startLoop();
        if (ev.touches.length === 1) {
          pos.x = ev.touches[0].clientX;
          pos.y = ev.touches[0].clientY;
        }
      }

      document.removeEventListener("mousemove", onMousemove);
      document.removeEventListener("touchstart", onMousemove);
      
      document.addEventListener("mousemove", updatePos);
      document.addEventListener("touchmove", updatePos, { passive: true });
      document.addEventListener("touchstart", updatePosTouch);

      activeListeners.updatePos = updatePos;
      activeListeners.updatePosTouch = updatePosTouch;
    }

    let animFrameId;
    function render() {
      if (ctx.running) {
        // PERFORMANCE SUSPEND: Stop the requestAnimationFrame render loop if the cursor is inactive
        // for more than 2 seconds, clearing canvas to preserve CPU resources.
        if (Date.now() - lastMoveTime > 2000) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.running = false;
          loopRunning = false;
          return;
        }

        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = "lighter";
        
        ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ", 100%, 55%, 0.085)";
        ctx.lineWidth = 2.0; 
        
        for (let i = 0; i < E.trails; i++) {
          if (lines[i]) {
            lines[i].update();
            lines[i].draw();
          }
        }
        ctx.frame++;
        animFrameId = window.requestAnimationFrame(render);
      }
    }

    function resizeCanvas() {
      const canvasEl = document.getElementById("mouse-trail-canvas");
      if (canvasEl && ctx) {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
      }
    }

    function renderCanvas() {
      const canvasEl = document.getElementById("mouse-trail-canvas");
      if (!canvasEl) return;
      ctx = canvasEl.getContext("2d");
      if (!ctx) return;
      ctx.running = true;
      ctx.frame = 1;
      f = new Oscillator({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
      });

      document.addEventListener("mousemove", onMousemove);
      document.addEventListener("touchstart", onMousemove);
      window.addEventListener("resize", resizeCanvas);
      
      resizeCanvas();
    }

    // Initialize Canvas render
    renderCanvas();

    // Clean up event listeners and animations on unmount
    return () => {
      document.removeEventListener("mousemove", onMousemove);
      document.removeEventListener("touchstart", onMousemove);
      if (activeListeners.updatePos) {
        document.removeEventListener("mousemove", activeListeners.updatePos);
        document.removeEventListener("touchmove", activeListeners.updatePos);
      }
      if (activeListeners.updatePosTouch) {
        document.removeEventListener("touchstart", activeListeners.updatePosTouch);
      }
      window.removeEventListener("resize", resizeCanvas);
      if (ctx) {
        ctx.running = false;
      }
      if (animFrameId) {
        window.cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  return (
    <canvas
      id="mouse-trail-canvas"
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}
