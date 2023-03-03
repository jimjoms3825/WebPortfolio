const template = document.createElement('template');

template.innerHTML = `
<header>
        <a href="#" class="logo">
            James Bombardier.
        </a>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    </header>
`;

document.body.appendChild(template.content);
