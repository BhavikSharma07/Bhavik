document.addEventListener('DOMContentLoaded', () => {

    // 1. TYPING ANIMATION
    const words = ["ASP.NET Core", "Web API", "SQL Server", "Cloud Architecture"];
    let i = 0;
    let timer;

    function typeEffect() {
        let word = words[i].split("");
        var loopTyping = function () {
            if (word.length > 0) {
                document.querySelector('.typing-text').innerHTML += word.shift();
            } else {
                setTimeout(deleteEffect, 2000);
                return;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deleteEffect() {
        let word = words[i].split("");
        var loopDeleting = function () {
            if (word.length > 0) {
                word.pop();
                document.querySelector('.typing-text').innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                typeEffect();
                return;
            }
            timer = setTimeout(loopDeleting, 80);
        };
        loopDeleting();
    }

    typeEffect();

    // 2. MOUSE FOLLOWER
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Simple follow with slight delay effect via CSS transition
        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;
    });

    // 3. SCROLL REVEAL ANIMATIONS
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-up, .reveal-text, .timeline-item');
    elementsToReveal.forEach(el => observer.observe(el));

    // 4. TECH CAROUSEL CLONE FOR INFINITE SCROLL
    // We double the content to ensure smooth seamless scroll
    const track = document.querySelector('.tech-track');
    if (track) {
        const items = track.innerHTML;
        track.innerHTML = items + items; // Duplicate
    }

    // 5. SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 6. TERMINAL TYPING ANIMATION
    const terminalText = document.querySelector('.terminal-badge span');
    if (terminalText) {
        const textToType = "dotnet run portfolio ...";
        terminalText.textContent = "";
        let charIndex = 0;

        function typeTerminal() {
            if (charIndex < textToType.length) {
                terminalText.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeTerminal, 50); // Fast typing
            } else {
                // Add success message after typing
                setTimeout(() => {
                    terminalText.innerHTML = "Application started. <span style='color: #27c93f'>Listening on port 5000...</span>";
                }, 600);
            }
        }

        setTimeout(typeTerminal, 1000); // Start after 1s delay
    }

});
