

export default function VoiceAck(notification : string) {
    let utterance = new SpeechSynthesisUtterance(notification);
    let voicesArray =  speechSynthesis.getVoices();
    utterance.voice = voicesArray.length > 2 ? voicesArray[2] as SpeechSynthesisVoice | null : null;
    utterance.volume = 1.0;
    utterance.rate = 0.4; 
    speechSynthesis.speak(utterance);      
}