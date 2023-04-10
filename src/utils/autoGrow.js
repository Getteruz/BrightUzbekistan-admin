function autoGrow(element) {
    element.target.style.height = "20px";
    element.target.style.height = (element.target.scrollHeight)+"px";
}

export default autoGrow