var parameters = { l: 3, m: 2 }
function repairmifneeded() {
    if (parameters.m > parameters.l) {
        parameters.m = parameters.l
        document.getElementById("valorM").value = parameters.m
    }
    if (parameters.m < -1 * parameters.l) {
        parameters.m = -1 * parameters.l
        document.getElementById("valorM").value = parameters.m
    }
}
document.getElementById("valorL").value = parameters.l
document.getElementById("valorM").value = parameters.m

document.getElementById("upL").addEventListener("click", function (ev) {
    parameters.l += 1
    document.getElementById("valorL").value = parameters.l
    options.values.l=parameters.l
    options.updateMesh();
})
document.getElementById("downL").addEventListener("click", function (ev) {
    if (parameters.l > 1) {
        parameters.l -= 1
        document.getElementById("valorL").value = parameters.l
        repairmifneeded()

    }
})
document.getElementById("valorL").addEventListener("change", function(ev){
    alert("hola")
})

