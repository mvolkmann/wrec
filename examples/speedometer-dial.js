import Wrec, { css, html } from "../wrec.js";

class SpeedometerDial extends Wrec {
  static properties = {
    min: { type: Number, value: 0 },
    max: { type: Number, value: 100 },
    value: { type: Number },
  };

  connectedCallback() {
    // Set value to min if no value attribute is provided
    if (!this.hasAttribute("value")) {
      this.value = this.min;
    }
    super.connectedCallback();
    
    // Update needle position and generate tick marks after DOM is built
    requestAnimationFrame(() => {
      this.generateTickMarks();
      this.updateNeedlePosition();
      this.setupDragListeners();
    });
  }

  updateNeedlePosition() {
    const needle = this.shadowRoot.querySelector('.needle');
    if (needle) {
      const percentage = (this.value - this.min) / (this.max - this.min);
      const angle = 210 + percentage * 300; // 210° (7 o'clock) to 510° (5 o'clock)
      needle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
    }
  }

  calculateTickInterval() {
    const range = this.max - this.min;
    
    // Find a nice interval based on the range
    const magnitude = Math.pow(10, Math.floor(Math.log10(range)));
    const normalized = range / magnitude;
    
    let interval;
    if (normalized <= 1) {
      interval = magnitude / 10;
    } else if (normalized <= 2) {
      interval = magnitude / 5;
    } else if (normalized <= 5) {
      interval = magnitude;
    } else {
      interval = magnitude * 2;
    }
    
    return interval;
  }

  generateTickMarks() {
    const dialFace = this.shadowRoot.querySelector('.dial-face');
    if (!dialFace) return;
    
    // Remove existing tick marks
    dialFace.querySelectorAll('.tick').forEach(tick => tick.remove());
    
    const interval = this.calculateTickInterval();
    const range = this.max - this.min;
    
    // Generate tick marks starting from min value
    // Calculate the first tick value that is >= min
    const firstTick = Math.ceil(this.min / interval) * interval;
    
    // Generate tick marks from first tick to max
    for (let value = firstTick; value <= this.max; value += interval) {
      // Handle floating point precision issues
      const roundedValue = Math.round(value * 1000) / 1000;
      if (roundedValue > this.max) break;
      
      const tick = document.createElement('div');
      tick.className = 'tick';
      
      // Make major tick marks at nice intervals
      const majorInterval = interval * 5;
      if (Math.abs(roundedValue % majorInterval) < 0.001) {
        tick.classList.add('major');
      }
      
      // Calculate position based on value
      const percentage = (roundedValue - this.min) / range;
      const angle = 300 + percentage * 300; // 300° (7 o'clock) to 600° (5 o'clock next day)
      tick.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateX(-85px)`;
      
      dialFace.appendChild(tick);
    }
    
    // Always add tick marks at min and max positions if they don't exist
    const minTick = document.createElement('div');
    minTick.className = 'tick major';
    minTick.style.transform = `translate(-50%, -50%) rotate(300deg) translateX(-85px)`;
    dialFace.appendChild(minTick);
    
    const maxTick = document.createElement('div');
    maxTick.className = 'tick major';
    maxTick.style.transform = `translate(-50%, -50%) rotate(600deg) translateX(-85px)`;
    dialFace.appendChild(maxTick);
  }

  setupDragListeners() {
    const needleTip = this.shadowRoot.querySelector('.needle-tip');
    const dialFace = this.shadowRoot.querySelector('.dial-face');
    
    if (!needleTip || !dialFace) return;
    
    let isDragging = false;
    
    const handleMouseDown = (e) => {
      isDragging = true;
      e.preventDefault();
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
    
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const rect = dialFace.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Calculate angle from center to mouse position
      let angle = Math.atan2(mouseY, mouseX) * 180 / Math.PI + 90;
      
      // Normalize angle to 0-360 range
      if (angle < 0) angle += 360;
      
      // Convert to our speedometer range (210° to 510°)
      // Constrain to valid range
      if (angle >= 210 || angle <= 150) {
        // Convert 210-360 and 0-150 to 210-510 range
        if (angle <= 150) {
          angle = angle + 360; // 0-150 becomes 360-510
        }
        // angle >= 210 stays as is (210-360)
        
        // Constrain to speedometer range
        angle = Math.max(210, Math.min(510, angle));
        
        // Convert angle to value
        const percentage = (angle - 210) / 300;
        const newValue = this.min + percentage * (this.max - this.min);
        
        // Constrain to min/max bounds
        this.value = Math.max(this.min, Math.min(this.max, newValue));
      }
    };
    
    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    // Add touch support
    const handleTouchStart = (e) => {
      isDragging = true;
      e.preventDefault();
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    };
    
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      const rect = dialFace.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const touchX = touch.clientX - centerX;
      const touchY = touch.clientY - centerY;
      
      // Calculate angle from center to touch position
      let angle = Math.atan2(touchY, touchX) * 180 / Math.PI + 90;
      
      // Normalize angle to 0-360 range
      if (angle < 0) angle += 360;
      
      // Convert to our speedometer range (210° to 510°)
      // Constrain to valid range
      if (angle >= 210 || angle <= 150) {
        // Convert 210-360 and 0-150 to 210-510 range
        if (angle <= 150) {
          angle = angle + 360; // 0-150 becomes 360-510
        }
        // angle >= 210 stays as is (210-360)
        
        // Constrain to speedometer range
        angle = Math.max(210, Math.min(510, angle));
        
        // Convert angle to value
        const percentage = (angle - 210) / 300;
        const newValue = this.min + percentage * (this.max - this.min);
        
        // Constrain to min/max bounds
        this.value = Math.max(this.min, Math.min(this.max, newValue));
      }
    };
    
    const handleTouchEnd = () => {
      isDragging = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    needleTip.addEventListener('mousedown', handleMouseDown);
    needleTip.addEventListener('touchstart', handleTouchStart);
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    
    // Update needle position when any property changes
    if (attrName === 'value' || attrName === 'min' || attrName === 'max') {
      requestAnimationFrame(() => {
        // Regenerate tick marks if min or max changed
        if (attrName === 'min' || attrName === 'max') {
          this.generateTickMarks();
        }
        this.updateNeedlePosition();
      });
    }
  }

  static css = css`
    :host {
      display: inline-block;
      width: 200px;
      height: 200px;
    }

    .speedometer {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(135deg, #333 0%, #555 100%);
      position: relative;
      border: 4px solid #222;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .dial-face {
      width: 90%;
      height: 90%;
      border-radius: 50%;
      background: linear-gradient(135deg, #444 0%, #666 100%);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid #555;
    }

    .needle {
      width: 2px;
      height: 45%;
      background: linear-gradient(to bottom, #ff0000 0%, #cc0000 100%);
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: bottom center;
      transform: translate(-50%, -100%) rotate(210deg);
      border-radius: 1px;
      box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);
      z-index: 3;
      transition: transform 0.1s ease;
    }

    .needle-tip {
      width: 8px;
      height: 8px;
      background: #ff0000;
      border-radius: 50%;
      position: absolute;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
      box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);
    }

    .needle-tip:hover {
      box-shadow: 0 0 5px rgba(255, 0, 0, 0.8);
    }

    .center-dot {
      width: 10px;
      height: 10px;
      background: #333;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 4;
      border: 1px solid #666;
    }

    .tick {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: center;
      height: 1px;
      width: 15px;
      background: #ccc;
      z-index: 2;
    }

    .tick.major {
      width: 20px;
      height: 2px;
      background: #fff;
    }

    .value-display {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-family: "Courier New", monospace;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.7);
      padding: 4px 8px;
      border-radius: 4px;
      z-index: 5;
    }
  `;

  static html = html`
    <div class="speedometer">
      <div class="dial-face">
        <div class="needle">
          <div class="needle-tip"></div>
        </div>
        <div class="center-dot"></div>
      </div>
      <div class="value-display">Math.round(this.value)</div>
    </div>
  `;
}

SpeedometerDial.register();
