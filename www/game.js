const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameActive = true;
let enemies = [];
const player = { x: canvas.width/2 - 25, y: canvas.height - 100, size: 50, speed: 0.15 };

window.addEventListener("touchstart", (e) => {
    if(!gameActive) { resetGame(); return; }
    player.targetX = e.touches[0].clientX - player.size / 2;
});

function resetGame() {
    score = 0;
    enemies = [];
    gameActive = true;
    update();
}

function spawnEnemy() {
    if(!gameActive) return;
    enemies.push({
        x: Math.random() * (canvas.width - 30),
        y: -30,
        size: 30,
        speed: 4 + (score / 10) // Skor arttıkça hızlanır!
    });
}
setInterval(spawnEnemy, 800);

function update() {
    if (!gameActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Skor
    score++;
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Skor: " + Math.floor(score/10), 20, 30);
    
    // Oyuncu
    if(player.targetX !== undefined) {
        player.x += (player.targetX - player.x) * player.speed;
    }
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    // Düşmanlar
    for (let i = 0; i < enemies.length; i++) {
        let e = enemies[i];
        e.y += e.speed;
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(e.x, e.y, e.size, e.size);
        
        if (player.x < e.x + e.size && player.x + player.size > e.x &&
            player.y < e.y + e.size && player.y + player.size > e.y) {
            gameActive = false;
            ctx.fillStyle = "red";
            ctx.fillText("OYUN BİTTİ! Yeniden başlamak için dokun.", canvas.width/6, canvas.height/2);
        }
    }
    requestAnimationFrame(update);
}
update();
