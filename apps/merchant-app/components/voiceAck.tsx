

export default function VoiceAck(notification : string) {
    let utterance = new SpeechSynthesisUtterance(notification);
    let voicesArray =  speechSynthesis.getVoices();
    utterance.voice = voicesArray[2];
    utterance.volume = 1.0;
    utterance.rate = 0.4; 
    speechSynthesis.speak(utterance);      
}