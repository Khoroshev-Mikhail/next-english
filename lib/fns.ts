export function speechText(text: string){
    let { speechSynthesis } = window
    speechSynthesis.cancel()
    let utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = speechSynthesis.getVoices()[144]
    // text.pitch
    // text.volume
    speechSynthesis.speak(utterance)
    speechSynthesis = undefined
    utterance = undefined
}
export function ucFirst(str: string) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1).toLocaleLowerCase();
}