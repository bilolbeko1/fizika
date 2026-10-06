/* =========================================
   SCIENCE LAB
   API FREE
========================================= */


/* NAVIGATION */

const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const page = button.dataset.page;

        openLab(page);

    });

});


function openLab(pageName) {

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    navButtons.forEach(button => {
        button.classList.remove("active");
    });

    const page = document.getElementById(pageName);

    if (page) {
        page.classList.add("active-page");
    }

    const nav = document.querySelector(
        `.nav-btn[data-page="${pageName}"]`
    );

    if (nav) {
        nav.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageName === "projectile") {
        setTimeout(calculateProjectile, 100);
    }

    if (pageName === "waves") {
        setTimeout(drawWave, 100);
    }
}


/* =========================================
   TOAST
========================================= */

function toast(message) {

    const box = document.getElementById("toast");

    box.textContent = message;

    box.classList.add("show");

    setTimeout(() => {
        box.classList.remove("show");
    }, 2500);
}


/* =========================================
   INFO
========================================= */

function showInfo() {

    toast(
        "Laboratoriyani tanlang va qiymatlarni o‘zgartirib tajriba qiling!"
    );

}


/* =========================================
   OHM LAW
   U = I × R
========================================= */

const voltage = document.getElementById("voltage");
const resistance = document.getElementById("resistance");

voltage.addEventListener("input", () => {

    document.getElementById("voltageValue").textContent =
        voltage.value + " V";

    calculateOhm();

});

resistance.addEventListener("input", () => {

    document.getElementById("resistanceValue").textContent =
        resistance.value + " Ω";

    calculateOhm();

});


function calculateOhm() {

    const U = Number(voltage.value);
    const R = Number(resistance.value);

    const I = U / R;
    const P = U * I;

    document.getElementById("currentResult").textContent =
        I.toFixed(2);

    document.getElementById("powerResult").textContent =
        P.toFixed(2) + " W";
}


/* =========================================
   SPEED
   v = s / t
========================================= */

function calculateMotion() {

    const s = Number(
        document.getElementById("distance").value
    );

    const t = Number(
        document.getElementById("time").value
    );

    if (t <= 0) {
        toast("Vaqt 0 dan katta bo‘lishi kerak!");
        return;
    }

    const v = s / t;

    document.getElementById("speedResult").textContent =
        v.toFixed(2);

}


/* =========================================
   FREE FALL
   h = 1/2 gt²
========================================= */

function calculateGravity() {

    const h = Number(
        document.getElementById("height").value
    );

    if (h <= 0) {
        toast("Balandlikni kiriting!");
        return;
    }

    const g = 9.81;

    const t = Math.sqrt(
        (2 * h) / g
    );

    document.getElementById("fallTime").textContent =
        t.toFixed(2);

    const ball =
        document.getElementById("fallBall");

    ball.animate(
        [
            {
                top: "15px"
            },
            {
                top: "185px"
            }
        ],
        {
            duration: t * 1000,
            easing: "ease-in",
            iterations: 1
        }
    );

}


/* =========================================
   PROJECTILE
========================================= */

function calculateProjectile() {

    const v = Number(
        document.getElementById("projectileSpeed").value
    );

    const angle =
        Number(
            document.getElementById("projectileAngle").value
        ) * Math.PI / 180;

    const g = 9.81;

    const maxHeight =
        Math.pow(v * Math.sin(angle), 2)
        / (2 * g);

    const range =
        Math.pow(v, 2)
        * Math.sin(2 * angle)
        / g;

    document.getElementById("maxHeight").textContent =
        maxHeight.toFixed(2);

    document.getElementById("range").textContent =
        range.toFixed(2);


    const canvas =
        document.getElementById("projectileCanvas");

    const ctx = canvas.getContext("2d");

    const rect =
        canvas.getBoundingClientRect();

    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;

    ctx.scale(
        devicePixelRatio,
        devicePixelRatio
    );

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    /* ground */

    ctx.strokeStyle = "#1a78b8";
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(20, height - 25);
    ctx.lineTo(width - 20, height - 25);

    ctx.stroke();


    /* trajectory */

    ctx.strokeStyle = "#00d9ff";
    ctx.lineWidth = 3;

    ctx.beginPath();

    const scaleX =
        (width - 50) / range;

    const scaleY =
        (height - 60) / maxHeight;

    for (
        let x = 0;
        x <= range;
        x += range / 100
    ) {

        const y =
            x * Math.tan(angle)
            -
            (g * Math.pow(x, 2))
            /
            (
                2 *
                Math.pow(v, 2) *
                Math.pow(Math.cos(angle), 2)
            );

        const px = 25 + x * scaleX;

        const py =
            height -
            25 -
            y * scaleY;

        if (x === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }

    ctx.stroke();


    /* projectile */

    const ball =
        document.createElement("div");

    ball.style.position = "absolute";
}


/* =========================================
   FORCE
   F = m × a
========================================= */

function calculateForce() {

    const m = Number(
        document.getElementById("mass").value
    );

    const a = Number(
        document.getElementById("acceleration").value
    );

    const F = m * a;

    document.getElementById("forceResult").textContent =
        F.toFixed(2);

}


/* =========================================
   LENS
   1/f = 1/do + 1/di
========================================= */

function calculateLens() {

    const f = Number(
        document.getElementById("focal").value
    );

    const doo = Number(
        document.getElementById("objectDistance").value
    );

    if (f <= 0 || doo <= 0 || doo === f) {

        toast(
            "f va do qiymatlarini to‘g‘ri kiriting!"
        );

        return;
    }

    const di =
        1 /
        (
            (1 / f) -
            (1 / doo)
        );

    document.getElementById("imageDistance").textContent =
        di.toFixed(2);

}


/* =========================================
   WAVES
   v = f × λ
========================================= */

function calculateWave() {

    const f = Number(
        document.getElementById("frequency").value
    );

    const lambda = Number(
        document.getElementById("wavelength").value
    );

    const v = f * lambda;

    document.getElementById("waveSpeed").textContent =
        v.toFixed(2);

    drawWave();

}


function drawWave() {

    const canvas =
        document.getElementById("waveCanvas");

    if (!canvas) return;

    const rect =
        canvas.getBoundingClientRect();

    canvas.width =
        rect.width * devicePixelRatio;

    canvas.height =
        rect.height * devicePixelRatio;

    const ctx =
        canvas.getContext("2d");

    ctx.scale(
        devicePixelRatio,
        devicePixelRatio
    );

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    const frequency =
        Number(
            document.getElementById("frequency").value
        ) || 5;

    ctx.strokeStyle = "#00d9ff";
    ctx.lineWidth = 3;

    ctx.beginPath();

    for (
        let x = 0;
        x < width;
        x++
    ) {

        const y =
            height / 2 +
            Math.sin(
                x * frequency * 0.035
            ) * 60;

        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

    }

    ctx.stroke();

}


/* =========================================
   HEAT
   Q = m × c × ΔT
========================================= */

function calculateHeat() {

    const m =
        Number(
            document.getElementById("heatMass").value
        );

    const c =
        Number(
            document.getElementById("heatCapacity").value
        );

    const deltaT =
        Number(
            document.getElementById("temperature").value
        );

    const Q =
        m * c * deltaT;

    document.getElementById("heatResult").textContent =
        Q.toFixed(2);

}


/* =========================================
   MAGNET
========================================= */

function animateMagnet() {

    const lines =
        document.querySelectorAll(".field-line");

    lines.forEach((line, index) => {

        line.animate(
            [
                {
                    opacity: .15,
                    transform:
                        "translate(-50%, -50%) scale(.9)"
                },
                {
                    opacity: 1,
                    transform:
                        "translate(-50%, -50%) scale(1)"
                },
                {
                    opacity: .35,
                    transform:
                        "translate(-50%, -50%) scale(.9)"
                }
            ],
            {
                duration: 1200,
                delay: index * 100,
                iterations: 2
            }
        );

    });

    toast("Magnit maydoni faollashtirildi! 🧲");

}


/* =========================================
   SEARCH
========================================= */

document
    .getElementById("searchBtn")
    .addEventListener("click", () => {

        const name =
            prompt(
                "Qaysi laboratoriyani qidiryapsiz?"
            );

        if (!name) return;

        const text = name.toLowerCase();

        if (
            text.includes("ohm") ||
            text.includes("tok")
        ) {
            openLab("ohm");

        } else if (
            text.includes("tezlik") ||
            text.includes("harakat")
        ) {
            openLab("motion");

        } else if (
            text.includes("tushish")
        ) {
            openLab("gravity");

        } else if (
            text.includes("otish")
        ) {
            openLab("projectile");

        } else if (
            text.includes("kuch")
        ) {
            openLab("force");

        } else if (
            text.includes("linza")
        ) {
            openLab("lens");

        } else if (
            text.includes("to‘lqin") ||
            text.includes("tolqin")
        ) {
            openLab("waves");

        } else if (
            text.includes("issiqlik")
        ) {
            openLab("heat");

        } else if (
            text.includes("magnit")
        ) {
            openLab("magnet");

        } else {
            toast("Laboratoriya topilmadi.");
        }

    });


/* START */

calculateOhm();
calculateMotion();
calculateGravity();
calculateProjectile();
calculateForce();
calculateLens();
calculateWave();
calculateHeat();

console.log(
    "SCIENCE LAB — API FREE READY 🚀"
);