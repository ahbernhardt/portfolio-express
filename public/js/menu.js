// MENU Click
const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');

burger.addEventListener('click', () => {
    burger.classList.toggle('show-x');
    ul.classList.toggle('show');
});


// SLIDER
$('.slider').each(function() {
    var $this = $(this);
    var $group = $this.find('.slide_group');
    var $slides = $this.find('.slide');
    var bulletArray = [];
    var currentIndex = 0;
    var timeout;

    function move(newIndex) {
        var animateLeft, slideLeft;

        advance();

        if ($group.is(':animated') || currentIndex === newIndex) {
            return;
        }

        bulletArray[currentIndex].removeClass('active');
        bulletArray[newIndex].addClass('active');

        if (newIndex > currentIndex) {
            slideLeft = '100%';
            animateLeft = '-100%';
        } else {
            slideLeft = '-100%';
            animateLeft = '100%';
        }

        $slides.eq(newIndex).css({
            display: 'block',
            left: slideLeft
        });
        $group.animate({
            left: animateLeft
        }, function() {
            $slides.eq(currentIndex).css({
                display: 'none'
            });
            $slides.eq(newIndex).css({
                left: 0
            });
            $group.css({
                left: 0
            });
            currentIndex = newIndex;
        });
    }

    function advance() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            if (currentIndex < ($slides.length - 1)) {
                move(currentIndex + 1);
            } else {
                move(0);
            }
        }, 15000);
    }

    $('.next_btn').on('click', function() {
        if (currentIndex < ($slides.length - 1)) {
            move(currentIndex + 1);
        } else {
            move(0);
        }
    });

    $('.previous_btn').on('click', function() {
        if (currentIndex !== 0) {
            move(currentIndex - 1);
        } else {
            move(3);
        }
    });

    $.each($slides, function(index) {
        var $button = $('<a class="slide_btn">&bull;</a>');

        if (index === currentIndex) {
            $button.addClass('active');
        }
        $button.on('click', function() {
            move(index);
        }).appendTo('.slide_buttons');
        bulletArray.push($button);
    });

    advance();
});




// PROJECTSSSSS
$('.ProjectCarousel').each(function() {
    const $this = $(this);
    const $group = $this.find('.List');
    const $project = $this.find('.Project');
    let currentIndex = 0;

    function move(newIndex) {
        var animateLeft, slideLeft;


        if ($group.is(':animated') || currentIndex === newIndex) {
            return;
        }

        if (newIndex > currentIndex) {
            slideLeft = '100%';
            animateLeft = '-100%';
        } else {
            slideLeft = '-100%';
            animateLeft = '100%';
        }

        $project.eq(newIndex).css({
            display: 'block',
            left: slideLeft
        });
        $group.animate({
            left: animateLeft
        }, function() {
            $project.eq(currentIndex).css({
                display: 'none'
            });
            $project.eq(newIndex).css({
                left: 0
            });
            $group.css({
                left: 0
            });
            currentIndex = newIndex;
        });
    }


    $('.next').on('click', function() {
        if (currentIndex < ($project.length - 1)) {
            move(currentIndex + 1);
        } else {
            move(0);
        }
    });

    $('.prev').on('click', function() {
        if (currentIndex !== 0) {
            move(currentIndex - 1);
        } else {
            move(3);
        }
    });


    advance();
});

const validateEmail = (email)  => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// /table
let rows = document.querySelectorAll('tbody tr');

rows.forEach((row) => {
    let z = document.createElement("td");
    z.textContent = `${row.rowIndex}`;
    row.appendChild(z);
});

// 404 PAGE
window.addEventListener("DOMContentLoaded",game);

function game() {
    var canvas = document.querySelector("canvas"),
        c = canvas.getContext("2d"),
        W = canvas.width,
        H = canvas.height,
        S = 2,
        assets = [
            "https://i.ibb.co/dDcTzrQ/nowhere.png",
            "https://i.ibb.co/S7zPTv5/tumbleweed.png"
        ],
        sprites = [],
        score = 0,
        world = {
            friction: 0.1,
            gravity: 0.1
        },
        tumbleweed = {
            inPlay: false,
            x: -160,
            y: 200,
            r: 32,
            rotation: 0,
            xVel: 10,
            yVel: 0,
            mass: 2.5,
            restitution: 0.3
        },
        loadSprite = url => {
            return new Promise((resolve,reject) => {
                let sprite = new Image();
                sprite.src = url;
                sprite.onload = () => {
                    resolve(sprite);
                };
                sprite.onerror = () => {
                    reject(url);
                };
            });
        },
        spritePromises = assets.map(loadSprite),
        applyForce = e => {
            let ex = e.clientX - canvas.offsetLeft,
                ey = e.clientY - (canvas.offsetTop - window.pageYOffset);

            ex = ex / canvas.offsetWidth * W;
            ey = ey / canvas.offsetHeight * H;

            let insideX = Math.abs(ex - tumbleweed.x) <= tumbleweed.r,
                insideY = Math.abs(ey - tumbleweed.y) <= tumbleweed.r;

            if (insideX && insideY) {
                let xForce = tumbleweed.x - ex,
                    yForce = tumbleweed.y - ey,
                    xAccel = xForce / tumbleweed.mass,
                    yAccel = yForce / tumbleweed.mass;

                tumbleweed.xVel += xAccel;
                tumbleweed.yVel += yAccel;

                ++score;

                // when enabled, the tumbleweed will be allowed to touch the left side after rolling in
                if (!tumbleweed.inPlay)
                    tumbleweed.inPlay = true;
            }
        },
        update = () => {
            // A. Background
            c.clearRect(0,0,W,H);
            c.drawImage(sprites[0],0,0,W,H);

            // B. Tumbleweed
            tumbleweed.x += tumbleweed.xVel;

            // 1. Friction to the right
            if (tumbleweed.xVel > 0) {
                tumbleweed.xVel -= world.friction;
                if (tumbleweed.xVel < 0)
                    tumbleweed.xVel = 0;

                // 2. Friction to the left
            } else if (tumbleweed.xVel < 0) {
                tumbleweed.xVel += world.friction;
                if (tumbleweed.xVel > 0)
                    tumbleweed.xVel = 0;
            }

            // 3. Horizontal collision
            let hitLeftBound = tumbleweed.x <= tumbleweed.r && tumbleweed.inPlay,
                hitRightBound = tumbleweed.x >= W - tumbleweed.r;

            if (hitLeftBound)
                tumbleweed.x = tumbleweed.r;
            else if (hitRightBound)
                tumbleweed.x = W - tumbleweed.r;

            if (hitLeftBound || hitRightBound)
                tumbleweed.xVel *= -tumbleweed.restitution;

            // 4. Vertical collision
            tumbleweed.y += tumbleweed.yVel;
            tumbleweed.yVel += world.gravity;

            let hitTopBound = tumbleweed.y <= tumbleweed.r,
                hitBottomBound = tumbleweed.y >= H - tumbleweed.r;

            if (hitTopBound) {
                tumbleweed.y = tumbleweed.r;

            } else if (hitBottomBound) {
                tumbleweed.y = H - tumbleweed.r;
                score = 0;
            }
            if (hitTopBound || hitBottomBound)
                tumbleweed.yVel *= -tumbleweed.restitution;

            // 5. Rotation
            tumbleweed.rotation += tumbleweed.xVel;

            if (tumbleweed.rotation >= 360)
                tumbleweed.rotation -= 360;
            else if (tumbleweed.rotation < 0)
                tumbleweed.rotation += 360;

            // 6. Drawing
            c.save();
            c.translate(tumbleweed.x,tumbleweed.y);
            c.rotate(tumbleweed.rotation * Math.PI/180);
            c.drawImage(
                sprites[1],
                -tumbleweed.r,
                -tumbleweed.r,
                tumbleweed.r * 2,
                tumbleweed.r * 2
            );
            c.translate(-tumbleweed.x,-tumbleweed.y);
            c.restore();

            // C. Score
            if (score > 0) {
                c.fillStyle = "#7f7f7f";
                c.font = "48px Hind, sans-serif";
                c.textAlign = "center";
                c.fillText(score,W/2,48);
            }
        },
        render = () => {
            update();
            requestAnimationFrame(render);
        };

    // ensure proper resolution
    canvas.width = W * S;
    canvas.height = H * S;
    c.scale(S,S);

    // load sprites
    Promise.all(spritePromises).then(loaded => {
        for (let sprite of loaded)
            sprites.push(sprite);

        render();
        canvas.addEventListener("click",applyForce);

    }).catch(urls => {
        console.log(urls+" couldn’t be loaded");
    });
}
