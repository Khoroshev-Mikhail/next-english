export function speechText(text: string){
    const { speechSynthesis } = window
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = speechSynthesis.getVoices()[144]
    // text.pitch
    // text.volume
    speechSynthesis.speak(utterance)
}