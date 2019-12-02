
var SphericalHarmonics = function (values) {
    this.values = values;
};

SphericalHarmonics.prototype = {
    computeVertexFor: function (p, phi, theta) {
        var real = 0
        var imag = 0
        var r = 0
        if (this.values.ri == "modulo" || this.values.ri == "real")
            var real = normalize(this.values.l, this.values.m) * LegendreP(this.values.l, this.values.m, Math.cos(theta)) * Math.cos(this.values.m * phi)
        if (this.values.ri == "modulo" || this.values.ri == "imaginaria")
            var imag = normalize(this.values.l, this.values.m) * LegendreP(this.values.l, this.values.m, Math.cos(theta)) * Math.sin(this.values.m * phi)
        if (this.values.ri == "modulo") {
            r = Math.sqrt(real * real + imag * imag)
        } else {
            if (this.values.ri == "real")
                r = real
            else if (this.values.ri == "imaginaria")
                r = imag
            if (this.values.positivo && this.values.negativo)
                r = Math.abs(r)
            else {
                if (this.values.positivo && r < 0)
                    r = 0
                if (this.values.negativo) {
                    if (r > 0)
                        r = 0
                    else
                        r *= -1
                }
                if (!this.values.negativo && !this.values.positivo)
                    r = 0
            }
        }
        var sinTheta = Math.sin(theta);
        p.x = r * sinTheta * Math.cos(phi);
        p.y = r * Math.cos(theta);
        p.z = r * sinTheta * Math.sin(phi);
        return p;
    },

    getPhiRange: function () {
        return 2 * 3.14159265358979323846;
    },

    getPhiResolutionLimit: function (res) {
        return res;
    },

    getThetaRange: function () {
        return 3.14159265358979323846;
    },

    getThetaResolutionLimit: function (res) {
        return res;
    }
};


function LegendreP(l, m, x) {

    if (Math.abs(x) == 1.0) {
        if (m != 0) return 0
        if (x > 0.0) return 1.0
        else return Math.pow(-1, l)
    }


    let sqrt_1_x2 = Math.sqrt(1 - x * x)
    let half_sqrt_1_x2 = sqrt_1_x2 * 0.5
    let inv_half_sqrt_1_x2 = x / half_sqrt_1_x2

    if (l == 0) {
        return 1;
    }
    else if (l == 1) {
        switch (m) {
            case -1:
                return 0.5 * sqrt_1_x2;
            case 0:
                return x;
            case 1:
                return -sqrt_1_x2;
            default:
                { }
        }
    }

    let p_l__m = Math.pow(-1, l) * Math.pow(half_sqrt_1_x2, l) / factorial(l); // P_l^{-l}
    if (m == -l) return p_l__m
    let p_l_1_m = -p_l__m * l * inv_half_sqrt_1_x2
    let abs_m = Math.abs(m)
    for (var k = 2 - l; k <= -abs_m; k++) {
        tmp = p_l_1_m
        p_l_1_m = ((k - 1) * (inv_half_sqrt_1_x2) * p_l_1_m) - ((l - (k - 2)) * (l + (k - 1)) * p_l__m)
        p_l__m = tmp
    }

    if (m == abs_m) {
        p_l_1_m = Math.pow(-1, abs_m) * (factorial(l + abs_m) / factorial(l - abs_m)) * p_l_1_m
    }

    return m % 2 == 0 ? p_l_1_m : -p_l_1_m
}


function factorial(n) {
    var total = 1;
    for (i = 1; i <= n; i++) {
        total = total * i;
    }
    return total;
}
function normalize(l, m) {
    return Math.sqrt(((2 * l + 1) * factorial(l - m)) / factorial(l + m))
}

