import {onMounted, ref} from 'vue';

const MASK_WIDTH = 240;
const MASK_HEIGHT = 300;
const PAD_RADIUS = 48;
const STAMP_STEP = 0.25;
const ERASE_FULL_STAMPS = 400;

export function useEraseMask() {
    const maskUrl = ref('');
    const pad = ref({x: 0, y: 0, isVisible: false});
    const erasedShare = ref(0);

    /** @type {CanvasRenderingContext2D | null} */
    let context = null;
    let frameId = null;
    let strokes = 0;
    /** @type {{x: number, y: number} | null} */
    let lastPoint = null;

    async function paint() {
        const url = context.canvas.toDataURL();
        const image = new Image();

        image.src = url;

        try {
            await image.decode();
            maskUrl.value = url;
        } finally {
            frameId = null;
        }
    }

    function schedulePaint() {
        if (frameId === null) {
            frameId = requestAnimationFrame(paint);
        }
    }

    function reset() {
        if (!context) {
            return;
        }

        context.globalCompositeOperation = 'source-over';
        context.fillStyle = '#000';
        context.fillRect(0, 0, MASK_WIDTH, MASK_HEIGHT);
        context.globalCompositeOperation = 'destination-out';
        strokes = 0;
        lastPoint = null;
        erasedShare.value = 0;
        schedulePaint();
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     */
    function stamp(x, y, radius) {
        const brush = context.createRadialGradient(x, y, radius * 0.55, x, y, radius);

        brush.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
        brush.addColorStop(1, 'rgba(0, 0, 0, 0)');
        context.fillStyle = brush;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        strokes += 1;
    }

    /** @param {PointerEvent} event */
    function handlePointerMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        pad.value = {x, y, isVisible: true};

        const isDrawing = event.pointerType === 'mouse' || event.buttons > 0;

        if (!context || !isDrawing) {
            lastPoint = null;
            return;
        }

        const scale = MASK_WIDTH / rect.width;
        const point = {x: x * scale, y: (y / rect.height) * MASK_HEIGHT};
        const radius = PAD_RADIUS * scale;
        const from = lastPoint ?? point;
        const distance = Math.hypot(point.x - from.x, point.y - from.y);
        const count = Math.max(1, Math.ceil(distance / (radius * STAMP_STEP)));

        for (let index = 1; index <= count; index += 1) {
            const share = index / count;

            stamp(from.x + (point.x - from.x) * share, from.y + (point.y - from.y) * share, radius);
        }

        lastPoint = point;
        erasedShare.value = Math.min(1, strokes / ERASE_FULL_STAMPS);
        schedulePaint();
    }

    function handlePointerLeave() {
        lastPoint = null;
        pad.value = {...pad.value, isVisible: false};
    }

    onMounted(() => {
        const canvas = document.createElement('canvas');

        canvas.width = MASK_WIDTH;
        canvas.height = MASK_HEIGHT;
        context = canvas.getContext('2d');
        reset();
    });

    return {maskUrl, pad, erasedShare, reset, handlePointerMove, handlePointerLeave};
}
