// Speech Synthesis for Japanese Pronunciation
class JapaneseSpeech {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voice = null;
        this.loadVoice();
    }

    loadVoice() {
        // Wait for voices to load
        const setVoice = () => {
            const voices = this.synth.getVoices();
            // Try to find Japanese voice
            this.voice = voices.find(voice => voice.lang === 'ja-JP') ||
                voices.find(voice => voice.lang.startsWith('ja')) ||
                voices[0]; // Fallback to first available
        };

        if (this.synth.getVoices().length > 0) {
            setVoice();
        } else {
            this.synth.addEventListener('voiceschanged', setVoice);
        }
    }

    speak(text, options = {}) {
        // Cancel any ongoing speech
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = options.rate || 0.8; // Slower for learning
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume || 1.0;

        if (this.voice) {
            utterance.voice = this.voice;
        }

        this.synth.speak(utterance);
    }

    stop() {
        this.synth.cancel();
    }
}

// Global speech instance
const japaneseSpeech = new JapaneseSpeech();

// Helper function to add click-to-speak to elements
function makeClickable(element, text) {
    element.style.cursor = 'pointer';
    element.title = 'Klik untuk mendengar';

    // Add speaker icon
    const speaker = document.createElement('span');
    speaker.innerHTML = ' 🔊';
    speaker.style.fontSize = '0.8em';
    speaker.style.opacity = '0.6';
    element.appendChild(speaker);

    element.addEventListener('click', (e) => {
        e.preventDefault();
        japaneseSpeech.speak(text);

        // Visual feedback
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });
}

// Auto-apply to character items
document.addEventListener('DOMContentLoaded', () => {
    // Find all character items and make them clickable
    document.querySelectorAll('.character-item').forEach(item => {
        const jpText = item.querySelector('.character-jp');
        if (jpText) {
            const text = jpText.textContent.trim();
            makeClickable(item, text);
        }
    });
});
