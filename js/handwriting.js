// Handwriting Canvas for Essay Questions
class HandwritingCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;

        // Set canvas size
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;

        // Drawing settings
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        this.setupEventListeners();
        this.drawGrid();
    }

    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            this.canvas.dispatchEvent(mouseEvent);
        });
    }

    startDrawing(e) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        this.lastX = e.clientX - rect.left;
        this.lastY = e.clientY - rect.top;
    }

    draw(e) {
        if (!this.isDrawing) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        this.lastX = x;
        this.lastY = y;
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    drawGrid() {
        const gridSize = 40;
        this.ctx.strokeStyle = '#e5e7eb';
        this.ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Reset drawing style
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 3;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
    }

    undo() {
        // Simple undo by clearing - in production, you'd save states
        this.clear();
    }

    getDataURL() {
        return this.canvas.toDataURL('image/png');
    }
}

// Initialize canvases when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvases = document.querySelectorAll('.handwriting-canvas');
    canvases.forEach((canvas, index) => {
        const canvasObj = new HandwritingCanvas(canvas.id);

        // Setup clear button
        const clearBtn = canvas.parentElement.querySelector('.clear-canvas');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => canvasObj.clear());
        }

        // Setup undo button
        const undoBtn = canvas.parentElement.querySelector('.undo-canvas');
        if (undoBtn) {
            undoBtn.addEventListener('click', () => canvasObj.undo());
        }
    });
});
