
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
window.addEventListener("load", function () {
    document.getElementById("valorL").value = parameters.l
    document.getElementById("valorM").value = parameters.m
    document.getElementById("real_imag").value = parameters.ri
    document.getElementById("checkbox_positivo").checked = parameters.positivo
    document.getElementById("checkbox_negativo").checked = parameters.negativo
})

document.getElementById("upL").addEventListener("click", function (ev) {
    parameters.l += 1
    document.getElementById("valorL").value = parameters.l
    updateMesh();
})
document.getElementById("downL").addEventListener("click", function (ev) {
    if (parameters.l > 0) {
        parameters.l -= 1
        document.getElementById("valorL").value = parameters.l
        repairmifneeded()
        updateMesh();

    }
})
document.getElementById("valorL").addEventListener("change", function (ev) {
    let v = parseInt(ev.target.value)
    if (!isNaN(v)) {
        parameters.l = Math.abs(v)
        document.getElementById("valorL").value = parameters.l
        repairmifneeded()
        updateMesh();
    }
})

document.getElementById("upM").addEventListener("click", function (ev) {
    if (parameters.m < parameters.l) {
        parameters.m += 1
        document.getElementById("valorM").value = parameters.m
        updateMesh();
    }
})
document.getElementById("downM").addEventListener("click", function (ev) {
    if (parameters.m > -1 * parameters.l) {
        parameters.m -= 1
        document.getElementById("valorM").value = parameters.m
        updateMesh();
    }
})
document.getElementById("valorM").addEventListener("change", function (ev) {
    let v = parseInt(ev.target.value)
    if (!isNaN(v) && Math.abs(v) < parameters.l) {
        parameters.m = v
        updateMesh();
    }
    document.getElementById("valorM").value = parameters.m
})

document.getElementById("checkbox_positivo").addEventListener("change", function (ev) {
    parameters.positivo = ev.target.checked
    updateMesh();
})

document.getElementById("checkbox_negativo").addEventListener("change", function (ev) {
    parameters.negativo = ev.target.checked
    updateMesh();
})

document.getElementById("real_imag").addEventListener("change", function (ev) {
    parameters.ri = ev.target.value
    var positivo = document.getElementById("checkbox_positivo")
    var negativo = document.getElementById("checkbox_negativo")
    if (ev.target.value == "modulo") {
        positivo.disabled = true
        negativo.disabled = true
        positivo.parentNode.classList.add("is-disabled")
        negativo.parentNode.classList.add("is-disabled")
    }
    else {
        positivo.disabled = false
        negativo.disabled = false
        positivo.parentNode.classList.remove("is-disabled")
        negativo.parentNode.classList.remove("is-disabled")
    }

    updateMesh();
})